const mssql = require("mssql");

const dbConnection = require("../database/dbConnection");
const pool = mssql.connect(dbConnection);

module.exports = {
  queryStatement: function (statement) {
    return new Promise((resolve, reject) => {
      pool
        .then((pool) => {
          return pool.request().query(statement);
        })
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  executeMultipleParams: (procedure, [...params]) => {
    if (params.length === 0) {
      return new Promise((resolve, reject) => {
        pool
          .then((pool) => {
            return pool.request().execute(procedure);
          })
          .then((result) => {
            resolve(result);
          })
          .catch((err) => {
            reject(err);
          });
      });
    } else {
      return new Promise((resolve, reject) => {
        pool
          .then((pool) => {
            const request = pool.request();
            params.forEach((param) => {
              request.input(param.name, param.type, param.value);
            });
            return request.execute(procedure);
          })
          .then((result) => {
            resolve(result);
          })
          .catch((err) => {
            reject(err);
          });
      });
    }
  },
};
