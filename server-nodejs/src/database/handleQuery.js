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
  executeThreeParams: (procedure, [params1, params2, params3]) => {
    return new Promise((resolve, reject) => {
      pool
        .then((pool) => {
          return pool.request()
            .input(params1.name, params1.type, params1.value)
            .input(params2.name, params2.type, params2.value)
            .input(params3.name, params3.type, params3.value)
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
  executeSixParams: (procedure, [params1, params2, params3, params4, params5, params6]) => {
    return new Promise((resolve, reject) => {
      pool
        .then((pool) => {
          return pool.request()
            .input(params1.name, params1.type, params1.value)
            .input(params2.name, params2.type, params2.value)
            .input(params3.name, params3.type, params3.value)
            .input(params4.name, params4.type, params4.value)
            .input(params5.name, params5.type, params5.value)
            .input(params6.name, params6.type, params6.value)
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
  executeElevenParams(procedure, [params1, params2, params3, params4, params5, params6, params7, params8, params9, params10, params11]) {
    return new Promise((resolve, reject) => {
      pool
        .then((pool) => {
          return pool.request()
            .input(params1.name, params1.type, params1.value)
            .input(params2.name, params2.type, params2.value)
            .input(params3.name, params3.type, params3.value)
            .input(params4.name, params4.type, params4.value)
            .input(params5.name, params5.type, params5.value)
            .input(params6.name, params6.type, params6.value)
            .input(params7.name, params7.type, params7.value)
            .input(params8.name, params8.type, params8.value)
            .input(params9.name, params9.type, params9.value)
            .input(params10.name, params10.type, params10.value)
            .input(params11.name, params11.type, params11.value)
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