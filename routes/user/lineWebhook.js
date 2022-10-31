const express = require('express')
const { areaCalculation } = require('../../js/areaCalculation.js')
const { geocodingAPI } = require('../../js/geocodingAPI.js')
const NodeCache  = require("node-cache")
const areaPrices = require('../../areaPrices.json')
const { postToDialogflow } = require('../../js/linehelper/postToDialogflow.js')
const { replyMessage } = require('../../js/linehelper/replyToLine.js')
const userController = require('../../controllers/userController.js')
const { getRegisteredDriversWithDriverInfo, selectedDriver, updateBookingdriverByBookingId } = require('../../models/bookingdrivers.js')
const { pushMessage } = require('../../js/linehelper/pushToLine.js')
const { flexWrapper } = require('../../lineComponents/flexWrapper.js')
const { confirmCancel } = require('../../lineComponents/confirmCancel.js')
const { confirmSelect } = require('../../lineComponents/confirmSelect.js')
const { driverRegisteredCard } = require('../../lineComponents/driverRegisteredCard.js')
const { carouselWrapper } = require('../../lineComponents/carouselWrapper.js')
const { textTemplate } = require('../../js/helper/textTemplate.js')
const { privateInfo } = require('../../lineComponents/privateInfo.js')
const { updateBookingDB } = require('../../models/booking.js')

//init packages
const router = express.Router()
const myCache = new NodeCache();

router.get('/', async (req, res) => {
  res.json({
    status: 200,
    message: "Get data has successfully",
  });
})

//webhook from line
router.post('/', async (req, res) => {
  if (req.method === "POST") {
    let event = req.body.events[0]
    console.log(event)
    switch (event.type) {
      case "message":
        if (event.message.type === "text") {
          try {
            await postToDialogflow(req)
          } catch (error) {
            console.log(error)
          }
        } else {
          try {
            await replyMessage(req);
          } catch (error) {
            console.log(error)
          }
        }
        break;

      case "follow":
        userController.createUser(req, res)
        break;

      case "unfollow":
        userController.deleteUser(req, res)
        break;

      case "postback":
        const params = new URLSearchParams(event.postback.data)
        switch (params.get("type")) {
          case "confirmCancel":
            await pushMessage([flexWrapper(confirmCancel(params.get("bookingId")))], "user", event.source.userId)
            break;
        
          case "confirmSelectDriver":
            await pushMessage([flexWrapper(confirmSelect(params.get("bookingId"), params.get("driverId")))], "user", event.source.userId)
            break;
        
          case "cancel":
            if (params.get("value") === "cancel") {
              await updateBookingDB(params.get("bookingId"), {status: "canceled"})
              await updateBookingdriverByBookingId(params.get("bookingId"), {status: "canceled"})
              await pushMessage([textTemplate("The process has been exited. Thank you!")], "user", event.source.userId)
            } else {
              console.log("back")
              await resendDriverOffer(params.get("bookingId"), event.source.userId, params.get("carSize"))
            }
            break;
        
          case "selectDriver":
            if (params.get("value") === "select") {
              const flex = flexWrapper(privateInfo(params.get("bookingId")))
              await userController.selectDriver(params.get("bookingId"), params.get("driverId"), event.source.userId)
              await pushMessage([flex], "user", event.source.userId)
            } else {
              console.log("back")
              await resendDriverOffer(params.get("bookingId"), event.source.userId, params.get("carSize"))
            }
            break;
        
          default:
            break;
        }
        break;
    
      default:
        break;
    }
  }
})

module.exports = router

const resendDriverOffer = async (bookingId, userId, carSize) => {
  let messageToUser = []

  try {
    const driversRegisters = await getRegisteredDriversWithDriverInfo(bookingId, "jobRatio")
    const sortedRegister = driversRegisters.sort((a, b) => {
      if (JSON.parse(a.vehicleInfo).carSize === carSize) {
        if (JSON.parse(b.vehicleInfo).carSize === carSize) {
          return 0
        } else {
          return -1
        }
      } else {
        if (JSON.parse(b.vehicleInfo).carSize === "Sedan car") {
          return 1
        } else {
          return 0
        }
      }
    })
    
    const cards = sortedRegister.map((register, index) => {
      let extraObj = {}
      let extraPrice = 0
      register.extra = JSON.parse(register.extra)
      register.extra.map((extra) => {
        if (extra.title) {
          extraPrice += parseInt(extra.price)
          extraObj[extra.title] = parseInt(extra.price)
        }
      })
      const prices = {
        "Course Price": register.trip,
        "Tollway": register.tollway,
        ...extraObj
      }

      const totalPrice = parseInt(register.trip) + parseInt(register.tollway) + extraPrice
      return driverRegisteredCard(prices, totalPrice, register, index + 1, carSize)
    })
    const cardsWrapped = flexWrapper(carouselWrapper(cards), "Driver's Offers")
    messageToUser.push(cardsWrapped)
    await pushMessage(messageToUser, "user", userId)
  } catch (error) {
    console.log(error)
  }
}
















const priceCheckHandle = async (req) => {
 //checking and storing events that have been done
 const events = myCache.get("key1") || []
 const reqResult = req.body.queryResult

 let price = {} //price of each car type
      let textRespond = ""
      let result = false

      //reaches last step of price checking or proceed to else
      if(events.length === 2) {
        myCache.del("key1")
        console.log(events)
        price = areaPrices.oneCourse[events[0].area.result][events[1].area.result] //accessing price object
        textRespond = `Sedan car: ${price.sedan} baht\nFamily car: ${price.family} baht\nMinibus: ${price.minibus} baht`
      }
      else {
        result = await priceCheck(reqResult, events)
        textRespond = reqResult.fulfillmentMessages[0].text.text[0] //sends default message set in dialogflow
      }

      const responseObj = {
        fulfillmentMessages: [
          {
            text: {
              text: [
                //if we have service in that area or reach last step of check price, sends textRespond
                result || events.length === 2 ? 
                textRespond
                :
                "no service"
              ]
            }
          }
        ]
      }
      res.send(responseObj)
}

const priceCheck = async (reqResult, events) => {
  //convert to real address
  const address = await geocodingAPI(reqResult.queryText)
  //finding province
  const results = address.data.results[0]
  const areaType = results.plus_code.compound_code.split(" ")[1].replace(/[^a-zA-Z0-9 ]/g, '').toLowerCase()
  
  //checking which area the address is in
  const areaResult = areaCalculation([results.geometry.location.lng, results.geometry.location.lat], areaType)
  //store process in cache
  const objTemp = [
    ...events,
    {
      address: results,
      area: {
        type: areaType,
        result: areaResult
      }
    }
  ]
  if (areaResult) myCache.set("key1", objTemp)
  //if we have service in that area returns true
  return areaResult ? true : false
}