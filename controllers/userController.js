const { default: ShortUniqueId } = require('short-unique-id');
const { textTemplate } = require('../js/helper/textTemplate');
const { pushMessage } = require('../js/linehelper/pushToLine');
const { bookingHistory } = require('../lineComponents/bookingHistory');
const { carouselWrapper } = require('../lineComponents/carouselWrapper');
const { confirmInfo } = require('../lineComponents/confirmInfo');
const { currentBooking } = require('../lineComponents/currentBooking');
const { flexWrapper } = require('../lineComponents/flexWrapper');
const { meetingServiceFlex } = require('../lineComponents/meetingServiceFlex');
const { getBookingByIdDB, updateBookingDB, getBookingWithPricesByIdDB, getBookingByStatusAndUserId } = require('../models/booking');
const { selectedDriver, getRegisteredDriversByBookingIdandDriverId, updateBookingdriverByBookingId, getSelectedRegisterByBookingIdDB } = require('../models/bookingdrivers');
const { createChatRoom, getRoomsByBookingIdDB } = require('../models/chatting');
const { getDriverByIdDB, updateDriverDB } = require('../models/driver');
const db = require('../models/user')

const getAllUser = (req, res) => {
    res.send(db.Booking())
}

const getUserById = async (req, res) => {
  try {
    console.log('dsa')
    const userId = req.params.id 
    const userInfo = await db.getUserByIdDB(userId)
    res.send(userInfo)
  } catch (error) {
    console.log(error)
  }
}

const getCurrentBookingsByUserId = async (req, res) => {
  try {
    const bookings = await getBookingByStatusAndUserId("ongoing", req.params.id)
    res.send(bookings)
  } catch (error) {
    console.log(error)
  }
}

const getAllBookingsByUserId = async (req, res) => {
  try {
    const bookings = await getBookingByStatusAndUserId(["canceled", "finished"], req.params.id)
    res.send(bookings)
  } catch (error) {
    console.log(error)
  }
}


const getCurrentBooking = async (userId, bookingId) => {
  const booking = (await getBookingWithPricesByIdDB(bookingId))[0]
  const carType = JSON.parse((await getDriverByIdDB(booking.driverId))[0].vehicleInfo).carType
  const roomId = (await getRoomsByBookingIdDB(booking.bookingId))[0].roomId
  booking.selectedCarType = carType
  booking.roomId = roomId

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

  const flex = flexWrapper(currentBooking(booking, prices, totalPrice))
  try {
    await pushMessage([flex], "user", userId)
  } catch (error) {
    console.log(error)
  }
}

const getBookingHistory = async (userId, bookingId) => {
  const booking = (await getBookingWithPricesByIdDB(bookingId))[0]
  console.log(booking)
  const carType = JSON.parse((await getDriverByIdDB(booking.driverId))[0].vehicleInfo).carType
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

  const flex = flexWrapper(bookingHistory(booking, prices, totalPrice))
  try {
    await pushMessage([flex], "user", userId)
  } catch (error) {
    console.log(error)
  }
}

const selectDriver = async (bookingId, driverId, userId) => {
  try {
    console.log(userId)
    console.log(driverId)
    console.log(bookingId)
    const selectedRegister = (await getRegisteredDriversByBookingIdandDriverId(bookingId, driverId))[0]
    const driver = (await getDriverByIdDB(driverId))[0]
    const booking = (await getBookingByIdDB(bookingId))[0]
    let extraObj = []
    let extraPrice = 0

    booking.bookingInfo = JSON.parse(booking.bookingInfo)
    selectedRegister.extra = JSON.parse(selectedRegister.extra)
    selectedRegister.message = JSON.parse(selectedRegister.message)
    selectedRegister.extra.map((extra) => {
      if (extra.title) {
        const extraTemp = {}
        extraPrice += parseInt(extra.price)
        extraTemp[extra.title] = parseInt(extra.price)
        extraObj.push(extraTemp)
      }
    })
    const prices = [
      {
        "Course Price": selectedRegister.course
      },
      {
        "Tollway": selectedRegister.tollway
      },
      ...extraObj
    ]
    const totalPrice = parseInt(selectedRegister.course) + parseInt(selectedRegister.tollway) + extraPrice
    const flex = flexWrapper(confirmInfo(booking, prices, totalPrice, selectedRegister, JSON.parse(driver.vehicleInfo).carType))
    const bookingStatus = (await getBookingByIdDB(bookingId))[0].bookingStatus
    if (bookingStatus !== 'selecting') {
      return
    }
    await selectedDriver(driverId, bookingId)
    await updateBookingDB(bookingId, {bookingStatus: "selected"})
    await pushMessage([flex], 'user', userId)
  } catch (error) {
    console.log(error)
  }
}

