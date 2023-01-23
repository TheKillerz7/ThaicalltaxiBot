const ShortUniqueId = require('short-unique-id');
const { pushMessage } = require('../js/linehelper/pushToLine');
const { flexWrapper } = require('../lineComponents/flexWrapper');
const { driverRegisteredCard } = require('../lineComponents/driverRegisteredCard');
const { getRegisteredDriversWithDriverInfo, updateBookingdriverByDriverId, getSelectedRegisterByBookingIdDB, updateBookingdriverByBookingId } = require('../models/bookingdrivers');
const { createBookingDB, updateBookingDB, getBookingByIdDB, updatePriceDB } = require('../models/booking');
const { userBooking } = require('../lineComponents/userBooking');
const { textTemplate } = require('../js/helper/textTemplate');
const { carouselWrapper } = require('../lineComponents/carouselWrapper');
const { multicastMessage } = require('../js/linehelper/multicastToLine');
const { bookingAction } = require('../lineComponents/bookingAction');
const { getAllDriverDB, getAllDriverLightDB } = require('../models/driver');
const { jobNotification } = require('../lineComponents/jobNotification');
const { waitForDriver } = require('../lineComponents/waitForDriver');

const getAllBooking = (req, res) => {
res.send("ok")
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
  let messageToUser = []
  try {
    await createBookingDB(req.body)
    const drivers = await getAllDriverLightDB({
      jobNotification: true,
      driverStatus: "active"
    })
    let ids = []
    if (req.body.bookingType === "A2B") {
      ids = [...drivers.filter((driver, index) => {
        driver.provinceNotification = JSON.parse(driver.provinceNotification)
        if (driver.provinceNotification.includes(req.body.bookingInfo.from.province.th) || driver.provinceNotification.includes(req.body.bookingInfo.to.province.th)) return true
      }).map((driver) => driver.driverId)]
      const provinceTitle = {
        from: req.body.bookingInfo.from.province.th,
        to: req.body.bookingInfo.to.province.th
      }
      if (ids.length) await pushMessage([flexWrapper(jobNotification(req.body))], "driver", "U2330f4924d1d5faa190c556e978bee23")
    } else {
      ids = [...drivers.filter((driver, index) => {
        driver.provinceNotification = JSON.parse(driver.provinceNotification)
        if (driver.provinceNotification.includes(req.body.bookingInfo.start.place.province.th) || driver.provinceNotification.includes(req.body.bookingInfo.end.place.province.th)) return true
      }).map((driver) => driver.driverId)]
      const provinceTitle = {
        from: req.body.bookingInfo.start.place.province.th,
        to: req.body.bookingInfo.end.place.province.th
      }
      if (ids.length) await multicastMessage([flexWrapper(jobNotification(req.body))], "driver", ids)
    }
    
    await pushMessage([flexMessage], "user", req.body.userId)
    console.log("Create booking successfully!")
    res.send("Create booking successfully!")
    setTimeout(async () => {
      try {
        const driversRegisters = await getRegisteredDriversWithDriverInfo(id, "jobDone")
        if (!driversRegisters.length) {
          await pushMessage([textTemplate("Sorry,\nNo driver at this moment")], "user", req.body.userId)
          await updateBookingDB(id, { bookingStatus: "closed" })
          return
        } 
        const splicedRegisters = driversRegisters.splice(0, 3)

        const cards = splicedRegisters.map((register, index) => {
          if (!register) return
          let extraObj = []
          let extraPrice = 0
          register.extra = JSON.parse(register.extra)
          register.message = JSON.parse(register.message)
          register.extra.map((extra) => {
            if (extra.title) {
              const extraTemp = {}
              extraPrice += parseInt(extra.price)
              extraTemp[extra.title] = parseInt(extra.price)
              extraObj.push(extraTemp)
            }
          })
          const prices = [
            {
              "Course": register.course
            },
            {
              "Tollway": register.tollway
            },
            ...extraObj
          ]
          const totalPrice = parseInt(register.course) + parseInt(register.tollway) + extraPrice
          return driverRegisteredCard(prices, totalPrice, register, index + 1, req.body.bookingInfo.carType)
        })
        const cardsWrapped = flexWrapper(carouselWrapper(cards), "Driver's Offers")
        messageToUser.push(cardsWrapped)
        await updateBookingdriverByDriverId(id, splicedRegisters.map((register) => register.driverId), { offerStatus: "rejected" })
        driversRegisters.length && await multicastMessage([textTemplate("ขออภัย การเสนอราคาหมดเวลาแล้ว")], "driver", driversRegisters.map((register) => register.driverId))
        await updateBookingDB(id, { bookingStatus: "selecting" })
        await pushMessage(messageToUser, "user", req.body.userId)
        setTimeout(async () => {
          const booking = (await getBookingByIdDB(id))[0]
          if (booking.bookingStatus !== "ongoing") {
            const driversRegisters = await getRegisteredDriversWithDriverInfo(id, "jobDone")
            await updateBookingDB(id, { bookingStatus: "closed" })
            await pushMessage([textTemplate("Sorry, the time has run out. The process has been exited.")], "user", req.body.userId)
            driversRegisters.length && await multicastMessage([textTemplate("ขออภัย การเสนอราคาหมดเวลาแล้ว")], "driver", driversRegisters.map((register) => register.driverId))
            return
          }
        }, 120000);
      } catch (error) {
        console.log(error)
      }
    }, 180000);
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
    const driverId = (await getSelectedRegisterByBookingIdDB(req.body.bookingId))[0]
    const booking = (await getBookingByIdDB(req.body.bookingId))[0]
    booking.bookingInfo = JSON.parse(booking.bookingInfo)
    await updateBookingDB(req.body.bookingId, {bookingStatus: "canceled"})
    await updateBookingdriverByBookingId(req.body.bookingId, {offerStatus: "canceled"})
    await pushMessage([flexWrapper(bookingAction(booking, "cancel", "Booking's been canceled", "red"))], "user", req.body.userId)
    await pushMessage([flexWrapper(bookingAction(booking, "cancel", "งานถูกยกเลิก", "red"))], "driver", driverId.driverId)
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