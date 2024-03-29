const express = require('express')
const { areaCalculation } = require('../../js/areaCalculation.js')
const { geocodingAPI } = require('../../js/geocodingAPI.js')
const NodeCache  = require("node-cache")
const areaPrices = require('../../areaPrices.json')
const { postToDialogflow } = require('../../js/linehelper/postToDialogflow.js')
const { replyMessage } = require('../../js/linehelper/replyToLine.js')
const userController = require('../../controllers/userController.js')

//init packages
const router = express.Router()
const myCache = new NodeCache();

router.get('/', async (req, res) => {
  res.json({
    status: 200,
    message: "Get data has successfully",
  });
})

//webhook from dialogflow
router.post('/', async (req, res) => {
    res.send('ok')
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