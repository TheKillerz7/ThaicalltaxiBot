const { pushMessage } = require('../js/linehelper/pushToLine')
const { driverRegisterToBookingDB, getBookingByIdDB, updateBookingDB } = require('../models/booking')
const { getRegisteredDrivers } = require('../models/bookingdrivers')
const { getDriverByIdDB } = require('../models/driver')

const driverRegisterToBooking = async (req, res) => {
    let messageToUser = []
    let messageToDriver = []
    const textTemplate = (text) => {
        return {
            type: "text",
            text
        }
    }

    try {
        const data = req.body
        const booking = (await getBookingByIdDB(data.bookingId))[0]
        const driversRegisters = await getRegisteredDrivers(data.bookingId)
        if (booking.status !== "waiting") {
            res.send("This job has been closed.")
            return
        }
        if (driversRegisters.length >= 2) {
            driversRegisters.push(data)
            messageToDriver = await Promise.all(driversRegisters.map(async (register) => {
                const driverInfo = (await getDriverByIdDB(register.driverId))[0]
                const tripPrice = parseInt(register.trip)
                const tollwayPrice = parseInt(register.tollway)
                let extraPrice = 0
                let extraPriceText = ""
                register.extra = JSON.parse(register.extra)
                register.extra.map((extra) => {
                    extraPrice += parseInt(extra.price)
                    extraPriceText += `Title: ${extra.title}, Price: ${parseInt(extra.price)} baht\n`
                })
                const totalPrice = tripPrice + tollwayPrice + extraPrice
                const text = `Driver's name: ${driverInfo.name}\nTrip price: ${tripPrice} baht\nTollway price: ${tollwayPrice} baht\nExtra price: ${extraPriceText}\n_Total: ${totalPrice} baht_`
                return textTemplate(text)
            }))
            messageToDriver.push(extraPriceText += `Title: ${data.extra.title}, Price: ${parseInt(data.extra.price)} baht\n`)
            await updateBookingDB(data.bookingId, { status: "selecting" })
            await pushMessage(messageToDriver, "user", booking.userId)
        }
        messageToUser.push(textTemplate("You've registered to booking ID: " + booking.bookingId))
        await pushMessage(messageToUser, "driver", data.driverId)
        data.extra = JSON.stringify(data.extra)
        await driverRegisterToBookingDB(data)
        console.log("Registration success!")
        res.send("Registration success!")
    } catch (error) {
        console.log(error.response?.data?.details)
    }
}

module.exports = {
    driverRegisterToBooking
}