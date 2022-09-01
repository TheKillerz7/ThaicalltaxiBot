const express = require('express')
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

            console.log(response)
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
        
        break;
    
      default:
        break;
    }
  }
})

module.exports = router