import * as yup from 'yup';

export const AddressSchema = yup.object({
  nickname: yup.string().required('Apelido é obrigatório'),
  street: yup.string().required('Rua é obrigatória'),
  number: yup.string().required('Número é obrigatório'),
  neighborhood: yup.string().required('Bairro é obrigatório'),
  cep: yup
    .string()
    .required('CEP é obrigatório')
    .matches(/^[0-9]{8}$/, 'CEP deve conter 8 dígitos'),
  city: yup.string().required('Cidade é obrigatória'),
  state: yup
    .string()
    .required('Estado é obrigatório')
    .length(2, 'Use a sigla do estado (ex: SP)'),
  country: yup.string().required('País é obrigatório'),
  residenceType: yup
    .string()
    .oneOf(['CASA', 'APARTAMENTO', 'OUTRO'], 'Tipo inválido')
    .required('Tipo de residência é obrigatório'),
  streetType: yup
    .string()
    .oneOf(['RUA', 'AVENIDA', 'ALAMEDA', 'TRAVESSA'], 'Tipo de rua inválido')
    .required('Tipo de rua é obrigatório'),
  addressType: yup
    .string()
    .oneOf(
      ['RESIDENCIAL', 'COMERCIAL', 'COBRANCA', 'ENTREGA'],
      'Tipo de endereço inválido',
    )
    .required('Tipo de endereço é obrigatório'),
});

export type IAddressForm = yup.InferType<typeof AddressSchema>;
