const express = require('express');
const router = express.Router();

const movieController = require('../controllers/MovieController');

router.get('/', movieController.getMovie);
// router.post('/create', movieController.createMovie);

module.exports = router;