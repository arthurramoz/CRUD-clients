import styled from 'styled-components';
import { Center, SectionTable, Title } from '../Usuarios/style';
import AddressPreview from './Endereco/Preview/preview';
import { IUserForm, UserSchema } from '@/validations/UserSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import AddressModal from './Endereco/Create/create';

export const SectionCreate = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: row;
  height: 100%;
  gap: 20px;
`;

export const SectionSide = styled.div`
  width: 90%;

  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;

  gap: 7px;
`;

export const Input = styled.input`
  padding: 10px;
  font-size: 0.9rem;
  border-radius: 8px;
  border: 1px solid #3a3a3a;
  width: 100%;
  outline: 0;
`;

export const Label = styled.label`
  font-size: 1.1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors[11]};
`;

export const InputDiv = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: start;

  gap: 5px;
  flex-direction: column;
`;

export const Select = styled.select`
  padding: 10px;
  font-size: 0.9rem;
  border-radius: 8px;
  border: 1px solid #3a3a3a;
  width: 100%;
  outline: 0;
`;

export const Error = styled.span`
  color: red;
  font-size: 0.8rem;
`;

export const PhoneInputContainer = styled.div`
  display: flex;
  gap: 5px;
  width: 100%;
`;

export const SubmitButton = styled.button`
  background: ${({ theme }) => theme.colors[11]};
  color: white;
  border: none;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  font-size: 1rem;
  margin-top: 21px;
`;

const CreateUser = () => {
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
        <Title>Criar usuário</Title>

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

export default CreateUser;
