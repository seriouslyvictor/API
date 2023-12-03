const elCep = document.querySelector("#cep");
const elUF = document.querySelector("#uf");
const elCidade = document.querySelector("#cidade");
const elBairro = document.querySelector("#bairro");
const elRua = document.querySelector("#rua");
const elAlert = document.querySelector(".alerts");
const elLoader = document.querySelector(".loader");

const buscaCep = function (e) {
  let cep = e.target.value;
  elLoader.style.display = "inline-block";
  if (!cep) {
    elLoader.style.display = "none";
    return;
  }
  const request = fetch(`https://viacep.com.br/ws/${cep}/json/`);
  request
    .then(unpackJSON)
    .then((data) => {
      if (data.erro) {
        throw new Error(
          "Cep não encontrado, verifique o número e tente novamente"
        );
      }
      desabilitarForms(true);
      preencherDados(data);
    })
    .catch(erroHandler)
    .finally(() => {
      setTimeout(() => {
        desabilitarForms(false);
        elLoader.style.display = "none";
      }, 1000);
    });
};

const validaCep = function (e) {
  e.target.value = e.target.value.replace(/[^0-9]/g, "");
};

const erroHandler = function (error = "Algo deu errado!") {
  elAlert.classList.add("show--alert");
  elAlert.textContent = `${error.message}`;
  setTimeout(() => {
    elAlert.classList.remove("show--alert");
  }, 5000);
};

function preencherDados(package) {
  elCep.value = package.cep;
  elUF.value = package.uf;
  elBairro.value = package.bairro;
  elCidade.value = package.localidade;
  elRua.value = package.logradouro;
}

function unpackJSON(response) {
  if (!response.ok) {
    throw new Error(`Erro de conexão`);
  }
  return (response = response.json());
}

function desabilitarForms(state) {
  elCep.disabled = state;
  elUF.disabled = state;
  elCidade.disabled = state;
  elBairro.disabled = state;
  elRua.disabled = state;
}

elCep.addEventListener("input", validaCep);
elCep.addEventListener("blur", buscaCep);
