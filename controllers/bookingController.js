const db = require('../models/booking')
const ShortUniqueId = require('short-unique-id');
const { pushMessage } = require('../js/linehelper/pushToLine');

const getAllBooking = (req, res) => {
    
}

const getBookingByStatus = async (req, res) => {
  try {
    const bookings = await db.getBookingByStatus(req.params.status)
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
  let messageToUser = [
    {
      type: "text",
      text: "Please wait 3 minutes and we'll send you drivers"
    }
  ]

  try {
    const uid = new ShortUniqueId({ length: 10 });
    const id = uid()
    req.body.bookingId = id
    await db.createBookingDB(req.body)
    console.log(messageToUser)
    await pushMessage(messageToUser, "user", req.body.userId)
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
    getBookingByStatus,
    getBookingById,
    createBooking,
    updateBooking,
    deleteBooking
}