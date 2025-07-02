import * as yup from 'yup';

export type IEditUserForm = yup.InferType<typeof EditUserSchema>;

export const EditUserSchema = yup.object({
  name: yup.string().required('Nome é obrigatório'),
  birthDate: yup
    .string()
    .required('Data de nascimento é obrigatória')
    .nullable()
    .test('valid-date', 'Data inválida', value => {
      if (!value) return false;
      return !isNaN(Date.parse(value));
    }),
  cpf: yup.string().required('CPF é obrigatório').length(11, 'CPF inválido'),
  gender: yup.string().required('Gênero é obrigatório'),
  email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  phone: yup.object().shape({
    ddd: yup.string().required('DDD é obrigatório').length(2, 'DDD inválido'),
    number: yup
      .string()
      .required('Número é obrigatório')
      .min(8, 'Número inválido'),
    type: yup.string().required('Tipo é obrigatório'),
  }),
  currentPassword: yup.string().notRequired(),

  newPassword: yup.string().when('currentPassword', {
    is: (val: string) => !!val,
    then: schema =>
      schema
        .required('Nova senha é obrigatória')
        .min(8, 'Senha deve ter no mínimo 8 caracteres')
        .matches(/[A-Z]/, 'Deve conter letra maiúscula')
        .matches(/[a-z]/, 'Deve conter letra minúscula')
        .matches(/[^a-zA-Z0-9]/, 'Deve conter caractere especial'),
    otherwise: schema => schema.notRequired(),
  }),

  confirmPassword: yup.string().when('newPassword', {
    is: (val: string) => !!val,
    then: schema =>
      schema
        .required('Confirme a nova senha')
        .oneOf([yup.ref('newPassword')], 'Senhas não coincidem'),
    otherwise: schema => schema.notRequired(),
  }),
});
