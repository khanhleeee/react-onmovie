const mssql = require('mssql');
const { executeTwoParams } = require('../database/handleQuery');

module.exports = {
  addWatchList: async (req, res) => {
    try {
      let filmID = req.body.filmID;
      let userID = req.body.userID;
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
      let filmID = req.body.filmID;
      let userID = req.body.userID;
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