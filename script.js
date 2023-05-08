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


// botão de busca
const txtBusca = document.getElementById("txtBusca");
const btnBusca = document.getElementById("btnBusca");

btnBusca.addEventListener("click", function () {
  const termoBusca = txtBusca.value.toLowerCase();
  const produtosFiltrados = produtos.filter(function (produto) {
    return produto.nome.toLowerCase().includes(termoBusca);
  });
  listaElemento.innerHTML = "";
  renderizarLista(produtosFiltrados);
});

/* #### javascript da loja #### */
// Pega as informações da localStorage
document.getElementById("nomeCliente").innerHTML = localStorage.getItem("nomeCliente");

function checaUsuarioLogado() { // checa se usuario está logado quando abre, se estiver retorna true
  return localStorage.getItem("idCliente") !== null;
}

// mostra carrinhoLogo apenas usuário
const carrinhoImg = document.querySelector('.cart');
if (checaUsuarioLogado()) {
    carrinhoImg.style.display = "block";
} else {
  carrinhoImg.style.display = "none";
}

// checar usuario logado
if (checaUsuarioLogado()) {
  // remove "display: none" da div logado
  document.getElementById("logado").setAttribute("style", "display:flex");
    //  coloca nome do usuário no elemento "nomeCliente"
  document.querySelector('#nomeCliente').innerText = localStorage.getItem("nomeCliente");

  // esconde botões "Login" e Criar conta
  document.querySelector('a[href="./login.html"]').style.display = "none";
  document.querySelector('a[href="./cadastro.html"]').style.display = "none";
  // esconde as imagens
  document.querySelector('img[src="./src/user-interface.png"]').style.display = "none";
  document.querySelector('img[src="./src/add-user (1).png"]').style.display = "none";
} else {
  // adiciona estilo "display: none" para o div Logado, mostra botão login e Criar conta
  document.querySelector('.logado').style.display = "none";
  document.querySelector('a[href="./login.html"]').style.display = "block";
  document.querySelector('a[href="./cadastro.html"]').style.display = "block";
  // mostra a imagem do botão "Login" e Criar conta
  document.querySelector('img[src="./src/user-interface.png"]').style.display = "block";
  document.querySelector('img[src="./src/add-user (1).png"]').style.display = "block";
}

// função para limpar o localStorage e redireciona para o login
function logout() {
  localStorage.clear();
  window.location.href = "login.html";

  checaUsuarioLogado();
}

/* FAZENDO OS BOTÕES DOS CARRINHOS CLICÁVEIS E ADICIONANDO PRODUTOS */
window.onload = function () {
  const listaElemento = document.getElementById("lista");
  const carrinhoBtns = listaElemento.querySelectorAll(".carrinho");
  let carrinho = JSON.parse(localStorage.getItem('carrinho'));

  if (!carrinho) {
    carrinho = [];
  }
  
  carrinhoBtns.forEach(function (btn,index) {
    btn.addEventListener("click", function () {
      
      const produtoSelecionado = produtos[index]
      carrinho.push(produtoSelecionado);
  
      localStorage.setItem('carrinho', JSON.stringify(carrinho)); // para adicionar no localStorage e pegar no carrinho.html

      window.location.href = "carrinho.html"; // leva para a página do carrinho
    });
  });
};


// FUNÇÃO PARA MOSTRAR MENU HAMBURGER E VERIFICA USUARIO LOGADO
function mostrarMenu(){
  let menuMobile = document.querySelector('.mobile-menu');
  let loginLink = document.getElementById('loginLink');
  let logadoDiv = document.getElementById('logado');  
  let btnLogout = document.getElementById('btnLogout');
  let logoutBtn = document.getElementById('m-logoutBtn');
  let cadastroLink = document.getElementById('cadastroLink');
  
  if (checaUsuarioLogado()) {
    loginLink.style.display = 'none';
    cadastroLink.style.display = 'none';
    logadoDiv.style.display = 'block';
    btnLogout.style.display = 'block';
    logoutBtn.style.display = 'block';
    document.getElementById("m-nomeCliente").innerHTML = localStorage.getItem("nomeCliente");
    logoutBtn.addEventListener('click', logout);
  } else {
    loginLink.style.display = 'block';
    cadastroLink.style.display = 'block';
    btnLogout.style.display = 'none';
    logoutBtn.style.display = 'none';
    logadoDiv.style.display = 'none';
    logoutBtn.removeEventListener('click', logout);
  }
  
  if (menuMobile.classList.contains('open')) {
    menuMobile.classList.remove('open');
  } else {
    menuMobile.classList.add('open');
  }
}
