const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  console.log(req)
})

router.post('/', (req, res) => {
  console.log(req.body)
  const obj = {
    fulfillmentMessages: [
      req.body.queryResult.fulfillmentMessages[0],
      {
        text: {
          text: [
            "Text response from webhook"
          ]
        }
      }
    ]
  }
  console.log(obj)
  res.send(obj)
})

module.exports = router