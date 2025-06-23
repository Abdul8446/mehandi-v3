'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Phone, Search, ShoppingCart, Heart, User, 
  ChevronDown, Menu, X, Instagram, Facebook, Twitter, Gift 
} from 'react-feather';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';

interface UserData {
  name?: string;
  phone?: string;
}

const Header3 = () => {
  const pathname = usePathname();  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [totalItems, setTotalItems] = useState(0);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState<UserData | null>(null);
  const router = useRouter();
  const { isAuthenticated, user, logout } = useAuth();
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mock authentication check - replace with your actual auth logic
//   useEffect(() => {
//     // Simulate fetching cart items
//     setTotalItems(3);
//     // Simulate auth check
//     setIsAuthenticated(false);
//     setUser({ name: 'John Doe', phone: '+91 98765 43210' });
//   }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleProtectedRoute = (path: string) => {
    return isAuthenticated ? path : '/login';
  };

//   const logout = () => {
//     // Add your logout logic here
//     setIsAuthenticated(false);
//     setUser(null);
//     router.push('/');
//   };

  const isActive = (path: string) => {
    return pathname === path ? 'text-red-900 font-medium' : 'text-gray-700 hover:text-red-900';
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-brown-900 to-brown-800 text-white py-2 px-4 text-sm">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone size={14} />
              <span>+91 98765 43210</span>
            </div>
            <div className="hidden sm:flex items-center space-x-2">
              <Gift size={14} />
              <span>Free shipping on orders above ₹999</span>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-xs">
            <div className="flex items-center space-x-3">
              <Link href="#" className="hover:text-red-200 transition-colors">
                <Instagram size={14} />
              </Link>
              <Link href="#" className="hover:text-red-200 transition-colors">
                <Facebook size={14} />
              </Link>
              <Link href="#" className="hover:text-red-200 transition-colors">
                <Twitter size={14} />
              </Link>
            </div>
            <span className="hidden md:inline-block">|</span>
            <Link href="/blog" className="hidden md:block hover:text-red-200 transition-colors">Blog</Link>
            <Link href="/faq" className="hidden md:block hover:text-red-200 transition-colors">FAQ</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100' 
          : 'bg-white shadow-sm'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group" onClick={closeMenu}>
              <div className="relative">
                {/* <div className="w-10 h-10 bg-gradient-to-br from-brown-900 to-brown-700 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105"> */}
                  {/* <span className="text-white font-bold text-lg">MM</span> */}
                  {/* <img src="/images/logo.png" alt="" /> */}
                {/* </div> */}
                <div 
                className="w-10 h-10  rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-120 group-active:scale-120"
                style={{
                    backgroundImage: "url('/images/logo.png')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
                >
                {/* Empty div since we're using background image */}
                </div>

                {/* <div className="absolute -inset-1 bg-gradient-to-br from-brown-900 to-brown-700 rounded-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div> */}
              </div>
              <div className="">
                <span className="text-xl font-bold bg-gradient-to-r from-brown-900 to-brown-700 bg-clip-text text-transparent">
                  Mehandi Mansion
                </span>
                <div className="text-xs text-gray-500 -mt-1">Premium Henna Products</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {[
                { path: '/', label: 'Home' },
                { path: '/shop', label: 'Shop' },
                { path: '/booking', label: 'Book Artist' },
                // { path: '/book-class', label: 'Book Class' },
                { path: '/about', label: 'About Us' },
                { path: '/contact', label: 'Contact' },
              ].map((item) => (
                <Link 
                  key={item.path}
                  href={item.path} 
                  className={`relative py-2 px-1 transition-all duration-200 ${isActive(item.path)} group`}
                >
                  {item.label}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-brown-900 to-brown-700 transform transition-transform duration-200 ${
                    pathname === item.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}></span>
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Search */}
              <div className="relative group">
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  className="w-64 pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-brown-500 focus:border-transparent focus:bg-white transition-all duration-200"
                />
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-brown-500 transition-colors" />
              </div>

              {/* Cart */}
              <Link 
                href={handleProtectedRoute('/cart')} 
                className="relative p-2 hover:bg-brown-50 rounded-full transition-colors group"
              >
                <ShoppingCart size={20} className="group-hover:text-brown-900 transition-colors" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium animate-pulse">
                    {totalItems}
                  </span>
                )}
              </Link>

              {/* Wishlist */}
              <Link href="/wishlist" className="p-2 hover:bg-brown-50 rounded-full transition-colors group">
                <Heart size={20} className="group-hover:text-brown-900 transition-colors" />
              </Link>

              {/* User Menu */}
              {isAuthenticated ? (
                <div className="relative group">
                  <button className="flex items-center space-x-2 p-2 hover:bg-red-50 rounded-full transition-colors">
                    <div className="w-8 h-8 bg-gradient-to-br from-brown-900 to-brown-700 rounded-full flex items-center justify-center">
                      <User size={16} className="text-white" />
                    </div>
                    <ChevronDown size={14} className="text-gray-500 group-hover:text-brown-900 transition-colors" />
                  </button>
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="font-medium text-gray-900">Hello, {user?.name || 'User'}</div>
                      <div className="text-sm text-gray-500">{user?.phone}</div>
                    </div>
                    {/* <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-900 transition-colors">Profile</Link> */}
                    <Link href="/my-orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-900 transition-colors">My Orders</Link>
                    {/* <Link href="/my-bookings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-900 transition-colors">My Bookings</Link> */}
                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <button 
                        onClick={logout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-900 transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <Link 
                  href="/auth" 
                  className="bg-gradient-to-r from-brown-900 to-brown-700 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-200 hover:scale-105 font-medium"
                >
                  Login
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors" 
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen 
            ? 'max-h-screen opacity-100 visible' 
            : 'max-h-0 opacity-0 invisible overflow-hidden'
        }`}>
          <div className="bg-white border-t border-gray-100 shadow-lg">
            <div className="container mx-auto px-4 py-4">
              {/* Mobile Search */}
              <div className="relative mb-4">
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>

              {/* Mobile Navigation */}
              <div className="space-y-1 mb-6">
                {[
                  { path: '/', label: 'Home' },
                  { path: '/shop', label: 'Shop' },
                  { path: '/booking', label: 'Book Artist' },
                //   { path: '/book-class', label: 'Book Class' },
                  { path: '/about', label: 'About Us' },
                  { path: '/contact', label: 'Contact' },
                ].map((item) => (
                  <Link 
                    key={item.path}
                    href={item.path} 
                    className={`block py-3 px-4 rounded-lg transition-colors ${
                      pathname === item.path 
                        ? 'bg-brown-50 text-brown-900 font-medium' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              
              {/* Mobile Actions */}
              <div className="border-t border-gray-100 pt-4">
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <Link 
                    href={isAuthenticated ? '/cart' : '/login'} 
                    className="flex items-center justify-center py-3 bg-red-50 text-red-900 rounded-lg font-medium transition-colors hover:bg-red-100" 
                    onClick={closeMenu}
                  >
                    <ShoppingCart size={18} className="mr-2" />
                    Cart ({totalItems})
                  </Link>
                  <Link 
                    href="/wishlist" 
                    className="flex items-center justify-center py-3 bg-gray-50 text-gray-700 rounded-lg font-medium transition-colors hover:bg-gray-100" 
                    onClick={closeMenu}
                  >
                    <Heart size={18} className="mr-2" />
                    Wishlist
                  </Link>
                </div>
                
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-gradient-to-br from-red-900 to-red-700 rounded-full flex items-center justify-center">
                        <User size={18} className="text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{user?.name || 'User'}</div>
                        <div className="text-sm text-gray-500">{user?.phone}</div>
                      </div>
                    </div>
                    <Link href="/profile" className="block py-2 px-3 text-gray-700 hover:text-red-900 transition-colors" onClick={closeMenu}>Profile</Link>
                    <Link href="/orders" className="block py-2 px-3 text-gray-700 hover:text-red-900 transition-colors" onClick={closeMenu}>My Orders</Link>
                    <Link href="/my-bookings" className="block py-2 px-3 text-gray-700 hover:text-red-900 transition-colors" onClick={closeMenu}>My Bookings</Link>
                    <button 
                      onClick={() => { logout(); closeMenu(); }} 
                      className="block w-full text-left py-2 px-3 text-gray-700 hover:text-red-900 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link 
                    href="/login" 
                    className="block w-full text-center py-3 bg-gradient-to-r from-red-900 to-red-700 text-white rounded-lg font-medium transition-all duration-200 hover:shadow-lg" 
                    onClick={closeMenu}
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header3;



// 'use client';
// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { usePathname, useRouter } from 'next/navigation';
// import { 
//   Phone, Search, ShoppingCart, Heart, User, 
//   ChevronDown, Menu, X, Instagram, Facebook, Twitter, Gift 
// } from 'react-feather';
// import { useCart } from '@/contexts/CartContext';
// import { useAuth } from '@/contexts/AuthContext';
// import { motion, AnimatePresence } from 'framer-motion';

// interface UserData {
//   name?: string;
//   phone?: string;
// }

// const Header3 = () => {
//   const pathname = usePathname();  
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const router = useRouter();
//   const { isAuthenticated, user, logout } = useAuth();
//   const { totalItems } = useCart();

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 10);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
//   const closeMenu = () => setIsMenuOpen(false);
//   const toggleSearch = () => {
//     setSearchOpen(!searchOpen);
//     if (!searchOpen) {
//       setTimeout(() => document.getElementById('search-input')?.focus(), 100);
//     }
//   };
//   const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

//   const handleProtectedRoute = (path: string) => {
//     return isAuthenticated ? path : '/login';
//   };

//   const isActive = (path: string) => {
//     return pathname === path ? 'bg-brown-50 text-brown-900 font-medium' : 'text-gray-700 hover:text-brown-900';
//   };

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
//       setSearchQuery('');
//       setSearchOpen(false);
//       closeMenu();
//     }
//   };

//   // Animation variants
//   const menuVariants = {
//     open: { 
//       opacity: 1,
//       height: 'auto',
//       transition: { 
//         duration: 0.3,
//         ease: "easeInOut",
//         when: "beforeChildren",
//         staggerChildren: 0.1
//       }
//     },
//     closed: { 
//       opacity: 0,
//       height: 0,
//       transition: { 
//         duration: 0.3,
//         ease: "easeInOut",
//         when: "afterChildren"
//       }
//     }
//   };

//   const itemVariants = {
//     open: { 
//       opacity: 1,
//       y: 0,
//       transition: { 
//         duration: 0.2,
//         ease: "easeOut"
//       }
//     },
//     closed: { 
//       opacity: 0,
//       y: -10,
//       transition: { 
//         duration: 0.1
//       }
//     }
//   };

//   const searchVariants = {
//     open: { 
//       width: '240px',
//       opacity: 1,
//       transition: { 
//         duration: 0.2,
//         ease: "easeInOut"
//       }
//     },
//     closed: { 
//       width: 0,
//       opacity: 0,
//       transition: { 
//         duration: 0.2,
//         ease: "easeInOut"
//       }
//     }
//   };

//   const profileVariants = {
//     open: {
//       opacity: 1,
//       y: 0,
//       transition: { 
//         duration: 0.2,
//         ease: "easeOut"
//       }
//     },
//     closed: {
//       opacity: 0,
//       y: -10,
//       transition: { 
//         duration: 0.1
//       }
//     }
//   };

//   return (
//     <>
//       {/* Top Bar */}
//       <div className="bg-gradient-to-r from-brown-900 to-brown-800 text-white py-2 px-4 text-sm">
//         <div className="container mx-auto flex justify-between items-center">
//           <div className="flex items-center space-x-6">
//             <div className="flex items-center space-x-2">
//               <Phone size={14} />
//               <span>+91 98765 43210</span>
//             </div>
//             <div className="hidden sm:flex items-center space-x-2">
//               <Gift size={14} />
//               <span>Free shipping on orders above ₹999</span>
//             </div>
//           </div>
//           <div className="flex items-center space-x-4 text-xs">
//             <div className="flex items-center space-x-3">
//               {[Instagram, Facebook, Twitter].map((Icon, index) => (
//                 <Link key={index} href="#" className="hover:text-brown-200 transition-colors">
//                   <Icon size={14} />
//                 </Link>
//               ))}
//             </div>
//             <span className="hidden md:inline-block">|</span>
//             <Link href="/blog" className="hidden md:block hover:text-brown-200 transition-colors">Blog</Link>
//             <Link href="/faq" className="hidden md:block hover:text-brown-200 transition-colors">FAQ</Link>
//           </div>
//         </div>
//       </div>

//       {/* Main Header */}
//       <header className={`sticky top-0 z-50 transition-all duration-300 ${
//         isScrolled 
//           ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100' 
//           : 'bg-white shadow-sm'
//       }`}>
//         <div className="container mx-auto px-4">
//           <div className="flex justify-between items-center h-16">
//             {/* Logo - Now visible on all devices */}
//             <Link 
//               href="/" 
//               className={`flex items-center space-x-3 group p-2 rounded-lg transition-colors ${
//                 pathname === '/' ? 'bg-brown-50' : 'hover:bg-brown-50'
//               }`} 
//               onClick={closeMenu}
//             >
//               <div 
//                 className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110"
//                 style={{
//                   backgroundImage: "url('/images/logo.png')",
//                   backgroundSize: 'cover',
//                   backgroundPosition: 'center',
//                 }}
//               />
//               <div>
//                 <span className="text-xl font-bold bg-gradient-to-r from-brown-900 to-brown-700 bg-clip-text text-transparent">
//                   Mehandi Mansion
//                 </span>
//                 <div className="hidden sm:block text-xs text-gray-500 -mt-1">Premium Henna Products</div>
//               </div>
//             </Link>

//             {/* Desktop Navigation */}
//             <nav className="hidden lg:flex items-center space-x-2">
//               {[
//                 { path: '/', label: 'Home' },
//                 { path: '/shop', label: 'Shop' },
//                 { path: '/booking', label: 'Book Artist' },
//                 { path: '/about', label: 'About Us' },
//                 { path: '/contact', label: 'Contact' },
//               ].map((item) => (
//                 <Link 
//                   key={item.path}
//                   href={item.path} 
//                   className={`relative py-2 px-4 rounded-lg transition-all duration-200 ${
//                     pathname === item.path 
//                       ? 'bg-brown-50 text-brown-900 font-medium' 
//                       : 'text-gray-700 hover:bg-brown-50 hover:text-brown-900'
//                   } group`}
//                 >
//                   {item.label}
//                 </Link>
//               ))}
//             </nav>

//             {/* Desktop Actions */}
//             <div className="hidden lg:flex items-center space-x-2">
//               {/* Search - Desktop */}
//               <motion.div 
//                 className="relative flex items-center"
//                 initial={false}
//                 animate={searchOpen ? "open" : "closed"}
//               >
//                 {searchOpen ? (
//                   <motion.form
//                     onSubmit={handleSearch}
//                     variants={searchVariants}
//                     className="origin-right absolute right-0 top-0 bg-white"
//                   >
//                     <input 
//                       id="search-input"
//                       type="text" 
//                       value={searchQuery}
//                       onChange={(e) => setSearchQuery(e.target.value)}
//                       placeholder="Search products..." 
//                       className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-brown-500 focus:border-transparent"
//                       autoFocus
//                     />
//                     <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                   </motion.form>
//                 ) : null}
//                 <motion.button
//                   onClick={toggleSearch}
//                   className="p-2 hover:bg-brown-50 rounded-full transition-colors"
//                   whileHover={{ scale: 1.1 }}
//                   // whileTap={{ scale: 0.9 }}
//                 >
//                   <Search size={20} className="text-gray-700" />
//                 </motion.button>
//               </motion.div>

//               {/* Cart */}
//               <motion.div 
//                 className="relative"
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//               >
//                 <Link 
//                   href={handleProtectedRoute('/cart')} 
//                   className={`p-2 rounded-full transition-colors flex items-center justify-center ${
//                     pathname === '/cart' 
//                       ? 'bg-brown-50 text-brown-900' 
//                       : 'hover:bg-brown-50 text-gray-700'
//                   }`}
//                 >
//                   <ShoppingCart size={20} />
//                   {totalItems > 0 && (
//                     <motion.span 
//                       className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium"
//                       initial={{ scale: 0 }}
//                       animate={{ scale: 1 }}
//                       transition={{ type: 'spring', stiffness: 500 }}
//                     >
//                       {totalItems}
//                     </motion.span>
//                   )}
//                 </Link>
//               </motion.div>

//               {/* Wishlist */}
//               <motion.div 
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//               >
//                 <Link 
//                   href="/wishlist" 
//                   className={`p-2 rounded-full transition-colors flex items-center justify-center ${
//                     pathname === '/wishlist' 
//                       ? 'bg-brown-50 text-brown-900' 
//                       : 'hover:bg-brown-50 text-gray-700'
//                   }`}
//                 >
//                   <Heart size={20} />
//                 </Link>
//               </motion.div>

//               {/* User Menu */}
//               {isAuthenticated ? (
//                 <motion.div className="relative">
//                   <motion.button 
//                     className={`flex group items-center space-x-2 p-2 rounded-full transition-colors ${
//                       pathname === '/profile' || pathname === '/orders' || pathname === '/my-bookings'
//                         ? 'bg-brown-50' 
//                         : 'hover:bg-brown-50'
//                     }`}
//                     onClick={toggleProfile}
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                   >
//                     <div className="w-8 h-8 group-hover:transform group-hover:rotate-12 bg-gradient-to-br from-brown-900 to-brown-700 rounded-full flex items-center justify-center">
//                       <User size={16} className="text-white" />
//                     </div>
//                     <ChevronDown size={14} className="text-gray-500" />
//                   </motion.button>

//                   <AnimatePresence>
//                     {isProfileOpen && (
//                       <motion.div 
//                         className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50"
//                         initial="closed"
//                         animate="open"
//                         exit="closed"
//                         variants={profileVariants}
//                       >
//                         <div className="px-4 py-3 border-b border-gray-100">
//                           <div className="font-medium text-gray-900">Hello, {user?.name || 'User'}</div>
//                           <div className="text-sm text-gray-500">{user?.phone}</div>
//                         </div>
//                         <Link 
//                           href="/profile" 
//                           className={`block px-4 py-2 text-sm transition-colors ${
//                             pathname === '/profile' 
//                               ? 'bg-brown-50 text-brown-900 font-medium' 
//                               : 'text-gray-700 hover:bg-brown-50 hover:text-brown-900'
//                           }`}
//                           onClick={() => setIsProfileOpen(false)}
//                         >
//                           Profile
//                         </Link>
//                         <Link 
//                           href="/orders" 
//                           className={`block px-4 py-2 text-sm transition-colors ${
//                             pathname === '/orders' 
//                               ? 'bg-brown-50 text-brown-900 font-medium' 
//                               : 'text-gray-700 hover:bg-brown-50 hover:text-brown-900'
//                           }`}
//                           onClick={() => setIsProfileOpen(false)}
//                         >
//                           My Orders
//                         </Link>
//                         <Link 
//                           href="/my-bookings" 
//                           className={`block px-4 py-2 text-sm transition-colors ${
//                             pathname === '/my-bookings' 
//                               ? 'bg-brown-50 text-brown-900 font-medium' 
//                               : 'text-gray-700 hover:bg-brown-50 hover:text-brown-900'
//                           }`}
//                           onClick={() => setIsProfileOpen(false)}
//                         >
//                           My Bookings
//                         </Link>
//                         <div className="border-t border-gray-100 mt-2 pt-2">
//                           <button 
//                             onClick={() => { logout(); setIsProfileOpen(false); }}
//                             className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-brown-50 hover:text-brown-900 transition-colors"
//                           >
//                             Logout
//                           </button>
//                         </div>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </motion.div>
//               ) : (
//                 <motion.div
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <Link 
//                     href="/auth" 
//                     className="bg-gradient-to-r from-brown-900 to-brown-700 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-200 font-medium"
//                   >
//                     Login
//                   </Link>
//                 </motion.div>
//               )}
//             </div>

//             {/* Mobile Menu Button */}
//             <motion.button 
//               className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors" 
//               onClick={toggleMenu}
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//             >
//               {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//             </motion.button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         <AnimatePresence>
//           {isMenuOpen && (
//             <motion.div 
//               className="lg:hidden bg-white border-t border-gray-100 shadow-lg overflow-hidden"
//               initial="closed"
//               animate="open"
//               exit="closed"
//               variants={menuVariants}
//             >
//               <div className="container mx-auto px-4 py-4">
//                 {/* Mobile Search */}
//                 <motion.form 
//                   onSubmit={handleSearch}
//                   className="relative mb-4"
//                   variants={itemVariants}
//                 >
//                   <input 
//                     type="text" 
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     placeholder="Search products..." 
//                     className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brown-500 focus:border-transparent"
//                   />
//                   <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                 </motion.form>

//                 {/* Mobile Navigation */}
//                 <motion.div className="space-y-1 mb-6" variants={itemVariants}>
//                   {[
//                     { path: '/', label: 'Home' },
//                     { path: '/shop', label: 'Shop' },
//                     { path: '/booking', label: 'Book Artist' },
//                     { path: '/about', label: 'About Us' },
//                     { path: '/contact', label: 'Contact' },
//                   ].map((item) => (
//                     <motion.div 
//                       key={item.path}
//                       variants={itemVariants}
//                       whileHover={{ x: 5 }}
//                     >
//                       <Link 
//                         href={item.path} 
//                         className={`block py-3 px-4 rounded-lg transition-colors ${
//                           pathname === item.path 
//                             ? 'bg-brown-50 text-brown-900 font-medium' 
//                             : 'text-gray-700 hover:bg-gray-50'
//                         }`}
//                         onClick={closeMenu}
//                       >
//                         {item.label}
//                       </Link>
//                     </motion.div>
//                   ))}
//                 </motion.div>
                
//                 {/* Mobile Actions */}
//                 <motion.div 
//                   className="border-t border-gray-100 pt-4"
//                   variants={itemVariants}
//                 >
//                   <motion.div 
//                     className="grid grid-cols-2 gap-3 mb-4"
//                     variants={itemVariants}
//                   >
//                     <motion.div whileHover={{ scale: 1.02 }}>
//                       <Link 
//                         href={isAuthenticated ? '/cart' : '/login'} 
//                         className={`flex items-center justify-center py-3 rounded-lg font-medium transition-colors ${
//                           pathname === '/cart'
//                             ? 'bg-brown-100 text-brown-900'
//                             : 'bg-brown-50 text-brown-900 hover:bg-brown-100'
//                         }`} 
//                         onClick={closeMenu}
//                       >
//                         <ShoppingCart size={18} className="mr-2" />
//                         Cart ({totalItems})
//                       </Link>
//                     </motion.div>
//                     <motion.div whileHover={{ scale: 1.02 }}>
//                       <Link 
//                         href="/wishlist" 
//                         className={`flex items-center justify-center py-3 rounded-lg font-medium transition-colors ${
//                           pathname === '/wishlist'
//                             ? 'bg-brown-100 text-brown-900'
//                             : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
//                         }`}
//                         onClick={closeMenu}
//                       >
//                         <Heart size={18} className="mr-2" />
//                         Wishlist
//                       </Link>
//                     </motion.div>
//                   </motion.div>
                  
//                   {isAuthenticated ? (
//                     <motion.div 
//                       className="space-y-2"
//                       variants={itemVariants}
//                     >
//                       <motion.div 
//                         className={`flex items-center space-x-3 p-3 rounded-lg ${
//                           pathname === '/profile' || pathname === '/orders' || pathname === '/my-bookings'
//                             ? 'bg-brown-100'
//                             : 'bg-gray-50'
//                         }`}
//                         whileHover={{ scale: 1.01 }}
//                       >
//                         <div className="w-10 h-10 bg-gradient-to-br from-brown-900 to-brown-700 rounded-full flex items-center justify-center">
//                           <User size={18} className="text-white" />
//                         </div>
//                         <div>
//                           <div className="font-medium text-gray-900">{user?.name || 'User'}</div>
//                           <div className="text-sm text-gray-500">{user?.phone}</div>
//                         </div>
//                       </motion.div>
//                       {[
//                         { path: '/profile', label: 'Profile' },
//                         { path: '/orders', label: 'My Orders' },
//                         { path: '/my-bookings', label: 'My Bookings' }
//                       ].map((item) => (
//                         <motion.div 
//                           key={item.path}
//                           whileHover={{ x: 5 }}
//                         >
//                           <Link 
//                             href={item.path} 
//                             className={`block py-2 px-3 rounded-lg transition-colors ${
//                               pathname === item.path
//                                 ? 'bg-brown-50 text-brown-900 font-medium'
//                                 : 'text-gray-700 hover:bg-brown-50 hover:text-brown-900'
//                             }`}
//                             onClick={closeMenu}
//                           >
//                             {item.label}
//                           </Link>
//                         </motion.div>
//                       ))}
//                       <motion.button 
//                         onClick={() => { logout(); closeMenu(); }} 
//                         className="block w-full text-left py-2 px-3 text-gray-700 hover:text-brown-900 hover:bg-brown-50 rounded-lg transition-colors"
//                         whileHover={{ x: 5 }}
//                       >
//                         Logout
//                       </motion.button>
//                     </motion.div>
//                   ) : (
//                     <motion.div
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                     >
//                       <Link 
//                         href="/login" 
//                         className="block w-full text-center py-3 bg-gradient-to-r from-brown-900 to-brown-700 text-white rounded-lg font-medium transition-all duration-200 hover:shadow-lg" 
//                         onClick={closeMenu}
//                       >
//                         Login
//                       </Link>
//                     </motion.div>
//                   )}
//                 </motion.div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </header>
//     </>
//   );
// };

// export default Header3;