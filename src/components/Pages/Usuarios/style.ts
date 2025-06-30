import styled from 'styled-components';

export const Center = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SectionTable = styled.table`
  border: 1px solid ${({ theme }) => theme.colors[4]};
  border-radius: 10px;
  padding: 20px;

  max-width: 800px;
  width: 100%;
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors[11]};
  padding-bottom: 10px;
`;

export const TableWrapper = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHead = styled.thead``;

export const TableHeaderRow = styled.tr``;

export const TableHeader = styled.th`
  padding: 12px;
  text-align: left;
  color: ${({ theme }) => theme.colors[10]};
`;

export const TableHeaderIcon = styled.th`
  padding: 12px;
  text-align: center;
  color: ${({ theme }) => theme.colors[10]};
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr``;

export const TableData = styled.td`
  padding: 10px;
  color: ${({ theme }) => theme.colors[11]};
  border-top: 1px solid ${({ theme }) => theme.colors[3]};
`;

export const TableDataIcon = styled.td`
  padding: 10px;
  color: ${({ theme }) => theme.colors[11]};
  text-align: center;
  border-top: 1px solid ${({ theme }) => theme.colors[3]};

  svg {
    cursor: pointer;
  }
`;
