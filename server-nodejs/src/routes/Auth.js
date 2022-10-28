const express = require('express');
const router = express.Router();

const userController = require('../controllers/AuthController');

router.post('/login', userController.login);

module.exports = router;