const produtosJSON = localStorage.getItem('produtos');
const produtos = JSON.parse(produtosJSON);

const listaElemento = document.getElementById("lista");

function renderizarItem(produto) {
  const divElemento = document.createElement("div");
  divElemento.innerHTML = `
          <div class="prod">
              <a href="#"><img src="${produto.src}" alt=""></a>
              <div class="estrelas">
                  <i class='${produto.estrela1}' ></i>
                  <i class='${produto.estrela2}' ></i>
                  <i class='${produto.estrela3}' ></i>
                  <i class='${produto.estrela4}' ></i>
                  <i class='${produto.estrela5}'></i>
              </div>
              <div class="preco">
                  <h4>${produto.nome}</h4>
                  <p>R$ ${produto.preco}</p>
                  <button class="carrinho"><i class='bx bx-cart'></i></button>
              </div>
          </div>`;

  // só permite clicar no carrinho se estiver logado
  const carrinhoBtn = divElemento.querySelector('.carrinho');
  carrinhoBtn.addEventListener('click', function () {
    if (!checaUsuarioLogado()) {
      alert('Bem vindo! Faça login ou cadastre-se, para adicionar produtos ao carrinho.');
      return;
    }

    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho.push(produto);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    window.location.href = "carrinho.html";
  });

  return divElemento;
}

function renderizarLista(lista) {
  lista.forEach(function (item) {
    const divElemento = renderizarItem(item);
    listaElemento.appendChild(divElemento);
  });
}
// filtra pelo pela categoria 
const produtosMasculinos = produtos.filter(produto => produto.categoria === 'masculino');
renderizarLista(produtosMasculinos);

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

// mostra carrinhoLogo apenas usuário logado
const carrinhoImg = document.querySelector('.cart');
if (checaUsuarioLogado()) {
  carrinhoImg.style.display = "block";
} else {
  carrinhoImg.style.display = "none";
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

/* FAZENDO OS BOTÕES DOS CARRINHOS CLICÁVEIS E ADICIONANDO PRODUTOS */
window.onload = function () {
  const listaElemento = document.getElementById("lista");
  const carrinhoBtns = listaElemento.querySelectorAll(".carrinho");
  let carrinho = JSON.parse(localStorage.getItem('carrinho'));

  if (!carrinho) {
    carrinho = [];
  }

  carrinhoBtns.forEach(function (btn, index) {
    btn.addEventListener("click", function () {
      const produtoSelecionado = produtos[index]
      carrinho.push(produtoSelecionado);

      localStorage.setItem('carrinho', JSON.stringify(carrinho)); // para adicionar no localStorage e pegar no carrinho.html

      window.location.href = "carrinho.html"; // leva para a página do carrinho
    });
  });
};

// função para limpar a sessionStora e redireciona para o login
function logout() {
  localStorage.clear();
  window.location.href = "index.html";
  checaUsuarioLogado();
}


// FUNÇÃO PARA MOSTRAR MENU HAMBURGER E VERIFICA USUARIO LOGADO
function mostrarMenu() {
  let menuMobile = document.querySelector('.mobile-menu');
  let loginLink = document.getElementById('loginLink');
  let logadoDiv = document.getElementById('logado');
  let logoutBtn = document.getElementById('m-logoutBtn');
  let cadastroLink = document.getElementById('cadastroLink');

  if (checaUsuarioLogado()) {
    loginLink.style.display = 'none';
    cadastroLink.style.display = 'none';
    logadoDiv.style.display = 'block';
    document.getElementById("m-nomeCliente").innerHTML = localStorage.getItem("nomeCliente");
    logoutBtn.addEventListener('click', logout);
  } else {
    loginLink.style.display = 'block';
    cadastroLink.style.display = 'block';
    logadoDiv.style.display = 'none';
    logoutBtn.removeEventListener('click', logout);
  }

  if (menuMobile.classList.contains('open')) {
    menuMobile.classList.remove('open');
  } else {
    menuMobile.classList.add('open');
  }
}

