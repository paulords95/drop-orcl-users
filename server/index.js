const express = require("express");
const app = express();
const port = 5000;

const { dbConnectSelect, dbConnectInsert } = require("./db-connect");

const selectAllUsers = async (req, res) => {
  const selectUsers = `select usu_nomusu, usu_codusu from usu_t522 ORDER BY 1`;
  const result = await dbConnectSelect(req, res, selectUsers);
  return result;
};

app.get("/connected/:username", (req, res) => {
  res.send(req.params.username);
});

app.listen(port, "0.0.0.0", () =>
  console.log("Servidor rodando na porta: ", port)
);
