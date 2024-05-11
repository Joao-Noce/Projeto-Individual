CREATE DATABASE guitar;

USE guitar;

CREATE TABLE usuario (
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
	nomeUsuario VARCHAR(50),
	emailUsuario VARCHAR(50) UNIQUE,
	senhaUsuario VARCHAR(50));
    
    select idUsuario as Id, nomeUsuario as Usuário, emailUsuario as Email, senhaUsuario as Senha from usuario;
    
    drop table usuario;
    
    truncate table usuario;
    
    create table questionario (
    idPergunta int primary key auto_increment,
    Tempo varchar(45),
    Aula varchar(45),
    Frequência varchar(45),
    Tipo varchar(45),
    fkUsuario int, FOREIGN KEY (fkUsuario) REFERENCES usuario (idUsuario));
    
    select * from questionario;
    
    select Tempo, Aula, Frequência, Tipo,
    nomeUsuario as Usuário, emailUsuario as Email
    from usuario left join questionario on idUsuario = fkUsuario;
    
    truncate table questionario;
    
    drop table questionario;