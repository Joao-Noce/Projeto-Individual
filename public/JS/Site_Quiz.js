function uncheckCheckboxes() {
    // Seleciona todos os inputs de tipo checkbox
    const checkboxInputs = Tipo.querySelectorAll('input[type="checkbox"]');
    // Desmarca todos os checkbox
    checkboxInputs.forEach(function(checkboxInput) {
        checkboxInput.checked = false;
    });
}

function uncheckRadio() {
    // Seleciona todos os inputs de tipo radio
    const RadioInputs = Tipo.querySelectorAll('input[type="radio"]');
    // Desmarca todos os radio
    RadioInputs.forEach(function(RadioInput) {
        RadioInput.checked = false;
    });
}

function finalizar() {
    var pergunta1 = document.getElementsByName('time');
    var input1;
    var pergunta2 = document.getElementsByName('lessons');
    var input2;
    var pergunta3 = document.getElementsByName('frequency');
    var input3;
    var pergunta4 = document.getElementsByName('tipo');
    var input4 = [];
    var idUsuario = sessionStorage.ID_USUARIO;
    var nomeUsuario = sessionStorage.NOME_USUARIO;

    for (var A = 0; A < pergunta1.length; A++) {
        if (pergunta1[A].checked) {
            input1 = pergunta1[A].value;
            break;
        }
    }
    for (var B = 0; B < pergunta2.length; B++) {
        if (pergunta2[B].checked) {
            input2 = pergunta2[B].value;
            break;
        }
    }
    for (var C = 0; C < pergunta3.length; C++) {
        if (pergunta3[C].checked) {
            input3 = pergunta3[C].value;
            break;
        }
    }
    for (var D = 0; D < pergunta4.length; D++) {
        if (pergunta4[D].checked) {
            input4.push(pergunta4[D].value);
            
        }
    }
    console.log(input4);
    if (!input1 || !input2 || !input3 || input4.length == 0) {
        alert("Todas as perguntas precisam ser respondidas.");
        return;
    }

    fetch(`/usuarios/finalizar/${idUsuario}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            input1Server: input1,
            input2Server: input2,
            input3Server: input3,
            input4Server: input4,
            idUsuarioServer: idUsuario

        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO finalizar()!")

        if (resposta.ok) {
            console.log(resposta);
            window.alert("Questionário finalizado com sucesso " + nomeUsuario + "!");
            var fezQuestionario = true;
            fetch(`/usuarios/fazerQuestionario/${idUsuario}/${fezQuestionario}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    idUsuarioServer: idUsuario,
                    fezQuestionarioServer: fezQuestionario
                }),
            })
            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));
            });
            window.location = "../HTML/Site_Lessons.html";
        } else {
            alert("Erro ao finalizar o questionário.");
            resposta.text().then(texto => {
                console.error(texto);
            });
        }
    }).catch(function (erro) {
        console.log(erro);
    });

    return false;
}