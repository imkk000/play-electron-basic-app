const { app, Menu, Tray, BrowserWindow, Notification } = require("electron");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    alwaysOnTop: true,
  });

  win.loadFile("index.html");
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  const tray = new Tray("apple.png");
  const contextMenu = Menu.buildFromTemplate([
    { label: "Item1", type: "radio" },
    { label: "Item2", type: "radio" },
    { label: "Item3", type: "radio", checked: true },
    { label: "Item4", type: "radio" },
  ]);
  tray.setToolTip("This is my application.");
  tray.setContextMenu(contextMenu);

  Notification.isSupported();

  const noti = new Notification({
    title: "ElectronX",
    body: "HelloBoy!",
  });
  noti.show();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
