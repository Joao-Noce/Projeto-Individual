function new_account() {
    container.style.left = "-50vw";
}

function already_have_account() {
    container.style.left = "0";
}

function create_account() {
    var name = input_name.value;
    var email_cadastro = input_email_cadastro.value;
    var password_cadastro = input_password_cadastro.value;
    var confirm_password = input_confirm_password.value;

    var tamanho_email = email_cadastro.length;
    var arroba = email_cadastro.indexOf("@");
    var ponto = email_cadastro.indexOf(".com");
    var tamanho_senha = password_cadastro.length;

    if (name == "") {
        input_name.value = ``; // Apaga o que está escrito
        input_name.placeholder = `Your name is necessary.`;
    } else if (arroba < 0 || ponto < 0 || tamanho_email < 6) {
        input_email_cadastro.value = ``; // Apaga o que está escrito
        input_email_cadastro.placeholder = `Email not accepted`;
    } else if (tamanho_senha < 8) {
        input_password_cadastro.value = ``; // Apaga o que está escrito
        input_confirm_password.value = ``; // Apaga o que está escrito
        input_password_cadastro.placeholder = `Password too weak. Minimum of 8 characteres.`;
    } else if (password_cadastro != confirm_password) {
        input_password_cadastro.value = ``; // Apaga o que está escrito
        input_confirm_password.value = ``; // Apaga o que está escrito
        input_password_cadastro.placeholder = `The passwords don't match`;
        input_confirm_password.placeholder = `The passwords don't match`;
    } else {
        input_name.value = ``; // Apaga o que está escrito
        input_name.placeholder = ``; // Apaga o que está escrito
        input_email_cadastro.value = ``; // Apaga o que está escrito
        input_email_cadastro.placeholder = ``; // Apaga o que está escrito
        input_password_cadastro.value = ``; // Apaga o que está escrito
        input_password_cadastro.placeholder = ``; // Apaga o que está escrito
        input_confirm_password.value = ``; // Apaga o que está escrito
        input_confirm_password.placeholder = ``; // Apaga o que está escrito
        alert(`${name}, your account has been activated.`);
        already_have_account(); // Todas as telas para direita
    }
}