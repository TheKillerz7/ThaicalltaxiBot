const express = require('express')
const bookingController = require('../controllers/bookingController')
const { getChattingMessages, startChattingRoom, getRoomsByUserId, readChatMessages, getRoomByRoomId } = require('../controllers/chattingController')

//init packages
const router = express.Router()

router.get('/message/:roomId', getChattingMessages)
router.get('/rooms/:userId/:userType', getRoomsByUserId)
router.get('/room/:roomId', getRoomByRoomId)

router.post('/', startChattingRoom)

router.patch('/message', readChatMessages)

// router.put('/:id', bookingController.put)

module.exports = router