const knex = require("./knexdb")

const getRoomsByUserIdDB = async (userId, userType) => {
    console.log(userId)
    const userIdWithType = userType === "driver" ? { driverId: userId } : { userId: userId }
    // if (userType === "driver") {
    //     return knex("chatrooms")
    //     .where("status", "open")
    //     .whereExists(
    //         knex("bookingdrivers")
    //         .whereRaw('chatrooms.driverId = bookingdrivers.driverId')
    //         .where({
    //             driverId: userId,
    //             "status": "selected"
    //         })
    //         .select()
    //     )
    //     .select()
    // }
    return knex("chatrooms")
    .where({
        ...userIdWithType,
        status: "open"
    })
    .select()
}

const getMessagesByRoomId = (roomId, limit, options) => {
    return knex("chatmessages")
    .where({
        roomId,
        ...options
    })
    .limit(limit || 20)
    .select()
}

const storeMessage = (data) => {
    return knex("chatmessages")
    .insert({
        ...data
      })
}

const updateChatMessages = (data, option) => {
    return knex("chatmessages")
    .where({
        ...option
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
    getRoomsByUserIdDB,
    getMessagesByRoomId,
    createChatRoom,
    storeMessage,
    updateChatMessages
}