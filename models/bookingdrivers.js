const knex = require("./knexdb")

const getRegisteredDrivers = (bookingId) => {
    return knex("bookingdrivers")
    .where("bookingId", bookingId)
    .select()
}

const selectedDriver = (selectedDriverId, bookingId) => {
    knex("bookingdrivers")
    .where("bookingId", bookingId)
    .whereNot("driverId", selectedDriverId)
    .update("status", "rejected")

    return knex("bookingdrivers")
    .where("driverId", selectedDriverId)
    .update("status", "selected")
}

module.exports = {
    getRegisteredDrivers,
    selectedDriver
}