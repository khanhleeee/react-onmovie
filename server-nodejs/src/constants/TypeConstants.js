const mssql = require("mssql");
const { NUMBER } = require("./NumberConstants");

module.exports.TYPE = {
  int: mssql.Int,
  tinyInt: mssql.TinyInt,
  smallDateTime: mssql.SmallDateTime,
  bit: mssql.Bit,
  max: mssql.VarChar(mssql.MAX),
  tvp: mssql.TVP,

  varCharEight: mssql.VarChar(NUMBER.eight),
  varCharEleven: mssql.VarChar(NUMBER.eleven),
  varCharTwentyFive: mssql.VarChar(NUMBER.twentyFive),
  varcharFifty: mssql.VarChar(NUMBER.fifty),
  varcharThirty: mssql.VarChar(NUMBER.thirty),
  varcharHundred: mssql.VarChar(NUMBER.hundred),

  charThree: mssql.Char(NUMBER.three),
  charFive: mssql.Char(NUMBER.five),
  charTen: mssql.Char(NUMBER.ten),
  charHundred: mssql.Char(NUMBER.hundred),

  nvarcharTwenty: mssql.NVarChar(NUMBER.twenty),
  nvarcharThirty: mssql.NVarChar(NUMBER.thirty),
  nvarcharFifty: mssql.NVarChar(NUMBER.fifty),
  nvarcharHundred: mssql.NVarChar(NUMBER.hundred),
  nvarcharThousand: mssql.NVarChar(NUMBER.thousand),
};
