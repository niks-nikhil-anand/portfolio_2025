"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Switch } from '@/components/ui/switch';
import { useTheme } from 'next-themes';
import { 
  BsMoonStars, 
  BsSun, 
  BsInstagram, 
  BsTwitter, 
  BsLinkedin 
} from 'react-icons/bs';
import { 
  BiCoffee, 
  BiUser, 
  BiBriefcase, 
  BiPackage 
} from 'react-icons/bi';
import { HiOutlineMail } from 'react-icons/hi';

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  const isDarkMode = theme === 'dark';

  const toggleDarkMode = (): void => {
    setTheme(isDarkMode ? 'light' : 'dark');
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = (): void => {
      const scrollTop: number = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  // Dynamic navbar classes with proper background colors
  const navbarClasses: string = `fixed top-0 left-0 right-0 w-full px-4 sm:px-6 py-3 transition-all duration-300 z-50 border-b ${
    isScrolled 
      ? `${isDarkMode 
          ? 'bg-black/95 backdrop-blur-md border-gray-800/50 shadow-lg shadow-black/10' 
          : 'bg-white/95 backdrop-blur-md border-gray-200/50 shadow-lg shadow-gray-900/10'
        }` 
      : 'bg-transparent border-transparent'
  }`;

  const socialLinkClasses: string = `p-2.5 rounded-lg transition-all duration-200 hover:scale-110 hover:bg-accent ${
    isDarkMode ? 'text-white' : 'text-black'
  }`;

  const navLinkClasses: string = `flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 hover:bg-accent ${
    isDarkMode ? 'text-white' : 'text-black'
  }`;

  return (
    <nav className={navbarClasses}>
      <div className="mx-auto flex items-center justify-between">
        
        {/* Left Side */}
        <div className="flex items-center space-x-4">
          {/* Enhanced Dark Mode Toggle with Framer Motion */}
          <motion.div 
            className="relative flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div 
              className={`
                relative w-16 h-8 rounded-full cursor-pointer transition-all duration-300 ease-in-out
                ${isDarkMode 
                  ? 'bg-black shadow-lg shadow-black/25 border border-gray-700' 
                  : 'bg-white shadow-lg shadow-gray-300/50 border border-gray-200'
                }
              `}
              onClick={toggleDarkMode}
            >
              {/* Toggle Thumb */}
              <motion.div
                className={`
                  absolute top-0.5 w-6 h-6 rounded-full shadow-md flex items-center justify-center
                  ${isDarkMode 
                    ? 'bg-white shadow-black/30' 
                    : 'bg-black shadow-gray-400/50'
                  }
                `}
                animate={{
                  x: isDarkMode ? 32 : 2,
                }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30
                }}
              >
                <AnimatePresence mode="wait">
                  {isDarkMode ? (
                    <motion.div
                      key="moon"
                      initial={{ opacity: 0, rotate: -180 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 180 }}
                      transition={{ duration: 0.3 }}
                    >
                      <BsMoonStars className="w-3 h-3 text-white" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="sun"
                      initial={{ opacity: 0, rotate: -180 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 180 }}
                      transition={{ duration: 0.3 }}
                    >
                      <BsSun className="w-3 h-3 text-white" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Background Icons */}
              <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
                <motion.div
                  animate={{
                    opacity: isDarkMode ? 0.4 : 0.6,
                    scale: isDarkMode ? 0.8 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <BsSun className={`w-4 h-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                </motion.div>
                <motion.div
                  animate={{
                    opacity: isDarkMode ? 0.6 : 0.4,
                    scale: isDarkMode ? 1 : 0.8,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <BsMoonStars className={`w-3 h-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Social Media Icons */}
          <div className="hidden sm:flex items-center space-x-1">
            <motion.a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className={socialLinkClasses}
              aria-label="Instagram"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <BsInstagram className="w-4 h-4" />
            </motion.a>
            
            <motion.a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className={socialLinkClasses}
              aria-label="Twitter"
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <BsTwitter className="w-4 h-4" />
            </motion.a>
            
            <motion.a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className={socialLinkClasses}
              aria-label="LinkedIn"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <BsLinkedin className="w-4 h-4" />
            </motion.a>
          </div>
        </div>

        {/* Center - Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <motion.a 
            href="#home" 
            className="flex items-center space-x-2 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div 
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 bg-primary text-primary-foreground group-hover:bg-primary/90 shadow-lg`}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              L
            </motion.div>
            <span className={`hidden sm:block font-bold text-xl transition-all duration-300 ${
              isDarkMode ? 'text-white' : 'text-black'
            } group-hover:text-primary`}>
              LOGO
            </span>
          </motion.a>
        </div>

        {/* Right Side */}
        <div className="flex items-center">
          <div className="hidden md:flex items-center space-x-2">
            <motion.a
              href="#journey"
              className={navLinkClasses}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <BiUser className="w-4 h-4" />
              <span className="text-sm">My Journey</span>
            </motion.a>

            <motion.a
              href="#contact"
              className={navLinkClasses}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <HiOutlineMail className="w-4 h-4" />
              <span className="text-sm">Contact</span>
            </motion.a>

            <motion.a
              href="#projects"
              className={navLinkClasses}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <BiBriefcase className="w-4 h-4" />
              <span className="text-sm">Projects</span>
            </motion.a>

            <motion.a
              href="#products"
              className={navLinkClasses}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <BiPackage className="w-4 h-4" />
              <span className="text-sm">Products</span>
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 rounded-lg hover:bg-accent"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <div className={`w-5 h-5 ${isDarkMode ? 'text-white' : 'text-black'}`}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </div>
          </motion.button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;