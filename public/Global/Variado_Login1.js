var fez_login = sessionStorage.FEZ_LOGIN;

if (fez_login) {
    div_nav_1.style = 'display: none';
    div_nav_2.style = 'display: flex';
} else {
    div_nav_1.style = 'display: flex';
    div_nav_2.style = 'display: none';
}

function voltar() {
    window.location = "../index.html";
}

function login() {
    window.location = "../HTML/Site_Login.html";
}

spanUser.innerHTML = `<p style="margin-top: 6px">${sessionStorage.NOME_USUARIO}</p>`;