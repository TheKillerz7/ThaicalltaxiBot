import express from 'express'
import { areaCalculation } from '../public/js/areaCalculation.js'
import { geocodingAPI } from '../public/js/geocodingAPI.js'
import { sheetsInfo, readSheets, writeSheets } from '../public/js/sheetsRequest.js'
import NodeCache  from "node-cache"
import areaPrices from '../areaPrices.json'

//init packages
const router = express.Router()
const myCache = new NodeCache();

router.get('/', async (req, res) => {
  res.send(areaCalculation([100.21329, 16.04008], "bangkok"))
})

//webhook from dialogflow
router.post('/', async (req, res) => {
  //checking and storing events that have been done
  const events = myCache.get("key1") || []
  const reqResult = req.body.queryResult

  //Checking if the user is booking or checking price
  switch (req.body.queryResult.action.split(".")[0]) {
    case "Booking":
      
      break;
  
    case "PriceCheck":
      let price = {} //price of each car type
      let textRespond = ""
      let result = false

      //reaches last step of price checking or proceed to else
      if(events.length === 2) {
        myCache.del("key1")
        price = areaPrices[events[0].area.type][events[0].area.result]["pattayaA"] //accessing price object
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
      break;

    default:

      break;
  }
})

export default router

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