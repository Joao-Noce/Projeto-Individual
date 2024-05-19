obterDadosGrafico()

function exibirGrafico() {
    var select = select_grafico.value;
    if (select == 'pergunta1') {
        myChartCanvas1.style.display = 'block';
        myChartCanvas2.style.display = 'none';
        myChartCanvas3.style.display = 'none';
        myChartCanvas4.style.display = 'none';
    } else if (select == 'pergunta2') {
        myChartCanvas1.style.display = 'none';
        myChartCanvas2.style.display = 'block';
        myChartCanvas3.style.display = 'none';
        myChartCanvas4.style.display = 'none';
    } else if (select == 'pergunta3') {
        myChartCanvas1.style.display = 'none';
        myChartCanvas2.style.display = 'none';
        myChartCanvas3.style.display = 'block';
        myChartCanvas4.style.display = 'none';
    } else if (select == 'pergunta4') {
        myChartCanvas1.style.display = 'none';
        myChartCanvas2.style.display = 'none';
        myChartCanvas3.style.display = 'none';
        myChartCanvas4.style.display = 'block';
    }
}

// O gráfico é construído com três funções:
// 1. obterDadosGrafico -> Traz dados do Banco de Dados para montar o gráfico da primeira vez
// 2. plotarGrafico -> Monta o gráfico com os dados trazidos e exibe em tela
// 3. atualizarGrafico -> Atualiza o gráfico, trazendo novamente dados do Banco

// Esta função *obterDadosGrafico* busca os últimos dados inseridos em tabela de medidas.
// para, quando carregar o gráfico da primeira vez, já trazer com vários dados.
// A função *obterDadosGrafico* também invoca a função *plotarGrafico*

//     Se quiser alterar a busca, ajuste as regras de negócio em src/controllers
//     Para ajustar o "select", ajuste o comando sql em src/models
function obterDadosGrafico() {
    fetch(`/dash/pergunta1/`)
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (dados) {
                    console.log("Dados recebidos: ", JSON.stringify(dados));
                    // dados.reverse();

                    plotarGrafico_1(dados);
                });
            } else {
                console.error('Nenhum dado encontrado da pergunta1 ou erro na API');
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

    fetch(`/dash/pergunta2/`)
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (dados) {
                    console.log("Dados recebidos: ", JSON.stringify(dados));
                    dados.reverse();

                    plotarGrafico_2(dados);
                });
            } else {
                console.error('Nenhum dado encontrado da pergunta2 ou erro na API');
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
    fetch(`/dash/pergunta3/`)
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (dados) {
                    console.log("Dados recebidos: ", JSON.stringify(dados));
                    dados.reverse();

                    plotarGrafico_3(dados);
                });
            } else {
                console.error('Nenhum dado encontrado da pergunta3 ou erro na API');
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
    fetch(`/dash/pergunta4/`)
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (dados) {
                    console.log("Dados recebidos: ", JSON.stringify(dados));
                    dados.reverse();

                    plotarGrafico_4(dados);
                });
            } else {
                console.error('Nenhum dado encontrado da pergunta4 ou erro na API');
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

function plotarGrafico_1(dados) {
    console.log("Dados recebidos no plotar: ", JSON.stringify(dados));
    console.log('Iniciando plotagem do gráfico...');

    // Criando estrutura para plotar gráfico - labels e data
    let labels = ['Nunca toquei', 'Alguns meses', 'Um ano', 'Mais de um ano']; // Pegando os valores das respostas
    let option1 = dados.map(item => item.Option1); // Pegando os valores das quantidades
    let option2 = dados.map(item => item.Option2); // Pegando os valores das quantidades
    let option3 = dados.map(item => item.Option3); // Pegando os valores das quantidades
    let option4 = dados.map(item => item.Option4); // Pegando os valores das quantidades

    let chartData = {
        labels: labels,
        datasets: [{
            label: 'Respostas',
            data: [option1, option2, option3, option4],
            borderColor: '#B0CDDA',
            backgroundColor: '#B0CDDA',
            borderWidth: 1
        }]
    };

    console.log('----------------------------------------------');
    console.log('Estes dados foram recebidos pela função "obterDadosGrafico" e passados para "plotarGrafico":');
    console.log(dados);

    console.log('----------------------------------------------');
    console.log('O gráfico será plotado com os respectivos valores:');
    console.log('Labels:');
    console.log(labels);
    console.log('Dados:');
    console.log(option1, option2, option3, option4);
    console.log('----------------------------------------------');

    // Criando estrutura para plotar gráfico - config
    const config = {
        type: 'bar',
        data: chartData,
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                }
            }
        }
    };

    // Adicionando gráfico criado em div na tela
    let myChart = new Chart(
        document.getElementById('myChartCanvas1'),
        config
    );
}

