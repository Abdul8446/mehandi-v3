'use client';

import { usePathname } from 'next/navigation';
import Footer from '@/components/Footer';
import Header2 from '@/components/Header2';
import Header3 from '@/components/Header3';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  return (
    <>
      {!isAdmin && <Header3 />}
      {/* {!isAdmin && <Header />} */}
      {children}
      {!isAdmin && <Footer />}
    </>
  );
}
