function validateCpf(strCPF) {
 const cpfParsed = strCPF.toString().replace(/[^\d]/g, "");
 console.log(cpfParsed)
  var Soma;
  var Resto;
  Soma = 0;
  if (cpfParsed == "00000000000") return false;

  for (let i = 1; i <= 9; i++)
    Soma = Soma + parseInt(cpfParsed.substring(i - 1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;

  if (Resto == 10 || Resto == 11) Resto = 0;
  if (Resto != parseInt(cpfParsed.substring(9, 10))) return false;

  Soma = 0;
  for (let i = 1; i <= 10; i++)
    Soma = Soma + parseInt(cpfParsed.substring(i - 1, i)) * (12 - i);
  Resto = (Soma * 10) % 11;

  if (Resto == 10 || Resto == 11) Resto = 0;
  if (Resto != parseInt(cpfParsed.substring(10, 11))) return false;
  return true;
}

export default function validateForm(formValues) {
  const errors = [];

  if (!validateCpf(formValues.cpf)) {
    errors.push("cpf ínvalido");
  }
  if (formValues.nome.trim() === "") {
    errors.push("Nome vazio");
  }
  if (formValues.salario === "") {
    errors.push("Campo salário vazio");
  }
  if (formValues.desconto === "") {
    errors.push("Campo desconto vazio");
  }
  if (formValues.dependentes === "") {
    errors.push("Campo dependentes vazio");
  }

  return errors;
}
