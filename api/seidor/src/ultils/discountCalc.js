function calcDiscountValues(salario) {
  let discountBase;
  if (salario <= 1903.98) {
    return (discountBase = { aliquota: 0, deduct: 0 });
  }
  if (salario > 1903.98 || salario <= 2826.65) {
    return (discountBase = { aliquota: 7.5 / 100, deduct: 142.8 });
  }
  if (salario > 2826.65 || salario <= 3751.05) {
    return (discountBase = { aliquota: 15 / 100, deduct: 354.80 });
  }
  if (salario > 3751.05 || salario <= 4664.68) {
    return (discountBase = { aliquota: 22.5 / 100, deduct: 636.13 });
  }
  return (discountBase = { aliquota: 27.5 / 100, deduct: 869.36});
}

export default function calcDiscount(employeeInfo) {
  const { salario, desconto, dependentes } = employeeInfo;
  const valuePerDependent = 164.56;
  const discountBase = calcDiscountValues(employeeInfo.salario);

  const salarioBaseIr = salario - desconto - dependentes * valuePerDependent;
  const descontoIrrf =
    salarioBaseIr * discountBase.aliquota - discountBase.deduct;

  return { salarioBaseIr, descontoIrrf };
}
