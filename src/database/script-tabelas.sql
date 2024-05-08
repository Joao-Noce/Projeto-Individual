CREATE DATABASE guitar;

USE guitar;

CREATE TABLE usuario (
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
	nomeUsuario VARCHAR(50),
	emailUsuario VARCHAR(50),
	senhaUsuario VARCHAR(50));
    
    select * from usuario;