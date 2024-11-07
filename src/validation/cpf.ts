export function isValidCPF(cpf: string): boolean {
  // Remove caracteres não numéricos e espaços em branco
  cpf = cpf.replace(/[\s.-]/g, '');

  // Verifica se o CPF tem 11 dígitos
  if (cpf.length !== 11) {
    return false;
  }

  // Verifica se todos os dígitos são iguais (CPF inválido)
  if (/^(\d)\1+$/.test(cpf)) {
    return false;
  }

  // Cálculo dos dígitos verificadores (usando reduce para maior legibilidade)
  const calcularDigitoVerificador = (
    digitos: string,
    pesoInicial: number
  ): number => {
    const soma = digitos.split('').reduce((acc, digito, index) => {
      return acc + parseInt(digito) * (pesoInicial - index);
    }, 0);

    const resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
  };

  const digitoVerificador1 = calcularDigitoVerificador(cpf.substring(0, 9), 10);
  const digitoVerificador2 = calcularDigitoVerificador(
    cpf.substring(0, 10),
    11
  );

  return (
    digitoVerificador1 === parseInt(cpf.charAt(9)) &&
    digitoVerificador2 === parseInt(cpf.charAt(10))
  );
}
