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
  const events = []
  const reqResult = req.body.queryResult

  //Checking if the user is booking or checking price
  switch (req.body.queryResult.action.split(".")[0]) {
    case "Booking":
      
      break;
  
    case "PriceCheck":
      const result = await priceCheck(reqResult, events)
      console.log(typeof result)
      if (typeof result === "object" || typeof result === "string") {
        const obj = {
          fulfillmentMessages: [
            {
              text: {
                text: [
                  typeof result === "object" ? 
                  `Sedan car: ${result.sedan} baht\nFamily car: ${result.family} baht\nMinibus: ${result.minibus} baht`
                  :
                  result
                ]
              }
            }
          ]
        }
        res.send(obj)
      }
      break;

    default:

      myCache.set("key1", events)
      break;
  }
})

export default router

const priceCheck = async (reqResult, events) => {
  const eventCount = events.length
  let areaType = ""

  //convert to real address
  const address = await geocodingAPI(reqResult.queryText)
  //finding province
  const results = address.data.results[0]
  console.log(results)
  areaType = results.address_components.find(item => item.types.includes("administrative_area_level_1")).long_name.toLowerCase()
  
  //checking which area the address is in
  const areaResult = areaCalculation([results.geometry.location.lat, results.geometry.location.lng], areaType)
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
  myCache.set("key1", objTemp)
  if (eventCount === 2) {
    return areaPrices[areaType][objTemp[0].area.result][objTemp[1].area.result] || "We don't have service in that area yet."
  }
  return false
}