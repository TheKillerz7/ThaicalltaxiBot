const ShortUniqueId = require('short-unique-id');
const { pushMessage } = require('../js/linehelper/pushToLine');
const { flexWrapper } = require('../lineComponents/flexWrapper');
const { driverRegisteredCard } = require('../lineComponents/driverRegisteredCard');
const { getRegisteredDriversWithDriverInfo, updateBookingdriverByDriverId, getSelectedRegisterByBookingIdDB, updateBookingdriverByBookingId, getRegisteredDrivers } = require('../models/bookingdrivers');
const { createBookingDB, updateBookingDB, getBookingByIdDB, updatePriceDB, getAllBookingDB } = require('../models/booking');
const { userBooking } = require('../lineComponents/userBooking');
const { textTemplate } = require('../js/helper/textTemplate');
const { carouselWrapper } = require('../lineComponents/carouselWrapper');
const { multicastMessage } = require('../js/linehelper/multicastToLine');
const { bookingAction } = require('../lineComponents/bookingAction');
const { getAllDriverDB, getAllDriverLightDB } = require('../models/driver');
const { jobNotification } = require('../lineComponents/jobNotification');
const { waitForDriver } = require('../lineComponents/waitForDriver');

const getAllBooking = async (req, res) => {
  try {
    const bookings = await getAllBookingDB(req.params.status)
    res.send(bookings)
  } catch (error) {
    res.send(error)
  }
}

const getBookingByStatus = async (req, res) => {
  try {
    const bookings = await getBookingByStatus(req.params.status)
    res.send(bookings)
  } catch (error) {
    res.send(error)
  }
}

const getBookingById = async (req, res) => {
  try {
    const bookings = await getBookingByIdDB(req.params.id)
    res.send(bookings)
  } catch (error) {
    console.log(error)
  }
}

const createBooking = async (req, res) => {
  const uid = new ShortUniqueId({ length: 10 });
  const id = uid()
  req.body.bookingId = id

  const flexMessage = flexWrapper(waitForDriver())
  try {
    await createBookingDB(req.body)
    const drivers = await getAllDriverLightDB({
      jobNotification: true,
      driverStatus: "active"
    }, ["43", "AD1", "AD2", "AD3", "AD7"])
    let ids = []
    ids = drivers.map((driver) => driver.driverId)
    if (req.body.bookingType === "A2B") {
      if (ids.length) await multicastMessage([flexWrapper(jobNotification(req.body))], "driver", ids)
    } else {
      if (ids.length) await multicastMessage([flexWrapper(jobNotification(req.body))], "driver", ids)
    }
    
    await pushMessage([flexMessage], "user", req.body.userId)
    console.log("Create booking successfully!")
    res.send("Create booking successfully!")
  } catch (error) {
    console.log(error)
  }
}

const updatePrice = async (req, res) => {
  let data = {
    ...req.body.data,
    updatedDate: new Date()
  }

  try {
    await updatePriceDB(req.body.bookingId, data)
    res.send(data)
  } catch (error) {
    console.log(error)
  }
}

const cancelBooking = async (req, res) => {
  try {
    const register = (await getRegisteredDrivers(req.body.bookingId))[0]
    const booking = (await getBookingByIdDB(req.body.bookingId))[0]
    booking.bookingInfo = JSON.parse(booking.bookingInfo)
    await updateBookingDB(req.body.bookingId, {bookingStatus: "canceled"})
    await updateBookingdriverByBookingId(req.body.bookingId, {offerStatus: "canceled"})
    await pushMessage([flexWrapper(bookingAction(booking, "cancel", "Booking's been canceled", "red", register, register.course))], "user", req.body.userId)
    await pushMessage([flexWrapper(bookingAction(booking, "cancel", "งานถูกยกเลิก", "red"))], "driver", register.driverId)
    res.send('ok')
  } catch (error) {
    console.log(error)
  }
}

const updateBooking = async (req, res) => {
    let data = {
      ...req.body.data,
      updatedDate: new Date()
    }
    try {
      await updateBookingDB(req.body.bookingId, data)
      res.send(data)
    } catch (error) {
      console.log(error)
    }
}

const deleteBooking = (req, res) => {
    res.json({
      status: 200,
      message: "Get data has successfully",
    });
}

module.exports = {
    getAllBooking,
    getBookingByStatus,
    getBookingById,
    createBooking,
    updateBooking,
    updatePrice,
    cancelBooking,
    deleteBooking
}