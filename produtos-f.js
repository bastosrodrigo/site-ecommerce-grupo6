/* ######  produtos  ####### */
const produtos = [
    {
        id: 16,
        nome: "Camisa Flamengo Feminino",
        categoria: "feminino",
        src: "./src/16.png",
        estrela1: 'bx bxs-star',
        estrela2: 'bx bxs-star',
        estrela3: 'bx bxs-star',
        estrela4: 'bx bxs-star',
        estrela5: 'bx bxs-star-half',
        preco: "297,49"
    },
    {
        id: 17,
        nome: "Camisa Vasco Feminino",
        categoria: "feminino",
        src: "./src/17.png",
        estrela1: 'bx bxs-star',
        estrela2: 'bx bxs-star',
        estrela3: 'bx bxs-star',
        estrela4: 'bx bxs-star',
        estrela5: 'bx bxs-star',
        preco: "189,90"
    },
    {
        id: 18,
        nome: "Camisa Corinthians Feminino",
        categoria: "feminino",
        src: "./src/18.png",
        estrela1: 'bx bxs-star',
        estrela2: 'bx bxs-star',
        estrela3: 'bx bxs-star',
        estrela4: 'bx bxs-star',
        estrela5: 'bx bxs-star-half',
        preco: "179,90"
    },
    {
        id: 19,
        nome: "Camisa Real Madrid Feminino",
        categoria: "feminino",
        src: "./src/19.png",
        estrela1: 'bx bxs-star',
        estrela2: 'bx bxs-star',
        estrela3: 'bx bxs-star',
        estrela4: 'bx bxs-star',
        estrela5: 'bx bxs-star-half',
        preco: "199,99"
    },
    {
        id: 20,
        nome: "Camisa Grêmio Feminino",
        categoria: "feminino",
        src: "./src/20.png",
        estrela1: 'bx bxs-star',
        estrela2: 'bx bxs-star',
        estrela3: 'bx bxs-star',
        estrela4: 'bx bxs-star',
        estrela5: 'bx bxs-star-half',
        preco: "149,90"
    },
    {
        id: 21,
        nome: "Camisa Palmeiras Feminino",
        categoria: "feminino",
        src: "./src/21.png",
        estrela1: 'bx bxs-star',
        estrela2: 'bx bxs-star',
        estrela3: 'bx bxs-star',
        estrela4: 'bx bxs-star',
        estrela5: 'bx bxs-star-half',
        preco: "94,90"
    },
    {
        id: 22,
        nome: "Camisa Internacional Feminino",
        categoria: "feminino",
        src: "./src/22.png",
        estrela1: 'bx bxs-star',
        estrela2: 'bx bxs-star',
        estrela3: 'bx bxs-star',
        estrela4: 'bx bxs-star',
        estrela5: 'bx bxs-star-half',
        preco: "297,49"
    }
]

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
                  <h4>${produto.nome}  <button id="carrinho"><i class='bx bx-cart'></i></button></h4>

                  <p>${produto.preco}</p>
              </div>
          </div>`;
    return divElemento;
}

function renderizarLista(lista) {
    lista.forEach(function (item) {
        const divElemento = renderizarItem(item);
        listaElemento.appendChild(divElemento);
    });
}

renderizarLista(produtos);

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

/* APENAS PARA TESTES MOSTRAR NO CONSOLE OS MAPS */
const idProdutos = produtos.map((produto) => produto.id);
const nomesProdutos = produtos.map((produto) => produto.nome);
const precoProdutos = produtos.map((produto) => produto.preco);
const srcProdutos = produtos.map((produto) => produto.src);
console.log(idProdutos, nomesProdutos, precoProdutos, srcProdutos); // mostra o array dos produtos depois deles serem gerados no window.onload


let carrinho = JSON.parse(localStorage.getItem('carrinho'));
 console.log()

// #### CÓDIGO PARA PEGAR OS PRODUTOS E ADICIONAR NO CARRINHO 
// está adicionando mas quando abre carrinho.html fala que carrinho not defined

/* FAZENDO OS BOTÕES DOS CARRINHOS CLICÁVEIS E ADICIONANDO PRODUTOS */
window.onload = function () {
  const listaElemento = document.getElementById("lista");
  const carrinhoBtns = listaElemento.querySelectorAll("#carrinho");
  let carrinho = JSON.parse(localStorage.getItem('carrinho'));

  if (!carrinho) {
    carrinho = [];
  }
  
  carrinhoBtns.forEach(function (btn,index) {
    btn.addEventListener("click", function () {
      const produtoSelecionado = produtos[index]
      carrinho.push(produtoSelecionado);
  
      localStorage.setItem('carrinho', JSON.stringify(carrinho)); // para adicionar no localStorage e pegar no carrinho.html

      console.log(carrinho); // para teste
      console.log(produtoSelecionado) // para teste

      window.location.href = "carrinho.html"; // leva para a página do carrinho
    });
  });
};