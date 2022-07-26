const db = require('../models/driver')

const getAllDriver = async (req, res) => {
  try {
    res.send(await db.getAllDriverDB())
  } catch (error) {
    res.send(error)
  }
}

const getDriverById = async (req, res) => {
  try {
    res.send(await db.getAllDriverDB())
  } catch (error) {
    res.send(error)
  }
}

const createDriver = async (req, res) => {
  try {
    console.log(req.body)
    await db.createDriverDB(req.body)
    res.send("Create driver succesfully!")
  } catch (error) {
    res.send(error)
  }
}

const updateDriver = (req, res) => {
    res.json({
      status: 200,
      message: "Get data has successfully",
    });
}

const deleteDriver = (req, res) => {
    res.json({
      status: 200,
      message: "Get data has successfully",
    });
}

module.exports = {
    getAllDriver,
    getDriverById,
    createDriver,
    updateDriver,
    deleteDriver
}