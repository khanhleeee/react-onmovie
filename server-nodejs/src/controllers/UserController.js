const { executeMultipleParams } = require('../database/handleQuery');
const { TYPE } = require('../constants/TypeConstants');

module.exports = {
  getWatchList: async (req, res) => {
    const userID = req.params.userID;
    try {
      const result = await executeMultipleParams('sp_getWatchlist', [{
        name: 'U_ID', type: TYPE.int, value: userID,
      }]);
      if (result.recordsets.length > 0) {
        res.status(200).json({
          total: result.recordset.length,
          data: result.recordset
        });
      } else {
        res.status(200).json({
          total: 0,
          data: []
        });
      }
    } catch (error) {
      console.log(error)
      res.status(500).json(error);
    }
  },
  addWatchList: async (req, res) => {
    try {
      let filmID = req.body.F_ID;
      let userID = req.body.U_ID;
      const result = await executeMultipleParams('sp_addFilmToWatchList', [
        { name: 'F_ID', type: TYPE.int, value: filmID },
        { name: 'U_ID', type: TYPE.int, value: userID },
      ]);
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
      const result = await executeMultipleParams('sp_removeFilmFromWatchList', [
        { name: 'F_ID', type: TYPE.int, value: filmID },
        { name: 'U_ID', type: TYPE.int, value: userID },
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