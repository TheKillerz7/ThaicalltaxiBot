const { textTemplate } = require('../js/helper/textTemplate')
const { pushMessage } = require('../js/linehelper/pushToLine')
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
        const driversRegisters = await getRegisteredDrivers(data.bookingId)
        const driverIds = driversRegisters.map(driver => driver.driverId)
        if (booking.bookingStatus !== "waiting") {
            res.send("งานนี้ได้หมดเวลาแล้ว")
            return
        }
        if (driverIds.includes(data.driverId)) {
            res.send("คุณเสนอราคาไปเรียบร้อยแล้ว")
            return
        }
        data.extra = JSON.stringify(data.extra)
        await driverRegisterToBookingDB(data)
        await pushMessage([textTemplate("ผู้โดยสารกำลังเลือกราคา กรุณารอประมาณ 2 นาที")], "driver", data.driverId)
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