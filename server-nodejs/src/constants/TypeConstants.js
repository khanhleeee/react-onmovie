const mssql = require("mssql");
const { NUMBER } = require("./NumberConstants");

module.exports.TYPE = {
  int: mssql.Int,
  smallDateTime: mssql.SmallDateTime,

  max: mssql.VarChar(mssql.MAX),

  varCharEight: mssql.VarChar(NUMBER.eight),
  varCharEleven: mssql.VarChar(NUMBER.eleven),
  varCharTwentyFive: mssql.VarChar(NUMBER.twentyFive),
  varcharThirty: mssql.VarChar(NUMBER.thirty),
  varcharHundred: mssql.VarChar(NUMBER.hundred),
  
  charThree: mssql.Char(NUMBER.three),
  charFive: mssql.Char(NUMBER.five),
  charTen: mssql.Char(NUMBER.ten),
  charHundred: mssql.Char(NUMBER.hundred),

  nvarcharTwenty: mssql.Char(NUMBER.twenty),
  nvarcharFifty: mssql.Char(NUMBER.fifty),
  nvarcharHundred: mssql.NVarChar(NUMBER.hundred),
  nvarcharThousand: mssql.NVarChar(NUMBER.thousand),
}