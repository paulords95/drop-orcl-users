const Service = require("node-windows").Service;
const svc = new Service({
  name: "Server - Derrubar Conexão ERP",
  description: "Server - Derrubar Conexão ERP",
  script: "C:\\localapps\\blockedusers\\server\\index.js",
  env: {
    value: process.env.USER,
  },
});

svc.on("install", function () {
  svc.start();
  console.log("Serviço instalado");
});
svc.install();
