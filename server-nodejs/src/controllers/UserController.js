const mssql = require('mssql');
const { executeTwoParams, queryStatement } = require('../database/handleQuery');

module.exports = {
  getWatchList: async (req, res) => {
    const userID = req.params.userID;
    const query = `SELECT * FROM USERs_WATCHLIST WHERE U_ID = '${userID}'`;
    try {
      const result = await queryStatement(query);
      var obj = {
        U_ID: result.recordset[0].U_ID,
        F_ID: [],
      }
      for (let i = 0; i < result.recordset.length; i++) {
        obj.F_ID.push(result.recordset[i].F_ID);
      }
      res.status(200).json(obj);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  addWatchList: async (req, res) => {
    try {
      let filmID = req.body.F_ID;
      let userID = req.body.U_ID;
      const result = await executeTwoParams('sp_addFilmToWatchList', [
        { name: 'F_ID', type: mssql.Char(5), value: filmID },
        { name: 'U_ID', type: mssql.Char(5), value: userID },
      ]);
      console.log(result.recordset);
      if (result.recordset == undefined) {
        res.status(200).json('Film already in watch list');
      } else {
        var obj = {
          U_ID: result.recordset[0].U_ID,
          F_ID: [],
        }
        for (let i = 0; i < result.recordset.length; i++) {
          obj.F_ID.push(result.recordset[i].F_ID);
        }
        res.status(200).json(obj);
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  removeWatchList: async (req, res) => {
    try {
      let filmID = req.body.F_ID;
      let userID = req.body.U_ID;
      const result = await executeTwoParams('sp_removeFilmFromWatchList', [
        { name: 'F_ID', type: mssql.Char(5), value: filmID },
        { name: 'U_ID', type: mssql.Char(5), value: userID },
      ]);
      if (result.recordset == undefined) {
        res.status(200).json('Film not in watch list');
      } else {
        var obj = {
          U_ID: result.recordset[0].U_ID,
          F_ID: [],
        }
        for (let i = 0; i < result.recordset.length; i++) {
          obj.F_ID.push(result.recordset[i].F_ID);
        }
        res.status(200).json(obj);
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  },
}