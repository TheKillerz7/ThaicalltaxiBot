const { default: ShortUniqueId } = require('short-unique-id');
const { textTemplate } = require('../js/helper/textTemplate');
const { linkRichMenu } = require('../js/linehelper/linkRichMenu');
const { pushMessage } = require('../js/linehelper/pushToLine');
const { privateInfo } = require('../lineComponents/privateInfo');
const { getBookingByIdDB, updateBookingDB } = require('../models/booking');
const { selectedDriver } = require('../models/bookingdrivers');
const { createChatRoom } = require('../models/chatting');
const db = require('../models/user')

const getAllUser = (req, res) => {
    res.send(db.Booking())
}

const getUserById = (req, res) => {
    res.json({
      status: 200,
      message: "Get data has successfully",
    });
}

const selectDriver = async (req, res) => {
  const uid = new ShortUniqueId({ length: 10 });
  const postbackData = new URLSearchParams(req.postback.data)
  const bookingId = postbackData.get("bookingId")
  const userId = req.source.userId
  const driverId = postbackData.get("driverId")
  try {
    const bookingStatus = (await getBookingByIdDB(bookingId))[0].status
    if (bookingStatus !== 'selecting') {
      await pushMessage([textTemplate("You've already selected driver")], 'user', req.source.userId)
      return
    }
    await selectedDriver(driverId, bookingId)
    await updateBookingDB(bookingId, {status: "closed"})
    await linkRichMenu('user', "afterBooked", req.source.userId)
    await pushMessage([textTemplate("You've been selected, Booking: " + bookingId)], 'driver', driverId)
    await pushMessage([privateInfo(bookingId)], 'user', req.source.userId)
    const roomData = {
      roomId: uid(),
      bookingId,
      userId,
      driverId
    }
    await createChatRoom(roomData)
    console.log("success")
    res.send('successssss')
  } catch (error) {
    console.log(error)
  }
}

const createUser = async (req, res) => {
  let data = {
    userId: req.body.events[0].source.userId
  }
  try {
    await db.createUserDB(data)
    res.send("Create user succesfully!")
  } catch (error) {
    res.send(error)
  }
}

const updateUser = (req, res) => {
    res.json({
      status: 200,
      message: "Get data has successfully",
    });
}

const deleteUser = async (req, res) => {
  try {
    await db.deleteUserDB(req.body.events[0].source.userId)
    console.log("Delete user succesfully!")
    res.send("Create user succesfully!")
  } catch (error) {
    res.send(error)
  }
}

module.exports = {
    getAllUser,
    selectDriver,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}