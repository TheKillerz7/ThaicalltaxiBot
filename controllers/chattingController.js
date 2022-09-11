const { getRoomsByUserIdDB, getMessagesByRoomId, storeMessage, updateChatMessages } = require("../models/chatting")

const getChattingMessages = async (req, res) => {
    const { roomId } = req.params
    try {
        const messages = await getMessagesByRoomId(roomId)
        console.log(messages)
        res.send(messages)
    } catch (error) {
        console.log(error)
    }
}

const getRoomsByUserId = async (req, res) => {
    const { userId, userType } = req.params
    console.log(req.params)
    try {
        const rooms = await getRoomsByUserIdDB(userId, userType)
        console.log(rooms)
        if (!rooms.length) return res.send("No rooms are open.")
        const roomsWithMessage = await Promise.all(rooms.map(async (room, index) => {
            const latestMessage = await getMessagesByRoomId(room.roomId, 1)
            const unreadMessages = await getMessagesByRoomId(room.roomId, 1000, { status: "unread" })
            const obj = {
                ...room,
                messages: {
                    latestMessage: latestMessage,
                    unreadMessages: [...unreadMessages]
                }
            }
            return obj
        }))
        console.log(roomsWithMessage)
        res.send(roomsWithMessage)  
    } catch (error) {
        console.log(error)
    }
}

const storeChatMessages = async (req, res) => {
    try {
        console.log(req)
        return await storeMessage(req)
    } catch (error) {
        console.log(error)
        return error
    }
}

const readChatMessages = async (req, res) => {
    const { roomId } = req.body
    const data = {
        status: "read"
    }
    const option = {
        roomId,
        status: "unread"
    }

    try {
        const updated = await updateChatMessages(data, option)
        res.send(updated)
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