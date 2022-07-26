const knex = require("./knexdb")

const getAllBookingDB = () => {
    res.send(db.Booking())
}

const getBookingByIdDB = (id) => {
    res.json({
      status: 200,
      message: "Get data has successfully",
    });
}

const createBookingDB = () => {
    res.json({
      status: 200,
      message: "Get data has successfully",
    });
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