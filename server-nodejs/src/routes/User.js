const express = require('express');
const router = express.Router();

const userController = require('../controllers/UserController');

router.post('/addWatchList', userController.addWatchList);
router.post('/removeWatchList', userController.removeWatchList);

module.exports = router;