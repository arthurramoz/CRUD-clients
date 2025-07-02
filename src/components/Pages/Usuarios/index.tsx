import Switch from '@mui/material/Switch';
import {
  Center,
  SectionTable,
  TableBody,
  TableData,
  TableDataIcon,
  TableHead,
  TableHeader,
  TableHeaderIcon,
  TableHeaderRow,
  TableRow,
  TableWrapper,
  Title,
} from './style';
import { MdEdit } from 'react-icons/md';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CustomerResponse } from '@/validations/Customer';
import { useDebounce } from '@/hooks/debounce';
import styled from 'styled-components';

export const InputSearch = styled.input`
  width: 100%;
  height: 40px;

  padding: 1rem;
  font-size: 1rem;
  margin-bottom: 10px;
  border-radius: 10px;
  border: 1px solid #ccc;
  outline: 0;
`;

const Users = () => {
  const router = useRouter();
  const [data, setData] = useState<CustomerResponse[]>();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 400);

  useEffect(() => {
    const url = debouncedSearch
      ? `http://localhost:5050/api/customers?q=${debouncedSearch}`
      : 'http://localhost:5050/api/customers';

    fetch(url)
      .then(res => res.json())
      .then(data => setData(data));
  }, [debouncedSearch]);

  const handleDeleteUser = async (id: number) => {
    try {
      await fetch(`http://localhost:5050/api/customers/${id}`, {
        method: 'DELETE',
      });

      alert('Usuário excluído com suceso!');
      window.location.reload();
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Center>
      <SectionTable>
        <Title>Usuários</Title>
        <InputSearch
          type="text"
          placeholder="Buscar por nome, email ou CPF"
          onChange={e => setSearchTerm(e.target.value)}
        />
        <TableWrapper>
          <TableHead>
            <TableHeaderRow>
              <TableHeader style={{ width: '15%' }}>Nome</TableHeader>
              <TableHeader style={{ width: '30%' }}>E-mail</TableHeader>
              <TableHeaderIcon style={{ width: '3%' }}>
                Inativar
              </TableHeaderIcon>
              <TableHeaderIcon style={{ width: '3%' }}>Editar</TableHeaderIcon>
              <TableHeaderIcon style={{ width: '3%' }}>Deletar</TableHeaderIcon>
            </TableHeaderRow>
          </TableHead>
          <TableBody>
            {data?.map(usuario => (
              <TableRow key={usuario.id}>
                <TableData>{usuario.name}</TableData>
                <TableData>{usuario.email}</TableData>
                <TableDataIcon>
                  <Switch
                    checked={usuario.status}
                    onChange={async () => {
                      try {
                        const updatedStatus = !usuario.status;

                        await fetch(
                          `http://localhost:5050/api/customers/${usuario.id}/status`,
                          {
                            method: 'PATCH',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ status: updatedStatus }),
                          },
                        );
                        setData(prev =>
                          prev?.map(u =>
                            u.id === usuario.id
                              ? { ...u, status: updatedStatus }
                              : u,
                          ),
                        );
                      } catch (e) {
                        alert('Erro ao atualizar status');
                      }
                    }}
                  />
                </TableDataIcon>
                <TableDataIcon>
                  <MdEdit
                    color="#555"
                    onClick={() => router.push(`/users/edit/${usuario.id}`)}
                  />
                </TableDataIcon>
                <TableDataIcon>
                  <div onClick={() => handleDeleteUser(usuario.id)}>
                    <DeleteIcon />
                  </div>
                </TableDataIcon>
              </TableRow>
            ))}
          </TableBody>
        </TableWrapper>
      </SectionTable>
    </Center>
  );
};

export default Users;
