const express = require('express')
const { getCurrentJobs, finishingJob } = require('../../controllers/driverController.js')
const { createRichMenu } = require('../../js/linehelper/createRichmenu.js')
const { linkRichMenu } = require('../../js/linehelper/linkRichMenu.js')
const { postToDialogflow } = require('../../js/linehelper/postToDialogflow.js')
const { replyMessage } = require('../../js/linehelper/replyToLine.js')
const { unlinkRichMenu } = require('../../js/linehelper/unlinkRichMenu.js')

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
            // console.log(event)
            // await postToDialogflow(req)
            // await unlinkRichMenu("driver", event.source.userId)
            res.send("ok")
          } catch (error) {
            console.log(error)
          }
        } else {
          try {
            await replyMessage(req);
          } catch (error) {
            console.log(error.response.data.details)
          }
        }
        break;

      case "postback":
        const type = new URLSearchParams(event.postback.data)
        switch (type.get('type')) {
          case "currentJobs":
            await getCurrentJobs({driverId: event.source.userId})
            break;

          case "finishJob":
            await finishingJob({bookingId: type.get('bookingId')})
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