const knex = require("./knexdb")

const getAllUserDB = () => {
    res.send(db.User())
}

const getUserByIdDB = (id) => {
  return knex("users")
  .where("userId", id)
  .select()
}

const getCurrentBookingsDB = (userId) => {
  return knex("booking")
  .where("booking.bookingStatus", "ongoing")
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

const getRatingByBookingIdDB = (bookingId) => {
  return knex("comments")
  .where("booking", bookingId)
  .select()
}

const ratingDriverDB = (data) => {
  return knex("comments")
  .insert({
    ...data
  })
}

const createUserDB = (data) => {
  return knex("users")
  .insert({
    ...data
  })
}

const updateUserDB = (data, id) => {
  return knex("users")
  .where("userId", id)
  .update({
    ...data
  })
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
    getRatingByBookingIdDB,
    ratingDriverDB,
    getAllBookingsByUserIdDB,
    getAllBookingsByUserIdWithPriceDB,
    createUserDB,
    updateUserDB,
    deleteUserDB
}