const express = require("express");
const app = express();
const port = 5000;

const { dbConnectSelect, dbConnectInsert } = require("./db-connect");

const selectr911Sec = async (req, res) => {
  const selectUsers = `select * from r911sec where usrnam = :usr`;

  const params = {
    usr: req.params.user.toString(),
  };

  const result = await dbConnectSelect(req, res, selectUsers, params.usr);
  return result;
};

const selectr911Mod = async (req, res, numsec) => {
  const selectUsers = `select * from r911Mod where numsec = :numsec`;
  const result = await dbConnectSelect(req, res, selectUsers, numsec);
  return result;
};

app.get("/connected/sec/:user", async (req, res) => {
  try {
    const response = await selectr911Sec(req, res);

    if (response.statusCode == 304) {
      res.send(0);
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

      const numsecResponse = await selectr911Mod(
        req,
        res,
        response.rows[0][0].toString()
      );
      if (numsecResponse.rows[0].length > 0) {
        console.log(numsecResponse.rows[0]);
      } else {
        console.log("Não existe na tabela r911mod");
      }

      res.send(result);
    }
  } catch (error) {
    console.log(error.message);
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
