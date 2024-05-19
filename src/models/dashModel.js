var database = require("../database/config");

function pergunta1() {
    console.log("ACESSEI O DASH MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pergunta1()");
    var instrucaoSql1 = `
    SELECT
    COUNT(CASE WHEN Tempo = 'Eu nunca toquei' THEN 1 END) AS 'Option1',
    COUNT(CASE WHEN Tempo = 'Um mês' THEN 1 END) AS 'Option2',
    COUNT(CASE WHEN Tempo = 'Alguns meses' THEN 1 END) AS 'Option3',
    COUNT(CASE WHEN Tempo = 'Mais de um ano' THEN 1 END) AS 'Option4'
    FROM questionario;`;

    console.log("Executando as instrução SQL: \n" + instrucaoSql1);
    return database.executar(instrucaoSql1);
}

function pergunta2() {
    console.log("ACESSEI O DASH MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pergunta1()");
    var instrucaoSql1 = `
    SELECT
    COUNT(CASE WHEN Aula = 'Eu tive aulas' THEN 1 END) AS 'Option1',
    COUNT(CASE WHEN Aula = 'Eu aprendi sozinho' THEN 1 END) AS 'Option2',
    COUNT(CASE WHEN Aula = 'Comecei agora' THEN 1 END) AS 'Option3'
    FROM questionario;`;

    console.log("Executando as instrução SQL: \n" + instrucaoSql1);
    return database.executar(instrucaoSql1);
}

function pergunta3() {
    console.log("ACESSEI O DASH MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pergunta1()");
    var instrucaoSql1 = `
    SELECT
    COUNT(CASE WHEN Frequência = 'Não pratico' THEN 1 END) AS 'Option1',
    COUNT(CASE WHEN Frequência = 'Até 2 dias' THEN 1 END) AS 'Option2',
    COUNT(CASE WHEN Frequência = 'Até 4 dias' THEN 1 END) AS 'Option3',
    COUNT(CASE WHEN Frequência = 'Todos os dias' THEN 1 END) AS 'Option4'
    FROM questionario;`;
    
    console.log("Executando as instrução SQL: \n" + instrucaoSql1);
    return database.executar(instrucaoSql1);
}

function pergunta4() {
    console.log("ACESSEI O DASH MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pergunta1()");
    var instrucaoSql1 = `
    SELECT
    COUNT(CASE WHEN Tipo LIKE '%Não tenho violão%' THEN 1 END) AS 'Option1',
    COUNT(CASE WHEN Tipo LIKE '%Violão Clássico%' THEN 1 END) AS 'Option2',
    COUNT(CASE WHEN Tipo LIKE '%Violão Folk%' THEN 1 END) AS 'Option3',
    COUNT(CASE WHEN Tipo LIKE '%Violão de 12 Cordas%' THEN 1 END) AS 'Option4',
    COUNT(CASE WHEN Tipo LIKE '%Violão Flat%' THEN 1 END) AS 'Option5',
    COUNT(CASE WHEN Tipo LIKE '%Outro%' THEN 1 END) AS 'Option6'
    FROM questionario;`;

    console.log("Executando as instrução SQL: \n" + instrucaoSql1);
    return database.executar(instrucaoSql1);
}

module.exports = {
    pergunta1,
    pergunta2,
    pergunta3,
    pergunta4
}