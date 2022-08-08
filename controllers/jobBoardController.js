const db = require('../models/jobBoard')

const getAllBooking = (req, res) => {
    res.send(db.Booking())
}

module.exports = {
    getAllBooking,
    getBookingById,
    createBooking,
    updateBooking,
    deleteBooking
}