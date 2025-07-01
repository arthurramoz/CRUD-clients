import { Center, SectionTable, Title } from '../Usuarios/style';
import AddressPreview from '../Criar/Endereco/Preview/preview';
import { IUserForm, UserSchema } from '@/validations/UserSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
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
import { useParams } from 'next/navigation';

const EditUser = () => {
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserForm>({
    resolver: yupResolver(UserSchema),
  });

  const [billingAddress, setBillingAddress] = useState<any>(null);
  const [shippingAddress, setShippingAddress] = useState<any>(null);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [currentAddressType, setCurrentAddressType] = useState<
    'COBRANCA' | 'ENTREGA'
  >('COBRANCA');
  const [editingAddress, setEditingAddress] = useState<any>(null);

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
      ...data,
      addresses: [
        { ...billingAddress, addressType: 'COBRANCA' },
        { ...shippingAddress, addressType: 'ENTREGA' },
      ].filter(Boolean),
    };
    console.log(userData);
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
                  style={{ width: '20%' }}
                />
                <Input
                  type="text"
                  {...register('phone.number')}
                  placeholder="Número"
                  style={{ width: '50%' }}
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
              <Label>Senha*</Label>
              <Input
                type="password"
                placeholder="Insira a senha"
                {...register('password')}
              />
              {errors.password && <Error>{errors.password.message}</Error>}
            </InputDiv>

            <InputDiv>
              <Label>Confirmar senha*</Label>
              <Input
                type="password"
                placeholder="Confirme a senha"
                {...register('confirmPassword')}
              />
              {errors.confirmPassword && (
                <Error>{errors.confirmPassword.message}</Error>
              )}
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

            <SubmitButton
              type="submit"
              onClick={() => {
                handleSubmit(onSubmit)();
              }}
            >
              Cadastrar Usuário
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
    </Center>
  );
};

export default EditUser;
