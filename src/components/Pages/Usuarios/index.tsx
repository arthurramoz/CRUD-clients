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
import DeleteIcon from '@mui/icons-material/Delete';
import Toogle from '@/components/Toggle/Navbar';
import { useRouter } from 'next/navigation';

const Users = () => {
  const router = useRouter();

  return (
    <Center>
      <SectionTable>
        <Title>Usuários</Title>

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
            {usuarios.map(usuario => (
              <TableRow key={usuario.id}>
                <TableData>{usuario.name}</TableData>
                <TableData>{usuario.email}</TableData>
                <TableDataIcon>
                  <Toogle />
                </TableDataIcon>
                <TableDataIcon>
                  <MdEdit
                    color="#555"
                    onClick={() => router.push(`/users/${usuario.id}`)}
                  />
                </TableDataIcon>
                <TableDataIcon>
                  <DeleteIcon />
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
