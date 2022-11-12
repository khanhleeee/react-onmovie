const express = require('express');
const router = express.Router();

const authController = require('../controllers/AuthController');

router.post('/login', authController.login);
router.post('/register', authController.register);
router.put('/update/:userID', authController.updateUser)

module.exports = router;