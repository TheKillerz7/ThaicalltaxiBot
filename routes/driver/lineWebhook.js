const express = require('express')
const { getBookingById } = require('../../controllers/bookingController.js')
const { finishingJob, getCurrentJobWithLineFlex, getJobHistory, startJob } = require('../../controllers/driverController.js')
const { createRichMenu } = require('../../js/linehelper/createRichmenu.js')
const { pushMessage } = require('../../js/linehelper/pushToLine.js')
const { replyMessage } = require('../../js/linehelper/replyToLine.js')
const { jobAndBookingTable } = require('../../lineComponents/jobAndBookingTable.js')
const { flexWrapper } = require('../../lineComponents/flexWrapper.js')
const { getAlltBookingsByUserIdDB } = require('../../models/user.js')
const { getCurrentJobsDB } = require('../../models/driver.js')
const { textTemplate } = require('../../js/helper/textTemplate.js')

//init packages
const router = express.Router()

//webhook from line
router.post('/', async (req, res) => {
  if (req.method === "POST") {
    let event = req.body.events[0]
    switch (event.type) {
      case "message":
        if (event.message.type === "text") {
          try {
            await createRichMenu("driver")
            res.send("ok")
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
            await getCurrentJobWithLineFlex(event.source.userId)
            break;

          case "jobHistory": {
            const bookings = await getCurrentJobsDB(event.source.userId)
            console.log(bookings)
            if (bookings.length) {
              await pushMessage([flexWrapper(jobAndBookingTable(bookings, "Job History", "jobHistoryInfo"))], "driver", event.source.userId)
            } else {
              await pushMessage([textTemplate("Sorry, you have no job yet.")], "driver", event.source.userId)
            }
          } break;

          case "jobHistoryInfo":
            await getJobHistory(event.source.userId)
            break;
            
          case "startJob":
            await startJob(type.get('bookingId'), event.source.userId)
            break;

          case "finishJob":
            await finishingJob(type.get('bookingId'), event.source.userId)
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