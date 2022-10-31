const express = require('express')
const { getAllBooking, getBookingByStatus, createBooking, updatePrivateInfo, getBookingById } = require('../controllers/bookingController')

//init packages
const router = express.Router()

router.get('/', getAllBooking)
router.get('/:status', getBookingByStatus)
router.get('/id/:id', getBookingById)

router.post('/', createBooking)

router.patch('/', updatePrivateInfo)

module.exports = router