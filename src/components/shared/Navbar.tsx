"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { BsMoonStars, BsSun, BsInstagram, BsTwitter } from "react-icons/bs";
import { BiUser, BiBriefcase, BiPackage } from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";
import Link from "next/link";
import { FaGithub } from "react-icons/fa6";

// Remove the empty interface and use React.FC without props type
const Navbar: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  const isDarkMode = theme === "dark";

  const toggleDarkMode = (): void => {
    setTheme(isDarkMode ? "light" : "dark");
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = (): void => {
      const scrollTop: number = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  // Dynamic navbar classes with proper background colors
  const navbarClasses: string = `relative container mx-auto mt-4 sm:mt-6 mb-4 px-5 sm:px-8 py-3 sm:py-4 transition-all duration-500 z-50 rounded-2xl sm:rounded-full border backdrop-blur-xl ${isDarkMode
    ? "bg-black/40 border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.5)]"
    : "bg-white/60 border-black/5 shadow-[0_8px_30px_rgb(0,0,0,0.08)]"
    }`;

  const navLinkClasses: string = `flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 hover:bg-accent ${isDarkMode ? "text-white" : "text-black"
    }`;

  const renderThemeToggle = () => (
    <motion.div
      className="relative flex items-center"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div
        className={`
          relative w-16 h-8 rounded-full cursor-pointer transition-all duration-300 ease-in-out
          ${isDarkMode
            ? "bg-black shadow-lg shadow-black/25 border border-gray-700"
            : "bg-white shadow-lg shadow-gray-300/50 border border-gray-200"
          }
        `}
        onClick={toggleDarkMode}
      >
        {/* Toggle Thumb */}
        <motion.div
          className={`
            absolute top-0.5 w-6 h-6 rounded-full shadow-md flex items-center justify-center
            ${isDarkMode
              ? "bg-white shadow-black/30"
              : "bg-black shadow-gray-400/50"
            }
          `}
          animate={{
            x: isDarkMode ? 32 : 2,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
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
            <BsSun
              className={`w-4 h-4 ${isDarkMode ? "text-gray-500" : "text-gray-400"
                }`}
            />
          </motion.div>
          <motion.div
            animate={{
              opacity: isDarkMode ? 0.6 : 0.4,
              scale: isDarkMode ? 1 : 0.8,
            }}
            transition={{ duration: 0.3 }}
          >
            <BsMoonStars
              className={`w-3 h-3 ${isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <nav className={navbarClasses}>
      <div className="mx-auto flex items-center justify-between w-full relative">

        {/* Left Side (Theme Toggle on Mobile, Social Icons on Desktop) */}
        <div className="flex items-center gap-4">
          {/* Mobile Theme Toggle */}
          <div className="sm:hidden">
            {renderThemeToggle()}
          </div>

          {/* Desktop Social Icons */}
          <div className="hidden sm:flex items-center gap-3">
            <Link href={"https://www.linkedin.com/in/nikhilanand86/"} className="p-2 rounded-full hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110">
              <BsInstagram className="w-5 h-5" />
            </Link>
            <Link href={"https://x.com/niks_developer"} className="p-2 rounded-full hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110">
              <BsTwitter className="w-5 h-5" />
            </Link>
            <Link href={"https://github.com/niks-nikhil-anand"} className="p-2 rounded-full hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110">
              <FaGithub className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Center/Right - Logo */}
        <div className="absolute right-0 sm:left-1/2 sm:right-auto sm:transform sm:-translate-x-1/2 flex items-center">
          <motion.a
            href="#home"
            className="flex items-center group relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Soft Glow behind logo on hover */}
            <div className="absolute inset-0 bg-primary/20 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <motion.div
              className="relative px-3 sm:px-4 py-1.5 rounded-full flex items-center justify-center font-bold text-base sm:text-xl md:text-2xl transition-all duration-300 border border-transparent group-hover:border-primary/20 bg-transparent text-center whitespace-nowrap sm:whitespace-normal"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/50 font-heading tracking-tight drop-shadow-sm">
                Cosmos Within Us ✨
              </span>
            </motion.div>
          </motion.a>
        </div>

        {/* Right Side - Theme Toggle (Desktop Only) */}
        <div className="hidden sm:flex items-center">
          {renderThemeToggle()}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
