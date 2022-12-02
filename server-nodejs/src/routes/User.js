const express = require('express');
const router = express.Router();

const userController = require('../controllers/UserController');

router.get('/getWatchList/:userID', userController.getWatchList);
router.post('/addWatchList', userController.addWatchList);
router.post('/removeWatchList', userController.removeWatchList);

router.get('/getRatingList/:userID', userController.getRatingList);
router.post('/addRating', userController.addRating);

module.exports = router;