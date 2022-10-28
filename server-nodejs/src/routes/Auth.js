const express = require('express');
const router = express.Router();

const userController = require('../controllers/AuthController');

router.post('/login', userController.login);
router.post('/register', userController.register);

module.exports = router;