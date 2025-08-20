function preparoTeste() {
  let receitas = JSON.parse(localStorage.getItem("Receitas")) || [];

  if (receitas.length === 0) {
    const receitaTeste = {
      Titulo: "Morango do Amor",
      Descricao: "A receita do momento.",
      TempoPreparo: "50 minutos",
      Imagem: "imagens/morango.jpeg",
      Ingredientes: [
        { Ingrediente: "Morango", Medida: "Unidade", Quantidade: "12" },
        { Ingrediente: "Açúcar", Medida: "Colher de sopa", Quantidade: "3" },
        { Ingrediente: "Farinha", Medida: "Xícara", Quantidade: "2" }
      ],
      Passos: [
  "Lave bem os morangos e seque com cuidado.",
  "Espete cada morango em um palito.",
  "Em uma panela, derreta açúcar até formar uma calda dourada.",
  "Mergulhe cada morango na calda, cobrindo toda a fruta.",
  "Deixe os morangos secarem sobre papel manteiga até endurecer a cobertura."
]
    };

    receitas.push(receitaTeste);
    localStorage.setItem("Receitas", JSON.stringify(receitas));
  }
}


window.addEventListener("DOMContentLoaded", preparoTeste);


let btnCadastrar = document.getElementById("btn-cadastrar");
btnCadastrar.addEventListener('click', function(e){
  e.preventDefault();
  const nome = document.getElementById("nomeCadastrar").value.trim();
  const emailCadastrar = document.getElementById("emailCadastrar").value.trim();
  const senha = document.getElementById("senhaCadastrar").value.trim();
  criarCadastro(nome, emailCadastrar, senha);
  console.log(localStorage.getItem("usuarios"));
});

