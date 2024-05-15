var nomeUsuario = sessionStorage.NOME_USUARIO;
var idUsuario = sessionStorage.ID_USUARIO;

function limparFormulario() {
    document.getElementById("form_postagem").reset();
}

function publicar() {

    var descricao = form_postagem.descricao.value;

    // fetch(`/avisos/publicar/${descricao}/${idUsuario}`, {
    fetch(`/avisos/publicar/banana/4`, {
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

function editar(idAviso) {
    sessionStorage.ID_POSTAGEM_EDITANDO = idAviso;
    console.log("cliquei em editar aviso de ID - " + idAviso);
    // window.location = "#idEdit"
}

function deletar(idAviso) {
    console.log("Criar função de apagar post escolhido - ID" + idAviso + "do usuário de ID - " + idUsuario);
    fetch(`/avisos/deletar/${idAviso}`, {
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
                mensagem.innerHTML = "Nenhum resultado encontrado."
                feed.appendChild(mensagem);
                throw "Nenhum resultado encontrado!!";
            }

            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));

                var feed = document.getElementById("feed_container");
                feed.innerHTML = "";
                for (let i = 0; i < resposta.length; i++) {
                    var publicacao = resposta[i];

                    var divPublicacao = document.createElement("div");
                    var spanNome = document.createElement("span");
                    var divDescricao = document.createElement("div");
                    var divButtons = document.createElement("div");
                    var btnEditar = document.createElement("button");
                    var btnDeletar = document.createElement("button");

                    spanNome.innerHTML = "<b>" + publicacao.nome + "</b>";
                    divDescricao.innerHTML = publicacao.descricao;
                    btnEditar.innerHTML = "Editar";
                    btnDeletar.innerHTML = "Deletar";

                    divPublicacao.className = "publicacao";
                    spanNome.className = "publicacao-nome";
                    divDescricao.className = "publicacao-descricao";
                    divButtons.className = "div-buttons"

                    btnEditar.className = "publicacao-btn-editar"
                    btnEditar.id = "btnEditar" + publicacao.idAviso;
                    btnEditar.setAttribute("onclick", `editar(${publicacao.idAviso})`);

                    btnDeletar.className = "publicacao-btn-editar"
                    btnDeletar.id = "btnDeletar" + publicacao.idAviso;
                    btnDeletar.setAttribute("onclick", `deletar(${publicacao.idAviso})`);

                    divPublicacao.appendChild(spanNome);
                    divPublicacao.appendChild(divDescricao);
                    divPublicacao.appendChild(divButtons);
                    divButtons.appendChild(btnEditar);
                    divButtons.appendChild(btnDeletar);
                    feed.appendChild(divPublicacao);
                }
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}