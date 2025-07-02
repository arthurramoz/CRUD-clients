import {
  BackgroundIcon,
  DivIcon,
  HighNavbar,
  Icon,
  IconLogo,
  LogoButton,
  LogoHidden,
  LogoHidden2,
  LogoText,
  LogoTextHidden,
  Nav,
  NavLink,
  NavLinkIcon,
  NavLinkText,
  NavbarContainer,
  TopNavbar,
} from './styles';
import PersonIcon from '@mui/icons-material/Person';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

interface Props {
  open: boolean;
  setOpen: React.Dispatch<boolean>;
  navbar: number;
  setNavbar: React.Dispatch<number>;
}

const NavbarDefault = ({ navbar, setNavbar, open, setOpen }: Props) => {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(true);
  const [audioOpen, setAudioOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(true);
  const [forceClose, setForceClose] = useState(false);

  useEffect(() => {
    if (!expanded) setAudioOpen(false);
  }, [expanded]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1025;
      setIsMobile(mobile);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (window.innerWidth < 1025) {
      setExpanded(open);
    }
  }, [open]);

  const MotionFade = motion.div;

  return (
    <>
      {isMobile && open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 998,
          }}
        />
      )}

      <NavbarContainer
        onMouseEnter={
          !isMobile && !open && !forceClose
            ? () => setExpanded(true)
            : undefined
        }
        onMouseLeave={
          !isMobile
            ? () => {
                setForceClose(false);
                setExpanded(false);
              }
            : undefined
        }
        open={open}
      >
        {open && (
          <>
            <BackgroundIcon
              style={{
                background: '#aaa',
                position: 'absolute',
                top: '12px',
                left: '250px',
                width: '34px',
                height: '34px',
              }}
              onClick={() => setOpen(!open)}
            >
              <CloseRoundedIcon />
            </BackgroundIcon>
          </>
        )}

        <HighNavbar>
          <LogoButton open={expanded} type="button">
            <LogoHidden2 open={expanded}>
              <LogoText open={expanded}>
                <IconLogo src="/logotipo.png" />
              </LogoText>
            </LogoHidden2>
            {!isMobile &&
              (!expanded ? (
                <LogoHidden onClick={() => setExpanded(true)}>
                  <LogoTextHidden open={expanded}>
                    <PersonOutlineOutlinedIcon />
                  </LogoTextHidden>
                </LogoHidden>
              ) : (
                <DivIcon
                  open={expanded}
                  onClick={() => {
                    setExpanded(false);
                    setForceClose(true);
                  }}
                >
                  <Icon src="/sidebar.svg" />
                </DivIcon>
              ))}
          </LogoButton>

          <TopNavbar>
            <MotionFade
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Nav open={expanded}>
                <NavLink
                  selected={expanded}
                  selected2={pathname === '/users'}
                  href="/users"
                >
                  <NavLinkIcon
                    selected2={expanded}
                    selected={pathname === '/users'}
                  >
                    <PersonIcon />
                  </NavLinkIcon>
                  <NavLinkText
                    selected={pathname === '/users'}
                    selected2={expanded}
                  >
                    Consultar
                  </NavLinkText>
                </NavLink>
                <NavLink
                  selected={expanded}
                  selected2={pathname.startsWith('/users/create')}
                  href="/users/create"
                >
                  <NavLinkIcon
                    selected2={expanded}
                    selected={pathname.startsWith('/users/create')}
                  >
                    <AddIcon />
                  </NavLinkIcon>
                  <NavLinkText
                    selected={pathname.startsWith('/users/create')}
                    selected2={expanded}
                  >
                    Criar usuário
                  </NavLinkText>
                </NavLink>
                <NavLink
                  selected={expanded}
                  selected2={pathname.startsWith('/users/')}
                  className="edit"
                  href="#"
                >
                  <NavLinkIcon
                    selected2={expanded}
                    selected={pathname.startsWith('/users/')}
                  >
                    <EditIcon />
                  </NavLinkIcon>
                  <NavLinkText
                    selected={pathname.startsWith('/users/')}
                    selected2={expanded}
                  >
                    Editar usuário
                  </NavLinkText>
                </NavLink>
              </Nav>
            </MotionFade>
          </TopNavbar>
        </HighNavbar>
      </NavbarContainer>
    </>
  );
};

export default NavbarDefault;