function criarCadastro(nome, emailCadastrar, senha){
  const usuario = { Nome: nome, Email: emailCadastrar, Senha: senha };
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  usuarios.push(usuario);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

function login(){
  const loginEmail = document.getElementById("emailLogin").value.trim();
  const senha = document.getElementById("senhaLogin").value.trim();
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  let usuarioEncontrado = usuarios.find(u => u.Email === loginEmail && u.Senha === senha);
  if(usuarioEncontrado){
    alert("Login realizado com sucesso! Bem-vindo, " + usuarioEncontrado.Nome);
    document.getElementById("nome-usuario").innerHTML = usuarioEncontrado.Nome;
  } else {
    alert("Usuario ou senha não encontrado!");
  }
}

let btnLogin = document.getElementById("btn-login");
btnLogin.addEventListener('click', function(e){
  e.preventDefault();
  login();
});

let btnSalvarReceita = document.getElementById("btn-salvarReceita");
btnSalvarReceita.addEventListener('click', function(e){
  e.preventDefault();
  cadastrarReceita();
});

const containerIngredientes = document.querySelector(".adicionar-ingredientes");
const btnAddIngrediente = document.getElementById("btn-add-ingrediente");

btnAddIngrediente.addEventListener("click", function(e){
  e.preventDefault();

  const novoIngrediente = document.createElement("div");
  novoIngrediente.classList.add("novo-ingrediente");

  novoIngrediente.innerHTML = `
    <label>Ingrediente</label>
    <input type="text" class="novoIngrediente">
    <label>Tipo Medida</label>
    <input type="text" class="novoIngrediente">
    <label>Quantidade</label>
    <input type="text" class="novoIngrediente">
    <hr>
  `;

  containerIngredientes.insertBefore(novoIngrediente, btnAddIngrediente.parentNode);
});

const containerPassos = document.querySelector(".passos-container");
const btnAddPasso = document.getElementById("btn-add-passo");

btnAddPasso.addEventListener("click", function(e){
  e.preventDefault();

  const novoPasso = document.createElement("div");
  novoPasso.classList.add("novo-passo");

  const totalPassos = containerPassos.querySelectorAll(".novo-passo").length + 1;

  novoPasso.innerHTML = `
    <label>${totalPassos}° Passo</label>
    <textarea class="passoPreparo" placeholder="Digite o passo"></textarea>
  `;

  containerPassos.appendChild(novoPasso);
});

function cadastrarReceita(){
  const tituloReceita = document.getElementById("tituloReceita").value.trim();
  const descricaoReceita = document.getElementById("descricao").value.trim();
  const tempoPreparo = document.getElementById("tempo").value.trim();
  const imageInput = document.getElementById("add-image");
  const image = imageInput.files[0] ? imageInput.files[0].name : "";

  const listaIngredientes = Array.from(document.querySelectorAll(".novo-ingrediente")).map(div => {
    const inputs = div.querySelectorAll("input");
    return {
      Ingrediente: inputs[0]?.value.trim() || "",
      Medida: inputs[1]?.value.trim() || "",
      Quantidade: inputs[2]?.value.trim() || ""
    };
  }).filter(i => i.Ingrediente || i.Medida || i.Quantidade);

  const passos = Array.from(document.querySelectorAll(".passoPreparo")).map(p => p.value.trim()).filter(p => p !== "");

  const receita = {
    Titulo: tituloReceita,
    Descricao: descricaoReceita,
    TempoPreparo: tempoPreparo,
    Imagem: `imagens/${image}`,
    Ingredientes: listaIngredientes,
    Passos: passos
  };

  let receitas = JSON.parse(localStorage.getItem("Receitas")) || [];
  receitas.push(receita);
  localStorage.setItem("Receitas", JSON.stringify(receitas));
  console.log(localStorage.getItem("Receitas"));
}



function atualizarCarrossel() {
  const receitas = JSON.parse(localStorage.getItem("Receitas")) || [];
  const carouselInner = document.querySelector(".carousel-inner");
  const indicators = document.querySelector(".carousel-indicators");

  carouselInner.innerHTML = "";
  indicators.innerHTML = "";

  receitas.forEach((receita, index) => {
    // Cria o item do carousel
    const item = document.createElement("div");
    item.classList.add("carousel-item");
    if (index === 0) item.classList.add("active");

    // Cria a imagem
    const img = document.createElement("img");
    img.src = "assets/" + receita.Imagem;// fallback se não tiver imagem
    img.classList.add("d-block", "w-100");
    img.alt = receita.Titulo;

    // Cria a legenda (caption)
    const caption = document.createElement("div");
    caption.classList.add("carousel-caption", "d-none", "d-md-block");

    const captionBox = document.createElement("div");
    captionBox.classList.add("caption-box");
    captionBox.innerHTML = `
      <h3>${receita.Titulo}</h3>
      <p>${receita.Descricao}</p>
      <small>⏱ ${receita.TempoPreparo}</small>
    `;

    caption.appendChild(captionBox);
    item.appendChild(img);
    item.appendChild(caption);
    carouselInner.appendChild(item);

    // Cria os indicadores
    const button = document.createElement("button");
    button.type = "button";
    button.setAttribute("data-bs-target", "#carouselExampleCaptions");
    button.setAttribute("data-bs-slide-to", index);
    if (index === 0) button.classList.add("active");

    indicators.appendChild(button);
  });
}


function carregarReceita(index) {
  const receitas = JSON.parse(localStorage.getItem("Receitas")) || [];
  const receita = receitas[index];
  if (!receita) return;

  // Atualiza título, imagem e tempo de preparo
  document.getElementById("tituloReceita").innerText = receita.Titulo;
  document.getElementById("imgReceita").src = receita.Imagem;
  document.getElementById("tempoPreparo").innerText = receita.TempoPreparo;

  // Atualiza tabela de ingredientes
  let ingredientesHTML = "";
  if (receita.Ingredientes && receita.Ingredientes.length > 0) {
    receita.Ingredientes.forEach(ing => {
      ingredientesHTML += `<tr>
        <td>${ing.Quantidade}</td>
        <td>${ing.Medida}</td>
        <td>${ing.Ingrediente}</td>
      </tr>`;
    });
  }
  document.getElementById("ingredientesTabela").innerHTML = ingredientesHTML;

  // Atualiza passos
  const containerPassos = document.querySelector(".passos");
  containerPassos.innerHTML = ""; // limpa passos antigos

  receita.Passos.forEach((passo, i) => {
    const divPasso = document.createElement("div");
    divPasso.classList.add("passo");

    const numero = document.createElement("div");
    numero.classList.add("numero");
    numero.textContent = i + 1;

    const texto = document.createElement("p");
    texto.textContent = passo;

    divPasso.appendChild(numero);
    divPasso.appendChild(texto);
    containerPassos.appendChild(divPasso);
  });
}

// Atualiza o carrossel ao carregar a página
window.addEventListener("DOMContentLoaded", () => {
  atualizarCarrossel();
});
