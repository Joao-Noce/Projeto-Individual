var database = require("../database/config");

function listar() {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucaoSql = `
        SELECT 
            a.idAviso,
            a.texto,
            a.dia,
            a.fk_Aviso_Usuario,
            u.idUsuario AS idUsuario,
            u.nomeUsuario,
            u.emailUsuario,
            u.senhaUsuario
        FROM aviso a
            INNER JOIN usuario u
                ON a.fk_Aviso_Usuario = u.idUsuario order by idAviso;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// function pesquisarDescricao(texto) {
//     console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pesquisarDescricao()");
//     var instrucaoSql = `
//         SELECT 
//             a.idAviso,
//             a.texto,
//             a.fk_usuario,
//             u.id AS idUsuario,
//             u.nome,
//             u.email,
//             u.senha
//         FROM aviso a
//             INNER JOIN usuario u
//                 ON a.fk_usuario = u.id
//         WHERE a.texto LIKE '${texto}';
//     `;
//     console.log("Executando a instrução SQL: \n" + instrucaoSql);
//     return database.executar(instrucaoSql);
// }

// function listarPorUsuario(idUsuario) {
//     console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorUsuario()");
//     var instrucaoSql = `
//         SELECT 
//             a.idAviso,
//             a.texto,
//             a.fk_Aviso_Usuario,
//             u.idUsuario,
//             u.nomeUsuario,
//             u.emailUsuario,
//             u.senhaUsuario
//         FROM aviso a
//             INNER JOIN usuario u
//                 ON a.fk_Aviso_Usuario = u.idUsuario
//         WHERE u.idUsuario = ${idUsuario};
//     `;
//     console.log("Executando a instrução SQL: \n" + instrucaoSql);
//     return database.executar(instrucaoSql);
// }

function publicar(descricao, idUsuario) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function publicar(): ", descricao, idUsuario);
    var instrucaoSql = `
        INSERT INTO aviso (texto, fk_Aviso_Usuario) VALUES ('${descricao}', ${idUsuario});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function editar(novaDescricao, idAviso) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ", novaDescricao, idAviso);
    var instrucaoSql = `
        UPDATE aviso SET texto = '${novaDescricao}' WHERE idAviso = ${idAviso};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function deletar(idAviso) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():", idAviso);
    var instrucaoSql = `
        DELETE FROM aviso WHERE idAviso = ${idAviso};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function dia(dia) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():", idAviso);
    var instrucaoSql = `
        SELECT dia FROM aviso WHERE idAviso = ${idAviso};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql).then(resultado => {
            return database.executar(instrucaoSql);
            if (resultado.length > 0) {
                const dia = resultado[0].dia;
                console.log(dia)
                return dia;
            } else {
                console.error("Comentário não encontrado:", idAviso);
                throw new Error("Comentário não encontrado.");
            }
        }).catch(erro => {
            console.error("Erro ao verificar se o usuário fez o questionário:", erro);
            throw erro;
        });
}

module.exports = {
    listar,
    // listarPorUsuario,
    // pesquisarDescricao,
    publicar,
    editar,
    deletar,
    dia
}
