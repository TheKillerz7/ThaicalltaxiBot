const express = require('express')
const { sheetsInfo, readSheets, writeSheets } = require('../public/js/sheetsRequest.js')

//init packages
const router = express.Router()

router.get('/', async (req, res) => {
  res.json({
    status: 200,
    message: "Get data has successfully",
  });
})

//posting a booking
router.post('/', async (req, res) => {
    res.send("thank you hehe")
})

router.put('/', async (req, res) => {

})

module.exports = router