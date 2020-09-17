import { app, BrowserWindow } from 'electron';
import isDev from 'electron-is-dev';
import { join } from 'path';

let mainWindow: any;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    kiosk: false,
    title: 'Musify',
    titleBarStyle: 'hiddenInset',
  });
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${join(__dirname, '../build/index.html')}`
  );

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => (mainWindow = null));
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
