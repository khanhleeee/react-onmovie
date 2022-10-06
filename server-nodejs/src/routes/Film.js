const express = require('express');
const router = express.Router();

const filmController = require('../controllers/FilmController');

router.get('/', filmController.getFilmList);

module.exports = router;