const { executeMultipleParams } = require("../database/handleQuery");
const { USER } = require("../constants/UserConstants");
const { TYPE } = require("../constants/TypeConstants");
const dotenv = require("dotenv");
dotenv.config();
const mssql = require("mssql");

module.exports = {
  login: async (req, res) => {
    try {
      let email = req.body.email;
      let password = req.body.password;

      const dbConnection = {
        user: email,
        password: password,
        database: process.env.DB_NAME,
        server: "localhost",
        port: 64265 || process.env.DB_PORT,
        options: {
          encrypt: true,
          enableArithAbort: true,
          trustServerCertificate: true,
        },
      };
      await mssql.connect(dbConnection);
      const request = new mssql.Request();
      const result = await request
        .input("EMAIL", email)
        .input("PASS", password)
        .execute("sp_getUser");

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
      return res.status(500).json(err.message);
    }
  },
  register: async (req, res) => {
    try {
      let fullName = req.body.fullName;
      let phoneNumber = req.body.phoneNumber;
      let email = req.body.email;
      let password = req.body.password;
      let confirmPassword = req.body.confirmPassword;

      if (
        fullName == "" ||
        phoneNumber == "" ||
        email == "" ||
        password == "" ||
        confirmPassword == ""
      ) {
        return res.status(400).json("Please fill all fields");
      }

      if (password !== confirmPassword) {
        return res
          .status(400)
          .json("Password and Confirm Password are not match");
      }

      const result = await executeMultipleParams("sp_addInforUser", [
        { name: "U_NAME", type: TYPE.nvarcharFifty, value: fullName },
        { name: "U_PHONE", type: TYPE.varCharEleven, value: phoneNumber },
        { name: "U_EMAIL", type: TYPE.varcharFifty, value: email },
        { name: "U_PASS", type: TYPE.varcharHundred, value: password },
      ]);

      return res.status(200).json({
        message: "Register successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(error.message);
    }
  },
  updateUser: async (req, res) => {
    try {
      let userID = req.params.userID;
      let fullName = req.body.fullName;
      let phoneNumber = req.body.phoneNumber;
      const result = await executeMultipleParams("sp_editInforUser", [
        { name: "U_ID", type: TYPE.int, value: userID },
        { name: "U_NAME", type: TYPE.nvarcharFifty, value: fullName },
        { name: "U_PHONE", type: TYPE.varCharEleven, value: phoneNumber },
      ]);
      return res.status(200).json({
        message: "Update successfully",
        data: {
          [USER.id]: result.recordset[0][USER.id],
          [USER.email]: result.recordset[0][USER.email],
          [USER.name]: result.recordset[0][USER.name],
          [USER.phone]: result.recordset[0][USER.phone],
          [USER.avatar]: result.recordset[0][USER.avatar],
          [USER.role_id]: result.recordset[0][USER.role_id],
        },
      });
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
};
