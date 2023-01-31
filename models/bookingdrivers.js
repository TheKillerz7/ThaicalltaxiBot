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
    })
    .whereIn("bookingdrivers.offerStatus", ["selecting", "selected"])
    .join("drivers", "bookingdrivers.driverId", "drivers.driverId")
    .orderBy(sort || "bookingdrivers.createdDate")
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
    .where({
        bookingId: bookingId,
        offerStatus: "selected"
    })
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
    .update("offerStatus", "rejected")

    await knex("bookingdrivers")
    .where("driverId", selectedDriverId)
    .update("offerStatus", "selected")
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