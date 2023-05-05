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
  },
  {
    id: 7,
    nome: "Elvis Presley",
    senha: "080135",
    cpf: "19351977123",
    endereco: {
      cep: "22040-070",
      bairro: "Tupelo",
      localidade: "Mississipi",
      uf: "EUA"
    }
  }
]
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
function salvarDadosCliente(event) {
  var nome = document.getElementById("nome").value;
  var senha = document.getElementById("senha").value;
  var repetirSenha = document.getElementById("repetir-senha").value; // para verificar se senhas são iguais
  var cpf = document.getElementById("cpf").value;
  var cep = document.getElementById("cep").value;
  var bairro = document.getElementById("bairro").value;
  var localidade = document.getElementById("localidade").value;
  var uf = document.getElementById("uf").value;

  // verifica campos preenchidos antes de enviar
  if (!nome || !senha || !repetirSenha || !cpf || !cep || !bairro || !localidade || !uf) {
    alert("Por favor, preencha todos os campos obrigatórios.");
    event.preventDefault(); // previnir envio default
    return;
  }

  // Checar se as senhas são iguais
  if (senha !== repetirSenha) {
    alert("As senhas digitadas não coincidem. Por favor, tente novamente.");
    event.preventDefault(); // previnir envio default
    return;
  }

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

// Adiciona a função ao eventlistener submit
document.getElementById("cadastro-usuario").addEventListener("submit", salvarDadosCliente);

checaUsuarioLogado();



// função para limpar a sessionStora e redireciona para o login
function logout() {
  localStorage.clear();
  window.location.href = "index.html";
  checaUsuarioLogado();
}


