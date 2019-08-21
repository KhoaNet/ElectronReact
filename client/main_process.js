// Basic init
const electron = require('electron')
const { app, BrowserWindow } = electron
const DownloadManager = require("electron-download-manager");

DownloadManager.register({
    downloadFolder: app.getPath("downloads") + "/chat-app"
});

// Let electron reloads by itself when webpack watches changes in ./app/
require('electron-reload')(__dirname)
//require('electron-react-devtools').install()
// To avoid being garbage collected

const { default: installExtension, REDUX_DEVTOOLS } = require('electron-devtools-installer');
let mainWindow

app.on('ready', () => {
    //mainWindow = new BrowserWindow({ width: 800, height: 600 })
    mainWindow = new BrowserWindow({
        frame: false,
        webPreferences: {
            nodeIntegration: true
        }
    });
    mainWindow.maximize();
    mainWindow.setMenuBarVisibility(false);
    mainWindow.webContents.openDevTools();
    mainWindow.loadURL(`file://${__dirname}/app/login/login.html`)
    // mainWindow.loadURL(`file://${__dirname}/app/index.html`)

    mainWindow.on('closed', () => {
        mainWindow = null
    })

    installExtension(REDUX_DEVTOOLS).then((name) => {
        console.log(`Added Extension:  ${name}`);
    })
        .catch((err) => {
            console.log('An error occurred: ', err);
        });
})
