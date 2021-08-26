const { app, BrowserWindow } = require("electron");

function createWindow() {
  const win = new BrowserWindow({
    width: 500,
    darkTheme: true,
    height: 640,
    icon: __dirname + "/build/icon2.png",
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  win.removeMenu();
  win.loadURL("http://qcolaps02.quimtia.net.br:9001/");
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
