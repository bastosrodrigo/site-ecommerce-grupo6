/* ######  produtos  ####### */
const produtos = [
    {
        id: 1,
        nome: "Camisa Flamengo",
        categoria: "masculino",
        src: "./src/2.png",
        estrela1:'bx bxs-star',
        estrela2:'bx bxs-star',
        estrela3:'bx bxs-star',
        estrela4:'bx bxs-star',
        estrela5:'bx bxs-star-half',
        preco: "R$ 250,00",
    },
    {
        id: 2,
        nome: "Camisa Fluminense",
        categoria: "masculino",
        src: "./src/3.png",
        estrela1:'bx bxs-star',
        estrela2:'bx bxs-star',
        estrela3:'bx bxs-star',
        estrela4:'bx bxs-star',
        estrela5:'bx bxs-star-half',
        preco: "R$ 250,00",   
    },
    {
        id: 3,
        nome: "Camisa Botafogo",
        categoria: "masculino",
        src: "./src/4.png",
        estrela1:'bx bxs-star',
        estrela2:'bx bxs-star',
        estrela3:'bx bxs-star',
        estrela4:'bx bxs-star',
        estrela5:'bx bxs-star-half',
        preco: "R$ 250,00",
    },
    {
        id: 4,
        nome: "Camisa Real Madrid",
        categoria: "masculino",
        src: "./src/5.png",
        estrela1:'bx bxs-star',
        estrela2:'bx bxs-star',
        estrela3:'bx bxs-star',
        estrela4:'bx bxs-star',
        estrela5:'bx bxs-star',
        preco: "R$ 499,99",
    },
    {
        id: 5,
        nome: "Camisa Paris Saint-Germain",
        categoria: "masculino",
        src: "./src/6.png",
        estrela1:'bx bxs-star',
        estrela2:'bx bxs-star',
        estrela3:'bx bxs-star',
        estrela4:'bx bxs-star',
        estrela5:'bx bxs-star-half',
        preco: "R$ 499,99",
    },
    {
        id: 6,
        nome: "Camisa Barcelona",
        categoria: "masculino",
        src: "./src/7.png",
        estrela1:'bx bxs-star',
        estrela2:'bx bxs-star',
        estrela3:'bx bxs-star',
        estrela4:'bx bxs-star',
        estrela5:'bx bxs-star',
        preco: "R$ 350,49",
    },
    {
        id: 7,
        nome: "Camisa Juventus",
        categoria: "masculino",
        src: "./src/8.png",
        estrela1:'bx bxs-star',
        estrela2:'bx bxs-star',
        estrela3:'bx bxs-star',
        estrela4:'bx bxs-star',
        estrela5:'bx bxs-star-half',
        preco: "R$ 379,99",
    },
    {
        id: 8,
        nome: "Camisa Palmeiras",
        categoria: "masculino",
        src: "./src/9.png",
        estrela1:'bx bxs-star',
        estrela2:'bx bxs-star',
        estrela3:'bx bxs-star',
        estrela4:'bx bxs-star',
        estrela5:'bx bxs-star-half',
        preco: "R$ 284,90",
    },
    {
        id: 9,
        nome: "Camisa Grêmio",
        categoria: "masculino",
        src: "./src/10.png",
        estrela1:'bx bxs-star',
        estrela2:'bx bxs-star',
        estrela3:'bx bxs-star',
        estrela4:'bx bxs-star',
        estrela5:'bx bxs-star-half',
        preco: "R$ 159,99",
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