const express = require('express');
const router = express.Router();

const userController = require('../controllers/UserController');

router.get('/getWatchList/:userID', userController.getWatchList);
router.get('/getRatingList/:userID', userController.getRatingList);

router.post('/addWatchList', userController.addWatchList);
router.post('/addRating', userController.addRating);
router.post('/removeWatchList', userController.removeWatchList);

module.exports = router;