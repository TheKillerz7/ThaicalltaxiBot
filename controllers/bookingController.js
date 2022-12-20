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
      // jobNotification: true,
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
      if (ids.length) await multicastMessage([flexWrapper(jobNotification(id, provinceTitle))], "driver", ids)
    } else {
      ids = [...drivers.filter((driver, index) => {
        driver.provinceNotification = JSON.parse(driver.provinceNotification)
        if (driver.provinceNotification.includes(req.body.bookingInfo.start.place.province.th) || driver.provinceNotification.includes(req.body.bookingInfo.end.place.province.th)) return true
      }).map((driver) => driver.driverId)]
      const provinceTitle = {
        from: req.body.bookingInfo.start.place.province.th,
        to: req.body.bookingInfo.end.place.province.th
      }
      if (ids.length) await multicastMessage([flexWrapper(jobNotification(id, provinceTitle))], "driver", ids)
    }
    
    await pushMessage([flexMessage], "user", req.body.userId)
    console.log("Create booking successfully!")
    res.send("Create booking successfully!")
    setTimeout(async () => {
      try {
        const driversRegisters = await getRegisteredDriversWithDriverInfo(id, "jobDone")
        if (!driversRegisters.length) {
          await pushMessage([textTemplate("Sorry,\nNo driver at this moment, please try again later or during the daytime in Thailand.\n\n*Note*\nNow, it's on testing period\n(Dec, 2022 - May, 2023)")], "user", req.body.userId)
          await updateBookingDB(id, { bookingStatus: "closed" })
          return
        } 

        let selectedRegisters = []
        for (let i = 0;i < 3;i++) {
          if (driversRegisters[i])  {
            selectedRegisters.push(driversRegisters[i])
          }
        }
        // if (req.body.bookingInfo.carType === "Any type") {
        //   const carTypes = driversRegisters.map((register) => JSON.parse(register.vehicleInfo).carType)
        //   const selectedIndexes = [carTypes.indexOf("Economy type"), carTypes.indexOf("Sedan type"), carTypes.indexOf("Family type"), carTypes.indexOf("Van/Van type")]
        //   let indexesStorage = [...selectedIndexes]
        //   selectedIndexes.forEach((selectedIndex, index) => {
        //     if (selectedIndex > -1) {
        //       selectedRegisters.push(driversRegisters[selectedIndex])
        //       driversRegisters.splice(selectedIndex, 1)
        //     } else {
        //       driversRegisters.find((el, index) => {
        //         if(!indexesStorage.includes(index)) {
        //           indexesStorage.push(index)
        //           selectedRegisters.push(el)
        //           driversRegisters.splice(index, 1)
        //           return true
        //         }
        //       })
        //     }
        //   })
        // } else {
        //   for (let i = 0;i < 3;i++) {
        //     if (driversRegisters[i])  {
        //       selectedRegisters.push(driversRegisters[i])
        //       driversRegisters.splice(i, 1)
        //     }
        //   }
        // }

        const cards = selectedRegisters.map((register, index) => {
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
        await updateBookingdriverByDriverId(id, selectedRegisters.map((register) => register.driverId), { offerStatus: "rejected" })
        driversRegisters.length && await multicastMessage([flexWrapper(bookingAction(req.body, "reject"))], "driver", driversRegisters.map((register) => register.driverId))
        await updateBookingDB(id, { bookingStatus: "selecting" })
        await pushMessage(messageToUser, "user", req.body.userId)
      } catch (error) {
        console.log(error)
      }
    }, 15000);
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
    await pushMessage([flexWrapper(bookingAction(booking, "cancel"))], "user", req.body.userId)
    // await pushMessage([flexWrapper(bookingAction(booking, "cancel"))], "driver", driverId.driverId)
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