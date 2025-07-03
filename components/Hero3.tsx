'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ShoppingBag, ArrowRight, Calendar, Play } from 'react-feather';
import { Award, Sparkles, Star, Users, Palette, Heart, Gift } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface StatItem {
  icon: React.ComponentType<{ size: number; className?: string }>;
  number: string;
  label: string;
  color: string;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

const Hero3 = () => {
  const router = useRouter();
  const [tapPosition, setTapPosition] = useState({ x: 0, y: 0 });
  const [activeRipple, setActiveRipple] = useState<string | null>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [currentText, setCurrentText] = useState(0);
  
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
  const contentY = useTransform(scrollY, [0, 500], [0, -50]);
  
  const dynamicTexts = [
    "Art of Mehandi",
    "Beauty in Henna", 
    "Traditional Elegance",
    "Timeless Artistry"
  ];
  
  const stats: StatItem[] = [
    { icon: Users, number: '500+', label: 'Happy Clients', color: 'text-blue-400' },
    { icon: Sparkles, number: '50+', label: 'Unique Designs', color: 'text-yellow-400' },
    { icon: Palette, number: '10+', label: 'Master Artists', color: 'text-pink-400' },
    { icon: Award, number: '5+', label: 'Awards Won', color: 'text-green-400' },
  ];

  // Generate floating particles
  useEffect(() => {
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5
    }));
    setParticles(newParticles);
  }, []);

  // Rotate text every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % dynamicTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleLinkClick = (e: React.MouseEvent, href: string, buttonId: string) => {
    e.preventDefault();
    
    const rect = e.currentTarget.getBoundingClientRect();
    setTapPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    
    setActiveRipple(buttonId);
    
    setTimeout(() => {
      setActiveRipple(null);
      router.push(href);
    }, 600);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced Background */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: backgroundY }}
      >
        {/* Multiple background layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/95 via-orange-900/90 to-red-900/95 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 z-15"></div>
        
        {/* Pattern overlay */}
        <div className="absolute inset-0 z-12 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #fbbf24 0%, transparent 50%), 
                             radial-gradient(circle at 75% 75%, #f59e0b 0%, transparent 50%)`,
            backgroundSize: '100px 100px'
          }}></div>
        </div>
        
        <motion.img
          src="https://images.pexels.com/photos/1612513/pexels-photo-1612513.jpeg"
          alt="Beautiful mehandi design"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1.15 }}
          transition={{ duration: 20, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}
          className="w-full h-full object-cover filter brightness-110 contrast-110"
        />
      </motion.div>

      {/* Floating Particles */}
      <div className="absolute inset-0 z-16">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-yellow-400/60 rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
            }}
            animate={{
              y: [-20, -100, -20],
              x: [-10, 10, -10],
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Enhanced floating elements */}
      <div className="absolute inset-0 z-17">
        <motion.div
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
          className="absolute top-20 left-10 w-16 h-16 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full backdrop-blur-sm border border-white/10"
        />
        <motion.div
          animate={{ 
            y: [0, 20, 0],
            rotate: [360, 180, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
          className="absolute top-40 right-20 w-12 h-12 bg-gradient-to-r from-pink-400/25 to-purple-400/25 rounded-full backdrop-blur-sm border border-white/10"
        />
        <motion.div
          animate={{ 
            y: [0, -12, 0],
            x: [0, 8, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}
          className="absolute bottom-40 left-20 w-20 h-20 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full backdrop-blur-sm border border-white/10"
        />
        <motion.div
          animate={{ 
            y: [0, 10, 0],
            rotate: [0, -180, -360]
          }}
          transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
          className="absolute bottom-20 right-10 w-14 h-14 bg-gradient-to-r from-green-400/25 to-emerald-400/25 rounded-full backdrop-blur-sm border border-white/10"
        />
      </div>

      {/* Main Content */}
      <motion.div 
        className="container mx-auto px-4 relative z-20"
        style={{ y: contentY }}
      >
        <div className="max-w-5xl mx-auto text-center text-white">
          {/* Enhanced Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8, type: "spring", bounce: 0.4 }}
            className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-6 py-3 mb-8 text-sm shadow-2xl"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles size={18} className="text-yellow-400" />
            </motion.div>
            <span className="font-semibold bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text text-transparent">
              Premium Henna Experience Since 2020
            </span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Heart size={16} className="text-pink-400" />
            </motion.div>
          </motion.div>

          {/* Enhanced Main Heading with Dynamic Text */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="mb-6"
          >
            <motion.h1 className="font-serif text-5xl sm:text-6xl md:text-8xl font-bold leading-tight">
              <motion.span 
                className="block text-white mb-2"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Discover the
              </motion.span>
              
              <motion.span className="block relative">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentText}
                    initial={{ opacity: 0, y: 50, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    exit={{ opacity: 0, y: -50, rotateX: 90 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-400 bg-clip-text text-transparent inline-block"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {dynamicTexts[currentText]}
                  </motion.span>
                </AnimatePresence>
                
                {/* Decorative elements */}
                <motion.div
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -top-4 -right-8 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-60"
                />
              </motion.span>
            </motion.h1>
          </motion.div>

          {/* Enhanced Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg sm:text-xl md:text-2xl text-amber-100 mb-10 max-w-3xl mx-auto leading-relaxed font-light"
          >
            Premium henna products and professional artist booking – all in one place.{' '}
            <span className="text-yellow-300 font-medium">Create beautiful traditions</span> with authentic, natural henna.
          </motion.p>

          {/* Enhanced CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-16 relative"
          >
            {/* Primary CTA */}
            <motion.a
              href="/shop"
              onClick={(e) => handleLinkClick(e, '/shop', 'shop-button')}
              className="group relative overflow-hidden bg-gradient-to-r from-white via-amber-50 to-white text-amber-900 px-8 py-4 sm:px-10 sm:py-5 rounded-full font-bold text-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 active:scale-95 flex items-center space-x-3 border-2 border-white/20 backdrop-blur-sm"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ShoppingBag size={24} />
              </motion.div>
              <span>Shop Premium Products</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
              
              <AnimatePresence>
                {activeRipple === 'shop-button' && (
                  <motion.span
                    className="absolute bg-amber-400/30 rounded-full"
                    initial={{
                      scale: 0,
                      opacity: 1,
                      x: tapPosition.x,
                      y: tapPosition.y,
                      width: 10,
                      height: 10,
                    }}
                    animate={{
                      scale: 30,
                      opacity: 0,
                      x: tapPosition.x - 5,
                      y: tapPosition.y - 5,
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                  />
                )}
              </AnimatePresence>
            </motion.a>

            {/* Secondary CTA */}
            <motion.a
              href="/booking"
              onClick={(e) => handleLinkClick(e, '/booking', 'booking-button')}
              className="group relative overflow-hidden bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 text-white px-8 py-4 sm:px-10 sm:py-5 rounded-full font-bold text-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 active:scale-95 flex items-center space-x-3 border-2 border-white/10 backdrop-blur-sm"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Calendar size={24} />
              </motion.div>
              <span>Book Master Artist</span>
              
              <AnimatePresence>
                {activeRipple === 'booking-button' && (
                  <motion.span
                    className="absolute bg-white/40 rounded-full"
                    initial={{
                      scale: 0,
                      opacity: 1,
                      x: tapPosition.x,
                      y: tapPosition.y,
                      width: 10,
                      height: 10,
                    }}
                    animate={{
                      scale: 30,
                      opacity: 0,
                      x: tapPosition.x - 5,
                      y: tapPosition.y - 5,
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                  />
                )}
              </AnimatePresence>
            </motion.a>
          </motion.div>

          {/* Enhanced Stats */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15, delayChildren: 1 }
              }
            }}
            className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 30, scale: 0.8 },
                  visible: { opacity: 1, y: 0, scale: 1 }
                }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center group cursor-pointer"
              >
                <motion.div 
                  className="w-16 h-16 sm:w-20 sm:h-20 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center mx-auto mb-3 border border-white/20 group-hover:bg-white/20 transition-all duration-300"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <stat.icon size={28} className={`${stat.color} group-hover:scale-110 transition-transform`} />
                </motion.div>
                <motion.div 
                  className="text-2xl sm:text-3xl font-bold mb-1"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-sm sm:text-base text-amber-200 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Additional CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6 text-amber-200"
          >
            <motion.div 
              className="flex items-center space-x-2 cursor-pointer hover:text-yellow-300 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              <Play size={20} className="text-yellow-400" />
              <span className="font-medium">Watch Our Story</span>
            </motion.div>
            
            <div className="hidden sm:block w-px h-6 bg-white/30"></div>
            
            <motion.div 
              className="flex items-center space-x-2 cursor-pointer hover:text-yellow-300 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              <Gift size={20} className="text-pink-400" />
              <span className="font-medium">Special Offers</span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Enhanced Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.div 
          className="w-8 h-12 border-2 border-white/40 rounded-full flex justify-center backdrop-blur-sm bg-white/5"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div 
            className="w-1 h-3 bg-gradient-to-b from-yellow-400 to-orange-400 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
        <p className="text-xs text-white/60 mt-2 font-medium">Scroll to explore</p>
      </motion.div>
    </section>
  );
};

export default Hero3;