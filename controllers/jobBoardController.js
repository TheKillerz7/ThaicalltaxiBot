const { textTemplate } = require('../js/helper/textTemplate')
const { pushMessage } = require('../js/linehelper/pushToLine')
const { driverRegisteredCard } = require('../lineComponents/driverRegisteredCard')
const { flexWrapper } = require('../lineComponents/flexWrapper')
const { driverRegisterToBookingDB, getBookingByIdDB } = require('../models/booking')
const { getRegisteredDrivers } = require('../models/bookingdrivers')
const { getDriverByIdDB } = require('../models/driver')
const { getBookingByStatusWithoutDriverIdDB } = require('../models/jobBoard')

const getBookingByStatusWithoutDriverId = async (req, res) => {
    const status = req.params.status
    const driverId = req.params.driverId
    const bookings = await getBookingByStatusWithoutDriverIdDB(status, driverId)
    const ParsedBookings = bookings.map((booking, index) => {
        const bookingTemp = booking
        bookingTemp.bookingInfo = JSON.parse(bookingTemp.bookingInfo)
        return bookingTemp
    })
    res.send(ParsedBookings)
}

const driverRegisterToBooking = async (req, res) => {
    try {
        const data = req.body
        const booking = (await getBookingByIdDB(data.bookingId))[0]
        if (booking.bookingStatus !== "waiting") {
            res.send("งานนี้ได้หมดเวลาแล้ว")
            return
        }
        const prices = [
          {
            "Course": data.course
          }
        ]
        const cardsWrapped = flexWrapper(driverRegisteredCard(prices, data.course, data), "Driver's Offers")
        await updateBookingDB(id, { bookingStatus: "selecting" })
        await pushMessage(cardsWrapped, "user", booking.userId)
        // setTimeout(async () => {
        //   const booking = (await getBookingByIdDB(id))[0]
        //   if (booking.bookingStatus !== "ongoing") {
        //     const driversRegisters1 = await getRegisteredDriversWithDriverInfo(id, "jobDone")
        //     await updateBookingDB(id, { bookingStatus: "closed" })
        //     await pushMessage([textTemplate("Sorry, the time has run out. The process has been exited.")], "user", req.body.userId)
        //     driversRegisters1.length && await multicastMessage([textTemplate("ขออภัย การเสนอราคาหมดเวลาแล้ว")], "driver", driversRegisters1.map((register) => register.driverId))
        //     return
        //   }
        // }, 120000);

        await driverRegisterToBookingDB(data)
        await pushMessage([textTemplate("Registration successful. Waiting for reply.")], "driver", data.driverId)
        console.log("Registration success!")
        res.send("การเสนอราคาเสร็จสิ้น")
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    driverRegisterToBooking,
    getBookingByStatusWithoutDriverId
}