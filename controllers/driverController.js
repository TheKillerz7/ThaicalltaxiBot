const { textTemplate } = require('../js/helper/textTemplate')
const { linkRichMenu } = require('../js/linehelper/linkRichMenu')
const { pushMessage } = require('../js/linehelper/pushToLine')
const { driverRegistration } = require('../lineComponents/driverRegistration')
const { flexWrapper } = require('../lineComponents/flexWrapper')
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
    const driver = await db.getDriverByIdDB(req.params.id)
    console.log(driver)
    res.send(driver)
  } catch (error) {
    res.send(error)
  }
}

const createDriver = async (req, res) => {
  const flexMessage = flexWrapper(driverRegistration(req.body))

  try {
    console.log(req.body)
    await db.createDriverDB(req.body)
    await linkRichMenu("driver", "afterRegistered", req.body.driverId)
    await pushMessage([flexMessage], 'driver', req.body.driverId)
    console.log('successful')
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