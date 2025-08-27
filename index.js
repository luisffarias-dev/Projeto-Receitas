//Função inicial para conter algum valor como default
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


//<<<<<<<<<<<<<<<<<<<<<<<<<<<< Section Cadastro >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
let btnCadastrar = document.getElementById("btn-cadastrar");
btnCadastrar.addEventListener('click', function(e){
  e.preventDefault();
  const nome = document.getElementById("nomeCadastrar").value.trim();
  const emailCadastrar = document.getElementById("emailCadastrar").value.trim();
  const senha = document.getElementById("senhaCadastrar").value.trim();
  const senhaConfirmar= document.getElementById("senhaConfirmar").value.trim();

  if (senha !== senhaConfirmar){
    alert("As senhas não coincidem. Verifique e tente novamente.");
    document.getElementById("senhaCadastrar").value = "";
    document.getElementById("senhaConfirmar").value = "";
  }
  else{

    if(nome && emailCadastrar && senha){
      criarCadastro(nome, emailCadastrar, senha);
      alert("Cadastro realizado com sucesso! Você já pode fazer login.");
      
    
      document.getElementById("nomeCadastrar").value = "";
      document.getElementById("emailCadastrar").value = "";
      document.getElementById("senhaCadastrar").value = "";
      document.getElementById("senhaConfirmar").value = "";
      mostrarLogin();
    } else {
      alert("Por favor, preencha todos os campos antes de cadastrar.");
    }

    console.log(localStorage.getItem("usuarios"));
}});

function criarCadastro(nome, emailCadastrar, senha){
  const usuario = { Nome: nome, Email: emailCadastrar, Senha: senha };
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  usuarios.push(usuario);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

//<<<<<<<<<<<<<<<<<<<<<<<<<<<< Section Login >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function login(){
  const loginEmail = document.getElementById("emailLogin").value.trim();
  const senha = document.getElementById("senhaLogin").value.trim();
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  let usuarioEncontrado = usuarios.find(u => u.Email === loginEmail && u.Senha === senha);
  if(usuarioEncontrado){
    alert("Login realizado com sucesso! Bem-vindo, " + usuarioEncontrado.Nome);
    document.getElementById("nome-usuario").innerHTML = usuarioEncontrado.Nome;

    // resetar campos do login também
    document.getElementById("emailLogin").value = "";
    document.getElementById("senhaLogin").value = "";
  } else {
    alert("Usuário ou senha não encontrado!");
  }
}

let btnLogin = document.getElementById("btn-login");
btnLogin.addEventListener('click', function(e){
  e.preventDefault();
  login();
  mostrarCarrossel();
});



