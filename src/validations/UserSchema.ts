import * as yup from 'yup';

export type IUserForm = yup.InferType<typeof UserSchema>;

export const UserSchema = yup.object({
  name: yup.string().required('Nome é obrigatório'),
  birthDate: yup
    .date()
    .transform((value, originalValue) =>
      originalValue === '' ? null : new Date(originalValue),
    )
    .nullable()
    .required('Data de nascimento é obrigatória'),
  cpf: yup.string().required('CPF é obrigatório').length(11, 'CPF inválido'),
  gender: yup.string().required('Gênero é obrigatório'),
  email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  password: yup
    .string()
    .min(8, 'Senha deve ter no mínimo 8 caracteres')
    .matches(/[A-Z]/, 'Deve conter letra maiúscula')
    .matches(/[a-z]/, 'Deve conter letra minúscula')
    .matches(/[^a-zA-Z0-9]/, 'Deve conter caractere especial')
    .required('Senha é obrigatória'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Senhas não coincidem')
    .required('Confirmação de senha é obrigatória'),
  phone: yup.object().shape({
    ddd: yup.string().required('DDD é obrigatório').length(2, 'DDD inválido'),
    number: yup
      .string()
      .required('Número é obrigatório')
      .min(8, 'Número inválido'),
    type: yup.string().required('Tipo é obrigatório'),
  }),
});
