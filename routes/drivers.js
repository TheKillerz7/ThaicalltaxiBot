const express = require('express')
const { getAllDriver, getDriverById, getCurrentJobs, createDriver, actionToDriver } = require('../controllers/driverController')

//init packages
const router = express.Router()

router.get('/', getAllDriver)
router.get('/:id', getDriverById)
router.get('/jobs/:id', getCurrentJobs)

router.post('/', createDriver)
router.post('/action', actionToDriver)

// router.put('/:id', bookingController.put)

module.exports = router