const electron = require("electron");
const { app, BrowserWindow } = electron;

module.exports = (url) => {
    console.log(url);
    electron.remote.require("electron-download-manager").download({
        url: url
    }, function (error, info) {
        if (error) {
            console.log(error);
            return;
        }
        alert("Tải file thành công " + info.url);
    });
}