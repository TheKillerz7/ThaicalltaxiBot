const { getRoomsByUserIdDB, getMessagesByRoomId, storeMessage, updateChatMessages, getRoomByRoomIdDB } = require("../models/chatting")

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
        const room = await getRoomByRoomIdDB(roomId)
        console.log(room)
        res.send(room)  
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
            console.log(rooms)
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
    getRoomByRoomId,
    readChatMessages,
    startChattingRoom,
    deleteChattingRoom
}