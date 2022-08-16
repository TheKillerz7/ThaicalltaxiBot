var express = require('express');
const { driverRegisterToBooking } = require('../controllers/jobBoardController');
var router = express.Router();

/* GET users listing. */
router.get('/', );

router.post('/', driverRegisterToBooking)

module.exports = router;
