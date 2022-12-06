const express = require('express');
const router = express.Router();

const dashboardController = require('../controllers/DashboardController');

router.get('/films', dashboardController.getMoviesList);
router.post('/films', dashboardController.addMovie);
router.get('/films/countries', dashboardController.getAllCountries);

// GENRES
router.get('/films/genres', dashboardController.getAllGenres);
router.post('/films/genres', dashboardController.addMoreGenre);
router.post('/films/genres/:filmID', dashboardController.addGenreMovie);
router.get('/films/:filmID/genres', dashboardController.getGenresMovie);
router.post('/films/genres/:filmID/remove', dashboardController.removeGenreMovie);

// CAST
router.get('/films/casts', dashboardController.getAllCasts);
router.post('/films/casts', dashboardController.addMoreCast);
router.post('/films/casts/:filmID', dashboardController.addCastsMovie);
router.get('/films/:filmID/casts', dashboardController.getCastsMovie);
router.post('/films/casts/:filmID/remove', dashboardController.removeCastMovie);

// KEYWORDS
router.get('/films/keywords', dashboardController.getAllKeywords);
router.post('/films/keywords', dashboardController.addMoreKeyword);
router.post('/films/keywords/:filmID', dashboardController.addKeywordsMovie);
router.get('/films/:filmID/keywords', dashboardController.getKeywordsMovie);
router.post('/films/keywords/:filmID/remove', dashboardController.removeKeywordMovie);


router.get('/films/:filmID', dashboardController.getDetailMovie);
router.post('/films/:filmID', dashboardController.editDetailMovie);

module.exports = router;