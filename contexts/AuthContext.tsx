// 'use client';

// import { createContext, useContext, ReactNode, useState, useEffect } from 'react';

// enum AuthType {
//   USER = 'user',
//   ADMIN = 'admin'
// }

// interface User {
//   id: string;
//   phone: string;
//   name?: string;
//   token: string;
//   type: AuthType.USER;
// }

// interface Admin {
//   id: string;
//   email: string;
//   name: string;
//   token: string;
//   type: AuthType.ADMIN;
// }

// type AuthUser = User | Admin | null;

// interface AuthContextType {
//   user: AuthUser;
//   isAuthenticated: boolean;
//   isAdmin: boolean;
//   login: (phone: string) => Promise<boolean>;
//   register: (phone: string, name: string) => Promise<boolean>;
//   verifyOtp: (phone: string, otp: string, isLogin: boolean, name?: string) => Promise<User | null>;
//   adminLogin: (email: string, password: string) => Promise<boolean>;
//   logout: () => void;
//   adminLogout: () => void;
//   loading: boolean;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const [user, setUser] = useState<AuthUser>(null);
//   const [loading, setLoading] = useState(true)

//   const isAdmin = user?.type === AuthType.ADMIN;

//   useEffect(() => {
//     // Check for saved user on initial load
//     const savedAuth = localStorage.getItem('auth');
//     const savedAdminAuth = localStorage.getItem('admin-auth')

//     // Check admin auth first
//     if (savedAdminAuth) {
//       const { user: savedAdmin, expiresAt } = JSON.parse(savedAdminAuth);
//       if (new Date(expiresAt) > new Date()) {
//         if(savedAdmin.type === AuthType.ADMIN){
//           console.log('is  admin')
//           setUser(savedAdmin);
//           setLoading(false)
//           return;
//         }else{
//           console.log('not admin')
//         }
//       } else {
//         localStorage.removeItem('admin-auth');
//       }
//     }

//     if (savedAuth) {
//       const { user: savedUser, expiresAt } = JSON.parse(savedAuth);
//       if (new Date(expiresAt) > new Date()) {
//         setUser(savedUser);
//       } else {
//         localStorage.removeItem('auth');
//       }
//     }
//     setLoading(false)
//   }, []);

//   const saveAuth = (userData: AuthUser) => {
//     const expiryDate = new Date();
//     expiryDate.setDate(expiryDate.getDate() + 7); // 1 week from now
    
//     const authData = {
//       user: userData,
//       expiresAt: expiryDate.toISOString()
//     };
    
//     localStorage.setItem('auth', JSON.stringify(authData));
//     setUser(userData);
//   };

//   const saveAdminAuth = (adminData: Admin) => {
//     const expiryDate = new Date();
//     expiryDate.setDate(expiryDate.getDate() + 7);
  
//     const authData = {
//       user: adminData,
//       expiresAt: expiryDate.toISOString()
//     };
  
//     localStorage.setItem('admin-auth', JSON.stringify(authData));
//     setUser(adminData);
//   };
  

//   const login = async (phone: string) => {
//     try {
//       const response = await fetch('/api/auth/send-otp', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ phone })
//       });
//       return response.ok;
//     } catch (error) {
//       return false;
//     }
//   };

//   const register = async (phone: string, name: string) => {
//     try {
//       const response = await fetch('/api/auth/send-otp', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ phone })
//       });
//       return response.ok;
//     } catch (error) {
//       return false;
//     }
//   };

//   const verifyOtp = async (phone: string, otp: string, isLogin: boolean, name?: string) => {
//     try {
//       const response = await fetch('/api/auth/verify-otp', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ phone, otp, name })
//       });

//       if (response.ok) {
//         const data = await response.json();
//         const userData: User = {
//           id: data.user.id,
//           phone: data.user.phone,
//           name: data.user.name,
//           token: data.token,
//           type: AuthType.USER
//         };
//         saveAuth(userData);
//         return userData;
//       }
//       return null;
//     } catch (error) {
//       console.log(error);
//       return null;
//     }
//   };

//   const adminLogin = async (email: string, password: string) => {
//     try {
//       const response = await fetch('/api/admin/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password })
//       });

//       if (response.ok) {
//         const data = await response.json();
//         const adminData: Admin = {
//           id: data.admin.id,
//           email: data.admin.email,
//           name: data.admin.name,
//           token: data.token,
//           type: AuthType.ADMIN
//         };
//         saveAdminAuth(adminData);
//         return true;
//       }
//       return false;
//     } catch (error) {
//       return false;
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('auth');
//     setUser(null);
//   };

//   const adminLogout = () => {
//     localStorage.removeItem('admin-auth')
//     setUser(null)
//   }

//   const isAuthenticated = !!user && user.type === AuthType.USER;
//   // const isAdmin = user?.type === AuthType.ADMIN;

//   return (
//     <AuthContext.Provider value={{ 
//       user, 
//       isAuthenticated,
//       isAdmin,
//       login, 
//       register, 
//       verifyOtp, 
//       adminLogin, 
//       logout,
//       adminLogout,
//       loading   
//     }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// }

'use client';

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';

interface User {
  id: string;
  phone: string;
  name?: string;
  token: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (phone: string) => Promise<boolean>;
  register: (phone: string, name: string) => Promise<boolean>;
  verifyOtp: (phone: string, otp: string, isLogin: boolean, name?: string) => Promise<User | null>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for saved user on initial load
    const savedAuth = localStorage.getItem('auth');

    if (savedAuth) {
      const { user: savedUser, expiresAt } = JSON.parse(savedAuth);
      if (new Date(expiresAt) > new Date()) {
        setUser(savedUser);
      } else {
        localStorage.removeItem('auth');
      }
    }
    setLoading(false);
  }, []);

  const saveAuth = (userData: User) => {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7); // 1 week from now
    
    const authData = {
      user: userData,
      expiresAt: expiryDate.toISOString()
    };
    
    localStorage.setItem('auth', JSON.stringify(authData));
    setUser(userData);
  };

  const login = async (phone: string) => {
    try {
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone })
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  };

  const register = async (phone: string, name: string) => {
    try {
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone })
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  };

  const verifyOtp = async (phone: string, otp: string, isLogin: boolean, name?: string) => {
    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, otp, name })
      });

      if (response.ok) {
        const data = await response.json();
        const userData: User = {
          id: data.user.id,
          phone: data.user.phone,
          name: data.user.name,
          token: data.token
        };
        saveAuth(userData);
        return userData;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const logout = () => {
    localStorage.removeItem('auth');
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated,
      login, 
      register, 
      verifyOtp, 
      logout,
      loading   
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}