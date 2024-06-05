sessionStorage.LOCAL = '../HTML/Site_Lessons.html';

var nomeUsuario = sessionStorage.NOME_USUARIO;
var idUsuario = sessionStorage.ID_USUARIO;
atualizarFeed();

function limparFormulario() {
    document.getElementById("form_postagem").reset();
}

var bloqueios = ['ARROMBADO', 'ARROMBADA', 'BUCETA', 'BCT', 'CARALHO', 'CARAI', 'CUZÃO', 'CUZAO', 'FILHA DA PUTA', 'FILHO DA PUTA', 'VIADO', 'VADIA', 'PIRANHA', 'PUTA', 'PUTO', 'CACETE', 'PUTA MERDA', 'PUTA QUE PARIU', 'PINTO', 'PÊNIS', 'PENIS', 'ROLA', 'XOTA', 'CU', 'PORRA', 'BOSTA', 'VSF', 'FODA', 'PQP', 'CRLH', 'PAU', 'FDP', 'FDM', 'FILHA DA MÃE', 'FILHO DA MÃE', 'FUDE', 'SI FUDE', 'PIROCA', 'PIROKA', 'PIKA', 'PICA', 'RETARDADO', 'DESGRAÇADO'];

function publicar() {
    var permitido = true;
    var descricao = form_postagem.descricao.value;
    var descricao_modificada = descricao.toUpperCase();
    var palavras = descricao_modificada.split(/\s+/);  // Divide a descrição em palavras

    if (descricao != '') {
        for (var bloqueio = 0; bloqueio < bloqueios.length; bloqueio++) {
            if (palavras.includes(bloqueios[bloqueio])) {
                permitido = false;
                Swal.fire({
                    title: "ERRO",
                    text: "Não são permitidas palavras de baixo calão. Por favor, seja respeitoso com todos nos comentários.",
                    icon: "error",
                    background: '#1D1D1D',
                    color: '#FFF',
                });
                break;
            }
        }
        if (permitido) {
            fetch(`/avisos/publicar`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    idUsuario,
                    descricaoServer: descricao
                })
            }).then(function (resposta) {
                console.log("descricao", descricao);
                console.log("descricao", resposta);
                if (resposta.ok) {
                    console.log("caiu dentro da resposta", resposta);
                    atualizarFeed();
                    limparFormulario();
                } else if (resposta.status == 404) {
                    console.log("resposta", resposta)
                    window.alert("Deu 404!");
                    console.log("caiu dentro do elseif")
                } else {
                    console.log("caiu dentro do else")
                    throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + resposta.status);
                }
            }).catch(function (resposta) {
                console.log("caiu dentro do catch")
                console.log(`#ERRO: ${resposta}`);
            });
        }
    } else {
        Swal.fire({
            title: "ERRO",
            text: "É necessário um comentário para publicar.",
            icon: "error",
            background: '#1D1D1D',
            color: '#FFF',
        });
    }
    return false;
}

function voltar() {
    console.log("cliquei em voltar comentário de ID - " + idComentario);
    div_form.style.display = 'flex';
    textarea_edicao.value - '';
    div_editor.style.display = 'none';
}

function irEditar(idComentario) {
    var permitido_editar = true;
    sessionStorage.ID_POSTAGEM_EDITANDO = idComentario;
    console.log("cliquei em editar comentário de ID - " + idComentario);
    Swal.fire({
        title: "Editando...",
        text: "Modifique sua mensagem: (máximo de 250 caracteres):.",
        background: "#1D1D1D",
        color: "#FFF",
        input: "textarea",
        inputAttributes: {
            autocapitalize: "off"
        },
        showCancelButton: true,
        confirmButtonText: "Editar",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        var resultado = result.value;
        var resultado_modificado = resultado.toUpperCase();

        var palavras_editar = resultado_modificado.split(/\s+/);  // Divide a descrição em palavras
        if (result.isConfirmed) {
            if (resultado != '') {
                for (var bloqueio = 0; bloqueio < bloqueios.length; bloqueio++) {
                    if (palavras_editar.includes(bloqueios[bloqueio])) {
                        permitido_editar = false;
                        Swal.fire({
                            title: "ERRO",
                            text: "Não são permitidas palavras de baixo calão. Por favor, seja respeitoso com todos nos comentários.",
                            icon: "error",
                            background: '#1D1D1D',
                            color: '#FFF',
                        });
                        break;
                    }
                }
                if (permitido_editar) {
                    fetch(`/avisos/editar/${sessionStorage.getItem("ID_POSTAGEM_EDITANDO")}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            descricao: resultado
                        })
                    }).then(function (resposta) {

                        if (resposta.ok) {
                            atualizarFeed();
                        } else if (resposta.status == 404) {
                            window.alert("Deu 404!");
                        } else {
                            throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + resposta.status);
                        }
                    }).catch(function (resposta) {
                        console.log(`#ERRO: ${resposta}`);
                    });
                }
            } else {
                Swal.fire({
                    title: "ERRO",
                    text: "É necessário um comentário para publicar.",
                    icon: "error",
                    background: '#1D1D1D',
                    color: '#FFF',
                });
            }
        }
    });
}

