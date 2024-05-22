sessionStorage.LOCAL = '../HTML/Site_Lessons.html';

var nomeUsuario = sessionStorage.NOME_USUARIO;
var idUsuario = sessionStorage.ID_USUARIO;
atualizarFeed();

function limparFormulario() {
    document.getElementById("form_postagem").reset();
}

function publicar() {
    window.location.reload(true);
    var descricao = form_postagem.descricao.value;

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
            console.log("caiu dentro da resposta", resposta)
            window.alert("Post realizado com sucesso por " + nomeUsuario + "!");
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
    return false;
}

function voltar() {
    console.log("cliquei em voltar comentário de ID - " + idComentario);
    div_form.style.display = 'flex';
    textarea_edicao.value - '';
    div_editor.style.display = 'none';
}

function irEditar(idComentario) {
    sessionStorage.ID_POSTAGEM_EDITANDO = idComentario;
    console.log("cliquei em editar comentário de ID - " + idComentario);
    div_form.style.display = 'none';
    div_editor.style.display = 'flex';
}

function editar() {
    fetch(`/avisos/editar/${sessionStorage.getItem("ID_POSTAGEM_EDITANDO")}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            descricao: textarea_edicao.value
        })
    }).then(function (resposta) {

        if (resposta.ok) {
            div_form.style.display = 'flex';
            textarea_edicao.value - '';
            div_editor.style.display = 'none';
        } else if (resposta.status == 404) {
            window.alert("Deu 404!");
        } else {
            throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + resposta.status);
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
    atualizarFeed();
}

function deletar(idComentario) {
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