function plotarGrafico_2(dados) {
    console.log("Dados recebidos no plotar: ", JSON.stringify(dados));
    console.log('Iniciando plotagem do gráfico...');

    // Criando estrutura para plotar gráfico - labels e data
    let labels = ['Tiveram aulas', 'Aprenderam sozinhos', 'Começaram agora']; // Pegando os valores das respostas
    let option1 = dados.map(item => item.Option1); // Pegando os valores das quantidades
    let option2 = dados.map(item => item.Option2); // Pegando os valores das quantidades
    let option3 = dados.map(item => item.Option3); // Pegando os valores das quantidades

    let chartData = {
        labels: labels,
        datasets: [{
            label: 'Respostas',
            data: [option1, option2, option3],
            borderColor: '#B0CDDA',
            backgroundColor: '#B0CDDA',
            borderWidth: 1
        }]
    };

    console.log('----------------------------------------------');
    console.log('Estes dados foram recebidos pela função "obterDadosGrafico" e passados para "plotarGrafico":');
    console.log(dados);

    console.log('----------------------------------------------');
    console.log('O gráfico será plotado com os respectivos valores:');
    console.log('Labels:');
    console.log(labels);
    console.log('Dados:');
    console.log(option1, option2);
    console.log('----------------------------------------------');

    // Criando estrutura para plotar gráfico - config
    const config = {
        type: 'bar',
        data: chartData,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    };

    // Adicionando gráfico criado em div na tela
    let myChart = new Chart(
        document.getElementById('myChartCanvas2'),
        config
    );
}

function plotarGrafico_3(dados) {
    console.log("Dados recebidos no plotar: ", JSON.stringify(dados));
    console.log('Iniciando plotagem do gráfico...');

    // Criando estrutura para plotar gráfico - labels e data
    let labels = ['Não pratica', 'Até 2 dias', 'Até 4 dias', 'Todos os dias']; // Pegando os valores das respostas
    let option1 = dados.map(item => item.Option1); // Pegando os valores das quantidades
    let option2 = dados.map(item => item.Option2); // Pegando os valores das quantidades
    let option3 = dados.map(item => item.Option3); // Pegando os valores das quantidades
    let option4 = dados.map(item => item.Option4); // Pegando os valores das quantidades

    let chartData = {
        labels: labels,
        datasets: [{
            label: 'Respostas',
            data: [option1, option2, option3, option4],
            borderColor: '#B0CDDA',
            backgroundColor: '#B0CDDA',
            borderWidth: 1
        }]
    };

    console.log('----------------------------------------------');
    console.log('Estes dados foram recebidos pela função "obterDadosGrafico" e passados para "plotarGrafico":');
    console.log(dados);

    console.log('----------------------------------------------');
    console.log('O gráfico será plotado com os respectivos valores:');
    console.log('Labels:');
    console.log(labels);
    console.log('Dados:');
    console.log(option1, option2, option3, option4);
    console.log('----------------------------------------------');

    // Criando estrutura para plotar gráfico - config
    const config = {
        type: 'bar',
        data: chartData,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    };

    // Adicionando gráfico criado em div na tela
    let myChart = new Chart(
        document.getElementById('myChartCanvas3'),
        config
    );
}

function plotarGrafico_4(dados) {
    console.log("Dados recebidos no plotar: ", JSON.stringify(dados));
    console.log('Iniciando plotagem do gráfico...');

    // Criando estrutura para plotar gráfico - labels e data
    let labels = ['Não tem violão', 'Violão Clássico', 'Violão Folk', 'Violão 12 Cordas', 'Violão Flat', 'Outro']; // Pegando os valores das respostas
    let option1 = dados.map(item => item.Option1); // Pegando os valores das quantidades
    let option2 = dados.map(item => item.Option2); // Pegando os valores das quantidades
    let option3 = dados.map(item => item.Option3); // Pegando os valores das quantidades
    let option4 = dados.map(item => item.Option4); // Pegando os valores das quantidades
    let option5 = dados.map(item => item.Option5); // Pegando os valores das quantidades
    let option6 = dados.map(item => item.Option6); // Pegando os valores das quantidades

    let chartData = {
        labels: labels,
        datasets: [{
            label: 'Respostas',
            data: [option1, option2, option3, option4, option5, option6],
            borderColor: '#B0CDDA',
            backgroundColor: '#B0CDDA',
            borderWidth: 1
        }]
    };

    console.log('----------------------------------------------');
    console.log('Estes dados foram recebidos pela função "obterDadosGrafico" e passados para "plotarGrafico":');
    console.log(dados);

    console.log('----------------------------------------------');
    console.log('O gráfico será plotado com os respectivos valores:');
    console.log('Labels:');
    console.log(labels);
    console.log('Dados:');
    console.log(option1, option2, option3, option4, option5, option6);
    console.log('----------------------------------------------');

    // Criando estrutura para plotar gráfico - config
    const config = {
        type: 'bar',
        data: chartData,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    };

    // Adicionando gráfico criado em div na tela
    let myChart = new Chart(
        document.getElementById('myChartCanvas4'),
        config
    );
}