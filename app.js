const elCep = document.querySelector("#cep");
const elUF = document.querySelector("#uf");
const elCidade = document.querySelector("#cidade");
const elBairro = document.querySelector("#bairro");
const elRua = document.querySelector("#rua");
const elAlert = document.querySelector(".alerts")

const buscaCep = function (e) {
  let cep = e.target.value;
  if (!cep) {
    return;
  }
  console.log(cep);
  const url = `https://viacep.com.br/ws/${cep}/json/`;
  console.log(url);
  fetch(url)
    .then(unpackJSON)
    .then((data) => {
        if (data.erro) {
            throw new Error("Cep não encontrado, verifique o número e tente novamente")
        }
      preencherDados(data);
    })
    .catch(erroHandler);
};

const validaCep = function (e) {
  e.target.value = e.target.value.replace(/[^0-9]/g, "");
};

const erroHandler = function (error = "Algo deu errado!") {
    elAlert.classList.add("show--alert")
    elAlert.textContent = `${error.message}`
    setTimeout(() => {
      elAlert.classList.remove("show--alert")
    }, 5000)
};

elCep.addEventListener("input", validaCep);
elCep.addEventListener("blur", buscaCep);

function teste() {
  alert(`teste`);
}

function preencherDados(package) {
  elCep.value = package.cep;
  elUF.value = package.uf;
  elBairro.value = package.bairro;
  elCidade.value = package.localidade;
  elRua.value = package.logradouro;
}

function unpackJSON(response) {
  response = response.json();
  console.log(response);
  return response
}
