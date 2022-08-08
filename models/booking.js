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

const createBookingDB = () => {
  return knex("booking")
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
    updateBookingDB,
    deleteBookingDB
}