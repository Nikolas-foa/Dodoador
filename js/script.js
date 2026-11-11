
// Retira tudo que não for número.
function soNumeros(valor) {
  return valor.replace(/\D/g, "");
}

// Máscara do telefone.
document.getElementById("telefone")?.addEventListener("input", function() {
  let n = soNumeros(this.value).slice(0, 11);
  if (n.length > 10) this.value = n.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
  else this.value = n.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
});

// Máscara do CPF.
document.getElementById("cpf")?.addEventListener("input", function() {
  let n = soNumeros(this.value).slice(0, 11);
  n = n.replace(/(\d{3})(\d)/, "$1.$2");
  n = n.replace(/(\d{3})(\d)/, "$1.$2");
  n = n.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  this.value = n;
});

// Máscara da data de nascimento.
document.getElementById("nascimento")?.addEventListener("input", function() {
  let n = soNumeros(this.value).slice(0, 8);
  n = n.replace(/(\d{2})(\d)/, "$1/$2");
  n = n.replace(/(\d{2})(\d)/, "$1/$2");
  this.value = n;
});

// Validação do formulário usando expressões regulares.
document.getElementById("formCadastro")?.addEventListener("submit", function(evento) {
  evento.preventDefault();

  let nome = document.getElementById("nome");
  let email = document.getElementById("email");
  let telefone = document.getElementById("telefone");
  let cpf = document.getElementById("cpf");
  let nascimento = document.getElementById("nascimento");
  let aceite = document.getElementById("consentimento");
  let resultado = document.getElementById("resultado");
  let valido = true;

  document.querySelectorAll(".erro").forEach(item => item.textContent = "");
  document.querySelectorAll(".campo input").forEach(item => item.classList.remove("invalido"));

  let regraNome = /^[A-Za-zÀ-ÿ]+(?:[ '-][A-Za-zÀ-ÿ]+)+$/;
  let regraEmail = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;
  let regraTelefone = /^\(\d{2}\) \d{4,5}-\d{4}$/;
  let regraCpf = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
  let regraData = /^\d{2}\/\d{2}\/\d{4}$/;

  if (!regraNome.test(nome.value.trim())) {
    document.getElementById("erroNome").textContent = "Digite nome e sobrenome.";
    nome.classList.add("invalido"); valido = false;
  }
  if (!regraEmail.test(email.value)) {
    document.getElementById("erroEmail").textContent = "Digite um e-mail válido.";
    email.classList.add("invalido"); valido = false;
  }
  if (!regraTelefone.test(telefone.value)) {
    document.getElementById("erroTelefone").textContent = "Digite um telefone válido.";
    telefone.classList.add("invalido"); valido = false;
  }
  if (!regraCpf.test(cpf.value)) {
    document.getElementById("erroCpf").textContent = "Digite o CPF no formato correto.";
    cpf.classList.add("invalido"); valido = false;
  }
  if (!regraData.test(nascimento.value) || !dataValida(nascimento.value)) {
    document.getElementById("erroNascimento").textContent = "Digite uma data válida.";
    nascimento.classList.add("invalido"); valido = false;
  }
  if (!aceite.checked) {
    document.getElementById("erroConsentimento").textContent = "Marque a opção para continuar.";
    valido = false;
  }

  if (valido) {
    resultado.textContent = "Cadastro validado com sucesso! Nenhum dado foi enviado.";
    this.reset();
  } else {
    resultado.textContent = "Confira os campos destacados.";
    resultado.style.color = "#b00020";
  }
});

// Confere se a data existe e não está no futuro.
function dataValida(valor) {
  let partes = valor.split("/");
  let dia = Number(partes[0]), mes = Number(partes[1]), ano = Number(partes[2]);
  let data = new Date(ano, mes - 1, dia);
  return data.getDate() === dia && data.getMonth() === mes - 1 &&
    data.getFullYear() === ano && data <= new Date();
}
