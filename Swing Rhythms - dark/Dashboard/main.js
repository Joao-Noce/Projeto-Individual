// Importa os módulos necessários
const express = require('express'); // Módulo para criar um servidor web
const mysql = require('mysql2'); // Módulo para conectar ao MySQL

// Constantes para configurações
const SERVIDOR_PORTA = 3300;
const HABILITAR_OPERACAO_INSERIR = true;

// Função para comunicação serial
const serial = async (
    name,
    email,
    password,
) => {
    let poolBancoDados = '';

    // Conexão com o banco de dados MySQL
    poolBancoDados = mysql.createPool(
        {
            // Credenciais do banco de dados
            host: 'localhost',
            user: 'aluno',
            password: 'Sptech#2024',
            database: 'guitar',
            port: 3307
        }
    ).promise();

    // Insere os dados no banco de dados (se habilitado)
    if (HABILITAR_OPERACAO_INSERIR) {
        // Este insert irá inserir os dados na tabela "usuario"
        await poolBancoDados.execute(
            'INSERT INTO usuario (name, email, password) VALUES (?, ?, ?)',
            [name, email, password]
        );
        console.log("Valores inseridos no banco:", name + ", " + email + ", " + password);
    }
};

// Função para criar e configurar o servidor web
const servidor = () => {
    const app = express();

    // Configurações de CORS
    app.use((request, response, next) => {
        response.header('Access-Control-Allow-Origin', '*');
        response.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
        next();
    });

    // Inicia o servidor na porta especificada
    app.listen(SERVIDOR_PORTA, () => {
        console.log(`API executada com sucesso na porta ${SERVIDOR_PORTA}`);
    });

    // Define um endpoint para receber os dados do formulário
    app.post('/cadastro', express.json(), async (req, res) => {
        const { nome, email, password} = req.body;
        await serial(nome, email, password);
        res.send('Dados cadastrados com sucesso!');
    });
};

// Função principal assíncrona para iniciar o servidor web
(async () => {
    // Inicia o servidor web
    servidor();
})();