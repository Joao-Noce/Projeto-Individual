CREATE DATABASE guitar;

USE guitar;

CREATE TABLE usuario (
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
	nomeUsuario VARCHAR(50) UNIQUE,
	emailUsuario VARCHAR(50) UNIQUE,
	senhaUsuario VARCHAR(50),
    fezQuestionario BOOLEAN);
    
select * from usuario;
    
CREATE TABLE questionario (
    idPergunta INT PRIMARY KEY AUTO_INCREMENT,
    Tempo VARCHAR(45),
    Aula VARCHAR(45),
    Frequência VARCHAR(45),
    Tipo VARCHAR(45),
    fk_Pergunta_Usuario INT, FOREIGN KEY (fk_Pergunta_Usuario) REFERENCES usuario (idUsuario));
    
select * from questionario;
    
CREATE TABLE comentário (
	idComentario INT PRIMARY KEY AUTO_INCREMENT,
	comentário VARCHAR(250),
    dia DATETIME DEFAULT CURRENT_TIMESTAMP,
	fk_Comentario_Usuario INT, FOREIGN KEY (fk_Comentario_Usuario) REFERENCES usuario(idUsuario));
    
select * from aviso;
    
SELECT idUsuario AS Id, nomeUsuario AS Usuário, emailUsuario AS Email, senhaUsuario AS Senha, fezQuestionario AS Questionário FROM usuario;
    
select Tempo AS 'A quanto tempo você toca?', Aula AS 'Que tipo de aula você tem?', Frequência AS 'Com que frequência você toca?', Tipo AS 'Que tipo de violão você tem?',
nomeUsuario AS Usuário,
comentario AS Comentário, dia AS 'Publicado em:'
FROM usuario LEFT JOIN questionario ON idUsuario = fk_Pergunta_Usuario
LEFT JOIN aviso ON idUsuario = fk_Comentario_Usuario order by idComentario;