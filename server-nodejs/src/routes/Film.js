const express = require("express");
const router = express.Router();

const filmController = require("../controllers/FilmController");

router.get("/", filmController.getFilmList);
router.get("/genres", filmController.getGenres);
router.get("/countries", filmController.getContries);
router.get("/search", filmController.searchFilm);
router.get("/:filmID", filmController.getDetailFilm);
router.get("/:filmID/similar", filmController.getSimilarFilm);
router.get("/actor/:filmID", filmController.getActorFilm);
router.get("/genre/:id", filmController.getFilmsByGenre);

module.exports = router;
