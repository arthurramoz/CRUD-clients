import styled from 'styled-components';

const AddressPreviewContainer = styled.div`
  width: 100%;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const EditButton = styled.button`
  background: #f0f0f0;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 5px;
  margin-right: 5px;
`;

const AddButton = styled.button`
  background: #4caf50;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
`;

const AddressPreview = ({
  address,
  onEdit,
  onDelete,
  onAdd,
  type,
}: {
  address?: any;
  onEdit: () => void;
  onDelete: () => void;
  onAdd: () => void;
  type: string;
}) => {
  return (
    <AddressPreviewContainer>
      {address ? (
        <>
          <h4>
            Endereço de {type}: {address.nickname}
          </h4>
          <p>
            {address.street}, {address.number} - {address.neighborhood}
          </p>
          <EditButton onClick={onEdit}>Editar</EditButton>
          <EditButton onClick={onDelete}>Apagar</EditButton>
        </>
      ) : (
        <AddButton onClick={onAdd}>+ Adicionar endereço de {type}</AddButton>
      )}
    </AddressPreviewContainer>
  );
};

export default AddressPreview;
