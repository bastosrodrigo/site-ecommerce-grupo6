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

// pegar os dados da carrinho[] salva no localStorage
const carrinho = JSON.parse(localStorage.getItem('carrinho'));

console.log(carrinho) // DANDO NULO


// onde os produtos aparecerão dentro do carrinho
const carrinhoElemento = document.getElementById("conteudo-carrinho");

// cria elementos HTML de cada produto no carrinho
carrinho.forEach(function (produto) {
  const produtoElemento = document.createElement("div");
  produtoElemento.innerHTML = `<img src="${produto.src}" alt="${produto.nome}">
     <div class="detalhes-do-carrinho">
     <div class="produto-nome">${produto.nome}</div>
     <div class="produto-preço"> ${produto.preco.toFixed(2)}</div>
     <input type="number" value="1" class="quantidade-carrinho">
     </div>
     <i class='bx bxs-trash remover-do-carrinho'></i>`
  ;
  carrinhoElemento.appendChild(produtoElemento);
});




// adicionar botão produtos.pop() ao clicar no confirmar compra

// // código para limpar localStorage de carirnho [] depois de apertar confirmar
// const btnConfirma = document.getElementById("finalizar-compra");
// finalizarCompraBtn.addEventListener("click", function () {
//   localStorage.clear();
//
//   window.location.href = "index.html";
// });