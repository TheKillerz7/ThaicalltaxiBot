const express = require('express');
const { getUserById, updateUser, ratingDriver, getCurrentBookingsByUserId, getAllBookingsByUserId } = require('../controllers/userController');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:id', getUserById)
router.get('/bookings/current/:id', getCurrentBookingsByUserId)
router.get('/bookings/:id', getAllBookingsByUserId)

router.post('/comment', ratingDriver)

router.patch('/:id', updateUser)

module.exports = router;
