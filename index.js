function preparoTeste(){
    const passos = [
    "Lave os morangos e corte em pedaços pequenos.",
    "Misture os morangos com açúcar e deixe descansar por 15 minutos.",
    "Bata o creme de leite até formar chantilly.",
    "Misture o chantilly com os morangos delicadamente.",
    "Sirva em taças individuais e decore com folhas de hortelã."
  ];

  const container = document.querySelector(".passos");

  // Cria os blocos visuais dinamicamente
  passos.forEach((passo, index) => {
    const divPasso = document.createElement("div");
    divPasso.classList.add("passo");

    const numero = document.createElement("div");
    numero.classList.add("numero");
    numero.textContent = index + 1; // número do passo

    const texto = document.createElement("p");
    texto.textContent = passo;

    divPasso.appendChild(numero);
    divPasso.appendChild(texto);
    container.appendChild(divPasso);
  });
}
window.addEventListener("DOMContentLoaded", preparoTeste);