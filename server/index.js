const express = require("express");
const app = express();
const cors = require("cors");
const port = 5000;

const { dbConnectSelect, dbConnectInsert } = require("./db-connect");

app.use(cors());

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

const deleteFromr911mod = async (req, res, numsec) => {
  const deleteRow = `delete r911Mod where numsec = :numsec`;
  const result = await dbConnectInsert(req, res, deleteRow, numsec);
  console.log(result);
  return result;
};

const deleteFromr911sec = async (req, res, numsec) => {
  const deleteRow = `delete r911sec where numsec = :numsec`;
  const result = await dbConnectInsert(req, res, deleteRow, numsec);

  return result;
};

app.delete("/connected/sec/:user", async (req, res) => {
  const params = {
    usr: req.params.user.toString(),
  };
  let responseToBeSent = [];
  try {
    const response = await selectr911Sec(req, res, params.usr);
    if (response.statusCode == 304) {
      res.send("1");
    } else if (response == "query não retornou nada") {
      responseToBeSent.push({
        msg: "usuário não encontrado ou já derrubado",
        status: false,
      });
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
      if (numsec.rows) {
        const resultOfDelete = await deleteFromr911mod(
          req,
          res,
          response.rows[0][0]
        );

        setTimeout(async () => {
          const resultOfDelete = await deleteFromr911sec(
            req,
            res,
            response.rows[0][0]
          );
        }, 1000);
        responseToBeSent.push({
          msg: "usuário desconectado",
          status: true,
        });
      } else {
        const resultOfDelete = await deleteFromr911sec(
          req,
          res,
          response.rows[0][0]
        );
        responseToBeSent.push({
          msg: "usuário desconectado",
          status: true,
        });
      }
    }
  } catch (error) {
    console.log(error);
    responseToBeSent.push({
      msg: "erro não identificado",
    });
  }
  res.send(responseToBeSent);
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
