const express = require('express')
const { getAllDriver, getDriverById, getCurrentJobs, createDriver, actionToDriver, getSelectedRegisterByBookingId, updateDriver, uploadImageName, getDriverImage, transferJob } = require('../controllers/driverController')
const multipleUpload = require('../js/uploadImage')

//init packages
const router = express.Router()

router.get('/', getAllDriver)
router.get('/:id', getDriverById)
router.get('/image/:id', getDriverImage)
router.get('/register/:id', getSelectedRegisterByBookingId)
router.get('/jobs/:id', getCurrentJobs)

router.post('/', createDriver)
router.post('/action', actionToDriver)

router.patch('/transfer', transferJob)
router.patch('/', updateDriver)

// router.put('/:id', bookingController.put)

module.exports = router