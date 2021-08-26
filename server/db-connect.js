const oracledb = require("oracledb");
require("dotenv").config();
const { USER, PASSWORD, CONNECTIONSTRING } = require("./password");

const user = USER;
const password = PASSWORD;
const connectString = CONNECTIONSTRING;

const db = async (query, ...parameters) => {
  try {
    connection = await oracledb.getConnection({
      user,
      password,
      connectString,
    });

    result = await connection.execute(query, [...parameters], {
      autoCommit: true,
    });
    return result;
  } catch (err) {
    return err.message;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

exports.db = db;
