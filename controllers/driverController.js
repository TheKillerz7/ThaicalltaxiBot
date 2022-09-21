const { textTemplate } = require('../js/helper/textTemplate')
const { linkRichMenu } = require('../js/linehelper/linkRichMenu')
const { pushMessage } = require('../js/linehelper/pushToLine')
const { unlinkRichMenu } = require('../js/linehelper/unlinkRichMenu')
const { carouselWrapper } = require('../lineComponents/carouselWrapper')
const { driverRegistration } = require('../lineComponents/driverRegistration')
const { finishJob } = require('../lineComponents/finishJob')
const { flexWrapper } = require('../lineComponents/flexWrapper')
const { getBookingByIdDB } = require('../models/booking')
const { getRegisteresByDriverId, getSelectedRegisterByBookingId } = require('../models/bookingdrivers')
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

const getCurrentJobs = async (req, res) => {
  try {
    const currentJobs = await getRegisteresByDriverId(req.driverId, {status: "selected"})
    const flexBookings = await Promise.all(currentJobs.map(async (job, index) => {
      const booking = await getBookingByIdDB(job.bookingId)
      return finishJob(booking[0])
    }))
    await pushMessage([flexWrapper(carouselWrapper([...flexBookings]))], "driver", req.driverId)
  } catch (error) {
    console.log(error.response.data.details)
  }
}

const finishingJob = async (req, res) => {
  try {
    const booking = await getBookingByIdDB(req.bookingId)
    const bookingDriver = await getSelectedRegisterByBookingId(req.bookingId)
    await db.finishingJobDB(req.bookingId)
    await pushMessage([textTemplate("Thank you for using our service! Have a great trip!")], "user", booking[0].userId)
    await unlinkRichMenu('user', "afterBooked", booking[0].userId)
    await pushMessage([textTemplate("Thank you for giving out such great service! We are greatful to work with you.")], "driver", bookingDriver[0].driverId)
    // res.send("ok")
  } catch (error) {
    // res.send(error)
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
    getCurrentJobs,
    finishingJob,
    createDriver,
    updateDriver,
    deleteDriver
}