const { executeMultipleParams } = require("../database/handleQuery");
const { USER } = require("../constants/UserConstants");
const { TYPE } = require("../constants/TypeConstants");

module.exports = {
  login: async (req, res) => {
    try {
      let email = req.body.email;
      let password = req.body.password;

      const result = await executeMultipleParams("sp_getUser", [
        { name: "EMAIL", type: TYPE.varcharThirty, value: email },
        { name: "PASS", type: TYPE.charHundred, value: password },
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

      if (
        fullName == "" ||
        phoneNumber == "" ||
        email == "" ||
        password == "" ||
        confirmPassword == ""
      ) {
        return res.status(400).json("Please fill all fields");
      }

      const result = await executeMultipleParams("sp_addInforUser", [
        { name: "U_NAME", type: TYPE.nvarcharFifty, value: fullName },
        { name: "U_PHONE", type: TYPE.varCharEleven, value: phoneNumber },
        { name: "U_EMAIL", type: TYPE.varcharThirty, value: email },
        { name: "U_PASS", type: TYPE.varcharHundred, value: password },
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
      const result = await executeMultipleParams("sp_editInforUser", [
        { name: "U_ID", type: TYPE.int, value: userID },
        { name: "U_NAME", type: TYPE.nvarcharFifty, value: fullName },
        { name: "U_PHONE", type: TYPE.varCharEleven, value: phoneNumber },
      ]);
      console.log(result);
      return res.status(200).json({
        message: "Update successfully",
        data: {
          id: result.recordset[0][USER.id],
          email: result.recordset[0][USER.email],
          fullName: result.recordset[0][USER.name],
          phoneNumber: result.recordset[0][USER.phone],
          avatar: result.recordset[0][USER.avatar],
          role: result.recordset[0][USER.role_id],
        },
      });
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
};
