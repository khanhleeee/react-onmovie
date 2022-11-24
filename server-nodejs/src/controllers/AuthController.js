const mssql = require('mssql');
const bcrypt = require('bcrypt');
const { queryStatement, executeMultipleParams } = require('../database/handleQuery');
const { USER } = require('../constants/UserConstants');

module.exports = {
  login: async (req, res) => {
    try {
      let email = req.body.email;
      let password = req.body.password;
      const result = await executeMultipleParams('sp_getUser', [
        { name: 'EMAIL', type: mssql.VarChar(30), value: email },
        { name: 'PASS', type: mssql.Char(100), value: password },
      ]);
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
      console.log(err);
      return res.status(500).json(err);
    }
  },
  register: async (req, res) => {
    try {
      let fullName = req.body.fullName;
      let phoneNumber = req.body.phoneNumber;
      let email = req.body.email;
      let password = req.body.password;
      let confirmPassword = req.body.confirmPassword;
      let avatar = "https://pbs.twimg.com/media/D8tCa48VsAA4lxn.jpg";
      let role = "USER";

      if (
        fullName == "" ||
        phoneNumber == "" ||
        email == "" ||
        password == "" ||
        confirmPassword == ""
      ) {
        return res.status(400).json("Please fill all fields");
      }

      const statementCheckEmail =
        "SELECT * FROM USERS WHERE U_EMAIL = '" + email + "'";
      const checkEmail = await queryStatement(statementCheckEmail);

      if (checkEmail.recordset.length != 0) {
        return res.status(401).json('Email already exists');
      }

      if (password.length < 8) {
        return res.status(401).json('Password must be at least 8 characters');
      }

      if (confirmPassword.length < 8) {
        return res
          .status(401)
          .json("Confirm Password must be at least 8 characters");
      }

      if (password != confirmPassword) {
        return res.status(401).json("Password and confirm password must match");
      }

      // const salt = await bcrypt.genSalt(10);
      // const hashPassword = await bcrypt.hash(password, salt);

      const result = await executeMultipleParams('sp_addInforUser', [
        { name: 'U_NAME', type: mssql.NVarChar(50), value: fullName },
        { name: 'U_PHONE', type: mssql.VarChar(10), value: phoneNumber },
        { name: 'U_EMAIL', type: mssql.VarChar(25), value: email },
        { name: 'U_PASS', type: mssql.VarChar(8), value: password }
      ]);
      return res.status(200).json({
        message: "Register successfully",
      });
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
  updateUser: async (req, res) => {
    try {
      let userID = req.params.userID;
      let fullName = req.body.fullName;
      let phoneNumber = req.body.phoneNumber;
      const result = await executeMultipleParams('sp_editInforUser', [
        { name: 'U_ID', type: mssql.Int, value: userID },
        { name: 'U_NAME', type: mssql.NVarChar(50), value: fullName },
        { name: 'U_PHONE', type: mssql.VarChar(11), value: phoneNumber },
      ]);
      return res.status(200).json({
        message: 'Update successfully',
        data: {
          id: result.recordset[0].U_ID,
          email: result.recordset[0].U_EMAIL,
          fullName: result.recordset[0].U_NAME,
          phoneNumber: result.recordset[0].U_PHONE,
          avatar: result.recordset[0].U_AVATAR,
          role: result.recordset[0].R_ID,
        },
      });
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
}