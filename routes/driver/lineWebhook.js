const express = require('express')
const { getBookingById } = require('../../controllers/bookingController.js')
const { finishingJob, getCurrentJobWithLineFlex, getJobHistory, startJob } = require('../../controllers/driverController.js')
const { createRichMenu } = require('../../js/linehelper/createRichmenu.js')
const { pushMessage } = require('../../js/linehelper/pushToLine.js')
const { replyMessage } = require('../../js/linehelper/replyToLine.js')
const { jobAndBookingTable } = require('../../lineComponents/jobAndBookingTable.js')
const { flexWrapper } = require('../../lineComponents/flexWrapper.js')
const { getAlltBookingsByUserIdDB } = require('../../models/user.js')
const { getCurrentJobsDB, getAllJobByDriverIdDB, updateDriverDB, getDriverByIdDB, uploadImageNameDB, getDriverImageDB } = require('../../models/driver.js')
const { textTemplate } = require('../../js/helper/textTemplate.js')
const axios = require('axios');
const fs = require('fs');

//init packages
const router = express.Router()

//webhook from line
router.post('/', async (req, res) => {
  if (req.method === "POST") {
    let event = req.body.events[0]
    const id = event.source.userId
    switch (event.type) {
      case "message":
        const driver = await getDriverByIdDB(event.source.userId)
        if (!driver.length) return await replyMessage(req, "driver", "โปรดสมัครสมาชิก");
        if (event.message.type === "text") {
          try {
            res.send("ok")
          } catch (error) {
            console.log(error)
          }
        } else {
          try {
            // if (driver[0].driverStatus !== "registering") return await replyMessage(req, "driver", "คุณ");
            const messageId = event.message.id
            const images = await getDriverImageDB(id)
            if (images.length >= 2) await updateDriverDB(id, { driverStatus: "pending" })
            const fileName = `${event.source.userId}-${Date.now()}.jpg`
            const image = await axios.get(`https://api-data.line.me/v2/bot/message/${messageId}/content`, { responseType: 'arraybuffer', headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer xtaVGzaHPVGUw6GnYttFpkLw33AyuIJuSJDyLWFTASQjK3EPBfp2HCxTtBf93QAXaVoMwSvSP4pvqstI9tImt8h0zdzU1W5GW1jyJxXmJAq1duh5ttjtFsn+sNWVKrnpPI4Y+/x11VJWrAlninjNCgdB04t89/1O/w1cDnyilFU=`
            } })
            fs.writeFile(__dirname + `../../../imgs/uploads/${fileName}`, image.data, (err) => {
              if(err) {
                  return console.log(err);
              }
              console.log("The file was saved!");
            });
            await uploadImageNameDB({driverId: id, imgName: fileName})
            await replyMessage(req, "driver", "รูปถูกบันทึกเรียบร้อย");
          } catch (error) {
            console.log(error)
          }
        }
        break;

      case "postback":
        const type = new URLSearchParams(event.postback.data)
        switch (type.get('type')) {
          case "currentJob": {
            const bookings = await getCurrentJobsDB(event.source.userId)
            console.log(bookings)
            if (bookings.length) {
              await pushMessage([flexWrapper(jobAndBookingTable(bookings, "Current Jobs", "currentJobInfo"))], "driver", event.source.userId)
            } else {
              await pushMessage([textTemplate("Sorry, you have no job yet.")], "driver", event.source.userId)
            }
          } break;

          case "currentJobInfo":
            await getCurrentJobWithLineFlex(event.source.userId, type.get("bookingId"))
            break;

          case "jobHistory": {
            const bookings = await getAllJobByDriverIdDB(event.source.userId)
            if (bookings.length) {
              await pushMessage([flexWrapper(jobAndBookingTable(bookings, "Job History", "jobHistoryInfo"))], "driver", event.source.userId)
            } else {
              await pushMessage([textTemplate("Sorry, you have no job yet.")], "driver", event.source.userId)
            }
          } break;

          case "jobHistoryInfo":
            await getJobHistory(event.source.userId, type.get("bookingId"))
            break;
            
          case "startJob":
            await startJob(type.get('bookingId'), event.source.userId)
            break;

          case "finishJob":
            await finishingJob(type.get('bookingId'), event.source.userId)
            break;

          case "agreeTerms":
            await updateDriverDB(event.source.userId, { driverTermsAndCon: true })
            await pushMessage([flexWrapper(actionToDriverFlex("รหัสสมาชิกของคุณ: " + type.get('driverCode'), "คุณสามารถเข้ารับงานในเมนู \"Job Board\" หรือกดปุ่มด้านล่างได้", "#1DB446", "jobBoard"))], "driver", req.body.id)
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