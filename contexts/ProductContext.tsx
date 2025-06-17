// // contexts/ProductContext.tsx
// 'use client'

// import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
// import { Product } from '@/models/Product';

// interface ProductContextType {
//   products: Product[];
//   setProducts: (products: Product[]) => void;
// }

// const ProductContext = createContext<ProductContextType | undefined>(undefined);

// export const ProductProvider = ({ children }: { children: ReactNode }) => {
//   const [products, setProducts] = useState<Product[]>([]);

//   // Verify products are loaded and contain the expected slug
//     useEffect(() => {
//         console.log('Products:', products.map(p => p.slug));
//     }, [products]);

//   return (
//     <ProductContext.Provider value={{ products, setProducts }}>
//       {children}
//     </ProductContext.Provider>
//   );
// };

// export const useProducts = () => {
//   const context = useContext(ProductContext);
//   if (context === undefined) {
//     throw new Error('useProducts must be used within a ProductProvider');
//   }
//   return context;
// };

'use client';

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { IProduct } from '@/models/Product';

interface ProductContextType {
  products: IProduct[];
  setProducts: (products: IProduct[]) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<IProduct[]>([]);

  // Load products from localStorage when component mounts
  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      try {
        const parsedProducts: IProduct[] = JSON.parse(storedProducts);
        setProducts(parsedProducts);
      } catch (error) {
        console.error('Failed to parse products from localStorage:', error);
      }
    }
  }, []);

  // Save products to localStorage whenever they change
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem('products', JSON.stringify(products));
    }
  }, [products]);

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
