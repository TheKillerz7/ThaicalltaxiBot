const { driverRegisterToBookingDB } = require('../models/booking')
const db = require('../models/booking')

const getAllBooking = (req, res) => {
    res.send(db.Booking())
}

const driverRegisterToBooking = async (req, res) => {
    console.log(req.body)
    const resolve = await driverRegisterToBookingDB(req.body)
    res.send(resolve)
}

module.exports = {
    getAllBooking,
    driverRegisterToBooking
}