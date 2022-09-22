const express = require('express');
const router = express.Router();

const genreController = require('../controllers/GenreController');

router.get('/', genreController.getGenre);

module.exports = router;