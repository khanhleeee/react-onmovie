const express = require('express');
const router = express.Router();

const dashboardController = require('../controllers/DashboardController');

router.get('/movies', dashboardController.movieList);
router.get('/movie/:movieID', dashboardController.getDetailMovie);
router.post('/movie/:movieID', dashboardController.editDetailMovie);


module.exports = router;