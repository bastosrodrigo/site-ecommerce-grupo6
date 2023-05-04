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

/* ######  script cadastro de clientes  ####### */
const clientes = [
    {
      id: 1,
      nome: "Eduardo Rocha Almeida",
      senha: "123456",
      cpf: "40259158984",
      endereco: {
        cep: "25685-330",
        bairro: "Centro",
        localidade: "Petrópolis",
        uf: "RJ",
      }
    },
    {
      id: 2,
      nome: "Sofia Carvalho Araujo",
      senha: "123456",
      cpf: "57885523543",
      endereco: {
        cep: "25720-111",
        bairro: "Corrêas",
        localidade: "Petrópolis",
        uf: "RJ"
      }
    },
    {
      id: 3,
      nome: "Matheus Castro Correia",
      senha: "123456",
      cpf: "84510149417",
      endereco: {
        cep: "22041-011",
        bairro: "Copacabana",
        localidade: "Rio de Janeiro",
        uf: "RJ"
      }
    },
    {
      id: 4,
      nome: "Antônio Goncalves Santos",
      senha: "123456",
      cpf: "16691816005",
      endereco: {
        cep: "22050-002",
        bairro: "Copacabana",
        localidade: "Rio de Janeiro",
        uf: "RJ"
      }
    },
    {
      id: 5,
      nome: "Julieta Fernandes Sousa",
      senha: "123456",
      cpf: "32021153916",
      endereco: {
        cep: "01001-000",
        bairro: "Sé",
        localidade: "São Paulo",
        uf: "SP"
      }
    },
    {
      id: 6,
      nome: "Bruna Martins Lima",
      senha: "123456",
      cpf: "29034395405",
      endereco: {
        cep: "02040-070",
        bairro: "Jardim São Paulo(Zona Norte)",
        localidade: "São Paulo",
        uf: "SP"
      }
    }
  ]
  
  // renderização condicional javascript vanilla html
  // troca de tela (troca de contexto) , localStorage set get itens
  
  // // Pega as informações da localStorage TESTE
  // document.getElementById("nomeCliente").innerHTML = localStorage.getItem("nomeCliente");
  //console.log(JSON.parse(localStorage.getItem('clientes')));
  
  function checaUsuarioLogado() { // checa se usuario está logado, se estiver retorna true
    return localStorage.getItem("idCliente") !== null;
  }
  
  // checar usuario está logado
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
  
  
  // ############# VALIDANDO LOGIN USUARIO ###########
  function validarUsuario() {
    const cpf = document.getElementById("cpf").value;
    const senha = document.getElementById("senha").value;
    const entradasJSON = JSON.parse(localStorage.getItem('clientes'));
    var found = false; // enquanto não encontra usuário é falso
  
    for (var i = 0; i < clientes.length; i++) { // percorre Array acima verificando se CPF e senha existem
      if (cpf == clientes[i].cpf && senha == clientes[i].senha) { // se existe faz login
        alert("Olá, bem vindo à FãNáticos!" + " " + clientes[i].nome);
        found = true;
  
        // passa os dados do usuário enquanto sessão ativa (caso queira mostrá-las na página, está usando no Bem-Vindo)
        localStorage.setItem("idCliente", clientes[i].id);
        localStorage.setItem("nomeCliente", clientes[i].nome);
        localStorage.setItem("cpfCliente", clientes[i].cpf);
  
        window.location.href = "./index.html";  // e abre a primeira página
        break;
      }
    } 
    // #### VERIFICANDO NAS ENTRADAS DO LOCALSTORAGE ##### 
    if (!entradasJSON && !found) {
      alert("Senha incorreta!");
      return
    }
  
    for (var i = 0; i < entradasJSON.length; i++) { // percorre o array da LocalStorage
      if (cpf == entradasJSON[i].cpf && senha == entradasJSON[i].senha) { // compara o digitado
        alert("Olá, bem vindo à FãNáticos!" + " " + entradasJSON[i].nome);  // se verdadeiro entra
        found = true;
  
        // passa os dados do usuário enquanto sessão ativa (caso queira mostrá-las na página, está usando no Bem-Vindo)
        localStorage.setItem("idCliente", entradasJSON[i].id);
        localStorage.setItem("nomeCliente", entradasJSON[i].nome);
        localStorage.setItem("cpfCliente", entradasJSON[i].cpf);
  
        window.location.href = "./index.html";  // e abre a primeira página
        break;
      }
    }
    // #### VERIFICANDO NAS ENTRADAS DO LOCALSTORAGE ##### 
    if (!entradasJSON) {
      alert("Entrada não existe");
      return
    }
    
  }
  
  document.getElementById("cadastro-usuario").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevenir default form ao clicar no botão submit
    salvarDados();
  });
  
  // salvar dados no formulário de cadastro e enviar para o login.js
  function salvarDadosCliente() {
    var nome = document.getElementById("nome").value;
    var senha = document.getElementById("senha").value;
    var cpf = document.getElementById("cpf").value;
    var cep = document.getElementById("cep").value;
    var bairro = document.getElementById("bairro").value;
    var localidade = document.getElementById("localidade").value;
    var uf = document.getElementById("uf").value;
  
    var novoCliente = {
      id: clientes.length + 1,
      nome: nome,
      senha: senha,
      cpf: cpf,
      endereco: {
        cep: cep,
        bairro: bairro,
        localidade: localidade,
        uf: uf,
      },
    };
  
    clientes.push(novoCliente);
    localStorage.setItem('clientes', JSON.stringify(clientes));
    alert("Cliente cadastrado com sucesso!");
  
    console.log(clientes);
    document.getElementById("cadastro-usuario").reset();
  }
  
  checaUsuarioLogado();
  
  // função para limpar a sessionStora e redireciona para o login
  function logout() {
    localStorage.clear();
    window.location.href = "index.html";
    checaUsuarioLogado();
  }