import * as Yup from 'yup';
import { isValidCPF } from './cpf';
import { TipoUsuario, Cras } from '../interface/User';

export const loginSchema = Yup.object().shape({
  cpf: Yup.string().required('O CPF é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

export const EnderecoSchema = Yup.object().shape({
  rua: Yup.string().required('Rua é obrigatória'),
  numero: Yup.number()
    .typeError('Insira um número inteiro')
    .required('Número é obrigatório')
    .integer('Insira um número inteiro'),
  bairro: Yup.string().required('Bairro é obrigatório'),
});

export const RegisterUserSchema = Yup.object().shape({
  name: Yup.string().required('Nome completo é obrigatório'),
  cpf: Yup.string()
    .required('CPF é obrigatório')
    .test('cpf', 'CPF inválido', value => isValidCPF(value)),
  data_nascimento: Yup.string()
    .transform(value => value.replace(/\D/g, '')) // Remove non-digits
    .required('Data de nascimento é obrigatória')
    .length(8, 'Insira a data no formato DDMMAAAA')
    .test('valid-date', 'Data de nascimento inválida', value => {
      const day = parseInt(value.slice(0, 2));
      const month = parseInt(value.slice(2, 4)) - 1; // Months are 0-indexed in JavaScript
      const year = parseInt(value.slice(4));

      const date = new Date(year, month, day);
      return (
        date.getFullYear() === year &&
        date.getMonth() === month &&
        date.getDate() === day &&
        date <= new Date() // Ensure the date is in the past
      );
    })
    .test('age', 'A idade deve estar entre 14 e 120 anos', value => {
      const dob = new Date(
        parseInt(value.slice(4)),
        parseInt(value.slice(2, 4)) - 1,
        parseInt(value.slice(0, 2))
      );
      const today = new Date();
      const age =
        today.getFullYear() -
        dob.getFullYear() -
        (today.getMonth() < dob.getMonth() ||
        (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
          ? 1
          : 0);
      return age >= 14 && age <= 120;
    }),
  telefone: Yup.string().required('Telefone é obrigatório'),
  email: Yup.string().email('Email inválido'),
  password: Yup.string()
    .required('Senha é obrigatória')
    .min(8, 'Insira no minímo 8 caracteres')
    .max(16, 'Insira no máximo 16 caracteres'),
  endereco: EnderecoSchema.required('Endereço é obrigatório'),
  tipo_usuario: Yup.mixed<TipoUsuario>()
    .oneOf(Object.values(TipoUsuario) as number[])
    .required('Selecione o tipo do usuário'),
  cras: Yup.mixed<Cras>()
    .oneOf(Object.values(Cras) as number[])
    .required('Selecione o CRAS'),
  ativo: Yup.boolean().required(),
});

export const RegisterSchedullingSchema = Yup.object().shape({
  name: Yup.string().required('Nome do agendamento obrigatorio'),
  usuario_id: Yup.string()
    .required('CPF é obrigatório')
    .min(11, 'Insira 11 números')
    .max(11, 'Insira 11 números'),
  servico: Yup.number(),
  description: Yup.string().required('Telefone é obrigatório'),
  duracao_estimada: Yup.string().required('Data e hora'),
  data_hora: Yup.string().required('Data e hora'),
  cras: Yup.mixed<Cras>()
    .oneOf(Object.values(Cras) as number[])
    .required('Selecione o CRAS'),
  status: Yup.number(),
});
