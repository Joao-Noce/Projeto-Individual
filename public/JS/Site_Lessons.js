document.addEventListener("DOMContentLoaded", function () {

    a2.addEventListener("click", function (event) {
        event.preventDefault();
        arrow2.style = "transform: rotate(-135deg); margin-bottom: 1px";
        Tools2.style = "top: 50px;pointer-events: all";
        Tools2_span1.style = "pointer-events: all";
        Tools2_span2.style = "pointer-events: all";
        Tools2_span3.style = "pointer-events: all";
    });

    // Evento de clique em qualquer lugar da tela para desaparecer
    document.addEventListener("mouseout", function (event) {
        if (event.target !== a2 && event.target !== Tools2 && event.target !== lis2 && event.target !== Tools2_span1 && event.target !== Tools2_span2 && event.target !== Tools2_span3) {
            arrow2.style = "transform: rotate(45deg); margin-bottom: 4px";
            Tools2.style = "top: -100px; pointer-events: none";
            Tools2_span1.style = "pointer-events: none";
            Tools2_span2.style = "pointer-events: none";
            Tools2_span3.style = "pointer-events: none";
        }
    });
    
    leave.addEventListener("click", function (event) {
        // event.preventDefault();
        sessionStorage.clear();
    })
});


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

function editar(idAviso) {
    window.location.reload(true);
    sessionStorage.ID_POSTAGEM_EDITANDO = idAviso;
    console.log("cliquei em editar aviso de ID - " + idAviso);

}

function deletar(idAviso) {
    window.location.reload(true);
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
                for (var i = resposta.length - 1; i >= 0; i--) {
                    var publicacao = resposta[i];
                    if (sessionStorage.ID_USUARIO == publicacao.fk_Aviso_Usuario) {
                        var divPublicacao = document.createElement("div");
                        var spanNome = document.createElement("span");
                        var divDescricao = document.createElement("div");
                        var divButtons = document.createElement("div");
                        var btnEditar = document.createElement("button");
                        var btnDeletar = document.createElement("button");

                        spanNome.innerHTML = "<b>" + publicacao.nomeUsuario + publicacao.dia + "</b>";
                        spanNome.innerHTML = `<b> ${publicacao.nomeUsuario}   <span class='hora'>| ${publicacao.dia.replace('T', ', às ').replace('.000Z', '')}</span> </b>`;
                        divDescricao.innerHTML = publicacao.texto;
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

                    } else {
                        var divPublicacao = document.createElement("div");
                        var spanNome = document.createElement("span");
                        var divDescricao = document.createElement("div");

                        spanNome.innerHTML = `<b> ${publicacao.nomeUsuario}   <span class='hora'>| ${publicacao.dia.replace('T', ', às ').replace('.000Z', '')}</span> </b>`;
                        divDescricao.innerHTML = publicacao.texto;

                        divPublicacao.className = "publicacao";
                        spanNome.className = "publicacao-nome";
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