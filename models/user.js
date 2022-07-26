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

const createUserDB = () => {
    res.json({
      status: 200,
      message: "Get data has successfully",
    });
}

const updateUserDB = () => {
    res.json({
      status: 200,
      message: "Get data has successfully",
    });
}

const deleteUserDB = () => {
    res.json({
      status: 200,
      message: "Get data has successfully",
    });
}

module.exports = {
    getAllUserDB,
    getUserByIdDB,
    createUserDB,
    updateUserDB,
    deleteUserDB
}