'use client';

import React, { useState, useEffect } from 'react';
import { ShoppingCart, Search, Menu, X, User, Heart } from 'lucide-react';
import Button from './ui/Button';
import { NavigationItem } from '../types';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { usePathname } from 'next/navigation';
import path from 'path';

const navigation: NavigationItem[] = [
  { title: 'Home', href: '/' },
  { title: 'Shop', href: '/shop' },
  { title: 'Book Artist', href: '/booking' },
//   { title: 'Classes', href: '/classes' },
  { title: 'About Us', href: '/about' },
//   { title: 'Blog', href: '/blog' },
  { title: 'Contact', href: '/contact' }
];

const Header2 = () => {
  const pathname = usePathname();
  const isHomePage = pathname=='/' 
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const { isAuthenticated, user, logout } = useAuth();
  const { totalItems } = useCart();
  console.log(pathname, 'pathname', isHomePage, 'isHomePage');  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navTextColor = isScrolled ? 'text-gray-800' : 'text-white';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || !isHomePage? 'bg-white shadow-lg py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo with animation */}
          <Link href="/" className="relative group">
            <span className={`text-3xl font-serif font-bold transition-colors duration-300 ${isScrolled || !isHomePage? 'text-brown-800' : 'text-white'}`}>
              Mehandi Mansion
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brown-600 transition-all duration-300 group-hover:w-full"></span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className={`relative group text-sm font-medium transition-colors ${isScrolled || !isHomePage? 'text-gray-700 hover:text-brown-600' : 'text-white hover:text-brown-200'}`}
              >
                {item.title}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brown-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            <div className="relative group p-2">
              <Link href="/cart" className="flex items-center">
                <ShoppingCart size={20} className={`transition-colors ${isScrolled || !isHomePage? 'text-gray-700 group-hover:text-brown-600' : 'text-white group-hover:text-brown-200'}`} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brown-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center transform group-hover:scale-110 transition-transform">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>

            <Link href="/wishlist" className={`p-2 rounded-full transition-colors ${isScrolled || !isHomePage? 'hover:bg-gray-100' : 'hover:bg-white hover:bg-opacity-10'}`}>
              <Heart size={20} className={`transition-colors ${isScrolled || !isHomePage? 'text-gray-700 hover:text-brown-600' : 'text-white hover:text-brown-200'}`} />
            </Link>

            {isAuthenticated ? (
              <div className="relative group">
                <button className={`p-2 rounded-full transition-colors ${isScrolled || !isHomePage? 'hover:bg-gray-100' : 'hover:bg-white hover:bg-opacity-10'}`}>
                  <User size={20} className={`transition-colors ${isScrolled || !isHomePage? 'text-gray-700 group-hover:text-brown-600' : 'text-white group-hover:text-brown-200'}`} />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 origin-top-right transform group-hover:scale-100 scale-95">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b">
                    Hello, {user?.name || 'User'}
                  </div>
                  <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">Profile</Link>
                  <Link href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">My Orders</Link>
                  <Link href="/my-bookings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">My Bookings</Link>
                  <button 
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link href="/auth" className={`p-2 rounded-full transition-colors ${isScrolled || !isHomePage? 'hover:bg-gray-100' : 'hover:bg-white hover:bg-opacity-10'}`}>
                <User size={20} className={`transition-colors ${isScrolled || !isHomePage? 'text-gray-700 hover:text-brown-600' : 'text-white hover:text-brown-200'}`} />
              </Link>
            )}

            <div className="hidden md:block">
              <Button variant="primary" size="sm" className="hover:scale-105 transition-transform">
                Book Mehandi Artist
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 rounded-full transition-colors" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X size={24} className={`transition-colors ${isScrolled ? 'text-gray-700' : 'text-white'}`} />
              ) : (
                <Menu size={24} className={`transition-colors ${isScrolled ? 'text-gray-700' : 'text-white'}`} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg py-4 px-6 z-20 animate-fadeIn">
          <nav className="flex flex-col space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-800 text-sm font-medium hover:text-brown-600 transition-colors py-2 border-b border-gray-100"
              >
                {item.title}
              </Link>
            ))}
            <Button variant="primary" size="sm" className="mt-4 hover:scale-105 transition-transform">
              Book Mehandi Artist
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header2;