const { executeMultipleParams } = require("../database/handleQuery");
const { FILM } = require("../constants/FilmConstants");
const { USER } = require("../constants/UserConstants");
const { GENRE } = require("../constants/GenreConstants");
const { COUNTRY } = require("../constants/CountryConstants");
const { TYPE } = require("../constants/TypeConstants");
const { CAST } = require("../constants/CastConstants");
const { KEYWORD } = require("../constants/KeywordConstants");

const mssql = require("mssql");
module.exports = {
  getMoviesList: async (req, res) => {
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
  getDetailMovie: async (req, res) => {
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
          name: "F_ID",
          type: TYPE.int,
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
        C_ID: result.recordset[0][COUNTRY.id],
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
  addMovie: async (req, res) => {
    const data = req.body.film;
    try {
      const details = {
        F_OFFICIAL_NAME: data.detailValues[FILM.name],
        F_DESC: data.detailValues[FILM.desc],
        F_RELEASE_DATE: data.detailValues[FILM.release_date],
        F_BACKDROP: data.detailValues[FILM.backdrop],
        F_POSTER: data.detailValues[FILM.poster],
        F_AGE: data.detailValues[FILM.age],
        C_ID: data.detailValues[COUNTRY.id],
        SOURCE_ID: data.detailValues[FILM.sourceID],
        TRAILER_ID: data.detailValues[FILM.trailerID],
        strGenres: data.movieGenres,
        strCasts: data.movieCasts,
        strKeywords: data.movieKeywords,
      };

      var genreTable = new mssql.Table();
      genreTable.columns.add("G_ID", TYPE.int);

      var keywordTable = new mssql.Table();
      keywordTable.columns.add("KW_ID", TYPE.int);

      var castTable = new mssql.Table();
      castTable.columns.add("F_ID", TYPE.int);
      for (let i in details.strGenres) {
        genreTable.rows.add(details.strGenres[i]["G_ID"]);
      }
      for (let i in details.strKeywords) {
        keywordTable.rows.add(details.strKeywords[i]["KW_ID"]);
      }
      for (let i in details.strCasts) {
        castTable.rows.add(details.strCasts[i]["ANC_ID"]);
      }

      const results = await executeMultipleParams("sp_ADDFILM", [
        {
          name: "F_OFFCIAL_NAME",
          type: TYPE.nvarcharHundred,
          value: details.F_OFFICIAL_NAME,
        },
        {
          name: "F_DESC",
          type: TYPE.nvarcharThousand,
          value: details.F_DESC,
        },
        {
          name: "F_RELEASE_DATE",
          type: TYPE.smallDateTime,
          value: details.F_RELEASE_DATE,
        },
        {
          name: "F_AGE",
          type: TYPE.int,
          value: details.F_AGE,
        },
        {
          name: "F_BACKDROP",
          type: TYPE.max,
          value: details.F_BACKDROP,
        },
        {
          name: "F_POSTER",
          type: TYPE.max,
          value: details.F_POSTER,
        },
        {
          name: "C_ID",
          type: TYPE.charThree,
          value: details.C_ID,
        },
        {
          name: "GENRES",
          type: TYPE.tvp,
          value: genreTable,
        },
        {
          name: "KEYWORDS",
          type: TYPE.tvp,
          value: keywordTable,
        },
        {
          name: "CASTS",
          type: TYPE.tvp,
          value: castTable,
        },
        {
          name: "SOURCE_ID",
          type: TYPE.int,
          value: details.SOURCE_ID,
        },
        {
          name: "TRAILER_ID",
          type: TYPE.int,
          value: details.TRAILER_ID,
        },
      ]);
      res.status(200).json("Add movie successfully");
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  editDetailMovie: async (req, res) => {
    const filmID = req.params.filmID;
    const name = req.body[FILM.name];
    const release_date = req.body[FILM.release_date];
    const poster = req.body[FILM.poster];
    const backdrop = req.body[FILM.backdrop];
    const desc = req.body[FILM.desc];
    const age = req.body[FILM.age];
    const cID = req.body[COUNTRY.id];
    const status = 2;
    try {
      const result = await executeMultipleParams("sp_editDetailsFilm", [
        { name: "F_ID", type: TYPE.int, value: filmID },
        {
          name: "F_OFFICIAL_NAME",
          type: TYPE.nvarcharHundred,
          value: name,
        },
        { name: "F_DESC", type: TYPE.nvarcharThousand, value: desc },
        {
          name: "F_RELEASE_DATE",
          type: TYPE.smallDateTime,
          value: release_date,
        },
        { name: "F_AGE", type: TYPE.tinyInt, value: age },
        {
          name: "F_BACKDROP",
          type: TYPE.max,
          value: backdrop,
        },
        {
          name: "F_POSTER",
          type: TYPE.max,
          value: poster,
        },
        {
          name: "S_ID",
          type: TYPE.int,
          value: status,
        },
        { name: "C_ID", type: TYPE.charThree, value: cID },
      ]);
      res.status(200).json({
        data: result.recordset,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // GENRES
  getAllGenres: async (req, res) => {
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
  addMoreGenre: async (req, res) => {
    const genreName = req.body.genre;
    try {
      const result = await executeMultipleParams("sp_addGenre", [
        { name: "G_NAME", type: TYPE.nvarcharThirty, value: genreName },
      ]);
      res.status(200).json({
        data: result.recordset,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getGenresMovie: async (req, res) => {
    const filmID = req.params.filmID;
    try {
      const result = await executeMultipleParams("sp_getGenresOfFilm", [
        { name: "F_ID", type: TYPE.int, value: filmID },
      ]);
      res.status(200).json({
        total: result.recordset.length,
        data: result.recordset,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  addGenreMovie: async (req, res) => {
    const filmID = req.params.filmID;
    const genres = req.body.genre;
    try {
      const result = await executeMultipleParams("sp_addGenreToFilm", [
        { name: "F_ID", type: TYPE.int, value: filmID },
        {
          name: "G_ID",
          type: TYPE.int,
          value: genres,
        },
      ]);
      res.status(200).json({
        data: result.recordset,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  removeGenreMovie: async (req, res) => {
    const filmID = req.params.filmID;
    const genres = req.body.genre;
    try {
      const result = await executeMultipleParams("sp_removeGenreToFilm ", [
        { name: "F_ID", type: TYPE.int, value: filmID },
        {
          name: "G_ID",
          type: TYPE.int,
          value: genres,
        },
      ]);
      res.status(200).json({
        data: result.recordset,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // CAST
  getAllCasts: async (req, res) => {
    try {
      const result = await executeMultipleParams("sp_getCasts", []);
      const obj = result.recordset.map((item) => {
        return {
          [CAST.id]: item[CAST.id],
          [CAST.name]: item[CAST.name],
          [CAST.avatar]: item[CAST.avatar],
        };
      });
      res.status(200).json({
        total: result.recordset.length,
        data: obj,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  addMoreCast: async (req, res) => {
    const castName = req.body.ANC_NAME;
    const castAvatar = req.body.ANC_AVATAR;
    const R_ID = 1;
    try {
      const result = await executeMultipleParams("dbo.sp_addCast", [
        { name: "ANC_NAME", type: TYPE.nvarcharThirty, value: castName },
        { name: "ANC_AVATAR", type: TYPE.max, value: castAvatar },
        { name: "R_ID", type: TYPE.int, value: R_ID },
      ]);
      res.status(200).json({
        data: result.recordset,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getCastsMovie: async (req, res) => {
    const filmID = req.params.filmID;
    try {
      const result = await executeMultipleParams("sp_getFilmCredit", [
        { name: "F_ID", type: TYPE.int, value: filmID },
      ]);
      res.status(200).json({
        total: result.recordset.length,
        data: result.recordset,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  addCastsMovie: async (req, res) => {
    const filmID = req.params.filmID;
    const casts = req.body.cast;
    try {
      const result = await executeMultipleParams("sp_addCastToFilm", [
        { name: "F_ID", type: TYPE.int, value: filmID },
        {
          name: "ANC_ID",
          type: TYPE.int,
          value: casts,
        },
      ]);
      res.status(200).json({
        data: result.recordset,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  removeCastMovie: async (req, res) => {
    const filmID = req.params.filmID;
    const castID = req.body.cast;
    try {
      const result = await executeMultipleParams("sp_removeCastToFilm", [
        { name: "F_ID", type: TYPE.int, value: filmID },
        {
          name: "ANC_ID",
          type: TYPE.int,
          value: castID,
        },
      ]);
      res.status(200).json({
        data: result.recordset,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // KEYWORD
  getAllKeywords: async (req, res) => {
    try {
      const result = await executeMultipleParams("sp_getKeywords", []);
      const obj = result.recordset.map((item) => {
        return {
          [KEYWORD.id]: item[KEYWORD.id],
          [KEYWORD.name]: item[KEYWORD.name],
        };
      });
      res.status(200).json({
        total: result.recordset.length,
        data: obj,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  addMoreKeyword: async (req, res) => {
    const keyword = req.body.keyword;
    try {
      const result = await executeMultipleParams("sp_addKeyword", [
        { name: "KW_NAME", type: TYPE.varcharThirty, value: keyword },
      ]);
      res.status(200).json({
        data: result.recordset,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getKeywordsMovie: async (req, res) => {
    const filmID = req.params.filmID;
    try {
      const result = await executeMultipleParams("sp_getKeywordOfFilm", [
        { name: "F_ID", type: TYPE.int, value: filmID },
      ]);
      res.status(200).json({
        total: result.recordset.length,
        data: result.recordset,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  addKeywordsMovie: async (req, res) => {
    const filmID = req.params.filmID;
    const keyword = req.body.keyword;
    try {
      const result = await executeMultipleParams("sp_addKeyWordToFilm", [
        { name: "F_ID", type: TYPE.int, value: filmID },
        {
          name: "KW_ID",
          type: TYPE.int,
          value: keyword,
        },
      ]);
      res.status(200).json({
        data: result.recordset,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  removeKeywordMovie: async (req, res) => {
    const filmID = req.params.filmID;
    const keywordID = req.body.keyword;
    try {
      const result = await executeMultipleParams("sp_removeKeyWordToFilm", [
        { name: "F_ID", type: TYPE.int, value: filmID },
        {
          name: "KW_ID",
          type: TYPE.int,
          value: keywordID,
        },
      ]);
      res.status(200).json({
        data: result.recordset,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // COUNTRY
  getAllCountries: async (req, res) => {
    try {
      const result = await executeMultipleParams("sp_getCountries", []);
      res.status(200).json({
        total: result.recordset.length,
        data: result.recordset,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //Login
  login: async (req, res) => {
    try {
      let email = req.body.email;
      let password = req.body.password;

      const dbConnection = {
        user: email,
        password: password,
        database: process.env.DB_NAME,
        server: "localhost",
        port: 64265 || process.env.DB_PORT,
        options: {
          encrypt: true,
          enableArithAbort: true,
          trustServerCertificate: true,
        },
      };
      await mssql.connect(dbConnection);
      const request = new mssql.Request();
      const result = await request
        .input("EMAIL", email)
        .input("PASS", password)
        .execute("sp_getAdmin");
        
      if (result.recordset === undefined) {
        return res.status(401).json("Email or Password is incorrect");
      } else {
        return res.status(200).json({
          message: "Login successfully",
          data: {
            U_ID: result.recordset[0][USER.id],
            U_EMAIL: result.recordset[0][USER.email],
            U_NAME: result.recordset[0][USER.name],
            U_PHONE: result.recordset[0][USER.phone],
            U_AVATAR: result.recordset[0][USER.avatar],
            U_ROLE: result.recordset[0][USER.role_id],
          },
        });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json(err.message);
    }
  },
};
