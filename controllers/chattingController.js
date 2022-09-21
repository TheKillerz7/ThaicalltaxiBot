const { getRoomsByUserIdDB, getMessagesByRoomId, storeMessage, updateChatMessages } = require("../models/chatting")
const moment = require('moment');

const getChattingMessages = async (req, res) => {
    const { roomId } = req.params
    try {
        const messages = await getMessagesByRoomId(roomId)
        res.send(messages)
    } catch (error) {
        console.log(error)
    }
}

const getRoomsByUserId = async (req, res) => {
    const { userId, userType } = req.params
    try {
        const rooms = await getRoomsByUserIdDB(userId, userType)
        if (!rooms.length) return res.send("No rooms are open.")
        const roomsWithMessage = await Promise.all(rooms.map(async (room, index) => {
            const messages = await getMessagesByRoomId(room.roomId, 1000)
            const latestMessage = messages[0]
            const unreadMessages = messages.filter((message) => {
                if (message.senderType != userType && message.status === "unread") return message
            })
            const obj = {
                ...room,
                messages: {
                    latestMessage: latestMessage,
                    unreadMessages: [...unreadMessages]
                }
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
    console.log(req.body)
    const data = {
        status: "read"
    }
    const option = {
        where: {
            roomId,
            status: "unread"
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
    readChatMessages,
    startChattingRoom,
    deleteChattingRoom
}