//<<<<<<<<<<<<<<<<<<<<<<<<<<<< Section Adicionar >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
let btnSalvarReceita = document.getElementById("btn-salvarReceita");
btnSalvarReceita.addEventListener('click', function(e){
  e.preventDefault();
  if (cadastrarReceita()) {
    alert("Receita cadastrada com sucesso!");
    mostrarCarrossel();
    resetarInputsReceita();
    window.location.reload();

}});

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
   <input type="text" class="passoPreparo" placeholder="Digite o passo">
  `;

  containerPassos.appendChild(novoPasso);
});

function cadastrarReceita() {
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
  });

  const passos = Array.from(document.querySelectorAll(".passoPreparo")).map(p => p.value.trim());

  // Verificação de campos obrigatórios
  if (!tituloReceita) {
    alert("O título é obrigatório!");
    return false;
  }
  if (!descricaoReceita) {
    alert("A descrição é obrigatória!");
    return false;
  }
  if (!tempoPreparo) {
    alert("O tempo de preparo é obrigatório!");
    return false;
  }
  if (listaIngredientes.length === 0 || listaIngredientes.some(i => !i.Ingrediente || !i.Medida || !i.Quantidade)) {
    alert("Todos os ingredientes devem ser preenchidos com nome, medida e quantidade!");
    return false;
  }
  if (passos.length === 0 || passos.some(p => p === "")) {
    alert("Todos os passos de preparo devem ser preenchidos!");
    return false;
  }

  const receita = {
    Titulo: tituloReceita,
    Descricao: descricaoReceita,
    TempoPreparo: tempoPreparo,
    Imagem: image ? `imagens/${image}` : "",
    Ingredientes: listaIngredientes,
    Passos: passos
  };

  let receitas = JSON.parse(localStorage.getItem("Receitas")) || [];
  receitas.push(receita);
  localStorage.setItem("Receitas", JSON.stringify(receitas));
  console.log(localStorage.getItem("Receitas"));

  return true; 
}

const inputFile = document.getElementById("add-image");
const preview = document.getElementById("preview-img");

inputFile.addEventListener("change", function(){
  const file = this.files[0];
  if(file){
    const reader = new FileReader();
    reader.onload = function(e){
      preview.src = e.target.result;
      preview.style.display = "block";
    }
    reader.readAsDataURL(file);
  } else {
    preview.src = "";
    preview.style.display = "none";
  }
});
//<<<<<<<<<<<<<<<<<<<<<<<<<<<< Section Carrossel >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
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
      <button class="btn-ir">
      Ir Para <i class="fa-solid fa-book-open"></i>
      </button></div>
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


// Função que atualiza a seção de detalhes da receita
function carregarReceita(index) {
  const receitas = JSON.parse(localStorage.getItem("Receitas")) || [];
  const receita = receitas[index];
  if(!receita) return;

  document.getElementById("tituloReceita").innerText = receita.Titulo;
  document.getElementById("imgReceita").src ="assets/"+receita.Imagem;
  document.getElementById("tempoPreparo").innerText = receita.TempoPreparo;

  let ingredientesHTML = "";
  if(receita.Ingredientes) {
    const ing = receita.Ingredientes;
    ingredientesHTML += `<tr>
      <td>${ing.Quantidade}</td>
      <td>${ing.Medida}</td>
      <td>${ing.Ingrediente}</td>
    </tr>`;
  }
  document.getElementById("ingredientesTabela").innerHTML = ingredientesHTML;

  let passosHTML = "";
  receita.Passos.forEach((p, i) => {
    passosHTML += `<div class="passo"><div class="numero">${i+1}</div><p>${p}</p></div>`;
  });
  document.getElementById("passosReceita").innerHTML = passosHTML;
}

// Atualiza o carrossel ao carregar a página
window.addEventListener("DOMContentLoaded", () => {
  atualizarCarrossel();
});


// Delegação de eventos no carrossel para os botões "Ir Para"
const carouselInner = document.querySelector(".carousel-inner");

carouselInner.addEventListener("click", function(e) {
    const btn = e.target.closest(".btn-ir"); // garante que o clique seja no botão ou no ícone
    if (!btn) return; // se não clicou no btn-ir, sai

    e.preventDefault();

    // Descobre qual item do carrossel foi clicado
    const carouselItem = btn.closest(".carousel-item");
    const index = Array.from(carouselInner.children).indexOf(carouselItem);

    // Pega a receita correspondente do localStorage
    const receitas = JSON.parse(localStorage.getItem("Receitas")) || [];
    const receitaSelecionada = receitas[index];
    if (!receitaSelecionada) return;

    // Cria o objeto que representa a receita selecionada
    const receitaObj = {
        Titulo: receitaSelecionada.Titulo,
        Descricao: receitaSelecionada.Descricao,
        TempoPreparo: receitaSelecionada.TempoPreparo,
        Imagem: receitaSelecionada.Imagem,
        Ingredientes: receitaSelecionada.Ingredientes || [],
        Passos: receitaSelecionada.Passos || []
    };

    exibirReceita(receitaObj);
    console.log("Receita selecionada:", receitaObj);

});

//<<<<<<<<<<<<<<<<<<<<<<<<<<<< Section Receitas >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function exibirReceita(receitaObj) {
    // Título
    const titulo = document.getElementById("titulo");
    titulo.innerText = receitaObj.Titulo;

    // Imagem
    const imagem = document.getElementById("imagem-receita");
    imagem.src = "assets/"+receitaObj.Imagem;
    imagem.alt = receitaObj.Titulo;

    // Tempo de preparo
    const tempo = document.getElementById("tempo-receita");
    tempo.innerText = receitaObj.TempoPreparo;

    // Ingredientes
    const ingredientesTabela = document.getElementById("ingredientes-receita").querySelector("tbody");
    ingredientesTabela.innerHTML = ""; // limpa tabela
    receitaObj.Ingredientes.forEach(ing => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${ing.Quantidade}</td>
            <td>${ing.Medida}</td>
            <td>${ing.Ingrediente}</td>
        `;
        ingredientesTabela.appendChild(tr);
    });

    // Passos de preparo
    const passosDiv = document.querySelector(".passos");
    passosDiv.innerHTML = ""; // limpa passos
    receitaObj.Passos.forEach((passo, i) => {
        const div = document.createElement("div");
        div.classList.add("passo");
        div.innerHTML = `<div class="numero">${i+1}</div><p>${passo}</p>`;
        passosDiv.appendChild(div);
    });

    // Torna a section visível
   mostrarReceitas()
    // Scroll suave até a receita
    receitaSection.scrollIntoView({ behavior: "smooth" });
}



