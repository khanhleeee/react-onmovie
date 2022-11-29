const express = require('express');
const router = express.Router();

const dashboardController = require('../controllers/DashboardController');

router.get('/films', dashboardController.getMoviesList);
router.get('/films/genres', dashboardController.getAllGenres);
router.get('/films/casts', dashboardController.getAllCasts);
router.get('/films/keywords', dashboardController.getAllKeywords);
router.get('/films/:filmID', dashboardController.getDetailMovie);
router.post('/films/:filmID', dashboardController.editDetailMovie);

module.exports = router;