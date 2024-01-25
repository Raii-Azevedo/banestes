// Função para ler o arquivo CSV
async function lerArquivoCSV() {
    const response = await fetch('Q3_Raíssa_Azevedo.csv');
    const data = await response.text();
    return data;
}

// Função para converter os dados CSV em uma matriz
function converterCSVParaMatriz(csv) {
    const linhas = csv.split('\n');
    const matriz = [];

    for (let i = 0; i < linhas.length; i++) {
        const colunas = linhas[i].split(',');
        matriz.push(colunas);
    }

    return matriz;
}

// Função para gerar a tabela HTML
function gerarTabela(matriz) {
    const tabela = document.getElementById('data-table');
    tabela.innerHTML = ''; // Limpar a tabela antes de gerar

    for (let i = 0; i < matriz.length; i++) {
        const linha = document.createElement('tr');

        for (let j = 0; j < matriz[i].length; j++) {
            const celula = document.createElement('td');
            celula.textContent = matriz[i][j];
            linha.appendChild(celula);
        }

        tabela.appendChild(linha);
    }
}

// Função principal para carregar e exibir os dados
async function carregarDados() {
    try {
        const csvData = await lerArquivoCSV();
        const matriz = converterCSVParaMatriz(csvData);
        gerarTabela(matriz);
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
    }
}

// Adicione chamadas de função necessárias aqui
carregarDados();

// Variável para armazenar o índice da linha selecionada
let selectedRowIndex;

// Função para adicionar um novo item à tabela
function adicionarItem() {
    const tabela = document.getElementById('data-table');

    // Obter o último ID
    const ultimaLinha = tabela.rows[tabela.rows.length - 1];
    const ultimoId = ultimaLinha ? parseInt(ultimaLinha.cells[0].textContent) : 0;

    // Criar uma nova linha
    const novaLinha = tabela.insertRow();

    // Preencher as células da nova linha
    const celulaId = novaLinha.insertCell(0);
    const celulaNome = novaLinha.insertCell(1);
    const celulaEmail = novaLinha.insertCell(2);
    const celulaTelefone = novaLinha.insertCell(3);

    // Atribuir automaticamente um novo ID incrementado
    celulaId.textContent = (ultimoId + 1).toString();

    // Solicitar as informações restantes ao usuário
    celulaNome.textContent = prompt('Digite o Nome:');
    celulaEmail.textContent = prompt('Digite o Email:');
    celulaTelefone.textContent = prompt('Digite o Telefone:');
}

// Função para excluir o item selecionado
function excluirItem() {
    const tabela = document.getElementById('data-table');
    const linhas = tabela.getElementsByTagName('tr');

    for (let i = 0; i < linhas.length; i++) {
        linhas[i].onclick = function () {
            tabela.deleteRow(this.rowIndex);
        };
    }
}

// Função para editar um item
function editarItem() {
    const tabela = document.getElementById('data-table');
    const linhas = tabela.getElementsByTagName('tr');

    for (let i = 0; i < linhas.length; i++) {
        linhas[i].onclick = function () {
            // Atualize a variável selectedRowIndex
            selectedRowIndex = this.rowIndex;

            const celulas = this.getElementsByTagName('td');

            document.getElementById('editNome').value = celulas[1].textContent;
            document.getElementById('editEmail').value = celulas[2].textContent;
            document.getElementById('editTelefone').value = celulas[3].textContent;

            // Exibir o modal
            $('#editarItemModal').modal('show');
        };
    }

    // Adicione o evento de envio do formulário de edição
    document.getElementById('editarItemForm').onsubmit = function (event) {
        event.preventDefault();

        const nomeEditado = document.getElementById('editNome').value;
        const emailEditado = document.getElementById('editEmail').value;
        const telefoneEditado = document.getElementById('editTelefone').value;

        // Atualize as células da linha selecionada
        const celulas = tabela.getElementsByTagName('tr')[selectedRowIndex].getElementsByTagName('td');
        celulas[1].textContent = nomeEditado;
        celulas[2].textContent = emailEditado;
        celulas[3].textContent = telefoneEditado;

        // Feche o modal
        $('#editarItemModal').modal('hide');
    };
}

// Adicione o evento de ocultar o modal ao clicar em Cancelar
$('#editarItemModal').on('hidden.bs.modal', function (e) {
    // Redefinir os campos do formulário ao fechar o modal
    document.getElementById('editNome').value = '';
    document.getElementById('editEmail').value = '';
    document.getElementById('editTelefone').value = '';
});

// Função Pesquisar nome
function pesquisarNome() {
    const tabela = document.getElementById('data-table');
    const linhas = tabela.getElementsByTagName('tr');
    const termoPesquisa = document.getElementById('searchInput').value.toLowerCase();

    for (let i = 1; i < linhas.length; i++) { // Começando de 1 para ignorar a primeira linha (cabeçalho)
        const celulaNome = linhas[i].getElementsByTagName('td')[1].textContent.toLowerCase();

        if (celulaNome.includes(termoPesquisa)) {
            linhas[i].style.display = ''; // Exibir a linha se o nome corresponder ao termo de pesquisa
        } else {
            linhas[i].style.display = 'none'; // Ocultar a linha se o nome não corresponder
        }
    }
}
