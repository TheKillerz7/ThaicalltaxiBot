const knex = require("./knexdb")

const getRoomByRoomIdDB = async (roomId) => {
    return knex("chatrooms")
    .where({
        roomId
    })
    .select()
}

const getRoomsByUserIdDB = async (userId, userType) => {

    const userIdWithType = userType === "driver" ? { driverId: userId } : { userId: userId }
    return knex("chatrooms")
    .where({
        ...userIdWithType,
        status: "open"
    })
    .orderBy("updatedDate", "desc")
    .select()
}

const getMessagesByRoomId = (roomId, limit, options) => {
    return knex("chatmessages")
    .where({
        roomId,
        ...options
    })
    .orderBy('id', 'desc')
    .limit(limit || 20)
    .select()
}

const storeMessage = async (data, date) => {
    await knex("chatrooms")
    .where("roomId", data.roomId)
    .update("updatedDate", new Date())

    return knex("chatmessages")
    .insert({
        ...data
      })
}

const updateChatMessages = (data, option) => {
    return knex("chatmessages")
    .where({
        ...option?.where
    })
    .whereNot({
        ...option?.whereNot
    })
    .update({
        ...data
      })
}

const createChatRoom = (data) => {
    return knex("chatrooms")
    .insert({
        ...data
      })
}

module.exports = {
    getRoomByRoomIdDB,
    getRoomsByUserIdDB,
    getMessagesByRoomId,
    createChatRoom,
    storeMessage,
    updateChatMessages
}