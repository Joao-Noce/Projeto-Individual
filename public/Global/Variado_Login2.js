var fez_login = sessionStorage.FEZ_LOGIN;

if (fez_login) {
    div_nav_1.style = 'display: none; pointer-events: all';
    div_nav_2.style = 'display: flex; pointer-events: all';
    alerta.style.display = 'none';
    sombra.style.opacity = '1';
    document.body.style = 'overflow: auto';
} else {
    div_nav_1.style = 'display: flex; pointer-events: none';
    div_nav_2.style = 'display: none; pointer-events: none';
    alerta.style.display = 'flex';
    sombra.style.opacity = '0.2';
    document.body.style = 'overflow: hidden';
}

function voltar() {
    window.location = "../HTML/Site_Home.html";
}

function login() {
    window.location = "../HTML/Site_Login.html";
}