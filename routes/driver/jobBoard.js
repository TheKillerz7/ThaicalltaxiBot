const express = require('express');
const { driverRegisterToBooking, getBookingByStatusWithoutDriverId } = require('../../controllers/jobBoardController');
const router = express.Router();

/* GET users listing. */
router.get('/', );
router.get('/:status/:driverId', getBookingByStatusWithoutDriverId);

router.post('/', driverRegisterToBooking)

module.exports = router;
