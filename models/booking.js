const knex = require("./knexdb")

const getAllBookingDB = () => {
  return knex("booking").select()
}

const getBookingByIdDB = (id) => {
    res.json({
      status: 200,
      message: "Get data has successfully",
    });
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

const updateBookingDB = (id) => {
    res.json({
      status: 200,
      message: "Get data has successfully",
    });
}

const deleteBookingDB = (id) => {
    res.json({
      status: 200,
      message: "Get data has successfully",
    });
}

module.exports = {
    getAllBookingDB,
    getBookingByIdDB,
    createBookingDB,
    driverRegisterToBookingDB,
    updateBookingDB,
    deleteBookingDB
}