//<<<<<<<<<<<<<<<<<<<<<<<<<<<< Funçoes para esconder tela >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function esconderSections() {
    document.querySelectorAll("section").forEach(sec => sec.classList.remove("ativo"));
}


function mostrarReceitas() {
    esconderSections();
    const sec = document.querySelector(".receitas");
    if(sec) sec.classList.add("ativo");
    sec.scrollIntoView({ behavior: "smooth" });
}

function mostrarAdicionar() {
    esconderSections();
    const sec = document.querySelector(".adicionar");
    if(sec) sec.classList.add("ativo");
    sec.scrollIntoView({ behavior: "smooth" });
    
}

function mostrarLogin() {
    esconderSections();
    const sec = document.querySelector(".login");
    if(sec) sec.classList.add("ativo");
    sec.scrollIntoView({ behavior: "smooth" });
}
function mostrarCadastrar() {
    esconderSections();
    const sec = document.querySelector(".cadastrar");
    if(sec) sec.classList.add("ativo");
    sec.scrollIntoView({ behavior: "smooth" });
}

function mostrarCarrossel() {
    esconderSections();
    const sec = document.querySelector(".carrossel");
    if(sec) sec.classList.add("ativo");
    sec.scrollIntoView({ behavior: "smooth" });
    
    
}

//<<<<<<<<<<<<<<<<<<<<<<<<<<<< Eventos que chamam as funçoes >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
document.querySelectorAll(".ativoCarrossel").forEach(btn => {
    btn.addEventListener("click", function(e) {
        e.preventDefault();
        mostrarCarrossel(); 
        window.location.reload();
    });
});
document.querySelectorAll(".ativoAdicionar").forEach(btn => {
    btn.addEventListener("click", function(e) {
        e.preventDefault();
        mostrarAdicionar(); 
    });
});
document.querySelectorAll(".ativoLogin").forEach(btn => {
    btn.addEventListener("click", function(e) {
        e.preventDefault();
        mostrarLogin(); 
    });
});
document.querySelectorAll(".ativoCadastro").forEach(btn => {
    btn.addEventListener("click", function(e) {
        e.preventDefault();
        mostrarCadastrar(); 
    });
});



window.addEventListener("DOMContentLoaded", () => {
    mostrarCarrossel(); 
});


function resetarInputsReceita() { 
    document.getElementById("tituloReceita").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("tempo").value = "";
    document.getElementById("add-image").value = "";

    const containerIngredientes = document.querySelector(".adicionar-ingredientes");
    const ingredientesExtras = containerIngredientes.querySelectorAll(".novo-ingrediente");
    ingredientesExtras.forEach((div, index) => {
        if(index === 0){
            
            const inputs = div.querySelectorAll("input");
            inputs.forEach(input => input.value = "");
        } else {
            div.remove();
        }
    });

    const containerPassos = document.querySelector(".passos-container");
    const passosExtras = containerPassos.querySelectorAll(".novo-passo");
    passosExtras.forEach((div, index) => {
        if(index === 0){
           
            const input = div.querySelector("input");
            if(input) input.value = "";
        } else {
            div.remove();
        }
    });
}
