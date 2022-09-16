const { getRoomsByUserIdDB, getMessagesByRoomId, storeMessage, updateChatMessages } = require("../models/chatting")

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
        console.log(userType)
        const rooms = await getRoomsByUserIdDB(userId, userType)
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
        await storeMessage(req)
    } catch (error) {
        console.log(error)
    }
}

const readChatMessages = async (req, res) => {
    const { roomId, userId } = req.body
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
            senderId: userId
        }
    }

    try {
        const updated = await updateChatMessages(data, option)
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