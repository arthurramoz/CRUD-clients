'use client';

import { PropsWithChildren, useState } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import { MasterLayoutContainer, MasterLayoutContent } from './styles';

const MasterLayout = ({ children }: PropsWithChildren) => {
  const [navbar, setNavbar] = useState<number>(1);
  const [open, setOpen] = useState<boolean>(false);

  return (
    <MasterLayoutContainer>
      <Navbar
        navbar={navbar}
        setNavbar={setNavbar}
        open={open}
        setOpen={setOpen}
      />
      <MasterLayoutContent>{children}</MasterLayoutContent>
    </MasterLayoutContainer>
  );
};

export default MasterLayout;
