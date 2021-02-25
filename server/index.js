const express = require("express");
const app = express();
const cors = require("cors");
const port = 5000;

const { dbConnectSelect, dbConnectInsert } = require("./db-connect");

app.use(cors());

const selectr911Sec = async (req, res, user) => {
  const selectUsers = `select * from r911sec where appusr = :usr`;

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

const auth = async (req, res, username, pwd) => {
  const selectColumns =
    "select nomusu, usu_sencol from e099usu where nomusu = :nomusu AND usu_sencol = :pwd AND usu_sencol is not null";
  const result = await dbConnectSelect(req, res, selectColumns, username, pwd);

  return result;
};

app.delete("/connected/sec/:user/:pwd", async (req, res) => {
  const params = {
    usr: req.params.user.toString(),
    pwd: req.params.pwd.toString(),
  };
  let responseToBeSent = [];
  try {
    const data = await auth(req, res, params.usr, params.pwd);
    if (data.rows) {
      try {
        const response = await selectr911Sec(req, res, params.usr);
        if (response.rows) {
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
            msg: "Usuário não conectado no sistema",
            status: false,
          });
        }
      } catch (error) {}
    } else {
      responseToBeSent.push({
        msg: "Usuário ou senha estão incorretos",
        status: false,
      });
    }
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
