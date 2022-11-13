const knex = require("./knexdb")

const getAllUserDB = () => {
    res.send(db.User())
}

const getUserByIdDB = () => {
    res.json({
      status: 200,
      message: "Get data has successfully",
    });
}

const getCurrentBookingsDB = (userId) => {
  return knex("booking")
  .where("booking.status", "ongoing")
  .where("booking.userId", userId)
  .join("bookingdrivers", "bookingdrivers.bookingId", "booking.bookingId")
  .orderBy("booking.createdDate")
  .select()
}

const getAllBookingsByUserIdDB = (userId) => {
  return knex("booking")
  .where("userId", userId)
  .select()
}

const getAllBookingsByUserIdWithPriceDB = (userId) => {
  return knex("booking")
  // .whereNot("booking.status", "canceled")
  .where("booking.userId", userId)
  .join("bookingdrivers", "bookingdrivers.bookingId", "booking.bookingId")
  .orderBy("booking.createdDate")
  .select()
}

const createUserDB = (data) => {
  return knex("users")
  .insert({
    ...data
  })
}

const updateUserDB = () => {
    res.json({
      status: 200,
      message: "Get data has successfully",
    });
}

const deleteUserDB = (id) => {
  return knex("users")
  .where("userId", id)
  .del()
}

module.exports = {
    getAllUserDB,
    getUserByIdDB,
    getCurrentBookingsDB,
    getAllBookingsByUserIdDB,
    getAllBookingsByUserIdWithPriceDB,
    createUserDB,
    updateUserDB,
    deleteUserDB
}