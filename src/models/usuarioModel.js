const { fezQuestionario: verificarQuestionarioFeito } = require("../controllers/usuarioController");
var database = require("../database/config");

function autenticar(email_log, senha_log) {
    console.log("Autenticando usuário:", email_log);
    var instrucaoSql = `
        SELECT idUsuario, nomeUsuario, emailUsuario FROM usuario WHERE emailUsuario = '${email_log}' AND senhaUsuario = '${senha_log}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrar(name, email_cadastro, senha_cadastro) {
    console.log("Cadastrando usuário:", name, email_cadastro);
    var instrucaoSql = `
        INSERT INTO usuario (nomeUsuario, emailUsuario, senhaUsuario) VALUES ('${name}', '${email_cadastro}', '${senha_cadastro}');
    `;
    console.log("Executando a instrução SQL para cadastrar o usuário: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
        .catch(erro => {
            console.error("Erro ao cadastrar usuário:", erro);
            throw erro;
        });
}

function fazerQuestionario(idUsuario, fezQuestionario) {
    var instrucaoSql = `
        INSERT INTO usuario (idUsuario, fezQuestionario) VALUES ('${idUsuario}','${fezQuestionario}');
    `;

    return database.executar(instrucaoSql).catch(erro => {
        console.error("Erro ao cadastrar se o usuário fez o questionário ou não:", erro);
        throw erro;
    });
}

function fezQuestionario(idUsuario) {
    var instrucaoSql = `
        SELECT fezQuestionario FROM usuario WHERE idUsuario = '${idUsuario}';
    `;

    return database.executar(instrucaoSql).then(resultado => {
        if (resultado.length > 0) {
            const questionarioFeito = resultado[0].fezQuestionario;
            if (questionarioFeito) {
                window.location.replace('../HTML/Site_Home.html');
            } else {
                window.location.replace('../HTML/Site_Quiz.html');
            }
            return questionarioFeito;
        } else {
            console.error("Usuário não encontrado:", idUsuario);
            throw new Error("Usuário não encontrado.");
        }
    }).catch(erro => {
        console.error("Erro ao verificar se o usuário fez o questionário:", erro);
        throw erro;
    });
}

function finalizar(input1, input2, input3, input4, fkUsuario) {
    console.log("Finalizando questionário para o usuário:", fkUsuario);
    var instrucaoSql = `
        INSERT INTO questionario (Tempo, Aula, Frequência, Tipo, fkUsuario) VALUES ('${input1}', '${input2}', '${input3}', '${input4}', ${fkUsuario});
    `;

    console.log("Executando a instrução SQL para finalizar o questionário: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar,
    finalizar,
    fazerQuestionario,
    fezQuestionario: verificarQuestionarioFeito // Renomeando a função fezQuestionario
};
