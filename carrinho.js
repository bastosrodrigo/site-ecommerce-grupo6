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

 const produtosJSON = localStorage.getItem('produtos');
 const produtos = JSON.parse(produtosJSON);
 console.log(produtos)


const listaElemento = document.getElementById("conteudo-carrinho");

function renderizarItem(produto) {
    const divElemento = document.createElement("div");
    divElemento.innerHTML = `
    <img src="${produto.src}" alt="${produto.nome}">
    <div class="detalhes-do-carrinho">
    <div class="produto-nome">${produto.nome}</div>
    <div class="produto-preço"> ${produto.preco}</div>
    <input type="number" value="1" class="quantidade-carrinho">
    </div>
    <i class='bx bxs-trash remover-do-carrinho'></i>`;       
    return divElemento;
}

function renderizarLista(conteudoCarrinho) {  
    conteudoCarrinho.forEach(function (item) {
        const divElemento = renderizarItem(item);
        listaElemento.appendChild(divElemento);  

           
    });
}

renderizarLista(carrinho);