import styled from 'styled-components';
import { Input, InputDiv, Label, SectionSide, Select } from '../..';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AddressSchema, IAddressForm } from '@/validations/Address';
import { useEffect } from 'react';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 1.3rem;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
  max-height: 600px;

  overflow: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h3 {
    margin-bottom: 1.5rem;
    font-size: 1.25rem;
    color: #333;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

export const ModalButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
`;

export const SectionInputs = styled.div`
  display: flex;
  justify-content: start;
  align-items: start;
  flex-direction: row;
  gap: 10px;
`;

export const ButtonCancel = styled.button`
  width: 124px;
  height: 36px;

  display: flex;
  justify-content: center;
  align-items: center;

  outline: 0;
  padding: 10px;
  border: 1px solid black;
  border-radius: 10px;
  background: white;

  color: black;
  font-size: 0.95rem;

  svg {
    font-size: 1.4rem;
  }
`;

export const ButtonSave = styled.button`
  width: 124px;
  height: 36px;

  display: flex;
  justify-content: center;
  align-items: center;

  outline: 0;
  padding: 10px;
  border: 0;
  border-radius: 10px;
  background: black;

  color: white;
  font-size: 0.95rem;

  svg {
    font-size: 1.4rem;
  }
`;

export const ErrorMessage = styled.span`
  font-size: 0.8rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.error};
`;

const AddressModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData?: any;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IAddressForm>({
    resolver: yupResolver(AddressSchema),
    defaultValues: initialData || {
      nickname: '',
      street: '',
      number: '',
      neighborhood: '',
      cep: '',
      city: '',
      state: '',
      country: 'Brasil',
      residenceType: 'CASA',
      streetType: 'RUA',
      addressType: 'RESIDENCIAL',
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset(
        initialData || {
          nickname: '',
          street: '',
          number: '',
          neighborhood: '',
          cep: '',
          city: '',
          state: '',
          country: 'Brasil',
          residenceType: 'CASA',
          streetType: 'RUA',
          addressType: 'RESIDENCIAL',
        },
      );
    }
  }, [initialData, isOpen, reset]);

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <h3>{initialData ? 'Editar Endereço' : 'Adicionar Endereço'}</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <SectionInputs>
            <SectionSide>
              <InputDiv>
                <Label>Apelido</Label>
                <Input type="text" {...register('nickname')} />
                {errors.nickname && (
                  <ErrorMessage>{errors.nickname.message}</ErrorMessage>
                )}
              </InputDiv>

              <InputDiv>
                <Label>Rua</Label>
                <Input type="text" {...register('street')} />
                {errors.street && (
                  <ErrorMessage>{errors.street.message}</ErrorMessage>
                )}
              </InputDiv>

              <InputDiv>
                <Label>Número</Label>
                <Input type="text" {...register('number')} />
                {errors.number && (
                  <ErrorMessage>{errors.number.message}</ErrorMessage>
                )}
              </InputDiv>

              <InputDiv>
                <Label>Bairro</Label>
                <Input type="text" {...register('neighborhood')} />
                {errors.neighborhood && (
                  <ErrorMessage>{errors.neighborhood.message}</ErrorMessage>
                )}
              </InputDiv>

              <InputDiv>
                <Label>CEP</Label>
                <Input type="text" {...register('cep')} maxLength={8} />
                {errors.cep && (
                  <ErrorMessage>{errors.cep.message}</ErrorMessage>
                )}
              </InputDiv>

              <InputDiv>
                <Label>Cidade</Label>
                <Input type="text" {...register('city')} />
                {errors.city && (
                  <ErrorMessage>{errors.city.message}</ErrorMessage>
                )}
              </InputDiv>
            </SectionSide>
            <SectionSide>
              <InputDiv>
                <Label>Estado</Label>
                <Input type="text" {...register('state')} />
                {errors.state && (
                  <ErrorMessage>{errors.state.message}</ErrorMessage>
                )}
              </InputDiv>

              <InputDiv>
                <Label>País</Label>
                <Input type="text" {...register('country')} />
                {errors.country && (
                  <ErrorMessage>{errors.country.message}</ErrorMessage>
                )}
              </InputDiv>

              <InputDiv>
                <Label>Tipo de residência</Label>
                <Select {...register('residenceType')}>
                  <option value="CASA">Casa</option>
                  <option value="APARTAMENTO">Apartamento</option>
                  <option value="OUTRO">Outro</option>
                </Select>
                {errors.residenceType && (
                  <ErrorMessage>{errors.residenceType.message}</ErrorMessage>
                )}
              </InputDiv>

              <InputDiv>
                <Label>Tipo de rua</Label>
                <Select {...register('streetType')}>
                  <option value="RUA">Rua</option>
                  <option value="AVENIDA">Avenida</option>
                  <option value="ALAMEDA">Alameda</option>
                  <option value="TRAVESSA">Travessa</option>
                </Select>
                {errors.streetType && (
                  <ErrorMessage>{errors.streetType.message}</ErrorMessage>
                )}
              </InputDiv>

              <InputDiv>
                <Label>Tipo de endereço</Label>
                <Select {...register('addressType')}>
                  <option value="RESIDENCIAL">Residencial</option>
                  <option value="COMERCIAL">Comercial</option>
                  <option value="COBRANCA">Cobrança</option>
                  <option value="ENTREGA">Entrega</option>
                </Select>
                {errors.addressType && (
                  <ErrorMessage>{errors.addressType.message}</ErrorMessage>
                )}
              </InputDiv>
            </SectionSide>
          </SectionInputs>

          <ModalButtons>
            <ButtonCancel type="button" onClick={onClose}>
              Cancelar
            </ButtonCancel>
            <ButtonSave type="submit">Salvar</ButtonSave>
          </ModalButtons>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default AddressModal;