const meetingService = async (bookingId, driverId, value, userId) => {
  const selectedRegister = (await getRegisteredDriversByBookingIdandDriverId(bookingId, driverId))[0]
  const driver = (await getDriverByIdDB(driverId))[0]
  const booking = (await getBookingByIdDB(bookingId))[0]
  let extraObj = []
  let extraPrice = 0

  booking.bookingInfo = JSON.parse(booking.bookingInfo)
  selectedRegister.extra = JSON.parse(selectedRegister.extra)
  selectedRegister.message = JSON.parse(selectedRegister.message)
  selectedRegister.extra.map((extra) => {
    if (extra.title) {
      const extraTemp = {}
      extraPrice += parseInt(extra.price)
      extraTemp[extra.title] = parseInt(extra.price)
      extraObj.push(extraTemp)
    }
  })
  if (value === "yes") {
    const extraTemp = {}
    extraPrice += 100
    extraTemp["Meeting"] = 100
    extraObj.push(extraTemp)
  }
  const prices = [
    {
      "Course Price": selectedRegister.course
    },
    {
      "Tollway": selectedRegister.tollway
    },
    ...extraObj
  ]
  const totalPrice = parseInt(selectedRegister.course) + parseInt(selectedRegister.tollway) + extraPrice
  const flex = flexWrapper(confirmInfo(booking, prices, totalPrice, selectedRegister, JSON.parse(driver.vehicleInfo).carType))

  try {
    const bookingStatus = (await getBookingByIdDB(bookingId))[0].bookingStatus
    if (bookingStatus !== 'selecting') {
      return
    }
    await selectedDriver(driverId, bookingId)
    await updateBookingDB(bookingId, {bookingStatus: "selected", meetingService: value})
    await pushMessage([flex], 'user', userId)
    console.log("success")
  } catch (error) {
    console.log(error.response.data.details)
  }
}

const ratingDriver = async (req, res) => {
  try {
    const driver = (await getDriverByIdDB(req.body.driverId))[0]
    if (!driver) return res.send("Driver or Booking not found.")
    let score = 0
    switch (req.body.starRate) {
      case 5:
        score = 3
        break;

      case 4:
        score = 1
        break;

      case 3:
        score = 0
        break;

      case 2:
        score = -3
        break;

      case 1:
        score = -5
        break;
    
      default:
        break;
    }
    await updateDriverDB(driver.driverId, { driverRating: parseInt(driver.driverRating) + score })
    await db.ratingDriverDB(req.body)
    res.send("Succesful!")
  } catch (error) {
    console.log(error)
  }
}

const createUser = async (req, res) => {
  let data = {
    userId: req.body.events[0].source.userId
  }
  try {
    await db.createUserDB(data)
    res.send("Create user succesfully!")
  } catch (error) {
    res.send(error)
  }
}

const updateUser = async (req, res) => {
    try {
      console.log(req.body)
      const userId = req.params.id
      const data = {...req.body.data}
      await db.updateUserDB(data, userId)
      res.send("ok")
    } catch (error) {
      console.log(error)
    }
}

const deleteUser = async (req, res) => {
  try {
    await db.deleteUserDB(req.body.events[0].source.userId)
    console.log("Delete user succesfully!")
    res.send("Create user succesfully!")
  } catch (error) {
    res.send(error)
  }
}

module.exports = {
    getAllUser,
    getAllBookingsByUserId,
    getCurrentBookingsByUserId,
    selectDriver,
    getUserById,
    getCurrentBooking,
    getBookingHistory,
    ratingDriver,
    createUser,
    meetingService,
    updateUser,
    deleteUser
}