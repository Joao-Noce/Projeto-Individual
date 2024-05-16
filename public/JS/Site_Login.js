sessionStorage.clear();

function new_account() {
    container.style.left = "-50vw";
    input_name.value = ``;
    input_name.placeholder = ``;
    input_email_cadastro.value = ``;
    input_email_cadastro.placeholder = ``;
    input_senha_cadastro.value = ``;
    input_senha_cadastro.placeholder = ``;
    input_confirm_senha.value = ``;
    input_confirm_senha.placeholder = ``;
    input_email_log.value = ``;
    input_email_log.placeholder = ``;
    input_senha_log.value = ``;
    input_senha_log.placeholder = ``;
}

function already_have_account() {
    input_name.value = ``;
    input_name.placeholder = ``;
    input_email_cadastro.value = ``;
    input_email_cadastro.placeholder = ``;
    input_senha_cadastro.value = ``;
    input_senha_cadastro.placeholder = ``;
    input_confirm_senha.value = ``;
    input_confirm_senha.placeholder = ``;
    input_email_log.value = ``;
    input_email_log.placeholder = ``;
    input_senha_log.value = ``;
    input_senha_log.placeholder = ``;
    container.style.left = "0";
}
function create_account() {
    var name = input_name.value;
    var email_cadastro = input_email_cadastro.value;
    var senha_cadastro = input_senha_cadastro.value;
    var confirm_senha = input_confirm_senha.value;

    var tamanho_email = email_cadastro.length;
    var arroba = email_cadastro.indexOf("@");
    var ponto = email_cadastro.indexOf(".com");
    var tamanho_senha = senha_cadastro.length;

    if (name == "") {
        input_name.value = ``; // Apaga o que está escrito
        input_name.placeholder = `Your name is necessary.`;
    } else if (arroba < 0 || ponto < 0 || tamanho_email < 6) {
        input_email_cadastro.value = ``; // Apaga o que está escrito
        input_email_cadastro.placeholder = `Email not accepted`;
    } else if (tamanho_senha < 6) {
        input_senha_cadastro.value = ``; // Apaga o que está escrito
        input_confirm_senha.value = ``; // Apaga o que está escrito
        input_senha_cadastro.placeholder = `Password too weak. Minimum of 8 characters.`;
    } else if (senha_cadastro != confirm_senha) {
        input_senha_cadastro.value = ``; // Apaga o que está escrito
        input_confirm_senha.value = ``; // Apaga o que está escrito
        input_senha_cadastro.placeholder = `The passwords don't match`;
        input_confirm_senha.placeholder = `The passwords don't match`;
    } else {
        // Se os dados estiverem corretos, limpa os inputs e placeholders
        input_name.value = ``;
        input_name.placeholder = ``;
        input_email_cadastro.value = ``;
        input_email_cadastro.placeholder = ``;
        input_senha_cadastro.value = ``;
        input_senha_cadastro.placeholder = ``;
        input_confirm_senha.value = ``;
        input_confirm_senha.placeholder = ``;


        // Chama a função para enviar os dados para a API
        fetch("/usuarios/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                // crie um atributo que recebe o valor recuperado aqui
                // Agora vá para o arquivo routes/usuario.js
                nomeServer: name,
                emailServer: email_cadastro,
                senhaServer: senha_cadastro
            }),
        })
            .then(function (resposta) {
                console.log("ESTOU NO THEN DO CADASTRAR()!")
                if (resposta.ok) {
                    alert(`${name}, your account has been activated.`);
                    already_have_account();
                } else {
                    alert('O usuário já existe!');
                }
            })
    }
}


function login() {
    var email_log = input_email_log.value;
    var senha_log = input_senha_log.value;

    if (email_log == "" || senha_log == "") {
        input_email_log.placeholder = `Field is required.`;
    }

    console.log("FORM LOGIN: ", email_log);
    console.log("FORM SENHA: ", senha_log);

    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: email_log,
            senhaServer: senha_log
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {
            console.log(resposta);
            input_email_log.value = ``;
            input_email_log.placeholder = ``;
            input_senha_log.value = ``;
            input_senha_log.placeholder = ``;

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));
                sessionStorage.EMAIL_USUARIO = json.emailUsuario;
                sessionStorage.NOME_USUARIO = json.nomeUsuario;
                sessionStorage.ID_USUARIO = json.idUsuario;
                alert("You have entered in your account");

                fetch(`/usuarios/fezQuestionario/${json.idUsuario}`)
                    .then(function (resposta) {
                        console.log(resposta);
                        if (resposta.ok) {
                            var fez_login = true;
                            sessionStorage.FEZ_LOGIN = fez_login;
                            resposta.json().then(function (resposta) {

                                console.log(resposta);
                                if (resposta) {
                                    window.location = "../HTML/Site_Lessons.html";
                                } else {
                                    window.location = "../HTML/Site_Quiz.html"
                                }
                            });
                        } else {
                            throw ('Houve um erro na API!');
                        }
                    }).catch(function (resposta) {
                        console.error(resposta);
                    });
            });
        } else {

            input_email_log.value = ``;
            input_email_log.placeholder = ``;
            input_senha_log.value = ``;
            input_senha_log.placeholder = ``;
            alert("Houve um erro ao tentar realizar o login!");
            resposta.text().then(texto => {
                console.error(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })
    return false;
}