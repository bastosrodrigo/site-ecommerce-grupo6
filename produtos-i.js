/* ######  produtos  ####### */
const produtos = [
  {
      id: 10,
      nome: "Kit Santos Infantil",
      categoria: "infantil",
      src: "./src/11.png",
      estrela1:'bx bxs-star',
      estrela2:'bx bxs-star',
      estrela3:'bx bxs-star',
      estrela4:'bx bxs-star',
      estrela5:'bx bxs-star-half',
      preco: "R$ 189,99",
  },
  {
      id: 11,
      nome: "Kit Fluminense Infantil",
      categoria: "infantil",
      src: "./src/12.png",
      estrela1:'bx bxs-star',
      estrela2:'bx bxs-star',
      estrela3:'bx bxs-star',
      estrela4:'bx bxs-star',
      estrela5:'bx bxs-star-half',
      preco: "R$ 237,49",
  },
  {
      id: 12,
      nome: "Kit Internacional Infantil",
      categoria: "infantil",
      src: "./src/13.png",
      estrela1:'bx bxs-star',
      estrela2:'bx bxs-star',
      estrela3:'bx bxs-star',
      estrela4:'bx bxs-star',
      estrela5:'bx bxs-star-half',
      preco: "R$ 309,00",
  },
  {
      id: 13,
      nome: "Kit Recife Infantil",
      categoria: "infantil",
      src: "./src/14.png",
      estrela1:'bx bxs-star',
      estrela2:'bx bxs-star',
      estrela3:'bx bxs-star',
      estrela4:'bx bxs-star',
      estrela5:'bx bxs-star-half',
      preco: "R$ 109,99",
  },
  {
      id: 14,
      nome: "Kit Flamengo Infantil",
      categoria: "infantil",
      src: "./src/15.png",
      estrela1:'bx bxs-star',
      estrela2:'bx bxs-star',
      estrela3:'bx bxs-star',
      estrela4:'bx bxs-star',
      estrela5:'bx bxs-star-half',
      preco: "R$ 284,99",
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
                  <h4>${produto.nome}<button id="carrinho"><i class='bx bx-cart'></i></button></h4>
                  <p>${produto.preco}</p>
              </div>
          </div>`;
  return divElemento;
}

function renderizarLista(lista) {
  lista.forEach(function(item) {
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