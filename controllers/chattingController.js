const { getBookingByIdDB } = require("../models/booking")
const { getRoomsByUserIdDB, getMessagesByRoomId, storeMessage, updateChatMessages, getRoomByRoomIdDB } = require("../models/chatting")
const moment = require("moment")

const getChattingMessages = async (req, res) => {
    const { roomId } = req.params
    try {
        const messages = await getMessagesByRoomId(roomId)
        res.send(messages)
    } catch (error) {
        console.log(error)
    }
}

const getRoomByRoomId = async (req, res) => {
    const { roomId } = req.params
    try {
        const room = (await getRoomByRoomIdDB(roomId))[0]
        const booking = (await getBookingByIdDB(room.bookingId))[0]
        const data = {
            ...room,
            bookingCode: (booking.id + 300000).toString().substring(0, 3) + "-" + (booking.id + 300000).toString().substring(3)
        }
        res.send(data)  
    } catch (error) {
        console.log(error)
    }
}

const getRoomsByUserId = async (req, res) => {
    const { userId, userType } = req.params
    try {
        const rooms = await getRoomsByUserIdDB(userId, userType)
        if (rooms.length === 0) return res.send("No rooms are open.")
        const roomsWithMessage = await Promise.all(rooms.map(async (room, index) => {
            const messages = await getMessagesByRoomId(room.roomId, 10)
            const booking = (await getBookingByIdDB(room.bookingId))[0]
            booking.bookingInfo = JSON.parse(booking.bookingInfo)
            let startingDate = []
            let pickupDateStart = ""
            if (booking.bookingInfo.start?.pickupDate === "ASAP" || booking.bookingInfo.pickupDate === "ASAP") {
                pickupDateStart = "As soon as possible"
            } else {
                startingDate = booking.bookingInfo.start?.pickupDate.split("/").reverse() || booking.bookingInfo.pickupDate.split("/").reverse()
                pickupDateStart = moment(new Date(startingDate[0], (parseInt(startingDate[1]) - 1).toString(), startingDate[2])).format("DD MMM")
            }
            const latestMessage = messages[0]
            const unreadMessages = messages.filter((message) => {
                if (message.senderType != userType && message.chatStatus === "unread") return message
            })
            const obj = {
                ...room,
                bookingCode: (booking.id + 300000).toString().substring(0, 3) + "-" + (booking.id + 300000).toString().substring(3),
                messages: {
                    latestMessage: latestMessage,
                    unreadMessages: [...unreadMessages]
                },
                pickupDate: pickupDateStart,
                pickupTime: booking.bookingInfo.start?.pickupTime || booking.bookingInfo.pickupTime
            }
            return obj
        }))
        res.send(roomsWithMessage)  
    } catch (error) {
        console.log(error)
    }
}

const storeChatMessages = async (req, res) => {
    try {
        await storeMessage(req)
    } catch (error) {
        console.log(error)
    }
}

const readChatMessages = async (req, res) => {
    const { roomId, userType } = req.body
    const data = {
        chatStatus: "read"
    }
    const option = {
        where: {
            roomId,
            chatStatus: "unread"
        },
        whereNot: {
            senderType: userType
        }
    }

    try {
        const updated = await updateChatMessages(data, option)
        console.log(updated)
        res.send("ok")
    } catch (error) {
        console.log(error)
    }
}

const startChattingRoom = (req, res) => {

}

const deleteChattingRoom = (req, res) => {

}

module.exports = {
    getChattingMessages,
    getRoomsByUserId,
    storeChatMessages,
    getRoomByRoomId,
    readChatMessages,
    startChattingRoom,
    deleteChattingRoom
}