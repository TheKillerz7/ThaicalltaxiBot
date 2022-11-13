const { default: ShortUniqueId } = require('short-unique-id');
const { textTemplate } = require('../js/helper/textTemplate');
const { pushMessage } = require('../js/linehelper/pushToLine');
const { bookingHistory } = require('../lineComponents/bookingHistory');
const { carouselWrapper } = require('../lineComponents/carouselWrapper');
const { confirmInfo } = require('../lineComponents/confirmInfo');
const { currentBooking } = require('../lineComponents/currentBooking');
const { flexWrapper } = require('../lineComponents/flexWrapper');
const { getBookingByIdDB, updateBookingDB } = require('../models/booking');
const { selectedDriver, getRegisteredDriversByBookingIdandDriverId } = require('../models/bookingdrivers');
const { createChatRoom, getRoomsByBookingIdDB } = require('../models/chatting');
const { getDriverByIdDB } = require('../models/driver');
const db = require('../models/user')

const getAllUser = (req, res) => {
    res.send(db.Booking())
}

const getUserById = (req, res) => {
    res.json({
      status: 200,
      message: "Get data has successfully",
    });
}

const getCurrentBooking = async (userId) => {
  const bookings = await db.getCurrentBookingsDB(userId)
  const bookingsWithCarTypeAndRoomId = await Promise.all(bookings.map(async (booking, index) => {
    const driver = JSON.parse((await getDriverByIdDB(booking.driverId))[0].vehicleInfo).carType
    const roomId =  (await getRoomsByBookingIdDB(booking.bookingId))[0].roomId
    const bookingTemp = booking
    bookingTemp.selectedCarType = driver
    bookingTemp.roomId = roomId
    return bookingTemp
  }))
  let extraObj = []
  let extraPrice = 0

  const bookingFlex = bookingsWithCarTypeAndRoomId.map((booking, index) => {
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
    return currentBooking(booking, prices, totalPrice)
  })
  const flex = flexWrapper(carouselWrapper(bookingFlex))
  try {
    if (bookings.length > 0) return await pushMessage([flex], "user", userId)
    await pushMessage([textTemplate("You currently don't have any booking.")], "user", userId)
  } catch (error) {
    console.log(error.response.data.details)
  }
}

const getBookingHistory = async (userId) => {
  const bookings = await db.getAlltBookingsByUserIdDB(userId)
  const bookingsWithCarType = await Promise.all(bookings.map(async (booking, index) => {
    const driver = JSON.parse((await getDriverByIdDB(booking.driverId))[0].vehicleInfo).carType
    const bookingTemp = booking
    bookingTemp.selectedCarType = driver
    return bookingTemp
  }))
  let extraObj = []
  let extraPrice = 0

  const bookingFlex = bookingsWithCarType.map((booking, index) => {
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
    return bookingHistory(booking, prices, totalPrice)
  })
  const flex = flexWrapper(carouselWrapper(bookingFlex))
  try {
    if (bookings.length > 0) return await pushMessage([flex], "user", userId)
    await pushMessage([textTemplate("You don't have any booking yet.")], "user", userId)
  } catch (error) {
    console.log(error)
  }
}

const selectDriver = async (bookingId, driverId, userId) => {
  const uid = new ShortUniqueId({ length: 10 });

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

  try {
    const bookingStatus = (await getBookingByIdDB(bookingId))[0].status
    if (bookingStatus !== 'selecting') {
      await pushMessage([textTemplate("You've already selected driver")], 'user', userId)
      return
    }
    await selectedDriver(driverId, bookingId)
    await updateBookingDB(bookingId, {status: "selected"})
    await pushMessage([flex], 'user', userId)
    const roomData = {
      roomId: uid(),
      bookingId,
      userId,
      driverId
    }
    await createChatRoom(roomData)
    console.log("success")
  } catch (error) {
    console.log(error.response.data.details)
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

const updateUser = (req, res) => {
    res.json({
      status: 200,
      message: "Get data has successfully",
    });
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
    selectDriver,
    getUserById,
    getCurrentBooking,
    getBookingHistory,
    createUser,
    updateUser,
    deleteUser
}