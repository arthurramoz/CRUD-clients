import styled from 'styled-components';

const CardContainer = styled.div`
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 10px;
  width: 100%;
`;

const EditButton = styled.button`
  margin-right: 10px;
  padding: 4px 8px;
  border: none;
  border-radius: 4px;
  background: #f0f0f0;
`;

const AddButton = styled.button`
  padding: 10px;
  width: 100%;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
`;

const CardPreview = ({
  card,
  onEdit,
  onDelete,
  onAdd,
}: {
  card?: any;
  onEdit: () => void;
  onDelete: () => void;
  onAdd: () => void;
}) => {
  return (
    <CardContainer>
      {card ? (
        <>
          <h4>Cartão de Crédito: {card.cardBrand}</h4>
          <p>**** **** **** {card.number.slice(-4)}</p>
          <EditButton onClick={onEdit}>Editar</EditButton>
          <EditButton onClick={onDelete}>Remover</EditButton>
        </>
      ) : (
        <AddButton onClick={onAdd}>+ Adicionar Cartão</AddButton>
      )}
    </CardContainer>
  );
};

export default CardPreview;
