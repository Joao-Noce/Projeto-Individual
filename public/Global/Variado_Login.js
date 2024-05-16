var fez_login = sessionStorage.FEZ_LOGIN;
var nav_sem = document.getElementById('div_nav_1');
var nav_com = document.getElementById('div_nav_2');

if (fez_login) {
    div_nav_1.style.display = 'none';
    div_nav_2.style.display = 'flex';
} else {
    div_nav_1.style.display = 'flex';
    div_nav_2.style.display = 'none';
}