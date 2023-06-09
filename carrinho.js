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

// função para limpar a sessionStora e redireciona para o login
function logout() {
  localStorage.clear();
  window.location.href = "index.html";
  checaUsuarioLogado();
}

// Pega o carrinho salvo no localStorage
let carrinho = JSON.parse(localStorage.getItem('carrinho'));
// console.log(carrinho)

// produtos salvos no LocalStorage
const produtosJSON = localStorage.getItem('produtos');
const produtos = JSON.parse(produtosJSON);
// console.log(produtos)

const listaElemento = document.getElementById("conteudo-carrinho");
const produtosNoCarrinho = [];

function renderizarItem(produto) {
  if (produtosNoCarrinho.includes(produto.id)) {
    return null;
  }
  produtosNoCarrinho.push(produto.id);

  const divElemento = document.createElement("div");
  divElemento.innerHTML = `
    <div class="prod-carrinho">
    <img src="${produto.src}" alt="${produto.nome}">
    <div class="detalhes-do-carrinho">
    <div class="produto-nome">${produto.nome}</div>
    <div class="produto-preco" id="produto-preco-${produto.id}"> ${parseFloat(produto.preco) * produto.qtd}</div>
    <input type="number" value=${produto.qtd} id=${produto.nome.replace(/[^A-Z0-9]+/ig, "").toLowerCase()} class="quantidade-carrinho" min="1">
    </div>
    <i class='bx bxs-trash remover-do-carrinho' id="btnLixeira" " ></i> 
    </div>`;
    calcularTotal();
  setTimeout(() => {
    document.getElementById(produto.nome.replace(/[^A-Z0-9]+/ig, "").toLowerCase()).addEventListener("input", (e) => {
      produto.qtd = e.target.value;
      const soma = parseFloat(produto.preco) * produto.qtd;
      document.getElementById(`produto-preco-${produto.id}`).innerText = "R$ " + soma;
      calcularTotal();
    })
  }, 1);
  return divElemento;
}

function renderizarLista(conteudoCarrinho) {
  const produtosParaRenderizar = conteudoCarrinho.filter((produto) => {
    return !produtosNoCarrinho.includes(produto.id);
  });

  produtosParaRenderizar.forEach(function (item) {
    const divElemento = renderizarItem(item);
    if (divElemento !== null) {
      listaElemento.appendChild(divElemento);
    }
  });
}
renderizarLista(carrinho);

function calcularTotal() {
  const somaTotal = carrinho.reduce(function (total, produto) {
    return total + (parseInt(produto.qtd) * parseFloat(produto.preco));
  }, 0);
  document.getElementById('preco-total').innerHTML = "R$ " + somaTotal;
}

// ## removendo produto do carrinho de compras lixeira #####
// busca todos elementos que possuem classe CSS remover-do-carrinho
const lixeiras = document.querySelectorAll('.remover-do-carrinho'); 
lixeiras.forEach(lixeira => {
  lixeira.addEventListener('click', event => {
    const itemCarrinho = event.target.closest('.prod-carrinho'); // busca pelo mais próximo
    const nomeProduto = itemCarrinho.querySelector('.produto-nome').textContent;
    const index = carrinho.findIndex(produto => produto.nome === nomeProduto);
    if (index !== -1) {
      carrinho.splice(index, 1);
      localStorage.setItem('carrinho', JSON.stringify(carrinho));
      itemCarrinho.remove();
      // produtosNoCarrinho.splice(produtosNoCarrinho.indexOf(id), 1); REMOVER
      calcularTotal();
    }
  });
});

// ## verifica itens no carrinho antes permitir confirmar
const btnFinalizarCompra = document.getElementById("btn-finalizar-compra");
btnFinalizarCompra.addEventListener("click", function() {
  if (carrinho.length > 0) {
    confirmarCompra();
  }
});

function confirmarCompra() {
  if (carrinho.length === 0) {
    alert("Adicione itens no carrinho antes de confirmar!")
    return;
  }
  const confirmacao = confirm("Tem certeza de que deseja prosseguir com a compra?");
  if (confirmacao) {
    alert("Compra realizada com sucesso!");

    // carrinho.forEach(item => {
    //   const produto = produtos.find(p => p.id === item.id);
    //   if (produto) {  // remove quantidade de produtos (não deu tempo)
    //     produto.qtd -= item.qtd;
    //   }
    // });

    listaElemento.innerHTML = ""; // apagar produtos no carrinho
    localStorage.removeItem('carrinho'); // limpa o carrinho no localStorage
    renderizarLista([]);
    window.location.href = "confirmacao.html";
  }
  else {
    return;
  }
}

// filtra pelo pela categoria 
const todosProdutos = produtos.filter(produto => produto.categoria);
renderizarLista(todosProdutos);

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

// FUNÇÃO PARA MOSTRAR MENU HAMBURGER E VERIFICA USUARIO LOGADO
function mostrarMenu(){
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

