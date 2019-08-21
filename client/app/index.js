const electron = require('electron')
const { app, BrowserWindow } = electron
// Let electron reloads by itself when webpack watches changes in ./app/
require('electron-reload')(__dirname)

function fromSubmit(from, e) {
    const homepage = require('path').join(__dirname,'../..');
    e.preventDefault();

    const url = "http://localhost:3010/api/login";
    const data = {
        'userName': document.getElementById("userName").value,
        'userPass': document.getElementById("userPass").value,
    };
    const other_params = {
        headers: { "content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify(data),
        method: "POST",
        mode: "cors"
    };
    
    fetch(url, other_params).then(function (response) {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Could not reach the API: " + response.statusText);
        }
    }).then(function (res) {
        const { isLogin,message,user} = res;
        if (isLogin) {
            alert(message);
            electron.remote.getCurrentWindow().loadURL(`${homepage}/app/index.html?${user.UserID}`);
        }else{
            alert('Login khong thanh cong!');
        }
    })
    .catch(function (res) { console.log(res) })
}