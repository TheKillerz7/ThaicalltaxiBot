const { driverRegisterToBookingDB } = require('../models/booking')

const driverRegisterToBooking = async (req, res) => {
    console.log(req.body)
    // const driversRegisteredCount = await getRegisteredDrivers(bookingId)
    // console.log(driversRegisteredCount)
    // if (driversRegisteredCount.length === 3) {
    //     res.send("This job has reached maximum amount of drivers registered.")
    // } else {
    //     const resolve = await driverRegisterToBookingDB(req.body)
    //     res.send("Registration success!")
    // }
    const resolve = await driverRegisterToBookingDB(req.body)
        res.send("Registration success!")
}

module.exports = {
    driverRegisterToBooking
}