const { pushMessage } = require('../js/linehelper/pushToLine')
const { driverRegisterToBookingDB, getBookingByIdDB } = require('../models/booking')
const { getRegisteredDrivers } = require('../models/bookingdrivers')
const { flexWrapper } = require('../lineComponents/flexWrapper')
const { userBooking } = require('../lineComponents/userBooking')
const { getBookingByStatusWithoutDriverIdDB } = require('../models/jobBoard')
const { textTemplate } = require('../js/helper/textTemplate')

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
    let messageToDriver = []

    try {
        const data = req.body
        const booking = (await getBookingByIdDB(data.bookingId))[0]
        const driversRegisters = await getRegisteredDrivers(data.bookingId)
        const driverIds = driversRegisters.map(driver => driver.driverId)
        if (booking.status !== "waiting") {
            res.send("This job has been closed.")
            return
        }
        if (driverIds.includes(data.driverId)) {
            res.send("You've already registered to this job.")
            return
        } 
        // const flexMessage = flexWrapper(userBooking(booking))
        // messageToDriver.push(flexMessage)
        await pushMessage([textTemplate("registered")], "driver", data.driverId)
        data.extra = JSON.stringify(data.extra)
        await driverRegisterToBookingDB(data)
        console.log("Registration success!")
        res.send("Registration success!")
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    driverRegisterToBooking,
    getBookingByStatusWithoutDriverId
}