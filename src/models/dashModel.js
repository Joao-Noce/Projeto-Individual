var database = require("../database/config");

function pergunta1() {
    console.log("ACESSEI O DASH MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pergunta1()");
    var instrucaoSql1 = `
    SELECT COUNT (Tempo) FROM questionario WHERE Tempo = 'Eu nunca toquei';
    `;
    var instrucaoSql2 = `
    SELECT COUNT (Tempo) FROM questionario WHERE Tempo = 'Alguns meses';
    `;
    var instrucaoSql3 = `
    SELECT COUNT (Tempo) FROM questionario WHERE Tempo = 'Um ano';
    `;
    var instrucaoSql4 = `
    SELECT COUNT (Tempo) FROM questionario WHERE Tempo = 'Mais de um ano';
    `;
    console.log("Executando as instrução SQL: \n" + instrucaoSql1, instrucaoSql2, instrucaoSql3, instrucaoSql4);
    return database.executar(instrucaoSql1, instrucaoSql2, instrucaoSql3, instrucaoSql4);
}

function pergunta2() {
    console.log("ACESSEI O DASH MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pergunta1()");
    var instrucaoSql1 = `
    SELECT COUNT (Tempo) FROM questionario WHERE Tempo = 'Mais de um ano';
    `;
    var instrucaoSql2 = `
    SELECT COUNT (Tempo) FROM questionario WHERE Tempo = 'Mais de um ano';
    `;
    var instrucaoSql3 = `
    SELECT COUNT (Tempo) FROM questionario WHERE Tempo = 'Mais de um ano';
    `;
    var instrucaoSql4 = `
    SELECT COUNT (Tempo) FROM questionario WHERE Tempo = 'Mais de um ano';
    `;
    console.log("Executando as instrução SQL: \n" + instrucaoSql1, instrucaoSql2, instrucaoSql3, instrucaoSql4);
    return database.executar(instrucaoSql1, instrucaoSql2, instrucaoSql3, instrucaoSql4);
}

function pergunta3() {
    console.log("ACESSEI O DASH MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pergunta1()");
    var instrucaoSql1 = `
    SELECT COUNT (Tempo) FROM questionario WHERE Tempo = 'Mais de um ano';
    `;
    var instrucaoSql2 = `
    SELECT COUNT (Tempo) FROM questionario WHERE Tempo = 'Mais de um ano';
    `;
    var instrucaoSql3 = `
    SELECT COUNT (Tempo) FROM questionario WHERE Tempo = 'Mais de um ano';
    `;
    var instrucaoSql4 = `
    SELECT COUNT (Tempo) FROM questionario WHERE Tempo = 'Mais de um ano';
    `;
    console.log("Executando as instrução SQL: \n" + instrucaoSql1, instrucaoSql2, instrucaoSql3, instrucaoSql4);
    return database.executar(instrucaoSql1, instrucaoSql2, instrucaoSql3, instrucaoSql4);
}

function pergunta4() {
    console.log("ACESSEI O DASH MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pergunta1()");
    var instrucaoSql1 = `
    SELECT COUNT (Tempo) FROM questionario WHERE Tempo = 'Mais de um ano';
    `;
    var instrucaoSql2 = `
    SELECT COUNT (Tempo) FROM questionario WHERE Tempo = 'Mais de um ano';
    `;
    var instrucaoSql3 = `
    SELECT COUNT (Tempo) FROM questionario WHERE Tempo = 'Mais de um ano';
    `;
    var instrucaoSql4 = `
    SELECT COUNT (Tempo) FROM questionario WHERE Tempo = 'Mais de um ano';
    `;
    console.log("Executando as instrução SQL: \n" + instrucaoSql1, instrucaoSql2, instrucaoSql3, instrucaoSql4);
    return database.executar(instrucaoSql1, instrucaoSql2, instrucaoSql3, instrucaoSql4);
}