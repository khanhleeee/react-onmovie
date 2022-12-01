const { executeMultipleParams } = require("../database/handleQuery");
const { FILM } = require("../constants/FilmConstants");
const { GENRE } = require("../constants/GenreConstants");
const { COUNTRY } = require("../constants/CountryConstants");
const { TYPE } = require("../constants/TypeConstants");

module.exports = {
  getFilmList: async (req, res) => {
    try {
      const page = parseInt(req.query.page);
      const perPage = parseInt(req.query.perPage);
      if (isNaN(page) || page === 0) {
        const result = await executeMultipleParams("sp_getFilmsByDate", []);
        var obj = {
          total: result.recordset.length,
          data: [],
        };
        for (let i = 0; i < result.recordset.length; i++) {
          obj.data.push(result.recordset[i]);
        }
      } else {
        const result = await executeMultipleParams("sp_pagination", [
          { name: "PAGENUMBER", type: TYPE.int, value: page },
          { name: "PAGESIZE", type: TYPE.int, value: perPage },
        ]);
        var obj = {
          page: page,
          per_page: perPage,
          // total: result.recordset.length,
          // total_pages: Math.ceil(result.recordset.length / perPage),
          data: [],
        };
        for (let i = 0; i < result.recordset.length; i++) {
          obj.data.push(result.recordset[i]);
        }
      }
      res.status(200).json(obj);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  searchFilm: async (req, res) => {
    const q = req.query.q;
    try {
      const result = await executeMultipleParams("sp_searchFilms", [
        {
          name: "KEYWORD",
          type: TYPE.nvarcharHundred,
          value: q,
        },
      ]);
      var obj = {
        total: result.recordset.length,
        data: [],
      };
      for (let i = 0; i < result.recordset.length; i++) {
        obj.data.push(result.recordset[i]);
      }
      res.status(200).json(obj);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getDetailFilm: async (req, res) => {
    const filmID = req.params.filmID;
    try {
      const result = await executeMultipleParams("sp_getFilmDetail", [
        {
          name: "F_ID",
          type: TYPE.int,
          value: filmID,
        },
      ]);
      const findGenre = await executeMultipleParams("sp_getGenresOfFilm", [
        {
          name: "F_ID",
          type: TYPE.charFive,
          value: filmID,
        },
      ]);
      const findTrailer = await executeMultipleParams("sp_getFilmTrailers", [
        {
          name: "ID_FILM",
          type: TYPE.charFive,
          value: filmID,
        },
      ]);
      var obj = {
        F_ID: result.recordset[0][FILM.id],
        F_OFFICIAL_NAME: result.recordset[0][FILM.name],
        F_DESC: result.recordset[0][FILM.desc],
        F_RELEASE_DATE: result.recordset[0][FILM.release_date],
        F_AVG: result.recordset[0][FILM.avg],
        F_AGE: result.recordset[0][FILM.age],
        F_BACKDROP: result.recordset[0][FILM.backdrop],
        F_POSTER: result.recordset[0][FILM.poster],
        S_NAME: result.recordset[0][FILM.status],
        C_NAME: result.recordset[0][COUNTRY.name],
        F_TRAILER: findTrailer.recordset[0],
        G_NAME: [],
      };
      for (let i = 0; i < findGenre.recordset.length; i++) {
        obj.G_NAME.push(findGenre.recordset[i][GENRE.name]);
      }
      res.status(200).json({ data: obj });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getSimilarFilm: async (req, res) => {
    const filmID = req.params.filmID;
    try {
      const result = await executeMultipleParams("sp_getSimilarFilms", [
        {
          name: "F_ID",
          type: TYPE.charFive,
          value: filmID,
        },
      ]);
      var obj = {
        total: result.recordset.length,
        data: [],
      };
      for (let i = 0; i < result.recordset.length; i++) {
        obj.data.push(result.recordset[i]);
      }
      res.status(200).json(obj);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getActorFilm: async (req, res) => {
    const filmID = req.params.filmID;
    try {
      const result = await executeMultipleParams("sp_getFilmCredit", [
        {
          name: "F_ID",
          type: TYPE.charFive,
          value: filmID,
        },
      ]);
      var obj = {
        total: result.recordset.length,
        data: [],
      };
      for (let i = 0; i < result.recordset.length; i++) {
        obj.data.push(result.recordset[i]);
      }
      res.status(200).json(obj);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getFilmsByGenreAndCountry: async (req, res) => {
    const genreID = req.query.g;
    const countryID = req.query.c;
    try {
      const result = await executeMultipleParams("sp_FilmByGenreAndNation", [
        {
          name: "GENRE_ID",
          type: TYPE.nvarcharTwenty,
          value: genreID,
        },
        {
          name: "COUNTRY_ID",
          type: TYPE.charFive,
          value: countryID,
        },
      ]);
      res.status(200).json({
        total: result.recordset.length,
        data: result.recordset,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getGenres: async (req, res) => {
    try {
      const result = await executeMultipleParams("sp_getGenres", []);
      res.status(200).json({
        total: result.recordset.length,
        data: result.recordset,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getFilmsByGenre: async (req, res) => {
    const genreID = req.params.genreID;
    try {
      const result = await executeMultipleParams("sp_getFilmsByGenre", [
        {
          name: "G_ID",
          type: TYPE.charTen,
          value: genreID,
        },
      ]);
      res.status(200).json({
        total: result.recordset.length,
        data: result.recordset,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getContries: async (req, res) => {
    try {
      const result = await executeMultipleParams("sp_getCountries", []);
      res.status(200).json({
        total: result.recordset.length,
        data: result.recordset,
      })
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getFilmsByCountry: async (req, res) => {
    const countryID = req.params.countryID;
    try {
      const result = await executeMultipleParams("sp_getFilmsByNation", [
        {
          name: "C_ID",
          type: TYPE.charThree,
          value: countryID,
        },
      ]);
      res.status(200).json({
        total: result.recordset.length,
        data: result.recordset,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
