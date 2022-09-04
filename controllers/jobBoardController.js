const { pushMessage } = require('../js/linehelper/pushToLine')
const { driverRegisteredCard } = require('../lineComponents/driverRegisteredCard')
const { carouselWrapper } = require('../lineComponents/carouselWrapper')
const { driverRegisterToBookingDB, getBookingByIdDB, updateBookingDB } = require('../models/booking')
const { getRegisteredDrivers } = require('../models/bookingdrivers')
const { getDriverByIdDB } = require('../models/driver')
const { flexWrapper } = require('../lineComponents/flexWrapper')
const { userBooking } = require('../lineComponents/userBooking')
const { getBookingByStatusWithoutDriverIdDB } = require('../models/jobBoard')

const getBookingByStatusWithoutDriverId = async (req, res) => {
    const status = req.params.status
    const driverId = req.params.driverId
    const bookings = await getBookingByStatusWithoutDriverIdDB(status, driverId)
    console.log(bookings)
    res.send(bookings)
}

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
        const driverIds = driversRegisters.map(driver => driver.driverId)
        if (booking.status !== "waiting") {
            res.send("This job has been closed.")
            return
        }
        if (driverIds.includes(data.driverId)) {
            res.send("You've already registered to this job.")
            return
        }
        if (driversRegisters.length >= 0) {
            driversRegisters.push(data)
            const cards = await Promise.all(driversRegisters.map(async (register, index) => {
                const driverInfo = (await getDriverByIdDB(register.driverId))[0]
                const driverInfoForCard = {
                    driverId: driverInfo.driverId,
                    bookingId: data.bookingId,
                    name: driverInfo.name,
                    carType: driverInfo.carType,
                    carModel: driverInfo.carModel,
                    carAge: driverInfo.carAge,
                }
                const prices = {
                    "Trip": register.trip,
                    "Tollway": register.tollway,
                }
                let extraPrice = 0
                // if (index !== 2) register.extra = JSON.parse(register.extra)
                register.extra.map((extra) => {
                    extraPrice += parseInt(extra.price)
                    prices[extra.title] = extra.price
                })
                const totalPrice = parseInt(register.trip) + parseInt(register.tollway) + extraPrice
                return driverRegisteredCard(prices, totalPrice, driverInfoForCard)
            }))
            const cardsWrapped = flexWrapper(carouselWrapper(cards), "Driver's Offers")
            messageToUser.push(cardsWrapped)
            messageToUser.push(textTemplate("Please select one of the drivers to your liking."))
            await updateBookingDB(data.bookingId, { status: "selecting" })
            await pushMessage(messageToUser, "user", booking.userId)
        }
        const flexMessage = flexWrapper(userBooking(booking))
        messageToDriver.push(flexMessage)
        await pushMessage(messageToDriver, "driver", data.driverId)
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