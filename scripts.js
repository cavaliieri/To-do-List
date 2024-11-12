const button = document.querySelector(".button-add-task");
const input = document.querySelector(".input-task");
const listaCompleta = document.querySelector(".list-tasks");
const filtroTodas = document.querySelector("#show-all");
const filtroPendentes = document.querySelector("#show-pending");
const filtroConcluidas = document.querySelector("#show-completed");
const limparConcluidas = document.querySelector("#clear-completed");

let minhaListaDeItens = [];
let filtroAtivo = "todas";

function adicionarNovaTarefa() {
  if (input.value == "") return;

  minhaListaDeItens.push({
    tarefa: input.value,
    concluida: false,
  });

  input.value = "";

  mostrarTarefas();
}

function mostrarTarefas() {
  let novaLi = "";
  
 


  minhaListaDeItens.forEach((item, posicao) => {
    
    if (filtroAtivo === "pendentes" && item.concluida) return;
    if (filtroAtivo === "concluidas" && !item.concluida) return;


    novaLi =
      novaLi +
      `

        <li class="task ${item.concluida && "done"}">
            <img src="./img/checked.png" alt="check-na-tarefa" onclick="concluirTarefa(${posicao})">
            <p>${item.tarefa}</p>
            <img src="./img/trash.png" alt="tarefa-para-o-lixo" onclick="deletarItem(${posicao})">
        </li>
        
        `;
  });

  listaCompleta.innerHTML = novaLi;

  localStorage.setItem("lista", JSON.stringify(minhaListaDeItens));
}

function concluirTarefa(posicao) {
  minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida;

  mostrarTarefas();
}

function mostrarTodasTarefas() {
  filtroAtivo = "todas";
  mostrarTarefas();
}


function mostrarPendentes() {
  filtroAtivo = "pendentes";
  mostrarTarefas();
}


function mostrarConcluidas() {
  filtroAtivo = "concluidas";
  mostrarTarefas();
}

function limparTarefasConcluidas() {
  minhaListaDeItens = minhaListaDeItens.filter(item => !item.concluida);
  mostrarTarefas();
}


function deletarItem(posicao) {
  minhaListaDeItens.splice(posicao, 1);

  mostrarTarefas();
}

function recarregarTarefas() {
  const tarefasDoLocalStorage = localStorage.getItem("lista");

  if (tarefasDoLocalStorage) {
    minhaListaDeItens = JSON.parse(tarefasDoLocalStorage);
  }

  mostrarTarefas();
}


button.addEventListener("click", adicionarNovaTarefa);
filtroTodas.addEventListener("click", mostrarTodasTarefas);
filtroPendentes.addEventListener("click", mostrarPendentes);
filtroConcluidas.addEventListener("click", mostrarConcluidas);
limparConcluidas.addEventListener("click", limparTarefasConcluidas);
recarregarTarefas();