const express = require('express');
const { driverRegisterToBooking } = require('../../controllers/jobBoardController');
const router = express.Router();

/* GET users listing. */
router.get('/', );

router.post('/', driverRegisterToBooking)

module.exports = router;