function deletar(idComentario) {
    Swal.fire({
        title: "Tem certeza?",
        text: "Ao confirmar, o comentário será apagado permanentemente!",
        icon: "warning",
        background: "#1D1D1D",
        color: "#FFF",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.reload(true);
            console.log("Criar função de apagar comentário escolhido - ID" + idComentario + "do usuário de ID - " + idUsuario);
            fetch(`/avisos/deletar/${idComentario}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(function (resposta) {

                if (resposta.ok) {
                    window.alert("Post deletado com sucesso por " + nomeUsuario + "!");
                } else if (resposta.status == 404) {
                    window.alert("Deu 404!");
                } else {
                    throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + resposta.status);
                }
            }).catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            });
        }
    })
}

function atualizarFeed() {
    fetch("/avisos/listar").then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                var feed = document.getElementById("feed_container");
                var mensagem = document.createElement("span");
                mensagem.innerHTML = "Nenhum comentário encontrado."
                feed.appendChild(mensagem);
                throw "Nenhum resultado encontrado!!";
            }

            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));
                var feed = document.getElementById("feed_container");
                feed.innerHTML = "";
                for (var i = resposta.length - 1; i >= 0; i--) {
                    var publicacao = resposta[i];
                    if (sessionStorage.ID_USUARIO == publicacao.fk_Comentario_Usuario) {
                        var divPublicacao = document.createElement("div");
                        var spanNome = document.createElement("span");
                        var divDescricao = document.createElement("div");
                        var divButtons = document.createElement("div");
                        var btnEditar = document.createElement("button");
                        var btnDeletar = document.createElement("button");

                        spanNome.innerHTML = `<b> ${publicacao.nomeUsuario}   <span class='hora'>| ${publicacao.dia}</span> </b>`;
                        divDescricao.innerHTML = publicacao.comentario;
                        btnEditar.innerHTML = "Editar";
                        btnDeletar.innerHTML = "Deletar";

                        divPublicacao.className = "publicacao";
                        spanNome.className = "publicacao-nome";
                        divDescricao.className = "publicacao-descricao";
                        divButtons.className = "div-buttons";

                        btnEditar.className = "publicacao-btn-editar"
                        btnEditar.id = "btnEditar" + publicacao.idComentario;
                        btnEditar.setAttribute("onclick", `irEditar(${publicacao.idComentario})`);

                        btnDeletar.className = "publicacao-btn-editar"
                        btnDeletar.id = "btnDeletar" + publicacao.idComentario;
                        btnDeletar.setAttribute("onclick", `deletar(${publicacao.idComentario})`);

                        divPublicacao.appendChild(spanNome);
                        divPublicacao.appendChild(divDescricao);
                        divPublicacao.appendChild(divButtons);
                        divButtons.appendChild(btnEditar);
                        divButtons.appendChild(btnDeletar);
                        feed.appendChild(divPublicacao);

                    } else {
                        var divPublicacao = document.createElement("div");
                        var spanNome = document.createElement("span");
                        var divDescricao = document.createElement("div");

                        spanNome.innerHTML = `<b> ${publicacao.nomeUsuario}   <span class='hora'>| ${publicacao.dia}</span> </b>`;
                        divDescricao.innerHTML = publicacao.comentario;

                        divPublicacao.className = "publicacao";
                        spanNome.className = "publicacao_nome";
                        divDescricao.className = "publicacao-descricao";

                        divPublicacao.appendChild(spanNome);
                        divPublicacao.appendChild(divDescricao);
                        feed.appendChild(divPublicacao);
                    }
                }
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}

setInterval(() => {
    atualizarFeed();
}, 5000);