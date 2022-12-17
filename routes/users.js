const express = require('express');
const { getUserById, updateUser } = require('../controllers/userController');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:id', getUserById)

router.patch('/:id', updateUser)

module.exports = router;
