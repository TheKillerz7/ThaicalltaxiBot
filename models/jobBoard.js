const knex = require("./knexdb")

const getBookingByStatusWithoutDriverIdDB = (status, driverId) => {
  return knex("booking")
  .join("bookingdrivers", "booking.bookingId", "=", "bookingdrivers.bookingId")
  .where("booking.status", status)
  .whereNot("bookingdrivers.driverId", driverId)
  .select()
}

module.exports = {
    getBookingByStatusWithoutDriverIdDB,
}