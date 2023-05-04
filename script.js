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
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}


/* #### javascript da loja #### */
// Pega as informações da localStorage
document.getElementById("nomeCliente").innerHTML = localStorage.getItem("nomeCliente");

function checaUsuarioLogado() { // checa se usuario está logado quando abre, se estiver retorna true
    return localStorage.getItem("idCliente") !== null;
}

// checar usuario logado
if (checaUsuarioLogado()) {
    // se sim, remove o "display: none" da div "logado"
    document.getElementById("logado").setAttribute("style", "display:flex")
    // e coloque o nome do usuário no elemento "nomeCliente"
    document.querySelector('#nomeCliente').innerText = localStorage.getItem("nomeCliente");
} else {
    // se não, adiciona o estilo "display: none" para o div Logado
    document.querySelector('.logado').style.display = "none";
    document.getElementById("logoutBtn").style.display = "none";

}

// função para limpar a sessionStora e redireciona para o login
function logout() {
    localStorage.clear();
    window.location.href = "login.html";

    checaUsuarioLogado(); 
}

/* #### LISTA DE PRODUTOS dA LOJA #### */
const produtos =[
    {
        id: 1,
        nome: "Produto 1",
        preco: "9.99",
        img: "URL",
        categoria: "masculino"
    },
    {
        id: 2,
        nome: "Produto 2",
        preco: "9.99",
        img: "URL",
        categoria: "masculino"
    },
    {
        id: 3,
        nome: "Produto 3",
        preco: "9.99",
        img: "URL",
        categoria: "masculino"
    },
    {
        id: 4,
        nome: "Produto 4",
        preco: "9.99",
        img: "URL",
        categoria: "masculino"
    },
    {
        id: 5,
        nome: "Produto 5",
        preco: "9.99",
        img: "URL",
        categoria: "feminino"
    },
    {
        id: 6,
        nome: "Produto 6",
        preco: "9.99",
        img: "URL",
        categoria: "feminino"
    },
    {
        id: 7,
        nome: "Produto 7",
        preco: "9.99",
        img: "URL",
        categoria: "feminino"
    },
    {
        id: 8,
        nome: "Produto 8",
        preco: "9.99",
        img: "URL",
        categoria: "feminino"
    },
    {
        id: 9,
        nome: "Produto 9",
        preco: "9.99",
        img: "URL",
        categoria: "infantil"
    },
    {
        id: 10,
        nome: "Produto 10",
        preco: "9.99",
        img: "URL",
        categoria: "infantil"
    }
]