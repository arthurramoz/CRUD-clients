import styled from 'styled-components';

export const ToggleWrapper = styled.label`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
`;

export const Toggle = styled.input.attrs({ type: 'checkbox' })`
  appearance: none;
  width: 40px;
  height: 20px;
  background-color: #ccc;
  border-radius: 20px;
  position: relative;
  outline: none;
  transition: background 0.3s;
  cursor: pointer;

  &:checked {
    background-color: #000;
  }

  &::before {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: white;
    top: 2px;
    left: 2px;
    transition: transform 0.3s;
  }

  &:checked::before {
    transform: translateX(20px);
  }
`;
