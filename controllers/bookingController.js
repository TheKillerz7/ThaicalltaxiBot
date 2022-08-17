const db = require('../models/booking')
const ShortUniqueId = require('short-unique-id');

const getAllBooking = (req, res) => {
    
}

const getBookingWithStatus = async (req, res) => {
  try {
    const bookings = await db.getBookingWithStatus(req.params.status)
    console.log(bookings)
    res.send(bookings)
  } catch (error) {
    res.send(error)
  }
}

const getBookingById = (req, res) => {
    res.json({
      status: 200,
      message: "Get data has successfully",
    });
}

const createBooking = async (req, res) => {
  try {
    const uid = new ShortUniqueId({ length: 10 });
    const id = uid()
    req.body.bookingId = id
    await db.createBookingDB(req.body)
    console.log("Create booking successfully!")
    res.send("Create booking successfully!")
  } catch (error) {
    res.send(error)
  }
}

const updateBooking = (req, res) => {
    console.log(req)
}

const deleteBooking = (req, res) => {
    res.json({
      status: 200,
      message: "Get data has successfully",
    });
}

module.exports = {
    getAllBooking,
    getBookingWithStatus,
    getBookingById,
    createBooking,
    updateBooking,
    deleteBooking
}