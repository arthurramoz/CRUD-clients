import { usuarios } from '@/mock/users';
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
import Toogle from '@/components/Toggle/Navbar';

const Users = () => {
  return (
    <Center>
      <SectionTable>
        <Title>Usuários</Title>

        <TableWrapper>
          <TableHead>
            <TableHeaderRow>
              <TableHeader>Nome</TableHeader>
              <TableHeader>Email</TableHeader>
              <TableHeaderIcon>Inativar</TableHeaderIcon>
              <TableHeaderIcon>Editar</TableHeaderIcon>
            </TableHeaderRow>
          </TableHead>
          <TableBody>
            {usuarios.map(usuario => (
              <TableRow key={usuario.id}>
                <TableData>{usuario.name}</TableData>
                <TableData>{usuario.email}</TableData>
                <TableDataIcon>
                  <Toogle />
                </TableDataIcon>
                <TableDataIcon>
                  <MdEdit width="20" height="20" color="#555" />
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
