const express = require('express')
const { areaCalculation } = require('../../js/areaCalculation.js')
const { geocodingAPI } = require('../../js/geocodingAPI.js')
const NodeCache  = require("node-cache")
const areaPrices = require('../../areaPrices.json')
const { postToDialogflow } = require('../../js/linehelper/postToDialogflow.js')
const { replyMessage } = require('../../js/linehelper/replyToLine.js')
const userController = require('../../controllers/userController.js')
const { getRegisteredDriversWithDriverInfo, selectedDriver, updateBookingdriverByBookingId, getSelectedRegisterByBookingId, getRegisteredDriversByBookingIdandDriverId } = require('../../models/bookingdrivers.js')
const { pushMessage } = require('../../js/linehelper/pushToLine.js')
const { flexWrapper } = require('../../lineComponents/flexWrapper.js')
const { confirmCancel } = require('../../lineComponents/confirmCancel.js')
const { confirmSelect } = require('../../lineComponents/confirmSelect.js')
const { driverRegisteredCard } = require('../../lineComponents/driverRegisteredCard.js')
const { carouselWrapper } = require('../../lineComponents/carouselWrapper.js')
const { textTemplate } = require('../../js/helper/textTemplate.js')
const { confirmInfo } = require('../../lineComponents/confirmInfo.js')
const { updateBookingDB, getBookingByIdDB } = require('../../models/booking.js')
const { getDriverByIdDB } = require('../../models/driver.js')
const { createRichMenu } = require('../../js/linehelper/createRichmenu.js')
const { getAllBookingsByUserIdDB, getCurrentBookingsDB } = require('../../models/user.js')
const { jobAndBookingTable } = require('../../lineComponents/jobAndBookingTable.js')

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
            await createRichMenu()
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
        try {
          let booking
          if (params.get("bookingId")) {
            booking = (await getBookingByIdDB(params.get("bookingId")))[0]
            if (booking.status === "canceled" || booking.status === "finished") return await pushMessage([textTemplate("This booking has already been canceled or closed.")], "user", event.source.userId)
          }
          switch (params.get("type")) {
            case "confirmCancel":
              await pushMessage([flexWrapper(confirmCancel(params.get("bookingId")))], "user", event.source.userId)
              break;
          
            case "confirmSelectDriver":
              if (booking.status === "selected") return await pushMessage([textTemplate("Sorry, can't select a driver again because you've selected a driver.")], "user", event.source.userId)
              await pushMessage([flexWrapper(confirmSelect(params.get("bookingId"), params.get("driverId")))], "user", event.source.userId)
              break;
          
            case "cancel":
              if (params.get("value") === "cancel") {
                await updateBookingDB(params.get("bookingId"), {status: "canceled"})
                await updateBookingdriverByBookingId(params.get("bookingId"), {status: "canceled"})
                await pushMessage([textTemplate("The process has been exited. Thank you!")], "user", event.source.userId)
              }
              break;
          
            case "selectDriver":
              if (booking.status === "selected") return await pushMessage([textTemplate("Sorry, can't select a driver again because you've selected a driver.")], "user", event.source.userId)
              if (params.get("value") === "select") {
                await userController.selectDriver(params.get("bookingId"), params.get("driverId"), event.source.userId)
              }
              break;
  
            case "confirmInfo":
              if (booking.status === "ongoing") return await pushMessage([textTemplate("Sorry, you've already confirmed your infomation. If you are willing to change your info, please contact your driver in 'Chatting Room' menu")], "user", event.source.userId)
              await updateBookingDB(params.get("bookingId"), {status: "ongoing"})
              await pushMessage([textTemplate("You've been selected, Booking: " + params.get("bookingId"))], 'driver', params.get("driverId"))
              await pushMessage([textTemplate("Thank you for booking with us! Please chat with our driver.")], "user", event.source.userId)
              break;

            case "currentBooking": {
              const bookings = await getCurrentBookingsDB(event.source.userId)
              console.log(bookings)
              if (bookings.length) {
                await pushMessage([flexWrapper(jobAndBookingTable(bookings, "Current Booking", "currentBookingInfo"))], "user", event.source.userId)
              } else {
                await pushMessage([textTemplate("Sorry, you have no booking yet.")], "user", event.source.userId)
              }
            } break;

            case "currentBookingInfo":
              await userController.getCurrentBooking(event.source.userId)
              break;

            case "bookingHistory": {
              const bookings = await getAllBookingsByUserIdDB(event.source.userId)
              console.log(bookings)
              if (bookings.length) {
                await pushMessage([flexWrapper(jobAndBookingTable(bookings, "Booking History", "bookingHistoryInfo"))], "user", event.source.userId)
              } else {
                await pushMessage([textTemplate("Sorry, you have no booking yet.")], "user", event.source.userId)
              }
            } break;

            case "bookingHistoryInfo":
              await userController.getBookingHistory(event.source.userId)
              break;
          
            default:
              break;
          }
        } catch (error) {
          console.log(error)
        }
        break;
    
      default:
        break;
    }
  }
})

module.exports = router






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