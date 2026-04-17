let tarefas = []; 
let paginaAtual = 0; 
const tarefasPorPagina = 10; 

// Adicionar a tarefa
function adicionarTarefa() {
    const input = document.getElementById('entradaTarefa');
    const texto = input.value.trim();

    if (texto !== "") {
        tarefas.push({ texto: texto, concluido: false });
        
        paginaAtual = Math.floor((tarefas.length - 1) / (tarefasPorPagina * 2));
        
        renderizar();
        
        input.value = "";
        input.focus();
    }
}

// Organiza tudo
function renderizar() {
    const listaEsq = document.getElementById('listaEsquerda');
    const listaDir = document.getElementById('listaDireita');
    const rotuloEsq = document.getElementById('rotuloEsquerdo');
    const rotuloDir = document.getElementById('rotuloDireito');
    
    listaEsq.innerHTML = "";
    listaDir.innerHTML = "";

    // Separar tarefas por pagina
    const totalPaginas = Math.max(2, Math.ceil(tarefas.length / tarefasPorPagina));

    // Visualizar as paginas juntas
    rotuloEsq.innerText = `Página ${(paginaAtual * 2) + 1} de ${totalPaginas}`; 
    rotuloDir.innerText = `Página ${(paginaAtual * 2) + 2} de ${totalPaginas}`; 

    // O que mostra o indice inicial das tarefas
    const inicioIdx = paginaAtual * tarefasPorPagina * 2;

    // Percorre todas as tarefas da lista
    tarefas.forEach((tarefa, index) => {

        // Verifica em qual pagina vai a tarefa
        if (index >= inicioIdx && index < inicioIdx + (tarefasPorPagina * 2)) {
            
            // Adiciona a nova tarefa
            const li = document.createElement('li');
            
            // É o que faz a tarefa brotar no HTML (usando as classes do CSS)
            li.innerHTML = `
                <span class="texto-tarefa ${tarefa.concluido ? 'concluido' : ''}" onclick="alternar(${index})">
                    ${tarefa.concluido ? '[-] ' : '[ ] '} ${tarefa.texto}
                </span>
                
                <span class="btn-excluir" onclick="remover(${index})">X</span>
                `;

            // Se ela for menor que 10 fica na pagina atual, se não vaza pra outra
            if (index < inicioIdx + tarefasPorPagina) {
                listaEsq.appendChild(li); 
            } else {
                listaDir.appendChild(li); 
            }
        }
    });
}

// Selecionar/Desmarcar a tarefa
function alternar(index) {
    tarefas[index].concluido = !tarefas[index].concluido;
    renderizar();
}

// Remove a tarefa
function remover(index) {
    tarefas.splice(index, 1);
    
    const maxPagina = Math.max(0, Math.floor((tarefas.length - 1) / (tarefasPorPagina * 2)));
    if (paginaAtual > maxPagina) {
        paginaAtual = maxPagina;
    }
    
    renderizar();
}

// Avançar página (alanzoka)
function proximaPagina() {
    if ((paginaAtual + 1) * tarefasPorPagina * 2 < tarefas.length) {
        paginaAtual++;
        renderizar();
    }
}

// Voltar página (alanzoka negativo)
function paginaAnterior() {
    if (paginaAtual > 0) {
        paginaAtual--;
        renderizar();
    }
}

// Botão Enter para funcionar
document.getElementById('entradaTarefa').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') adicionarTarefa();
});

// Inicializa a aplicação
renderizar();