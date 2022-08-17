const knex = require("./knexdb")

const getRegisteredDrivers = (bookingId) => {
    return knex("bookingdrivers")
    .where("bookingId", bookingId)
    .select()
}

module.exports = {
    getRegisteredDrivers
}