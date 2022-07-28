const db = require('../models/booking')

const getAllBooking = (req, res) => {
    res.send(db.Booking())
}

const getBookingById = (req, res) => {
    res.json({
      status: 200,
      message: "Get data has successfully",
    });
}

const createBooking = (req, res) => {
  try {
    await db.createBookingDB(data)
    console.log("Create booking successfully!")
    res.send("Create user succesfully!")
  } catch (error) {
    res.send(error)
  }
}

const updateBooking = (req, res) => {
    res.json({
      status: 200,
      message: "Get data has successfully",
    });
}

const deleteBooking = (req, res) => {
    res.json({
      status: 200,
      message: "Get data has successfully",
    });
}

module.exports = {
    getAllBooking,
    getBookingById,
    createBooking,
    updateBooking,
    deleteBooking
}