const express = require('express')
const bookingController = require('../controllers/bookingController.js')

//init packages
const router = express.Router()

router.get('/', bookingController.getAllBooking)

// router.post('/', bookingController.post)

// router.put('/:id', bookingController.put)

module.exports = router