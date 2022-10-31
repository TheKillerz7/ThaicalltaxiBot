const knex = require("./knexdb")

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
  .update("status", "finished")

  await knex("bookingdrivers")
  .where("bookingId", bookingId)
  .update("status", "finished")
}

const deleteDriverDB = async () => {
    res.json({
      status: 200,
      message: "Get data has successfully",
    });
}

module.exports = {
    getAllDriverDB,
    getDriverByIdDB,
    createDriverDB,
    finishingJobDB,
    updateDriverDB,
    deleteDriverDB
}