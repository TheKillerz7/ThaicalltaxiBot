const knex = require("./knexdb")

const getAllDriverDB = async () => {
  return await knex("drivers").select()
}

const getDriverByIdDB = async (id) => {
  return await knex("drivers")
  .where("driverId", id)
  .select()
}

const createDriverDB = async (data) => {
  return await knex("drivers")
  .insert({
    ...data
  })
}

const updateDriverDB = async () => {
    res.json({
      status: 200,
      message: "Get data has successfully",
    });
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
    updateDriverDB,
    deleteDriverDB
}