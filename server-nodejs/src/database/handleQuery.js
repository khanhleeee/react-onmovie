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
  execute: (procedure) => {
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
  },
  executeOneParam: (procedure, params1) => {
    return new Promise((resolve, reject) => {
      pool
        .then((pool) => {
          return pool.request()
            .input(params1.name, params1.type, params1.value)
            .execute(procedure);
        })
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  executeTwoParams: (procedure, [params1, params2]) => {
    return new Promise((resolve, reject) => {
      pool
        .then((pool) => {
          return pool.request()
            .input(params1.name, params1.type, params1.value)
            .input(params2.name, params2.type, params2.value)
            .execute(procedure);
        })
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};