const { textTemplate } = require('../js/helper/textTemplate')
const { linkRichMenu } = require('../js/linehelper/linkRichMenu')
const { pushMessage } = require('../js/linehelper/pushToLine')
const { unlinkRichMenu } = require('../js/linehelper/unlinkRichMenu')
const { actionToDriverFlex } = require('../lineComponents/actionToDriverFlex')
const { carouselWrapper } = require('../lineComponents/carouselWrapper')
const { currentJob } = require('../lineComponents/currentJob')
const { driverRegistration } = require('../lineComponents/driverRegistration')
const { finishJob } = require('../lineComponents/finishJob')
const { flexWrapper } = require('../lineComponents/flexWrapper')
const { jobHistory } = require('../lineComponents/jobHistory')
const { startedJob } = require('../lineComponents/startedJob')
const { getBookingByIdDB, updateBookingDB, getBookingWithPricesByIdDB, updatePriceDB } = require('../models/booking')
const { getSelectedRegisterByBookingIdDB } = require('../models/bookingdrivers')
const { getRoomsByBookingIdDB } = require('../models/chatting')
const fs = require('fs')
const async = require('async');
const db = require('../models/driver')
const { getBookingByStatusWithoutDriverIdDB } = require('../models/jobBoard')
const { confirmSelect } = require('../lineComponents/confirmSelect')
const { commentFlex } = require('../lineComponents/commentFlex')

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
    console.log(error)
  }
}

const getDriverById = async (req, res) => {
  try {
    const driver = await db.getDriverByIdDB(req.params.id)
    res.send(driver)
  } catch (error) {
    res.send(error)
    console.log(error)
  }
}

const getSelectedRegisterByBookingId = async (req, res) => {
  try {
    const register = await getSelectedRegisterByBookingIdDB(req.params.id)
    res.send(register)
  } catch (error) {
    res.send(error)
    console.log(error)
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
    console.log(error)
  }
}

const getDriverImage = async (req, res) => {
  try {
    
    const imagesName = await db.getDriverImageDB(req.params.id)
    const paths = imagesName.map((name) => {
      return __dirname + "/../imgs/uploads/" + name.imgName
    })

    async.map(paths, function(filePath, cb){ //reading files or dir
        fs.readFile(filePath, 'base64', cb);
    }, function(err, results) {
      res.send(results)
    });
  } catch (error) {
    console.log(error)
  }
}

const getCurrentJobWithLineFlex = async (driverId, bookingId) => {
  const booking = (await getBookingWithPricesByIdDB(bookingId))[0]
  const carType = JSON.parse((await db.getDriverByIdDB(booking.driverId))[0].vehicleInfo).carType
  booking.selectedCarType = carType

  let extraObj = []
  let extraPrice = 0

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
      "Course": booking.course
    },
    {
      "Tollway": booking.tollway
    },
    ...extraObj
  ]
  const totalPrice = parseInt(booking.course) + parseInt(booking.tollway) + extraPrice

  const flex = flexWrapper(currentJob(booking, prices, totalPrice))
  try {
    await pushMessage([flex], "driver", driverId)
  } catch (error) {
    console.log(error.response.data.details)
  }
}

const getJobHistory = async (driverId, bookingId) => {
  const booking = (await getBookingWithPricesByIdDB(bookingId))[0]
  const carType = JSON.parse((await db.getDriverByIdDB(booking.driverId))[0].vehicleInfo).carType
  booking.selectedCarType = carType

  let extraObj = []
  let extraPrice = 0

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
      "Course": booking.course
    },
    {
      "Tollway": booking.tollway
    },
    ...extraObj
  ]
  const totalPrice = parseInt(booking.course) + parseInt(booking.tollway) + extraPrice

  const flex = flexWrapper(jobHistory(booking, prices, totalPrice))
  try {
    await pushMessage([flex], "driver", driverId)
  } catch (error) {
    console.log(error)
  }
}

