const express = require('express');
const router = express.Router();

const filmController = require('../controllers/FilmController');

router.get('/', filmController.getFilmList);
router.get('/search', filmController.searchFilm);
router.get('/:filmID', filmController.getDetailFilm);
router.get('/actor/:filmID', filmController.getActorFilm);

module.exports = router;