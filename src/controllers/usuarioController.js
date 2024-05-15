var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        res.status(200).json(resultadoAutenticar[0]); // Supondo que você queira enviar apenas o primeiro usuário encontrado
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(function (erro) {
                console.log(erro);
                const errorMessage = erro.sqlMessage ? erro.sqlMessage : "Houve um erro ao realizar o login!";
                console.log("\nHouve um erro ao realizar o login! Erro: ", errorMessage);
                res.status(500).json(errorMessage);
            }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, email, senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function finalizar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo Site_Quiz.html
    var input1 = req.body.input1Server;
    var input2 = req.body.input2Server;
    var input3 = req.body.input3Server;
    var input4 = req.body.input4Server;
    var fk_Pergunta_Usuario = req.body.idUsuarioServer;

    // Faça as validações dos valores
    if (input1 == undefined) {
        res.status(400).send("Sem resposta1!");
    } else if (input2 == undefined) {
        res.status(400).send("Sem resposta2!");
    } else if (input3 == undefined) {
        res.status(400).send("Sem resposta3!");
    } else if (input4 == undefined) {
        res.status(400).send("Sem resposta4!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.finalizar(input1, input2, input3, input4, fk_Pergunta_Usuario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o Questionário! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function fazerQuestionario(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo Site_Quiz.html
    var idUsuario = req.body.idUsuarioServer;
    var fezQuestionario = req.body.fezQuestionarioServer;

    // Faça as validações dos valores
    if (idUsuario == undefined) {
        res.status(400).send("Sem resposta de id!");
    } else if (fezQuestionario == undefined) {
        res.status(400).send("Sem resposta de questionario!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.fazerQuestionario(idUsuario, fezQuestionario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o Questionário! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function fezQuestionario(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo Site_Quiz.html
    var idUsuario = req.params.idUsuario;
    console.log(idUsuario)

    // Faça as validações dos valores
    if (idUsuario == undefined) {
        res.status(400).send("Sem resposta de id!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.fezQuestionario(idUsuario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o Questionário! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function nome(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo Site_Quiz.html
    var nomeUsuario = req.params.name;
    console.log('Estou no usuarioController');

    // Faça as validações dos valores
    if (nomeUsuario == undefined) {
        res.status(400).send("Sem resposta de nome!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.nome(nomeUsuario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    autenticar,
    cadastrar,
    finalizar,
    nome,
    fazerQuestionario,
    fezQuestionario
}