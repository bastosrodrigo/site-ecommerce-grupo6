/* ##### Slide página inicial  ####### */
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}


/* #### javascript da loja #### */
// Pega as informações da localStorage
document.getElementById("nomeCliente").innerHTML = localStorage.getItem("nomeCliente");

function checaUsuarioLogado() { // checa se usuario está logado quando abre, se estiver retorna true
  return localStorage.getItem("idCliente") !== null;
}

// checar usuario logado
if (checaUsuarioLogado()) {
  // remove "display: none" da div logado
  document.getElementById("logado").setAttribute("style", "display:flex")
  //  coloca nome do usuário no elemento "nomeCliente"
  document.querySelector('#nomeCliente').innerText = localStorage.getItem("nomeCliente");

  // esconde botões "Login" e Criar conta
  document.querySelector('a[href="./login.html"]').style.display = "none";
  document.querySelector('a[href="./cadastro.html"]').style.display = "none";
  // esconde as imagens
  document.querySelector('img[src="./src/user-interface.png"]').style.display = "none";
  document.querySelector('img[src="./src/add-user (1).png"]').style.display = "none";
} else {
  // adiciona o estilo "display: none" para o div Logado, mostra botão login e Criar conta
  document.querySelector('.logado').style.display = "none";
  document.querySelector('a[href="./login.html"]').style.display = "block";
  document.querySelector('a[href="./cadastro.html"]').style.display = "block";
  // mostra a imagem do botão "Login" e Criar conta
  document.querySelector('img[src="./src/user-interface.png"]').style.display = "block";
  document.querySelector('img[src="./src/add-user (1).png"]').style.display = "block";
}

// função para limpar a sessionStora e redireciona para o login
function logout() {
  localStorage.clear();
  window.location.href = "login.html";

  checaUsuarioLogado();
}


/* APENAS PARA TESTES */
const idProdutos = produtos.map((produto) => produto.id);
const nomesProdutos = produtos.map((produto) => produto.nome);
const precoProdutos = produtos.map((produto) => produto.preco);
const srcProdutos = produtos.map((produto) => produto.src);
console.log(idProdutos, nomesProdutos, precoProdutos, srcProdutos); // mostra o array dos produtos


/* FAZENDO OS BOTÕES DOS CARRINHOS CLICÁVEIS E ADICIONANDO PRODUTOS*/
const carrinho = [];

window.onload = function () {
  
  const listaElemento = document.getElementById("lista");
  const carrinhoBtns = listaElemento.querySelectorAll("#carrinho");

  carrinhoBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      const produtoSelecionado = produtos.find((produto) => produto.id === btn.dataset.id);
      carrinho.push(produtoSelecionado);
  
      localStorage.setItem('carrinho', JSON.stringify(carrinho)); // para adicionar no localStorage e pegar no carrinho.html

      console.log(carrinho); // para teste
      console.log(produtoSelecionado) // para teste

      window.location.href = "carrinho.html"; // leva para a página do carrinho
    });
  });
};

