const mssql = require("mssql");

const Film = require("../models/Film");
const sqlConfig = require("../database/dbConnection");

module.exports = {
  getFilmList: async (req, res) => {
    try {
      const pool = await mssql.connect(sqlConfig);
      const per_page = 5;
      const page = parseInt(req.query.page);
      if (isNaN(page)) {
        var obj = {
          data: [],
        };
        const result = await pool.request().execute("sp_getFilmsByDate");
        for (let i = 0; i < result.recordset.length; i++) {
          obj.data.push(result.recordset[i]);
        }
      } else {
        const query = "SELECT COUNT (*) FROM FILMS";
        const count = await pool.request().query(query);
        const total = count.recordsets;
        const offset = (page - 1) * per_page;
        if (offset == 0) {
          const query = "SELECT TOP " + per_page + "* FROM FILMS";
          var obj = {
            page: 1,
            per_page: per_page,
            total: total[0][0][""],
            total_pages: total[0][0][""] / per_page,
            data: [],
          };
          const result = await pool.request().query(query);
          for (let i = 0; i < result.recordset.length; i++) {
            obj.data.push(result.recordset[i]);
          }
        } else {
          const query =
            "SELECT * FROM FILMS ORDER BY F_ID OFFSET " +
            offset +
            " ROWS FETCH NEXT " +
            offset +
            " ROWS ONLY ";
          var obj = {
            page: page,
            per_page: per_page,
            total: total[0][0][""],
            total_pages: total[0][0][""] / per_page,
            data: [],
          };
          const result = await pool.request().query(query);
          for (let i = 0; i < result.recordset.length; i++) {
            obj.data.push(result.recordset[i]);
          }
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
      const pool = await mssql.connect(sqlConfig);
      const query =
        "SELECT F.F_ID, F.F_OFFICIAL_NAME, F.F_PREFERENCED_NAME, F.F_DESC, F.F_RELEASEYEAR, F.F_AVGRATING, F.F_LIMITEDAGE, F.F_BACKCDROP, F.F_POSTER, F.C_ID, F.S_ID FROM FILM_KEYWORDS AS FKW, KEYWORDS AS KW, FILMS AS F WHERE FKW.KW_ID = KW.KW_ID AND FKW.F_ID = F.F_ID AND KW_TITLE = " +
        `'${q}'`;
      const result = await pool.request().query(query);
      if (result.recordset.length == 0) {
        const page = 1;
        const per_page = 5;
        const offset = (page - 1) * per_page;
        const query =
          "SELECT * FROM FILMS WHERE F_OFFICIAL_NAME LIKE " +
          `'${q}%'` +
          " ORDER BY F_ID OFFSET " +
          offset +
          " ROWS FETCH NEXT 5 ROWS ONLY";
        const result = await pool.request().query(query);
        var obj = {
          page: page,
          per_page: per_page,
          total: result.recordset.length,
          // total_pages: result.recordset.length / per_page,
          data: [],
        };
        for (let i = 0; i < result.recordset.length; i++) {
          obj.data.push(result.recordset[i]);
        }
        res.status(200).json(obj);
      } else {
        var obj = {
          data: [],
        };
        for (let i = 0; i < result.recordset.length; i++) {
          obj.data.push(result.recordset[i]);
        }
        res.status(200).json(obj);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getDetailFilm: async (req, res) => {
    const filmID = req.params.filmID;
    try {
      const pool = await mssql.connect(sqlConfig);
      const result = await pool
        .request()
        .input("F_ID", mssql.Char(5), filmID)
        .execute("sp_getFilmDetail");
      const findTrailer = await pool
        .request()
        .input("ID_FILM", mssql.Char(5), filmID)
        .execute("sp_getFilmTrailers");
      console.log(findTrailer);
      var obj = {
        F_ID: result.recordset[0].F_ID,
        F_OFFICIAL_NAME: result.recordset[0].F_OFFICIAL_NAME,
        F_PREFERENCED_NAME: result.recordset[0].F_PREFERENCED_NAME,
        F_DESC: result.recordset[0].F_DESC,
        F_RELEASEYEAR: result.recordset[0].F_RELEASEYEAR,
        F_AVGRATING: result.recordset[0].F_AVGRATING,
        F_LIMITEDAGE: result.recordset[0].F_LIMITEDAGE,
        F_BACKCDROP: result.recordset[0].F_BACKCDROP,
        F_POSTER: result.recordset[0].F_POSTER,
        C_ID: result.recordset[0].C_ID,
        S_ID: result.recordset[0].S_ID,
        F_TRAILER: findTrailer.recordset[0],
        G_NAME: [],
      };
      for (let i = 0; i < result.recordset.length; i++) {
        obj.G_NAME.push(result.recordset[i].G_NAME);
      }
      res.status(200).json(obj);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getSimilarFilm: async (req, res) => {
    const filmID = req.params.filmID;
    try {
      const pool = await mssql.connect(sqlConfig);
      const result = await pool
        .request()
        .input("F_ID", mssql.Char(5), filmID)
        .execute("sp_getSimilarFilms");
      var obj = {
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
      const pool = await mssql.connect(sqlConfig);
      const result = await pool
        .request()
        .input("F_ID", mssql.Char(5), filmID)
        .execute("sp_getFilmCredit");
      res.status(200).json(result.recordset);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
