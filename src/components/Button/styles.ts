import styled from 'styled-components';

interface ButtonProps {
  outlined?: boolean;
}

export const ButtonComponent = styled.button<ButtonProps>`
  width: 134px;
  min-height: 35px;

  box-shadow: ${({ outlined }) =>
    outlined ? 'none' : '0px 4px 4px 0px #00000040'};
  border-radius: 4px;
  border: ${({ theme, outlined }) =>
    outlined ? `1px solid ${theme.colors[1]}` : 'none'};
  background-color: ${({ theme, outlined }) =>
    outlined ? theme.colors.white : theme.colors[1]};

  color: ${({ theme, outlined }) =>
    outlined ? theme.colors[1] : theme.colors.white};
  font-size: 14px;
  font-weight: 500;
  line-height: 17.38px;

  animation-timing-function: ease-out;
  animation-duration: 100ms;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;

  &:hover {
    opacity: 0.9;
  }

  svg {
    margin-top: -0.15rem;
  }
`;
