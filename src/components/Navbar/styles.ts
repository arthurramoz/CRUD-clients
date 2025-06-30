import Link from 'next/link';
import styled, { css } from 'styled-components';

interface LogoTextImgProps {
  open: boolean;
}

export const Icon = styled.img`
  width: 20px;
`;

export const NavbarContainer = styled.div<{ open: boolean }>`
  height: 100%;

  position: relative;

  background-color: ${({ theme }) => theme.colors.white};
  border-right: 1px solid #ccc;

  padding-top: 12px;
  padding-bottom: 12px;
  padding-left: 0.8rem;
  padding-right: 0.8rem;

  display: flex;
  align-items: start;
  justify-content: space-between;
  flex-direction: column;

  z-index: 999;

  @media (max-width: 1024px) {
    display: ${({ open }) => (open ? 'inherit' : 'none')};
    position: absolute;
    left: 0;
    z-index: 999;
  }
`;

export const LogoHidden = styled.div`
  width: 100%;
  height: 100%;
  max-height: 35px;
  padding: 7px 4px;

  border-radius: 8px;

  box-shadow: 0 1px 0 0.05rem #00000022;

  cursor: pointer;
`;

export const LogoHidden2 = styled.div<{ open: boolean }>`
  width: 100%;
  height: 100%;

  display: ${({ open }) => (open ? 'flex' : 'none')};
  justify-content: center;
  align-items: start;
  flex-direction: column;

  padding: 7px 12px;
  border-radius: 5px;
  cursor: pointer;
`;

export const LogoText = styled.h1<LogoTextImgProps>`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.black};

  opacity: ${({ open }) => (open ? 1 : 0)};
  max-width: ${({ open }) => (open ? '150px' : '0px')};
  letter-spacing: ${({ open }) => (open ? '0px' : '-10px')};
  overflow: hidden;

  transition: all 0.5s ease-in-out;
`;

export const LogoTextHidden = styled.h1<LogoTextImgProps>`
  font-size: 1.3rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.black};

  opacity: ${({ open }) => (open ? 0 : 1)};
  max-width: ${({ open }) => (open ? '0px' : '40px')};
  letter-spacing: ${({ open }) => (open ? '10px' : '0px')};
  overflow: hidden;

  transition: all 0.5s ease-in-out;
`;

export const LogoButton = styled.button<LogoTextImgProps>`
  border: none;
  background: transparent;

  display: flex;
  justify-content: ${({ open }) => (open ? 'space-between' : 'center')};
  align-items: center;

  cursor: auto;
  margin-bottom: 2rem;
  width: 100%;
`;

export const LogoImg = styled.img`
  height: 38px;
  object-fit: cover;
  object-position: center;
`;

export const LogoTextImg = styled.img<LogoTextImgProps>`
  max-width: ${({ open }) => (open ? '202px' : '0px')};
  visibility: ${({ open }) => (open ? 'visible' : 'hidden')};
  padding-left: ${({ open }) => (open ? '0.5rem' : '0')};
  overflow: hidden;

  height: 36px;
  object-fit: cover;
  object-position: center;

  transition: all 0.2s;
`;

export const TopNavbar = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;

  flex-direction: column;

  gap: 2px;
`;

export const MidNavbar = styled.div`
  width: 100%;

  margin-top: 10px;

  display: flex;
  justify-content: center;
  align-items: start;

  flex-direction: column;
`;

export const DivIcon = styled.div<{ open: boolean }>`
  width: 50px;
  height: 100%;

  border-radius: 0.5rem;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  &:hover {
    background: #00000011;
  }
`;

export const TitleNavbar = styled.h1<LogoTextImgProps>`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors[5]};

  padding: 5px;

  opacity: ${({ open }) => (open ? 1 : 0)};
  max-width: ${({ open }) => (open ? '150px' : '0px')};
  letter-spacing: ${({ open }) => (open ? '0px' : '-10px')};
  overflow: hidden;
`;

export const NavLink = styled(Link)<NavLinkProps>`
  position: relative;

  height: 2.2rem;
  width: 100%;

  display: flex;

  align-items: center;

  border-radius: 0.5rem;
  background: ${({ selected, selected2 }) =>
    selected ? (selected2 ? '#00000011' : 'transparent') : 'transparent'};

  &:hover {
    background: #00000011;
  }

  text-decoration: none;

  transition: all 0.2s;
`;

interface NavLinkProps {
  selected: boolean;
  selected2?: boolean;
}

export const NavLinkIcon = styled.div<NavLinkProps>`
  position: relative;

  height: 35px;
  width: 35px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 0.5rem;
  background: ${({ selected, selected2 }) =>
    selected ? (selected2 ? 'transparent' : '#00000011') : 'transparent'};

  text-decoration: none;

  svg {
    font-size: 1.4rem;
    color: ${({ theme, selected, selected2 }) =>
      selected2
        ? theme.colors[10]
        : selected
        ? theme.colors[10]
        : theme.colors[5]};
  }

  color: red;

  transition: all 0.2s;
`;

export const NavLinkText = styled.p<NavLinkProps>`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${({ theme, selected, selected2 }) =>
    selected2
      ? theme.colors[10]
      : selected
      ? theme.colors[10]
      : theme.colors[3]};

  overflow: hidden;
  white-space: nowrap;
  transition: all 0.2s;
`;

interface NavProps {
  open: boolean;
}

export const Nav = styled.nav<NavProps>`
  width: 100%;

  display: flex;
  align-items: start;
  flex-direction: column;
  gap: 5px;

  ${({ open }) =>
    open
      ? css`
          ${NavLinkText} {
            width: 10.625rem;
            padding-left: 0.5rem;
            visibility: visible;
          }
        `
      : css`
          ${NavLinkText} {
            width: 0px;
            padding: 0;
            visibility: hidden;
          }
        `}
`;

export const HighNavbar = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  flex-direction: column;
`;

export const NavLink2 = styled.div`
  position: relative;

  height: 2.5rem;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 0.5rem;

  &:hover {
    background: #00000011;
  }

  text-decoration: none;

  transition: all 0.2s;
`;

export const MenuNav2 = styled.div<{ open: boolean }>`
  padding-left: 8px;
  margin-left: 17px;
  border-left: ${({ open }) => (open ? '1px solid #ccc' : '0')};
`;

export const NavLink3 = styled.div`
  position: relative;

  height: 2.5rem;
  width: 100%;

  display: flex;
  justify-content: start;
  align-items: center;
  border-radius: 0.5rem;

  &:hover {
    background: #00000011;
  }

  text-decoration: none;
  transition: all 0.2s;
`;

export const NotificationWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export const NotificationBadge = styled.div`
  width: 8px;
  height: 8px;
  background-color: #167bff;
  border-radius: 50%;
  position: absolute;
  top: 8px;
  right: 8px;
`;

export const BackgroundIcon = styled.div`
  width: 48px;
  height: 48px;

  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid #33333333;
  border-radius: 6px;
  background: white;
  cursor: pointer;

  svg {
    color: black;
  }
`;

export const IconLogo = styled.img`
  width: 100%;
`;
