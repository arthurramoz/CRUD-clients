export type Gender = 'FEMININO' | 'MASCULINO' | 'OUTRO';
export type PhoneType = 'CELULAR' | 'RESIDENCIAL' | 'COMERCIAL';
export type AddressType = 'RESIDENCIAL' | 'COBRANCA' | 'ENTREGA';
export type StreetType =
  | 'RUA'
  | 'AVENIDA'
  | 'TRAVESSA'
  | 'ALAMEDA'
  | 'ESTRADA'
  | 'OUTRO';
export type ResidenceType = 'CASA' | 'APARTAMENTO' | 'OUTRO';
export type CardBrand =
  | 'VISA'
  | 'MASTERCARD'
  | 'AMERICAN_EXPRESS'
  | 'DISCOVER'
  | 'DINERS_CLUB'
  | 'JCB'
  | 'OUTRA';

export interface Phone {
  id: number;
  ddd: string;
  number: string;
  phoneType: PhoneType;
}

export interface Address {
  id: number;
  nickname: string;
  street: string;
  number: number;
  neighborhood: string;
  cep: string;
  complement?: string;
  addressType: AddressType;
  streetType: StreetType;
  residenceType: ResidenceType;
  city: string;
  state: string;
  country: string;
}

export interface CreditCard {
  id: number;
  number: string;
  cardholder: string;
  cvv: string;
  expirationDate: string;
  cardBrand: CardBrand;
  preferential: boolean;
}

export interface Customer {
  id: number;
  codigo: string;
  name: string;
  birthDate: Date;
  cpf: string;
  gender: Gender;
  email: string;
  password: string;
  status: boolean;
  ranking: number;
  phone: Phone;
  addresses: Address[];
  cards: CreditCard[];
  createdAt: Date;
}

export const usuarios: Customer[] = [
  {
    id: 1,
    codigo: 'CLI-0001',
    name: 'Joana da Silva',
    birthDate: new Date(1985, 5, 15),
    cpf: '12345678901',
    gender: 'FEMININO',
    email: 'joana.silva@email.com',
    password: 'Senha@123',
    status: true,
    ranking: 85.5,
    phone: {
      id: 1,
      ddd: '11',
      number: '987654321',
      phoneType: 'CELULAR',
    },
    addresses: [
      {
        id: 1,
        nickname: 'Casa',
        street: 'Rua das Flores',
        number: 123,
        neighborhood: 'Jardim Primavera',
        cep: '01234567',
        complement: 'Apto 101',
        addressType: 'RESIDENCIAL',
        streetType: 'RUA',
        residenceType: 'APARTAMENTO',
        city: 'São Paulo',
        state: 'SP',
        country: 'Brasil',
      },
      {
        id: 2,
        nickname: 'Trabalho',
        street: 'Avenida Paulista',
        number: 1000,
        neighborhood: 'Bela Vista',
        cep: '01310930',
        addressType: 'COBRANCA',
        streetType: 'AVENIDA',
        residenceType: 'OUTRO',
        city: 'São Paulo',
        state: 'SP',
        country: 'Brasil',
      },
    ],
    cards: [
      {
        id: 1,
        number: '4111111111111111',
        cardholder: 'JOANA S SILVA',
        cvv: '123',
        preferential: true,
        expirationDate: '12/25',
        cardBrand: 'VISA',
      },
    ],
    createdAt: new Date(2020, 1, 10),
  },
  {
    id: 2,
    codigo: 'CLI-0002',
    name: 'Carlos Oliveira',
    birthDate: new Date(1990, 8, 22),
    cpf: '98765432109',
    gender: 'MASCULINO',
    email: 'carlos.oliveira@email.com',
    password: 'Oliveira@2024',
    status: true,
    ranking: 72.0,
    phone: {
      id: 2,
      ddd: '21',
      number: '998877665',
      phoneType: 'CELULAR',
    },
    addresses: [
      {
        id: 3,
        nickname: 'Residencial',
        street: 'Rua dos Coqueiros',
        number: 456,
        neighborhood: 'Barra da Tijuca',
        cep: '22640102',
        addressType: 'RESIDENCIAL',
        streetType: 'RUA',
        residenceType: 'CASA',
        city: 'Rio de Janeiro',
        state: 'RJ',
        country: 'Brasil',
      },
      {
        id: 4,
        nickname: 'Entrega',
        street: 'Avenida das Américas',
        number: 5000,
        neighborhood: 'Recreio',
        cep: '22793080',
        addressType: 'ENTREGA',
        streetType: 'AVENIDA',
        residenceType: 'OUTRO',
        city: 'Rio de Janeiro',
        state: 'RJ',
        country: 'Brasil',
      },
    ],
    cards: [
      {
        id: 2,
        number: '5555555555554444',
        cardholder: 'CARLOS M OLIVEIRA',
        cvv: '456',
        preferential: true,
        expirationDate: '06/26',
        cardBrand: 'MASTERCARD',
      },
      {
        id: 3,
        number: '378282246310005',
        cardholder: 'CARLOS M OLIVEIRA',
        cvv: '7890',
        preferential: false,
        expirationDate: '09/24',
        cardBrand: 'AMERICAN_EXPRESS',
      },
    ],
    createdAt: new Date(2021, 3, 5),
  },
];
