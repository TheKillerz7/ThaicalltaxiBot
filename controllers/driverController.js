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
const { getBookingByIdDB, updateBookingDB, getBookingWithPricesByIdDB, updatePriceDB, transferJobDB } = require('../models/booking')
const { getSelectedRegisterByBookingIdDB } = require('../models/bookingdrivers')
const { getRoomsByBookingIdDB } = require('../models/chatting')
const fs = require('fs')
const async = require('async');
const db = require('../models/driver')
const { getBookingByStatusWithoutDriverIdDB } = require('../models/jobBoard')
const { confirmSelect } = require('../lineComponents/confirmSelect')
const { commentFlex } = require('../lineComponents/commentFlex')
const { bookingAction } = require('../lineComponents/bookingAction')

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
    const currentJobs = await getBookingByStatusWithoutDriverIdDB("ongoing", driverId)
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
  booking.message = JSON.parse(booking.message)
  booking.bookingInfo = JSON.parse(booking.bookingInfo)
  const prices = [
    {
      "Course": booking.course
    }
  ]
  const totalPrice = parseInt(booking.course)

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

      case "changeId":
        await db.updateDriverDB(req.body.id, {driverStatus: "active", driverCode: req.body.message})
        await pushMessage([textTemplate("รหัสคนขับรถของคุณถูกเปลี่ยนเป็น: " + req.body.message)], "driver", req.body.id)
        break;

      case "setTL":
        const driver = (await db.getDriverByIdDB(req.body.id))[0]
        driver.vehicleInfo = JSON.parse(driver.vehicleInfo)
        driver.vehicleInfo.carType = "Team Leader"
        await db.updateDriverDB(req.body.id, {vehicleInfo: JSON.stringify(driver.vehicleInfo)})
        await pushMessage([textTemplate("คุณถูกเลื่อนขั้นให้เป็นหัวหน้า")], "driver", req.body.id)
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
    const driver = await db.getDriverByCodeDB(req.body.driverCode)
    if (!driver.length) return res.send("Driver not found.")
    const booking = (await getBookingByIdDB(req.body.bookingId))[0]
    booking.bookingInfo = JSON.parse(booking.bookingInfo)
    let data = {
      driverId: driver[0].driverId,
      newMessage: req.body.newMessage,
      updatedDate: new Date()
    }
    await transferJobDB(req.body.bookingId, req.body.driverId, data)
    await pushMessage([flexWrapper(bookingAction(booking, "select", "งานนี้ถูกโอนมาให้คุณ", "green"))], 'driver', driver[0].driverId)
    res.send("Successful")
  } catch (error) {
    console.log(error)
  }
}

const startJob = async (req, res) => {
  try {
    const booking = (await getBookingByIdDB(req.body.bookingId))[0]
    const carType = JSON.parse((await db.getDriverByIdDB(req.body.userId))[0].vehicleInfo).carType
    booking.selectedCarType = carType
    booking.bookingInfo = JSON.parse(booking.bookingInfo)
    await updateBookingDB(req.body.bookingId, {bookingStatus: "started"})
    await pushMessage([flexWrapper(startedJob(booking))], "driver", req.body.userId)
    res.send('ok')
  } catch (error) {
    console.log(error.response.data.details)
  }
}

const finishingJob = async (req, res) => {
  try {
    const booking = (await getBookingByIdDB(req.body.bookingId))[0]
    const driver = (await db.getDriverByIdDB(req.body.driverId))[0]
    const addedJobDone = parseInt(driver.jobDone) + 1
    const addedCoin = parseInt(driver.coin) + 50
    await db.updateDriverDB(req.body.driverId, { jobDone: addedJobDone, coin: addedCoin })
    await db.finishingJobDB(req.body.bookingId)
    await pushMessage([flexWrapper(commentFlex(req.body.driverId, req.body.bookingId))], "user", booking.userId) 
    await pushMessage([textTemplate("ภารกิจของคุณสิ้นสุดลงแล้ว")], "driver", req.body.driverId)
    res.send("ok")
  } catch (error) {
    console.log(error)
    res.send("not ok")
  }
}

const createDriver = async (req, res) => {
  const flexMessage = flexWrapper(driverRegistration(req.body))
  console.log(req.body)
  try {
    const driver = await db.getDriverByIdDB(req.body.driverId)
    if (!driver.length) {
      await db.createDriverDB(req.body)
      await pushMessage([textTemplate("ขั้นตอนต่อไป: โปรดส่งรูปดังกล่าวทีละรูปและตามลำดับ\n\n1. รูปใบขับขี่(ต้องชัดเจน)\n2. รูปสำเนาใบทะเบียนรถ(ต้องชัดเจน)\n3. รูปใบหน้าคุณ(เห็นใบหน้าชัดเจน)\n4. รูปรถของคุณ(ต้องเห็นป้ายทะเบียนชัดเจน)")], 'driver', req.body.driverId)
    } else {
      await db.updateDriverDB(req.body.driverId, { personalInfo: JSON.stringify(req.body.personalInfo), vehicleInfo: JSON.stringify(req.body.vehicleInfo) })
      await pushMessage([textTemplate("ขั้นตอนต่อไป: โปรดส่งรูปดังกล่าวทีละรูปและตามลำดับ\n\n1. รูปใบขับขี่(ต้องชัดเจน)\n2. รูปสำเนาใบทะเบียนรถ(ต้องชัดเจน)\n3. รูปใบหน้าคุณ(เห็นใบหน้าชัดเจน)\n4. รูปรถของคุณ(ต้องเห็นป้ายทะเบียนชัดเจน)")], 'driver', req.body.driverId)
    }
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