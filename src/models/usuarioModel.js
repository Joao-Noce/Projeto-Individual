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

function nome(nomeUsuario) {
    var instrucaoSql = `
        SELECT nomeUsuario FROM usuario WHERE nomeUsuario = '${nomeUsuario}';
    `;

    return database.executar(instrucaoSql).then(resultado => {
        console.log('Estou no usuarioModel');
        if (resultado) {
            console.error("Não é possível ter dois usuários com o mesmo nickname!");
            throw new Error("Nomes duplicados");
        } else {
            const nomeUnico = resultado[0].nome;
            console.log(nomeUnico);
            return nomeUnico;
        }
    }).catch(erro => {
        console.error("Erro ao verificar se o usuário já existe:", erro);
        throw erro;
    });
}

function cadastrar(name, email_cadastro, senha_cadastro) {
    console.log("Cadastrando usuário:", name, email_cadastro);
    var instrucaoSql = `
        INSERT INTO usuario (nomeUsuario, emailUsuario, senhaUsuario, fezQuestionario) VALUES ('${name}', '${email_cadastro}', '${senha_cadastro}', false);
    `;
    console.log("Executando a instrução SQL para cadastrar o usuário: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
        .catch(erro => {
            console.error("Erro ao cadastrar usuário:", erro);
            throw erro;
        });
}

function fazerQuestionario(idUsuario) {
    var instrucaoSql = `
        UPDATE usuario set fezQuestionario = true where idUsuario = ${idUsuario};
        
    `;

    return database.executar(instrucaoSql).catch(erro => {
        console.error("Erro ao cadastrar se o usuário fez o questionário ou não:", erro);
        throw erro;
    });
}

function fezQuestionario(idUsuario) {
    var instrucaoSql = `
        SELECT fezQuestionario FROM usuario WHERE idUsuario = ${idUsuario};
    `;

    return database.executar(instrucaoSql).then(resultado => {
        console.log(resultado)
        if (resultado.length > 0) {
            const questionarioFeito = resultado[0].fezQuestionario;
            console.log(questionarioFeito)
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

function finalizar(input1, input2, input3, input4, fk_Pergunta_Usuario) {
    console.log("Finalizando questionário para o usuário:", fk_Pergunta_Usuario);
    var instrucaoSql = `
        INSERT INTO questionario (Tempo, Aula, Frequência, Tipo, fk_Pergunta_Usuario) VALUES ('${input1}', '${input2}', '${input3}', '${input4}', ${fk_Pergunta_Usuario});
    `;

    console.log("Executando a instrução SQL para finalizar o questionário: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar,
    nome,
    finalizar,
    fazerQuestionario,
    fezQuestionario,
};
