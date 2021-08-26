const express = require("express");
const app = express();
const cors = require("cors");
const port = 5000;

const auth = require("./auth");

const { db } = require("./db-connect");

app.use(cors());

const selectr911Sec = async (req, res, user) => {
  const selectUsers = `select * from r911sec where appusr = :usr`;

  const result = await db(selectUsers, user);
  return result;
};

const selectr911Mod = async (req, res, numsec) => {
  const selectUsers = `select * from r911Mod where numsec = :numsec`;
  const result = await db(selectUsers, numsec);
  return result;
};

const deleteFromr911mod = async (req, res, numsec) => {
  const deleteRow = `delete r911Mod where numsec = :numsec`;
  const result = await db(deleteRow, numsec);
  return result;
};

const deleteFromr911sec = async (req, res, numsec) => {
  const deleteRow = `delete r911sec where numsec = :numsec`;
  const result = await db(deleteRow, numsec);

  return result;
};

app.delete("/connected/sec/:user/:pwd", auth, async (req, res) => {
  const params = {
    usr: req.params.user.toString(),
    pwd: req.params.pwd.toString(),
  };
  let responseToBeSent = [];

  try {
    try {
      const response = await selectr911Sec(req, res, params.usr);
      if (response.rows) {
        if (response.rows.length > 0) {
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
            await deleteFromr911mod(req, res, response.rows[0][0]);

            setTimeout(async () => {
              await deleteFromr911sec(req, res, response.rows[0][0]);
            }, 1000);
            responseToBeSent.push({
              msg: "Usuário desconectado",
              status: true,
            });
          } else {
            await deleteFromr911sec(req, res, response.rows[0][0]);
            responseToBeSent.push({
              msg: "Usuário desconectado",
              status: true,
            });
          }
        } else {
          responseToBeSent.push({
            msg: "Usuário não está bloqueado no sistema",
            status: false,
          });
        }
      }
    } catch (error) {}
  } catch (error) {
    responseToBeSent.push({
      msg: "Erro não identificado",
      status: false,
    });
  }
  res.send(responseToBeSent);
});

app.listen(port, "0.0.0.0", () =>
  console.log("Servidor rodando na porta: ", port)
);
