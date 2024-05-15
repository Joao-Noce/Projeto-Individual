CREATE DATABASE guitar;

USE guitar;

CREATE TABLE usuario (
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
	nomeUsuario VARCHAR(50) UNIQUE,
	emailUsuario VARCHAR(50) UNIQUE,
	senhaUsuario VARCHAR(50),
    fezQuestionario boolean);
    
    select * from usuario;
    
    select idUsuario as Id, nomeUsuario as Usuário, emailUsuario as Email, senhaUsuario as Senha, fezQuestionario as Questionário from usuario;
    
    drop table usuario;
    
    truncate table usuario;
    
    create table questionario (
    idPergunta int primary key auto_increment,
    Tempo varchar(45),
    Aula varchar(45),
    Frequência varchar(45),
    Tipo varchar(45),
    fk_Pergunta_Usuario int, FOREIGN KEY (fk_Pergunta_Usuario) REFERENCES usuario (idUsuario));
    
    select * from questionario;
    
    select Tempo, Aula, Frequência, Tipo,
    nomeUsuario as Usuário, emailUsuario as Email
    from usuario left join questionario on idUsuario = fk_Pergunta_Usuario;
    
    truncate table questionario;
    
    drop table questionario;
    
    CREATE TABLE aviso (
	idAviso INT PRIMARY KEY AUTO_INCREMENT,
	texto VARCHAR(250),
    dia datetime default current_timestamp,
	fk_Aviso_Usuario INT, FOREIGN KEY (fk_Aviso_Usuario) REFERENCES usuario(idUsuario));
    
    select * from aviso;
    select * from usuario;
    
	INSERT INTO aviso (texto, fk_Aviso_Usuario) VALUES ('teste', 6);