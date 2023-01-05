const express = require('express')
const { getAllDriver, getDriverById, getCurrentJobs, createDriver, actionToDriver, getSelectedRegisterByBookingId, updateDriver, uploadImageName, getDriverImage, transferJob, startJob, getCurrentJobWithLineFlex } = require('../controllers/driverController')
const multipleUpload = require('../js/uploadImage')
const { getCurrentJobsDB, getAllJobByDriverIdDB } = require('../models/driver')

//init packages
const router = express.Router()

router.get('/', getAllDriver)
router.get('/:id', getDriverById)
router.get('/image/:id', getDriverImage)
router.get('/register/:id', getSelectedRegisterByBookingId)
router.get('/jobs/:id', getCurrentJobs)
router.get('/jobs/history/:id', async (req, res) => {
    const jobs = await getAllJobByDriverIdDB(req.params.id)
    res.send(jobs)
})
router.get('/jobs/current/:id', async (req, res) => {
    const jobs = await getCurrentJobsDB(req.params.id)
    res.send(jobs)
})

router.post('/start', startJob)
router.post('/action', actionToDriver)
router.post('/', createDriver)

router.patch('/transfer', transferJob)
router.patch('/', updateDriver)

// router.put('/:id', bookingController.put)

module.exports = router