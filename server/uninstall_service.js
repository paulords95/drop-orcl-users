var Service = require("node-windows").Service;
var svc = new Service({
  name: "Server - Derrubar Conexão ERP",
  description: "Server - Derrubar Conexão ERP",
  script: "C:\\localapps\\blockedusers\\server\\index.js",
});
svc.on("uninstall", function () {
  console.log("Uninstall complete.");
});
svc.uninstall();
