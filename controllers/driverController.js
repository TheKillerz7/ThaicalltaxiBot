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
    const drivers = await db.getAllDriverDB(req.query.option || null, JSON.parse(req.query.value || null))
    const parsedDrivers = drivers.map((driver, index) => {
      if (driver) {
        driver.personalInfo = JSON.parse(driver.personalInfo)
        driver.vehicleInfo = JSON.parse(driver.vehicleInfo)
      }
      return driver
    })
    res.send(parsedDrivers)
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
    const driverId = req.params.id || req.driverId
    const currentJobs = await getRegisteresByDriverId(driverId, {status: "selected"})
    if (res) {
      return res.send(currentJobs)
    }
    const flexBookings = await Promise.all(currentJobs.map(async (job, index) => {
      const booking = await getBookingByIdDB(job.bookingId)
      return finishJob(booking[0])
    }))
    await pushMessage([flexWrapper(carouselWrapper([...flexBookings]))], "driver", req.driverId)
  } catch (error) {
    console.log(error.response.data.details)
  }
}

const actionToDriver = async (req, res) => {
  try {
    switch (req.body.action) {
      case "ban":
        await db.updateDriverDB(req.body.id, {status: "banned"})
        await pushMessage([textTemplate(`Your account has been banned. You won't be able to register to any job until you're unban.\n\nMessage: ${req.body.message}`)], "driver", req.body.id)
        break;

      case "unban":
        await db.updateDriverDB(req.body.id, {status: "active"})
        await pushMessage([textTemplate(`Your account has been unbanned. You can now use our "Job Board" menu.\n\nMessage: ${req.body.message}`)], "driver", req.body.id)
        break;

      case "accept":
        await db.updateDriverDB(req.body.id, {status: "active"})
        await pushMessage([textTemplate(`Your registration has been accepted. Welcome to our community, you can now find jobs in "Job Board" menu.`)], "driver", req.body.id)
        break;

      case "reject":
        await db.updateDriverDB(req.body.id, {status: "rejected"})
        await pushMessage([textTemplate(`Your registration has been rejected. Please send recheck your information and send again.\n\nMessage: ${req.body.message}`)], "driver", req.body.id)
        break;
    
      default:
        break;
    }
    res.send("ok")
  } catch (error) {
    console.log(error)
  }
}

const finishingJob = async (req, res) => {
  try {
    const booking = await getBookingByIdDB(req.bookingId)
    const bookingDriver = await getSelectedRegisterByBookingId(req.bookingId)
    await db.finishingJobDB(req.bookingId)
    await pushMessage([textTemplate("Thank you for using our service! Have a great trip!")], "user", booking[0].userId) 
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
    // await linkRichMenu("driver", "afterRegistered", req.body.driverId)
    console.log(req.body.driverId)
    await pushMessage([textTemplate("flexMessage")], 'driver', req.body.driverId)
    console.log('successful')
    res.send("Create driver succesfully!")
  } catch (error) {
    console.log(error)
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
    actionToDriver,
    finishingJob,
    createDriver,
    updateDriver,
    deleteDriver
}