const ShortUniqueId = require('short-unique-id');
const { pushMessage } = require('../js/linehelper/pushToLine');
const { flexWrapper } = require('../lineComponents/flexWrapper');
const { driverRegisteredCard } = require('../lineComponents/driverRegisteredCard');
const { getRegisteredDriversWithDriverInfo, updateBookingdriverByDriverId } = require('../models/bookingdrivers');
const { createBookingDB, updateBookingDB, getBookingByIdDB } = require('../models/booking');
const { userBooking } = require('../lineComponents/userBooking');
const { textTemplate } = require('../js/helper/textTemplate');
const { carouselWrapper } = require('../lineComponents/carouselWrapper');

const getAllBooking = (req, res) => {
    
}

const getBookingByStatus = async (req, res) => {
  try {
    const bookings = await getBookingByStatus(req.params.status)
    console.log(bookings)
    res.send(bookings)
  } catch (error) {
    res.send(error)
  }
}

const getBookingById = async (req, res) => {
  try {
    console.log(req.params)
    const bookings = await getBookingByIdDB(req.params.id)
    res.send(bookings)
  } catch (error) {
    console.log(error)
    res.send(error)
  }
}

const createBooking = async (req, res) => {
  const uid = new ShortUniqueId({ length: 10 });
  const id = uid()
  req.body.bookingId = id

  const flexMessage = flexWrapper(userBooking(req.body))
  let messageToUser = [
    flexMessage,
    {
      type: "text",
      text: "Please wait 3 minutes and we'll send you drivers"
    }
  ]
  try {
    await createBookingDB(req.body)
    console.log(messageToUser)
    await pushMessage(messageToUser, "user", req.body.userId)
    console.log("Create booking successfully!")
    res.send("Create booking successfully!")
    setTimeout(async () => {
      try {
        const driversRegisters = await getRegisteredDriversWithDriverInfo(id, "jobRatio")
        if (!driversRegisters.length) {
          await pushMessage([textTemplate("sorry no driver yet")], "user", req.body.userId)
          await updateBookingDB(id, { status: "closed" })
          return
        } 
        const hasVIPCar = driversRegisters.map((register) => register.vehicleInfo).includes("VIP")
        const selectedCarType = driversRegisters.filter((register) => register.vehicleInfo.includes(req.body.bookingInfo.carSize) && JSON.parse(register.vehicleInfo).carSize)
        const otherCarType = driversRegisters.filter((register) => {
          if (hasVIPCar) {
            if (register.vehicleInfo.includes("VIP")) return register
            return
          }
          return !register.vehicleInfo.includes(req.body.bookingInfo.carSize) && JSON.parse(register.vehicleInfo).carSize
        })
        
        let selectedRegisters = []
        for (let i = 0; i < 2;i++) selectedCarType[i] && selectedRegisters.push(selectedCarType[i])
        for (let i = selectedRegisters.length; i < 3;i++) otherCarType[i] && selectedRegisters.push(otherCarType[i])

        const cards = selectedRegisters.map((register, index) => {
          let extraObj = {}
          let extraPrice = 0
          register.extra = JSON.parse(register.extra)
          register.extra.map((extra) => {
            if (extra.title) {
              extraPrice += parseInt(extra.price)
              extraObj[extra.title] = parseInt(extra.price)
            }
          })
          const prices = {
            "Course Price": register.trip,
            "Tollway": register.tollway,
            ...extraObj
          }
          const totalPrice = parseInt(register.trip) + parseInt(register.tollway) + extraPrice
          return driverRegisteredCard(prices, totalPrice, register, index + 1, req.body.bookingInfo.carSize)
        })
        const cardsWrapped = flexWrapper(carouselWrapper(cards), "Driver's Offers")
        messageToUser.push(cardsWrapped)
        await updateBookingdriverByDriverId(id, selectedRegisters.map((register) => register.driverId), { status: "rejected" })
        await updateBookingDB(id, { status: "selecting" })
        await pushMessage(messageToUser, "user", req.body.userId)
      } catch (error) {
        console.log(error)
      }
    }, 120000);
  } catch (error) {
    console.log(error)
  }
}

const updatePrivateInfo = async (req, res) => {
    let data = {
      ...req.body.data,
      status: "ongoing",
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
    updatePrivateInfo,
    deleteBooking
}