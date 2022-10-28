const mssql = require('mssql');
const sqlConfig = require('../database/dbConnection');

module.exports = {
    login: async (req, res) => {
        try {
            let email = req.body.email;
            let password = req.body.password;
            const pool = await mssql.connect(sqlConfig);
            const query = 'SELECT * FROM USERS WHERE U_EMAIL = \'' + email + '\' AND U_PHONE = \'' + password + '\'';
            const result = await pool.request().query(query);
            if (result.recordset.length != 0) {
                return res.status(200).json({
                    message: 'Login successfully',
                    data: result.recordset
                });
            } else {
                return res.status(401).json('Wrong email or password');
            }
        } catch (error) {
            res.status(500).json(error.message);
        }
    },
}