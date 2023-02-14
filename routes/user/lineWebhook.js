const express = require('express')
const { areaCalculation } = require('../../js/areaCalculation.js')
const { geocodingAPI } = require('../../js/geocodingAPI.js')
const NodeCache  = require("node-cache")
const areaPrices = require('../../areaPrices.json')
const { postToDialogflow } = require('../../js/linehelper/postToDialogflow.js')
const { replyMessage } = require('../../js/linehelper/replyToLine.js')
const userController = require('../../controllers/userController.js')
const { updateBookingdriverByBookingId, getSelectedRegisterByBookingIdDB, getRegisteredDriversWithDriverInfo } = require('../../models/bookingdrivers.js')
const { pushMessage } = require('../../js/linehelper/pushToLine.js')
const { flexWrapper } = require('../../lineComponents/flexWrapper.js')
const { confirmCancel } = require('../../lineComponents/confirmCancel.js')
const { confirmSelect } = require('../../lineComponents/confirmSelect.js')
const { textTemplate } = require('../../js/helper/textTemplate.js')
const { updateBookingDB, getBookingByIdDB } = require('../../models/booking.js')
const { getAllBookingsByUserIdDB, getCurrentBookingsDB } = require('../../models/user.js')
const { jobAndBookingTable } = require('../../lineComponents/jobAndBookingTable.js')
const { afterConfirm } = require('../../lineComponents/afterConfirm.js')
const { storeChatMessages } = require('../../controllers/chattingController.js')
const he = require('he');
const { default: ShortUniqueId } = require('short-unique-id')
const axios = require('axios');
const { createChatRoom } = require('../../models/chatting.js')
const { bookingAction } = require('../../lineComponents/bookingAction.js')

//init packages
const router = express.Router()
const myCache = new NodeCache();
const translations = (text, target) => {
  return axios.post("https://translation.googleapis.com/language/translate/v2", {}, {
    params: {
        q: text,
        target,
        key: "AIzaSyAyRniSWIgVCvj30C2q7d9YlMnN06ZzT_M"
    }})
}

router.get('/', async (req, res) => {
  console.log('ok')
  res.send('ok')
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
        try {
          const booking = params.get("bookingId") && (await getBookingByIdDB(params.get("bookingId")))[0]
          if (params.get("bookingId")) booking.bookingInfo = JSON.parse(booking.bookingInfo)
          if (params.get("bookingId") && params.get("type") !== "bookingHistoryInfo") {
            if (booking.bookingStatus === "canceled" || booking.bookingStatus === "finished") return await pushMessage([textTemplate("This booking has already been canceled or closed.")], "user", event.source.userId)
          }
          switch (params.get("type")) {
            case "confirmCancel":
              await pushMessage([flexWrapper(confirmCancel(params.get("bookingId")))], "user", event.source.userId)
              break;
          
            case "confirmSelectDriver":
              if (booking.bookingStatus === "selected") return await pushMessage([textTemplate("Sorry, can't select a driver again because you've selected a driver.")], "user", event.source.userId)
              await pushMessage([flexWrapper(confirmSelect(params.get("bookingId"), params.get("driverId")))], "user", event.source.userId)
              break;
          
            case "cancel":
              if (params.get("value") === "cancel") {
                const driverId = (await getSelectedRegisterByBookingIdDB(params.get("bookingId")))[0]
                await updateBookingDB(params.get("bookingId"), {bookingStatus: "canceled"})
                await updateBookingdriverByBookingId(params.get("bookingId"), {offerStatus: "canceled"})
                await pushMessage([flexWrapper(bookingAction(booking, "cancel",  "Booking's been canceled", "red"))], "user", event.source.userId)
                await pushMessage([flexWrapper(bookingAction(booking, "cancel",  "งานถูกยกเลิก", "red"))], "driver", driverId.driverId)
              }
              break;
          
            case "selectDriver":
              console.log('dsa')
              if (params.get("value") === "select") {
                await userController.selectDriver(params.get("bookingId"), params.get("driverId"), event.source.userId)
              }
              break;
  
            case "confirmInfo":
              if (booking.bookingStatus !== "selected") return 
              const uid = new ShortUniqueId({ length: 10 });
              const roomId = uid()
              booking.roomId = roomId
              const driversRegisters = await getRegisteredDriversWithDriverInfo(params.get("driverId"), "jobDone")
              driversRegisters.filter((register) => register.driverId !== params.get("driverId"))
              await updateBookingDB(params.get("bookingId"), {bookingStatus: "ongoing"})
              driversRegisters.length && await multicastMessage([textTemplate("ขออภัย การเสนอราคาของคุณไม่ได้รับการอนุมัติ")], "driver", driversRegisters.map((register) => register.driverId))
              await pushMessage([flexWrapper(bookingAction(booking, "select", "คุณถูกรับเลือกในงานนี้", "green"))], 'driver', params.get("driverId"))
              await pushMessage([flexWrapper(afterConfirm((booking.id + 300000).toString().substring(0, 3) + "-" + (booking.id + 300000).toString().substring(3), roomId))], "user", event.source.userId)
              const roomData = {
                roomId,
                bookingId: params.get("bookingId"),
                userId: event.source.userId,
                driverId: params.get("driverId")
              }
              try {
                await createChatRoom(roomData)
                const greeting = {
                  roomId,
                  senderId: params.get("driverId"),
                  senderType: "driver",
                  messageType: "greeting",
                  translated: "Hi,\nI am your driver and very pleased to serve you!\n\nIf you have any requests or issues, please let me know with simple text for better translation."
                }
                const translated = await translations(greeting.translated, "th")
                greeting.message = he.decode(translated.data.data.translations[0].translatedText)
                await storeChatMessages(greeting)
              } catch (error) {
                console.log(error)
              }
              break;

            case "currentBooking": {
              const bookings = await getCurrentBookingsDB(event.source.userId)
              if (bookings.length) {
                await pushMessage([flexWrapper(jobAndBookingTable(bookings, "Current Booking", "currentBookingInfo"))], "user", event.source.userId)
              } else {
                await pushMessage([textTemplate("Sorry, you have no booking yet.")], "user", event.source.userId)
              }
            } break;

            case "currentBookingInfo":
              await userController.getCurrentBooking(event.source.userId, params.get("bookingId"))
              break;

            case "bookingHistory": {
              const bookings = await getAllBookingsByUserIdDB(event.source.userId)
              if (bookings.length) {
                await pushMessage([flexWrapper(jobAndBookingTable(bookings, "Booking History", "bookingHistoryInfo"))], "user", event.source.userId)
              } else {
                await pushMessage([textTemplate("Sorry, you have no booking yet.")], "user", event.source.userId)
              }
            } break;

            case "bookingHistoryInfo":
              await userController.getBookingHistory(event.source.userId, params.get("bookingId"))
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