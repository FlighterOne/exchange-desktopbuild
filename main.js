const { app, BrowserWindow, shell } = require('electron');
const path = require('path');

// Сайт Exchange (HTTPS)
const SITE_URL = 'https://exchangeprojects.site';

function isAllowedInApp(url) {
  try {
    const u = new URL(url);
    const host = u.hostname.toLowerCase();
    if (host === 'exchangeprojects.site' || host.endsWith('.exchangeprojects.site')) return true;
    // Telegram Login / OAuth — только внутри Electron, иначе сессия не вернётся в приложение
    if (host === 'oauth.telegram.org') return true;
    if (host === 'telegram.org' || host.endsWith('.telegram.org')) return true;
    if (host === 't.me' || host === 'web.telegram.org') return true;
    return false;
  } catch (e) {
    return false;
  }
}

function createWindow() {
  const win = new BrowserWindow({
    width: 420,
    height: 800,
    minWidth: 360,
    minHeight: 600,
    autoHideMenuBar: true,
    title: 'ExChange',
    icon: path.join(__dirname, 'build', process.platform === 'win32' ? 'icon.ico' : 'icon.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
    },
  });

  win.loadURL(SITE_URL);

  // Всплывающие окна (виджет Telegram Login) — в окне приложения, не в системном браузере
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (isAllowedInApp(url)) {
      return {
        action: 'allow',
        overrideBrowserWindowOptions: {
          width: 520,
          height: 720,
          autoHideMenuBar: true,
          title: 'Telegram',
          webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            sandbox: true,
          },
        },
      };
    }
    shell.openExternal(url);
    return { action: 'deny' };
  });

  win.webContents.on('will-navigate', (event, url) => {
    if (isAllowedInApp(url)) return;
    event.preventDefault();
    shell.openExternal(url);
  });

  // После логина Telegram часто закрывает popup — основное окно уже с сессией на сайте
  win.webContents.on('did-create-window', (child) => {
    child.webContents.on('will-navigate', (event, url) => {
      if (isAllowedInApp(url)) return;
      event.preventDefault();
      shell.openExternal(url);
    });
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
