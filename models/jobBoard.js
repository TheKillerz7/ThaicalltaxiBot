const knex = require("./knexdb")

const getBookingByStatusWithoutDriverIdDB = (status, driverId) => {
  return knex("booking")
  .where("bookingStatus", status)
  .whereNotExists(
    knex('bookingdrivers')
      .whereRaw('bookingdrivers.bookingId = booking.bookingId')
      .where("bookingdrivers.driverId", driverId)
      .select()
  )
  .select()
}

module.exports = {
    getBookingByStatusWithoutDriverIdDB,
}