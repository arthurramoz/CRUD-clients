import styled from 'styled-components';
import { Input, InputDiv, Label, SectionSide, Select } from '../..';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

const ModalOverlay = styled.div`
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

const ModalContent = styled.div`
  background: white;
  padding: 1.3rem;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
  max-height: 600px;
  overflow: auto;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const ButtonCancel = styled.button`
  padding: 8px 12px;
  border: 1px solid black;
  border-radius: 8px;
  background: white;
  cursor: pointer;
`;

const ButtonSave = styled.button`
  padding: 8px 12px;
  border: none;
  border-radius: 8px;
  background: black;
  color: white;
  cursor: pointer;
`;

const CreditCardModal = ({
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
  const { register, handleSubmit, reset } = useForm({
    defaultValues: initialData || {
      number: '',
      cardholder: '',
      cvv: '',
      expirationDate: '',
      cardBrand: '',
      preferential: false,
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset(
        initialData || {
          number: '',
          cardholder: '',
          cvv: '',
          expirationDate: '',
          cardBrand: '',
          preferential: false,
        },
      );
    }
  }, [initialData, isOpen, reset]);

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <h3>{initialData ? 'Editar Cartão' : 'Adicionar Cartão'}</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <SectionSide>
            <InputDiv>
              <Label>Número do Cartão</Label>
              <Input type="text" {...register('number')} maxLength={16} />
            </InputDiv>
            <InputDiv>
              <Label>Nome no Cartão</Label>
              <Input type="text" {...register('cardholder')} maxLength={100} />
            </InputDiv>
            <InputDiv>
              <Label>CVV</Label>
              <Input type="text" {...register('cvv')} maxLength={3} />
            </InputDiv>
            <InputDiv>
              <Label>Validade (MM/AAAA)</Label>
              <Input
                type="text"
                {...register('expirationDate')}
                maxLength={6}
              />
            </InputDiv>
            <InputDiv>
              <Label>Bandeira</Label>
              <Select {...register('cardBrand')}>
                <option value="">Selecione</option>
                <option value="VISA">VISA</option>
                <option value="MASTERCARD">MASTERCARD</option>
                <option value="AMERICAN_EXPRESS">AMERICAN EXPRESS</option>
                <option value="JCB">JCB</option>
                <option value="OUTRA">OUTRA</option>
              </Select>
            </InputDiv>
            <InputDiv>
              <Label>Preferencial</Label>
              <Select {...register('preferential')}>
                <option value="false">Não</option>
                <option value="true">Sim</option>
              </Select>
            </InputDiv>
          </SectionSide>

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

export default CreditCardModal;