const actionToDriver = async (req, res) => {
  try {
    switch (req.body.action) {
      case "ban":
        await db.updateDriverDB(req.body.id, {driverStatus: "banned"})
        await pushMessage([flexWrapper(actionToDriverFlex("คุณถูกระงับบัญชี", req.body.message, "#cc2727"))], "driver", req.body.id)
        break;

      case "unban":
        await db.updateDriverDB(req.body.id, {driverStatus: "active"})
        await pushMessage([flexWrapper(actionToDriverFlex("คุณได้ถูกปลดล็อกบัญชี", "คุณสามารถเข้ารับงานในเมนู \"Job Board\" หรือกดปุ่มด้านล่างได้", "#1DB446", "jobBoard"))], "driver", req.body.id)
        break;

      case "accept":
        await db.updateDriverDB(req.body.id, {driverStatus: "active", driverCode: req.body.message})
        await pushMessage([flexWrapper(confirmSelect(req.body.message))], "driver", req.body.id)
        break;

      case "reject":
        await db.updateDriverDB(req.body.id, {driverStatus: "rejected"})
        await pushMessage([flexWrapper(actionToDriverFlex("คุณถูกปฏิเสธการสมัคร", req.body.message, "#cc2727", "register"))], "driver", req.body.id)
        break;
    
      default:
        break;
    }
    res.send("ok")
  } catch (error) {
    console.log(error)
  }
}

const transferJob = async (req, res) => {
  try {
    const driver = await db.getDriverByCodeDB(req.body.driverId)
    if (!driver.length) return res.send("Driver not found.")
    let data = {
      driverId: driver[0].driverId,
      updatedDate: new Date()
    }
    await updatePriceDB(req.body.bookingId, data)
    res.send("Successful")
  } catch (error) {
    console.log(error)
  }
}

const startJob = async (bookingId, driverId) => {
  try {
    const booking = (await getBookingWithPricesByIdDB(bookingId))[0]
    const carType = JSON.parse((await db.getDriverByIdDB(booking.driverId))[0].vehicleInfo).carType
    booking.selectedCarType = carType
    if (booking.bookingStatus !== "ongoing") {
      return await pushMessage([textTemplate("This job has already been canceled or finished")], "driver", driverId)
    }
    booking.bookingInfo = JSON.parse(booking.bookingInfo)
    await updateBookingDB(bookingId, {bookingStatus: "started"})
    await pushMessage([flexWrapper(startedJob(booking))], "driver", driverId)
  } catch (error) {
    console.log(error)
  }
}

const finishingJob = async (bookingId, driverId) => {
  try {
    const booking = (await getBookingByIdDB(bookingId))[0]
    if (booking.bookingStatus !== "started") {
      return await pushMessage([textTemplate("This job has already been canceled or finished")], "driver", driverId)
    }
    await db.finishingJobDB(bookingId)
    await pushMessage([flexWrapper(commentFlex())], "user", booking.userId) 
    await pushMessage([textTemplate("Thank you for giving out such great service! We are greatful to work with you.")], "driver", driverId)
    // res.send("ok")
  } catch (error) {
    console.log(error)
  }
}

const createDriver = async (req, res) => {
  const flexMessage = flexWrapper(driverRegistration(req.body))
  console.log(req.body)
  try {
    await db.createDriverDB(req.body)
    await pushMessage([textTemplate("โปรดส่งรูป")], 'driver', req.body.driverId)
    res.send("Create driver succesfully!")
  } catch (error) {
    console.log(error)
  }
}

const uploadImageName = async (req, res) => {
  try {
    const data1 = {
      driverId: req.query.driverId,
      imgName: req.files.file1[0].filename
    }
    const data2 = {
      driverId: req.query.driverId,
      imgName: req.files.file2[0].filename
    }
    const data3 = {
      driverId: req.query.driverId,
      imgName: req.files.file3[0].filename
    }
    await db.deleteImageDB(req.query.driverId)
    await db.uploadImageNameDB(data1)
    await db.uploadImageNameDB(data2)
    await db.uploadImageNameDB(data3)
    res.send("Create driver succesfully!")
  } catch (error) {
    console.log(error)
  }
}

const updateDriver = async (req, res) => {
    try {
      await db.updateDriverDB(req.body.driverId, req.body.data)
      res.send("ok")
    } catch (error) {
      console.log(error)
    }
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
    getDriverImage,
    startJob,
    getCurrentJobWithLineFlex,
    actionToDriver,
    transferJob,
    finishingJob,
    createDriver,
    uploadImageName,
    updateDriver,
    deleteDriver
}