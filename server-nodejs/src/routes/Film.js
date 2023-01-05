const express = require("express");
const router = express.Router();

const filmController = require("../controllers/FilmController");

router.get("/", filmController.getFilmList);
router.get("/rating", filmController.getFilmByRating);
router.get("/favorite", filmController.getFimByFavorite);

router.get("/filter", filmController.getFilmsByGenreAndCountry);
router.get("/genres", filmController.getGenres);
router.get("/genres/:genreID", filmController.getFilmsByGenre);
router.get("/countries", filmController.getContries);
router.get("/countries/:countryID", filmController.getFilmsByCountry);

router.get("/search", filmController.searchFilm);

router.get("/:filmID", filmController.getDetailFilm);
router.get("/:filmID/similar", filmController.getSimilarFilm);

router.get("/actor/:filmID", filmController.getActorFilm);

module.exports = router;
