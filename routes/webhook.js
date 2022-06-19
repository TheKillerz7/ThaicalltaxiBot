import express from 'express'
import { areaCalculation } from '../public/js/areaCalculation.js'
import { geocodingAPI } from '../public/js/geocodingAPI.js'
import { sheetsInfo, readSheets, writeSheets } from '../public/js/sheetsRequest.js'

//init router
const router = express.Router()

router.get('/', async (req, res) => {
  res.send(areaCalculation())
})

//webhook from dialogflow
router.post('/', async (req, res) => {
  console.log(req.body.originalDetectIntentRequest.payload)
  // const address = await geocodingAPI(req.body.queryResult.queryText)
  // const obj = {
  //   fulfillmentMessages: [
  //     req.body.queryResult.fulfillmentMessages[0],
  //     {
  //       text: {
  //         text: [
  //           address.data.results[0].formatted_address
  //         ]
  //       }
  //     }
  //   ]
  // }
  // res.send(obj)
})

export default router