const electron = require('electron')
const remote = electron.remote;
const win = remote.getCurrentWindow();
const fs = require('fs');

function toggleResetPswd(e) {
    e.preventDefault();
    $('#logreg-forms .form-signin').toggle() // display:block or none
    $('#logreg-forms .form-reset').toggle() // display:block or none
}

function toggleSignUp(e) {
    e.preventDefault();
    $('#logreg-forms .form-signin').toggle(); // display:block or none
    $('#logreg-forms .form-signup').toggle(); // display:block or none
}

$(() => {
    //Tilte bar
    $('div #close-button').click((e) => {
        win.close();
    });
    $('div #min-button').click((e) => {
        win.minimize();
    });
    $('div #max-button').click((e) => {
        win.maximize();
    });
    $('div #restore-button').click((e) => {
        win.unmaximize();
    });

    // Login Register Form
    $('#logreg-forms #forgot_pswd').click(toggleResetPswd);
    $('#logreg-forms #cancel_reset').click(toggleResetPswd);
    $('#logreg-forms #btn-signup').click(toggleSignUp);
    $('#logreg-forms #cancel_signup').click(toggleSignUp);

    $('#btn_signin').click((e) => {
        e.preventDefault();

        const homepage = require('path').join(__dirname, '../..');
        const uName = document.getElementById("userName").value;
        const uPass = document.getElementById("userPass").value;

        if (!uName) {
            alert("Vui long nhap user name");
            return;
        }
        if (!uPass) {
            alert("Vui long nhap password");
            return;
        }
        if (!uName && !uPass) {
            alert("Vui long nhap thong tin");
            return;
        }

        const url = "http://localhost:3010/api/login";
        const data = {
            'userName': uName,
            'userPass': uPass,
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
            const { isLogin, message, user } = res;
            if (isLogin) {
                electron.remote.getCurrentWindow().loadURL(`${homepage}/app/index.html?${user.UserID}`);
            } else {
                alert('Login khong thanh cong!');
                return;
            }
        })
            .catch(function (res) { console.log(res) })
    });

    $('#btn_signup').click((e) => {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const pass = document.getElementById("pass").value;
        const rePass = document.getElementById("rePass").value;
        const email = document.getElementById("email").value;
        //const sex = document.getElementById("sex").value;
        //const avatar = document.getElementById("avatar").files[0];

        //const urlFile = "http://localhost:3010/api/file";

        const data = {
            'name': name,
            'pass': pass,
            'email': email,
            'sex': '',
        };

        const opt = {
            headers: { "content-type": "application/json; charset=UTF-8" },
            body: JSON.stringify(data),
            method: "POST",
            mode: "cors"
        };

        fetch("http://localhost:3010/api/createUser", opt).then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Could not reach the API: " + response.statusText);
            }
        }).then(function (res) {
            const { id, message } = res;
            if (id) {
                alert(message);
                win.reload();

                //Chuyen post file img khi da dang nhap vao he thong
                // const arr = avatar.name.split('.');
                // const img = new File([avatar], id + '.' + arr[1], { type: avatar.type, path: avatar.path });

                // const formData = new FormData();
                // formData.append('img', img);
                // formData.append('user', { data });
                // fetch(urlFile, {
                //     method: "POST",
                //     body: formData
                // }).then(function (response) {
                //     if (response.ok) {
                //         return response.json();
                //     } else {
                //         throw new Error("Could not reach the API: " + response.statusText);
                //     }
                // });
            } else {
                alert(message);
            }

        }).catch(function (res) { console.log(res) })


    })
})