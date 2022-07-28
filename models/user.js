const knex = require("./knexdb")

const getAllUserDB = () => {
    res.send(db.User())
}

const getUserByIdDB = () => {
    res.json({
      status: 200,
      message: "Get data has successfully",
    });
}

const createUserDB = (data) => {
  return knex("users")
  .insert({
    ...data
  })
}

const updateUserDB = () => {
    res.json({
      status: 200,
      message: "Get data has successfully",
    });
}

const deleteUserDB = (id) => {
  return knex("users")
  .where("userId", id)
  .del()
}

module.exports = {
    getAllUserDB,
    getUserByIdDB,
    createUserDB,
    updateUserDB,
    deleteUserDB
}