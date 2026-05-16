let projetos = JSON.parse(localStorage.getItem("projetos")) || [];

function salvarProjetos() {
  localStorage.setItem("projetos", JSON.stringify(projetos));
}

function adicionarProjeto() {
  const titulo = document.getElementById("titulo").value;
  const descricao = document.getElementById("descricao").value;
  const status = document.getElementById("status").value;

  if (titulo.trim() === "") {
    alert("Digite o nome do projeto.");
    return;
  }

  const projeto = {
    id: Date.now(),
    titulo,
    descricao,
    status
  };

  projetos.push(projeto);
  salvarProjetos();
  listarProjetos();

  document.getElementById("titulo").value = "";
  document.getElementById("descricao").value = "";
  document.getElementById("status").value = "Não iniciado";
}

function listarProjetos() {
  const lista = document.getElementById("listaProjetos");
  lista.innerHTML = "";

  projetos.forEach(projeto => {
    let classeStatus = "nao-iniciado";

    if (projeto.status === "Finalizado") classeStatus = "finalizado";
    if (projeto.status === "Em andamento") classeStatus = "andamento";

    lista.innerHTML += `
      <div class="projeto">
        <h3>${projeto.titulo}</h3>
        <p>${projeto.descricao}</p>
        <p>Status: <span class="status ${classeStatus}">${projeto.status}</span></p>

        <div class="acoes">
          <button onclick="alterarStatus(${projeto.id}, 'Em andamento')">Em andamento</button>
          <button class="finalizar" onclick="alterarStatus(${projeto.id}, 'Finalizado')">Finalizar</button>
          <button class="excluir" onclick="excluirProjeto(${projeto.id})">Excluir</button>
        </div>
      </div>
    `;
  });
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

function excluirProjeto(id) {
  projetos = projetos.filter(projeto => projeto.id !== id);
  salvarProjetos();
  listarProjetos();
}

listarProjetos();