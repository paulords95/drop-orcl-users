const oracledb = require("oracledb");
require("dotenv").config();
const { USER, PASSWORD, CONNECTIONSTRING } = require("./password");

const user = USER;
const password = PASSWORD;
const connectString = CONNECTIONSTRING;

const dbConnectSelect = async (req, res, query, ...parameters) => {
  try {
    connection = await oracledb.getConnection({
      user,
      password,
      connectString,
    });

    result = await connection.execute(query, [...parameters]);
  } catch (err) {
    return err.message;
  } finally {
    if (connection) {
      try {
        await connection.close();
        if (result.rows.length == 0) {
          return "query não retornou nada";
        } else {
          return result;
        }
      } catch (err) {
        console.error(err.message);
      }
    }
  }
};

const dbConnectInsert = async (req, res, query, ...parameters) => {
  try {
    connection = await oracledb.getConnection({
      user,
      password,
      connectString,
    });

    console.log("Conectado a base");
    result = await connection.execute(query, [...parameters], {
      autoCommit: true,
    });
    return result;
  } catch (err) {
    console.log(err);
    return err.message;
  } finally {
    if (connection) {
      try {
        await connection.close();
        console.log("Conexão fechada");
      } catch (err) {
        console.error(err.message);
      }
    }
  }
};

exports.dbConnectSelect = dbConnectSelect;
exports.dbConnectInsert = dbConnectInsert;
