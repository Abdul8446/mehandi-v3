'use client';

import { usePathname } from 'next/navigation';
import Footer from '@/components/Footer';
import Header2 from '@/components/Header2';
import Header3 from '@/components/Header3';
import { useEffect, useState } from 'react';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');
  // const [showContent, setShowContent] = useState(false);

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setShowContent(true);
  //   }, 1000); // 300ms delay

  //   return () => clearTimeout(timeout);
  // }, []);

  return (
    <>
      {!isAdmin && <Header3 />}
      {/* {!isAdmin && <Header />} */}
      {children}
      {!isAdmin && <Footer />}
    </>
  );
}
