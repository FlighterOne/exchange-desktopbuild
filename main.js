const { app, BrowserWindow, shell } = require('electron');

// Сайт Exchange (HTTPS)
const SITE_URL = 'https://exchangeprojects.site';

function createWindow() {
  const win = new BrowserWindow({
    width: 420,
    height: 800,
    minWidth: 360,
    minHeight: 600,
    autoHideMenuBar: true,
    title: 'ExChange',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
    },
  });

  win.loadURL(SITE_URL);

  // Внешние ссылки — в системный браузер
  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  win.webContents.on('will-navigate', (event, url) => {
    try {
      const target = new URL(url);
      const allowed = new URL(SITE_URL);
      if (target.origin !== allowed.origin) {
        event.preventDefault();
        shell.openExternal(url);
      }
    } catch (e) {
      event.preventDefault();
    }
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
