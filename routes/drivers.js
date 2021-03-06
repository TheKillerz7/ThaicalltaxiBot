const express = require('express')
const driverController = require('../controllers/driverController')

//init packages
const router = express.Router()

router.get('/', driverController.getAllDriver)

router.post('/', driverController.createDriver)

// router.put('/:id', bookingController.put)

module.exports = router