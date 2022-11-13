const { textTemplate } = require('../js/helper/textTemplate')
const { linkRichMenu } = require('../js/linehelper/linkRichMenu')
const { pushMessage } = require('../js/linehelper/pushToLine')
const { unlinkRichMenu } = require('../js/linehelper/unlinkRichMenu')
const { carouselWrapper } = require('../lineComponents/carouselWrapper')
const { currentJob } = require('../lineComponents/currentJob')
const { driverRegistration } = require('../lineComponents/driverRegistration')
const { finishJob } = require('../lineComponents/finishJob')
const { flexWrapper } = require('../lineComponents/flexWrapper')
const { jobHistory } = require('../lineComponents/jobHistory')
const { startedJob } = require('../lineComponents/startedJob')
const { getBookingByIdDB, updateBookingDB } = require('../models/booking')
const { getSelectedRegisterByBookingIdDB } = require('../models/bookingdrivers')
const { getRoomsByBookingIdDB } = require('../models/chatting')
const db = require('../models/driver')
const { getBookingByStatusWithoutDriverIdDB } = require('../models/jobBoard')

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

const getSelectedRegisterByBookingId = async (req, res) => {
  try {
    const register = await getSelectedRegisterByBookingIdDB(req.params.id)
    res.send(register)
  } catch (error) {
    res.send(error)
  }
}

const getCurrentJobs = async (req, res) => {
  try {
    const driverId = req.params.id || req.driverId
    const currentJobs = await getBookingByStatusWithoutDriverIdDB("selected", driverId)
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

const getCurrentJobWithLineFlex = async (driverId) => {
  const bookings = await db.getCurrentJobsDB(driverId)
  const driver = (await db.getDriverByIdDB(driverId))[0]
  const bookingsWithRoomId = await Promise.all(bookings.map(async (booking, index) => {
    const roomId =  (await getRoomsByBookingIdDB(booking.bookingId))[0].roomId
    console.log(roomId)
    const bookingTemp = booking
    bookingTemp.roomId = roomId
    return bookingTemp
  }))
  let extraObj = []
  let extraPrice = 0
  console.log(bookings)
  const bookingFlex = bookingsWithRoomId.map((booking, index) => {
    booking.extra = JSON.parse(booking.extra)
    booking.message = JSON.parse(booking.message)
    booking.bookingInfo = JSON.parse(booking.bookingInfo)
    booking.extra.map((extra) => {
      if (extra.title) {
        const extraTemp = {}
        extraPrice += parseInt(extra.price)
        extraTemp[extra.title] = parseInt(extra.price)
        extraObj.push(extraTemp)
      }
    })
    const prices = [
      {
        "Course Price": booking.course
      },
      {
        "Tollway": booking.tollway
      },
      ...extraObj
    ]
    const totalPrice = parseInt(booking.course) + parseInt(booking.tollway) + extraPrice
    return currentJob(booking, prices, totalPrice, driver, JSON.parse(driver.vehicleInfo).carType)
  })
  const flex = flexWrapper(carouselWrapper(bookingFlex))
  try {
    if (bookings.length > 0) return await pushMessage([flex], "driver", driverId)
    await pushMessage([textTemplate("You currently don't have any job.")], "driver", driverId)
  } catch (error) {
    console.log(error)
  }
}

const getJobHistory = async (driverId) => {
  const bookings = await db.getAllJobByDriverIdDB(driverId)
  const driver = (await db.getDriverByIdDB(driverId))[0]
  let extraObj = []
  let extraPrice = 0

  const bookingFlex = bookings.map((booking, index) => {
    booking.extra = JSON.parse(booking.extra)
    booking.message = JSON.parse(booking.message)
    booking.bookingInfo = JSON.parse(booking.bookingInfo)
    booking.extra.map((extra) => {
      if (extra.title) {
        const extraTemp = {}
        extraPrice += parseInt(extra.price)
        extraTemp[extra.title] = parseInt(extra.price)
        extraObj.push(extraTemp)
      }
    })
    const prices = [
      {
        "Course Price": booking.course
      },
      {
        "Tollway": booking.tollway
      },
      ...extraObj
    ]
    const totalPrice = parseInt(booking.course) + parseInt(booking.tollway) + extraPrice
    return jobHistory(booking, prices, totalPrice, driver, JSON.parse(driver.vehicleInfo).carType)
  })
  const flex = flexWrapper(carouselWrapper(bookingFlex))
  try {
    if (bookings.length > 0) return await pushMessage([flex], "driver", driverId)
    await pushMessage([textTemplate("You don't have any job yet.")], "driver", driverId)
  } catch (error) {
    console.log(error)
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

const startJob = async (bookingId, driverId) => {
  try {
    const booking = (await getBookingByIdDB(bookingId))[0]
    if (booking.status !== "ongoing") {
      return await pushMessage([textTemplate("This job has already been canceled or finished")], "driver", driverId)
    }
    booking.bookingInfo = JSON.parse(booking.bookingInfo)
    await updateBookingDB(bookingId, {status: "started"})
    await pushMessage([flexWrapper(startedJob(booking))], "driver", driverId)
  } catch (error) {
    console.log(error)
  }
}

const finishingJob = async (bookingId, driverId) => {
  try {
    const booking = (await getBookingByIdDB(bookingId))[0]
    if (booking.status !== "started") {
      return await pushMessage([textTemplate("This job has already been canceled or finished")], "driver", driverId)
    }
    await db.finishingJobDB(bookingId)
    await pushMessage([textTemplate("Thank you for using our service! Have a great course!")], "user", booking.userId) 
    await pushMessage([textTemplate("Thank you for giving out such great service! We are greatful to work with you.")], "driver", driverId)
    // res.send("ok")
  } catch (error) {
    console.log(error)
  }
}

const createDriver = async (req, res) => {
  const flexMessage = flexWrapper(driverRegistration(req.body))

  try {
    await db.createDriverDB(req.body)
    await pushMessage([textTemplate("flexMessage")], 'driver', req.body.driverId)
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
    getSelectedRegisterByBookingId,
    getJobHistory,
    startJob,
    getCurrentJobWithLineFlex,
    actionToDriver,
    finishingJob,
    createDriver,
    updateDriver,
    deleteDriver
}