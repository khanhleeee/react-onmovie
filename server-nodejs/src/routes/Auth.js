const express = require('express');
const router = express.Router();

const userController = require('../controllers/AuthController');

router.get('/', userController.login);
router.post('/google', userController.google);
router.get('/google', userController.verifyEmail);


module.exports = router;