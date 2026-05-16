let projetos = JSON.parse(localStorage.getItem("projetos")) || [];

function salvarProjetos() {
  localStorage.setItem("projetos", JSON.stringify(projetos));
}

function adicionarProjeto() {
  const titulo = document.getElementById("titulo").value.trim();
  const descricao = document.getElementById("descricao").value.trim();
  const responsavel = document.getElementById("responsavel").value.trim();
  const data = document.getElementById("data").value;
  const status = document.getElementById("status").value;

  if (!titulo) {
    alert("Digite o nome do projeto.");
    return;
  }

  projetos.push({
    id: Date.now(),
    titulo,
    descricao,
    responsavel,
    data,
    status
  });

  salvarProjetos();
  limparFormulario();
  listarProjetos();
}

function limparFormulario() {
  document.getElementById("titulo").value = "";
  document.getElementById("descricao").value = "";
  document.getElementById("responsavel").value = "";
  document.getElementById("data").value = "";
  document.getElementById("status").value = "Não iniciado";
}

function listarProjetos() {
  const lista = document.getElementById("listaProjetos");
  const pesquisa = document.getElementById("pesquisa")?.value.toLowerCase() || "";
  const filtroStatus = document.getElementById("filtroStatus")?.value || "Todos";

  lista.innerHTML = "";

  let filtrados = projetos.filter(projeto => {
    const combinaPesquisa =
      projeto.titulo.toLowerCase().includes(pesquisa) ||
      projeto.descricao.toLowerCase().includes(pesquisa) ||
      projeto.responsavel.toLowerCase().includes(pesquisa);

    const combinaStatus =
      filtroStatus === "Todos" || projeto.status === filtroStatus;

    return combinaPesquisa && combinaStatus;
  });

  atualizarResumo();

  if (filtrados.length === 0) {
    lista.innerHTML = `<div class="vazio">Nenhum projeto encontrado.</div>`;
    return;
  }

  filtrados.forEach(projeto => {
    let classeStatus = "nao-iniciado";

    if (projeto.status === "Finalizado") classeStatus = "finalizado";
    if (projeto.status === "Em andamento") classeStatus = "andamento";

    lista.innerHTML += `
      <div class="projeto">
        <h3>${projeto.titulo}</h3>
        <p>${projeto.descricao || "Sem descrição."}</p>

        <p class="meta">
          Responsável: ${projeto.responsavel || "Não informado"} |
          Data: ${projeto.data || "Sem data"}
        </p>

        <p>Status: <span class="status ${classeStatus}">${projeto.status}</span></p>

        <div class="acoes">
          <button onclick="alterarStatus(${projeto.id}, 'Não iniciado')">Não iniciado</button>
          <button onclick="alterarStatus(${projeto.id}, 'Em andamento')">Em andamento</button>
          <button class="finalizar" onclick="alterarStatus(${projeto.id}, 'Finalizado')">Finalizar</button>
          <button class="editar" onclick="editarProjeto(${projeto.id})">Editar</button>
          <button class="excluir" onclick="excluirProjeto(${projeto.id})">Excluir</button>
        </div>
      </div>
    `;
  });
}

function atualizarResumo() {
  document.getElementById("totalProjetos").innerText = projetos.length;
  document.getElementById("totalAndamento").innerText =
    projetos.filter(p => p.status === "Em andamento").length;
  document.getElementById("totalFinalizados").innerText =
    projetos.filter(p => p.status === "Finalizado").length;
}

function alterarStatus(id, novoStatus) {
  projetos = projetos.map(projeto => {
    if (projeto.id === id) {
      projeto.status = novoStatus;
    }
    return projeto;
  });

  salvarProjetos();
  listarProjetos();
}

function editarProjeto(id) {
  const projeto = projetos.find(p => p.id === id);

  const novoTitulo = prompt("Nome do projeto:", projeto.titulo);
  if (novoTitulo === null || novoTitulo.trim() === "") return;

  const novaDescricao = prompt("Descrição:", projeto.descricao);
  const novoResponsavel = prompt("Responsável:", projeto.responsavel);
  const novaData = prompt("Data no formato AAAA-MM-DD:", projeto.data);

  projeto.titulo = novoTitulo.trim();
  projeto.descricao = novaDescricao || "";
  projeto.responsavel = novoResponsavel || "";
  projeto.data = novaData || "";

  salvarProjetos();
  listarProjetos();
}

function excluirProjeto(id) {
  const confirmar = confirm("Deseja realmente excluir este projeto?");

  if (!confirmar) return;

  projetos = projetos.filter(projeto => projeto.id !== id);
  salvarProjetos();
  listarProjetos();
}

listarProjetos();
