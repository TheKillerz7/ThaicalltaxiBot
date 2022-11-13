const knex = require("./knexdb")

const getRegisteredDrivers = (bookingId) => {
    return knex("bookingdrivers")
    .where("bookingId", bookingId)
    .select()
}

const getRegisteredDriversWithDriverInfo = (bookingId, sort) => {
    return knex("bookingdrivers")
    .where({
        bookingId,
        "bookingdrivers.status": "selecting"
    })
    .join("drivers", "bookingdrivers.driverId", "drivers.driverId")
    .orderBy(sort || "createdDate")
    .select()
}

const getRegisteredDriversByBookingIdandDriverId = (bookingId, driverId) => {
    return knex("bookingdrivers")
    .where({
        bookingId,
        driverId
    })
    .select()
}

const getSelectedRegisterByBookingIdDB = (bookingId) => {
    return knex("bookingdrivers")
    .where("bookingId", bookingId)
    .select()
}

const getRegisteresByDriverId = (driverId, option) => {
    return knex("bookingdrivers")
    .where({
        driverId,
        ...option
    })
    .select()
}

const selectedDriver = async (selectedDriverId, bookingId) => {
    await knex("bookingdrivers")
    .where("bookingId", bookingId)
    .whereNot("driverId", selectedDriverId)
    .update("status", "rejected")

    await knex("bookingdrivers")
    .where("driverId", selectedDriverId)
    .update("status", "selected")
}

const updateBookingdriverByDriverId = (bookingId, driverIds, data) => {
    return knex("bookingdrivers")
    .where("bookingId", bookingId)
    .whereNotIn("driverId", [...driverIds])
    .update({...data})
}

const updateBookingdriverByBookingId = (bookingId, data) => {
    return knex("bookingdrivers")
    .where("bookingId", bookingId)
    .update({...data})
}

module.exports = {
    getRegisteredDrivers,
    getSelectedRegisterByBookingIdDB,
    getRegisteresByDriverId,
    getRegisteredDriversByBookingIdandDriverId,
    selectedDriver,
    getRegisteredDriversWithDriverInfo,
    updateBookingdriverByDriverId,
    updateBookingdriverByBookingId
}