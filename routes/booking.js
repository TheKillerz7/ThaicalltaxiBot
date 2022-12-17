const express = require('express')
const { getAllBooking, getBookingByStatus, createBooking, getBookingById, updateBooking, updatePrice } = require('../controllers/bookingController')

//init packages
const router = express.Router()

router.get('/', getAllBooking)
router.get('/:status', getBookingByStatus)
router.get('/id/:id', getBookingById)

router.post('/', createBooking)

router.patch('/', updateBooking)
router.patch('/price', updatePrice)

module.exports = router