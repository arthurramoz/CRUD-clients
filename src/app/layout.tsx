import Providers from '@/components/Providers/Providers';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

const roboto = Roboto({ weight: '400', subsets: ['cyrillic'] });

export const metadata: Metadata = {
  title: 'Projeto Final',
  description: 'Projeto Final',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="pt">
      <body className={roboto.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
