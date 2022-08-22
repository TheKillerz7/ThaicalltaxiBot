const express = require('express')
const bookingController = require('../controllers/bookingController')
const { getChattingMessages, startChattingRoom } = require('../controllers/chattingController')

//init packages
const router = express.Router()

router.get('/:id', getChattingMessages)

router.post('/', startChattingRoom)

// router.put('/:id', bookingController.put)

module.exports = router