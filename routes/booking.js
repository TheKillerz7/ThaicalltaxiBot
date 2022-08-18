const express = require('express')
const bookingController = require('../controllers/bookingController')

//init packages
const router = express.Router()

router.get('/', bookingController.getAllBooking)
router.get('/:status', bookingController.getBookingByStatus)

router.post('/', bookingController.createBooking)

// router.put('/:id', bookingController.put)

module.exports = router