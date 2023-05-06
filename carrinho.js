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
  window.location.href = "index.html";
  checaUsuarioLogado();
}

// Pega o carrinho salvo no localStorage
let carrinho = JSON.parse(localStorage.getItem('carrinho'));
console.log(carrinho)

// produtos salvos no LocalStorage
const produtosJSON = localStorage.getItem('produtos');
const produtos = JSON.parse(produtosJSON);
console.log(produtos)


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
    <input type="number" value=${produto.qtd} id=${produto.nome.replace(/[^A-Z0-9]+/ig, "").toLowerCase()} class="quantidade-carrinho" min="0">
    </div>
    <i class='bx bxs-trash remover-do-carrinho' onclick='excluirProduto(${produto.id})'></i> 
    </div>`;
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
  document.getElementById('preco-total').innerHTML = somaTotal;
}


function excluirProduto(id) {
  
  produtosNoCarrinho = produtosNoCarrinho.filter((produto) => produto !== id);
  renderizarLista(carrinho.filter((produto) => produtosNoCarrinho.includes(produto.id)));
  
  
  calcularTotal();


}
  // Como deletar: Retorna no filter apenas os que possuírem ID diferente do que vc clicou
  

function confirmarCompra() {
  if (produtosNoCarrinho.length === 0) {
    alert("Adicione itens no carrinho antes de confirmar!")
    return;
  }
  const confirmacao = confirm("Tem certeza de que deseja prosseguir com a compra?");
  if (confirmacao) {
    alert("Compra realizada com sucesso!");
    listaElemento.innerHTML = ""; // apagar produtos no carrinho
    renderizarLista([]);
  }
  else {
    return;
  }
}