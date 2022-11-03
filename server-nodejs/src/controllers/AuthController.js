const mssql = require('mssql');
const { queryStatement } = require('../database/handleQuery');

module.exports = {
    login: async (req, res) => {
        try {
            let email = req.body.email;
            let password = req.body.password;
            const statement = 'SELECT * FROM USERS WHERE U_EMAIL = \'' + email + '\' AND U_PHONE = \'' + password + '\'';
            const result = await queryStatement(statement)
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
    register: async (req, res) => {
        try {
            let uid = req.body.uid;
            let name = req.body.name;
            let email = req.body.email;
            let password = req.body.password;
            let confirmPassword = req.body.confirmPassword;
            let avatar = "https://pbs.twimg.com/media/D8tCa48VsAA4lxn.jpg"

            if (name == '' || email == '' || password == '' || confirmPassword == '') {
                return res.status(400).json('Please fill all fields');
            }

            const statementCheckEmail = 'SELECT * FROM USERS WHERE U_EMAIL = \'' + email + '\'';
            const checkEmail = await queryStatement(statementCheckEmail);

            if (checkEmail.length != 0) {
                return res.status(401).json('Email already exists');
            }

            if (password != confirmPassword) {
                return res.status(401).json('Password does not match');
            }

            const statement = 'INSERT INTO USERS (U_ID, U_NAME, U_EMAIL, U_PHONE, U_AVATAR) VALUES (\'' + uid + '\', \'' + name + '\', \'' + email + '\', \'' + password + '\', \'' + avatar + '\')';
            const result = await queryStatement(statement);
            if (result.recordset.length > 0) {
                return res.status(200).json({
                    data: result.recordset
                });
            } else {
                return res.status(401).json('Register failed');
            }
        } catch (error) {
            res.status(500).json(error.message);
        }
    }
}