const knex = require("./knexdb")

const getAllBookingDB = () => {
  return knex("booking").select()
}

const getBookingByStatus = (status) => {
  return knex("booking")
  .where("status", status)
  .select()
}

const getBookingByIdDB = (id) => {
  return knex("booking")
  .where("bookingId", id)
  .select()
}

const getBookingsByDriverId = (id, status) => {
  return knex("booking")
  .where("status", status)
  .whereNotExists(
    knex('bookingdrivers')
      .whereRaw('bookingdrivers.bookingId = booking.bookingId')
      .where("bookingdrivers.driverId", driverId)
      .select()
  )
  .select()
}


const createBookingDB = (data) => {
  return knex("booking")
  .insert({
    ...data
  })
}

const driverRegisterToBookingDB = (data) => {
  return knex("bookingdrivers")
  .insert({
    ...data
  })
}

const updateBookingDB = (id, data) => {
    return knex("booking")
    .where("bookingId", id)
    .update({...data})
}

const deleteBookingDB = (id) => {
    res.json({
      status: 200,
      message: "Get data has successfully",
    });
}

module.exports = {
    getAllBookingDB,
    getBookingByStatus,
    getBookingByIdDB,
    createBookingDB,
    driverRegisterToBookingDB,
    updateBookingDB,
    deleteBookingDB
}