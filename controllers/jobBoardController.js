const { pushMessage } = require('../js/linehelper/pushToLine')
const { driverRegisterToBookingDB, getBookingByIdDB, updateBookingDB } = require('../models/booking')
const { getRegisteredDrivers } = require('../models/bookingdrivers')

const driverRegisterToBooking = async (req, res) => {
    try {
        const data = req.body
        const booking = (await getBookingByIdDB(data.bookingId))[0]
        const driverCount = await getRegisteredDrivers(data.bookingId)
        if (booking.status !== "waiting") {
            res.send("This job has been closed.")
            return
        }
        if (driverCount.length >= 2) {
            await updateBookingDB(data.bookingId, { status: "selecting" })
            await pushMessage(data.bookingId, "driver", data.driverId)
            await pushMessage(data.bookingId, "user", booking.userId)
        }
        await driverRegisterToBookingDB(data)
        res.send("Registration success!")
    } catch (error) {
        console.log(error.response.data.details)
    }
}

module.exports = {
    driverRegisterToBooking
}