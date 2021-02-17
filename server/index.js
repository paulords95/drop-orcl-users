const express = require("express");
const app = express();
const port = 5000;

const { dbConnectSelect, dbConnectInsert } = require("./database");

const selectAllUsers = async (req, res) => {
  const selectUsers = `select usu_nomusu, usu_codusu from usu_t522 ORDER BY 1`;
  const result = await dbConnectSelect(req, res, selectUsers);
  return result;
};

app.get("/api/checkdb", (req, res) => {
  res.json({
    ok: true,
  });
});

app.listen(port, "0.0.0.0", () =>
  console.log("Servidor rodando na porta: ", port)
);
