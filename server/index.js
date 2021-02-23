const express = require("express");
const app = express();
const port = 5000;

const { dbConnectSelect, dbConnectInsert } = require("./db-connect");

const selectr911Sec = async (req, res, user) => {
  const selectUsers = `select * from r911sec where usrnam = :usr`;

  const result = await dbConnectSelect(req, res, selectUsers, user);
  return result;
};

const selectr911Mod = async (req, res, numsec) => {
  const selectUsers = `select * from r911Mod where numsec = :numsec`;
  const result = await dbConnectSelect(req, res, selectUsers, numsec);
  return result;
};

app.get("/connected/sec/:user", async (req, res) => {
  const params = {
    usr: req.params.user.toString(),
  };

  try {
    const response = await selectr911Sec(req, res, params.usr);
    if (response.statusCode == 304) {
      res.send("1");
    } else if (response == "query não retornou nada") {
      res.send("Usuário não encontrado");
    } else {
      const result = {
        NUMSEC: response.rows[0][0],
        DATTIM: response.rows[0][1],
        COMNAM: response.rows[0][2],
        USRNAM: response.rows[0][3],
        APPNAM: response.rows[0][4],
        APPUSR: response.rows[0][5],
        IDINST: response.rows[0][6],
        ADMMSG: response.rows[0][7],
        APPKND: response.rows[0][8],
      };
      const numsec = await selectr911Mod(req, res, response.rows[0][0]);
      if (numsec.rows.length > 0) {
        console.log(numsec.rows);
      } else {
        console.log(numsec);
      }
      res.send(result);
    }
  } catch (error) {
    console.log(error);
  }
});

app.get("/connected/mod", async (req, res) => {
  try {
    const response = await selectr911Mod(req, res, "10262994");
    if (response.statusCode == 304) {
      res.send(0);
    } else {
      res.send(response);
    }
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(port, "0.0.0.0", () =>
  console.log("Servidor rodando na porta: ", port)
);
