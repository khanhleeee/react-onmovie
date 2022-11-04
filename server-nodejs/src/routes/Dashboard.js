const express = require('express');
const router = express.Router();

const dashboardController = require('../controllers/DashboardController');

router.get('/movies', dashboardController.movieList);
router.get('/movie/:movieID', dashboardController.getDetailMovie);


module.exports = router;