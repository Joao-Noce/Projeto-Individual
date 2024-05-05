function new_account() {
    container.style.left = "-50vw";
}

function already_have_account() {
    container.style.left = "0";
}

function create_account() {
    var name = input_name.value;
    var email = input_email.value;
    var phone = Number(input_phone.value);
    var password = input_password.value;
    var cpf = Number(input_cpf.value);

    if (name == "") {
        input_name.value = ``; // Apaga o que está escrito
        input_name.placeholder = `Your name is necessary.`;
    } if (arroba < 0 || ponto < 0) {
        input_email_cadastro.value = ``; // Apaga o que está escrito
        input_email_cadastro.placeholder = `Email not accepted`;
    } else if (tamanho_email < 5) {
        input_email_cadastro.value = ``; // Apaga o que está escrito
        input_email_cadastro.placeholder = `O campo 'email' está inválido.`;
    } else if (telefone_cadastro == "") {
        input_telefone_cadastro.placeholder = `O campo 'telefone' é necessário para cadastro.`;
    } else if (tamanho_senha < 8) {
        input_senha_cadastro.value = ``; // Apaga o que está escrito
        input_confirmar_senha_cadastro.value = ``; // Apaga o que está escrito
        input_senha_cadastro.placeholder = `Senha muito fraca. Necessário no mínimo 8 caracteres.`;

    } else if (senha_cadastro != confirmar_cadastro) {
        input_senha_cadastro.value = ``; // Apaga o que está escrito
        input_confirmar_senha_cadastro.value = ``; // Apaga o que está escrito
        input_senha_cadastro.placeholder = `Falha ao autenticar senha.`;
        input_confirmar_senha_cadastro.placeholder = `Falha ao autenticar senha.`;
    } else if (cpf == "") {
        input_cpf.placeholder = `O campo 'CPF' é necessário para cadastro.`;

    } else if (tamanho_cpf < 11) {
        input_cpf.value = ``; // Apaga o que está escrito
        input_cpf.placeholder = `O campo 'CPF' está inválido.`;
    } else if (empresa == "#") {
        alert("O campo 'empresa' é necessário para cadastro");
    } else {
        nome_cadastro.value = ``; // Apaga o que está escrito
        email_cadastro.value = ``; // Apaga o que está escrito
        telefone_cadastro.value = ``; // Apaga o que está escrito
        senha_cadastro.value = ``; // Apaga o que está escrito
        confirmar_cadastro.value = ``; // Apaga o que está escrito
        cpf.value = ``; // Apaga o que está escrito
        alert(`${nome_cadastro}, sua conta foi ativada com sucesso.`);
        Tela_Cadastro(); // Todas as telas para direita
    }

}