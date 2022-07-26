const db = require('../models/booking')

const getAllUser = (req, res) => {
    res.send(db.Booking())
}

const getUserById = (req, res) => {
    res.json({
      status: 200,
      message: "Get data has successfully",
    });
}

const createUser = (req, res) => {
    res.json({
      status: 200,
      message: "Get data has successfully",
    });
}

const updateUser = (req, res) => {
    res.json({
      status: 200,
      message: "Get data has successfully",
    });
}

const deleteUser = (req, res) => {
    res.json({
      status: 200,
      message: "Get data has successfully",
    });
}

module.exports = {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}