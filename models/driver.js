const knex = require("./knexdb")

const getAllDriverLightDB = (option) => {
  return knex("drivers")
  .where({...option})
  .orderBy('jobDone')
  .select()
}

const getAllDriverDB = (option, value) => {
  switch (option) {
    case "where":
      return knex("drivers")
      .where(value.title, value.value)
      .select()

    case "whereNot":
      return knex("drivers")
      .whereNot(value.title, value.value)
      .select()
  
    default:
      return knex("drivers").select()
  }
}

const getDriverImageDB = (driverId) => {
  return knex("driverimg")
  .where("driverId", driverId)
  .select()
}

const getCurrentJobsDB = (driverId) => {
  return knex("booking")
  .where("booking.bookingStatus", "ongoing")
  .join("bookingdrivers", "bookingdrivers.bookingId", "booking.bookingId")
  .where({
    driverId,
    "bookingdrivers.offerStatus": "selected"
  })
  .orderBy("booking.createdDate")
  .select()
}

const getAllJobByDriverIdDB = (driverId) => {
  return knex("booking")
  .join("bookingdrivers", "bookingdrivers.bookingId", "booking.bookingId")
  .where({
    driverId,
    "bookingdrivers.offerStatus": "selected"
  })
  .whereIn("booking.bookingStatus", ["canceled", "finished"])
  .orderBy("booking.createdDate")
  .select()
}

const getDriverByCodeDB = (code) => {
  return knex("drivers")
  .where("driverCode", code)
  .select()
}


const getDriverByIdDB = (id) => {
  return knex("drivers")
  .where("driverId", id)
  .select()
}

const createDriverDB = (data) => {
  return knex("drivers")
  .insert({
    ...data
  })
}

const updateDriverDB = (id, data) => {
    return knex("drivers")
    .where("driverId", id)
    .update({...data})
}

const finishingJobDB = async (bookingId) => {
  await knex("booking")
  .where("bookingId", bookingId)
  .update("bookingStatus", "finished")

  await knex("bookingdrivers")
  .where({
    bookingId: bookingId,
    offerStatus: "selected"
  })
  .update("offerStatus", "finished")
}

const uploadImageNameDB = (data) => {
  return knex("driverimg")
  .insert({
    ...data
  })
}

const deleteImageDB = (driverId) => {
  return knex("driverimg")
  .where("driverId", driverId)
  .del()
}

const deleteDriverDB = async () => {
    res.json({
      status: 200,
      message: "Get data has successfully",
    });
}

module.exports = {
    getAllDriverLightDB,
    getAllDriverDB,
    getDriverByIdDB,
    getDriverImageDB,
    createDriverDB,
    getCurrentJobsDB,
    getAllJobByDriverIdDB,
    getDriverByCodeDB,
    finishingJobDB,
    updateDriverDB,
    uploadImageNameDB,
    deleteImageDB,
    deleteDriverDB
}