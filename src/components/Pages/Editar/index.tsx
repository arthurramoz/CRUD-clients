import { Center, SectionTable, Title } from '../Usuarios/style';
import AddressPreview from '../Criar/Endereco/Preview/preview';
import { IUserForm, UserSchema } from '@/validations/UserSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import AddressModal from '../Criar/Endereco/Create/create';
import {
  Error,
  Input,
  InputDiv,
  Label,
  PhoneInputContainer,
  SectionCreate,
  SectionSide,
  Select,
  SubmitButton,
} from '../Criar';
import { useParams, useRouter } from 'next/navigation';
import { Customer, usuarios } from '@/mock/users';
import { formatDateToPtBr } from '@/hooks/format';
import CardPreview from '../Criar/Cartao/Preview/preview';
import CreditCardModal from '../Criar/Cartao/Create/create';

const EditUser = () => {
  const { id } = useParams();
  const [data, setData] = useState<Customer>();

  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<any>(null);
  const [creditCard, setCreditCard] = useState<any>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IUserForm>({
    resolver: yupResolver(UserSchema),
  });

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5050/api/customers/${id}`)
        .then(res => res.json())
        .then(user => {
          setData(user);

          setValue('name', user.name);
          setValue('birthDate', user.birth_date.split('T')[0]);
          setValue('cpf', user.cpf);
          setValue('gender', user.gender);
          setValue('email', user.email);
          setValue('password', user.password);
          setValue('confirmPassword', user.password);
          setValue('phone.type', user.phone.phoneType);
          setValue('phone.ddd', user.phone.ddd);
          setValue('phone.number', user.phone.number);

          const billing = user.addresses.find(
            (a: any) => a.addressType === 'COBRANCA',
          );
          const shipping = user.addresses.find(
            (a: any) => a.addressType === 'ENTREGA',
          );

          setBillingAddress(billing || null);
          setShippingAddress(shipping || null);

          const card = user.cards?.[0];
          if (card) setCreditCard(card);
        });
    }
  }, [id, setValue]);

  const router = useRouter();
  const [billingAddress, setBillingAddress] = useState<any>(null);
  const [shippingAddress, setShippingAddress] = useState<any>(null);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [currentAddressType, setCurrentAddressType] = useState<
    'COBRANCA' | 'ENTREGA'
  >('COBRANCA');

  const [editingAddress, setEditingAddress] = useState<any>(null);

  const handleCardSubmit = (data: any) => {
    setCreditCard(data);
    setIsCardModalOpen(false);
  };

  const handleAddressSubmit = (data: any) => {
    if (currentAddressType === 'COBRANCA') {
      setBillingAddress(data);
    } else {
      setShippingAddress(data);
    }
    setIsAddressModalOpen(false);
  };

  const openAddressModal = (type: 'COBRANCA' | 'ENTREGA', address?: any) => {
    setCurrentAddressType(type);
    setEditingAddress(address);
    setIsAddressModalOpen(true);
  };

  const onSubmit = (data: any) => {
    const userData = {
      codigo: data.codigo || `CUST${id}`,
      name: data.name,
      birth_date: data.birthDate,
      cpf: data.cpf,
      gender: data.gender,
      email: data.email,
      password: data.password,
      status: true,
      ranking: 0,
      phone: {
        phoneType: data.phone.type,
        ddd: data.phone.ddd,
        number: data.phone.number,
      },
      addresses: [
        { ...billingAddress, addressType: 'COBRANCA' },
        { ...shippingAddress, addressType: 'ENTREGA' },
      ].filter(Boolean),
      cards: creditCard ? [{ ...creditCard, customerId: Number(id) }] : [],
    };

    fetch(`http://localhost:5050/api/customers/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    })
      .then(res => res.json())
      .then(data => {
        console.log('Atualizado com sucesso', data);
        alert('Usuário atualizado com sucesso');
        router.replace('/users');
      })
      .catch(err => {
        console.error('Erro ao atualizar:', err);
        alert('Erro ao atualizar');
      });
  };

  return (
    <Center>
      <SectionTable>
        <Title>Editar usuário</Title>
        <SectionCreate>
          <SectionSide>
            <InputDiv>
              <Label>Nome completo*</Label>
              <Input
                type="text"
                placeholder="Insira o nome completo"
                {...register('name')}
              />
              {errors.name && <Error>{errors.name.message}</Error>}
            </InputDiv>

            <InputDiv>
              <Label>Data de nascimento*</Label>
              <Input
                type="date"
                placeholder="Insira a data de nascimento"
                {...register('birthDate')}
              />
              {errors.birthDate && <Error>{errors.birthDate.message}</Error>}
            </InputDiv>

            <InputDiv>
              <Label>CPF*</Label>
              <Input
                type="text"
                placeholder="Insira o CPF"
                {...register('cpf')}
              />
              {errors.cpf && <Error>{errors.cpf.message}</Error>}
            </InputDiv>

            <InputDiv>
              <Label>Gênero*</Label>
              <Select {...register('gender')}>
                <option value="">Selecione</option>
                <option value="FEMININO">Feminino</option>
                <option value="MASCULINO">Masculino</option>
                <option value="OUTRO">Outro</option>
              </Select>
              {errors.gender && <Error>{errors.gender.message}</Error>}
            </InputDiv>

            <InputDiv>
              <Label>Telefone*</Label>
              <PhoneInputContainer>
                <Select {...register('phone.type')} style={{ width: '30%' }}>
                  <option value="CELULAR">Celular</option>
                  <option value="RESIDENCIAL">Residencial</option>
                  <option value="COMERCIAL">Comercial</option>
                </Select>
                <Input
                  type="text"
                  {...register('phone.ddd')}
                  placeholder="DDD"
                  style={{ width: '14%' }}
                  maxLength={2}
                />
                <Input
                  type="text"
                  {...register('phone.number')}
                  placeholder="Número"
                  style={{ width: '56%' }}
                  maxLength={9}
                />
              </PhoneInputContainer>
              {(errors.phone?.ddd || errors.phone?.number) && (
                <Error>Telefone inválido</Error>
              )}
            </InputDiv>
          </SectionSide>

          <SectionSide>
            <InputDiv>
              <Label>E-mail*</Label>
              <Input type="email" {...register('email')} />
              {errors.email && <Error>{errors.email.message}</Error>}
            </InputDiv>

            <InputDiv>
              <Label>Endereços*</Label>
              <AddressPreview
                address={billingAddress}
                onEdit={() => openAddressModal('COBRANCA', billingAddress)}
                onDelete={() => setBillingAddress(null)}
                onAdd={() => openAddressModal('COBRANCA')}
                type="cobrança"
              />
              <AddressPreview
                address={shippingAddress}
                onEdit={() => openAddressModal('ENTREGA', shippingAddress)}
                onDelete={() => setShippingAddress(null)}
                onAdd={() => openAddressModal('ENTREGA')}
                type="entrega"
              />
            </InputDiv>

            <InputDiv>
              <Label>Cartão de Crédito*</Label>
              <CardPreview
                card={creditCard}
                onEdit={() => setIsCardModalOpen(true)}
                onDelete={() => setCreditCard(null)}
                onAdd={() => setIsCardModalOpen(true)}
              />
            </InputDiv>

            <SubmitButton
              type="submit"
              onClick={() => {
                handleSubmit(onSubmit)();
              }}
            >
              Editar Usuário
            </SubmitButton>
          </SectionSide>
        </SectionCreate>
      </SectionTable>

      <AddressModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        onSubmit={handleAddressSubmit}
        initialData={editingAddress}
      />

      <CreditCardModal
        isOpen={isCardModalOpen}
        onClose={() => setIsCardModalOpen(false)}
        onSubmit={handleCardSubmit}
        initialData={creditCard}
      />
    </Center>
  );
};

export default EditUser;
