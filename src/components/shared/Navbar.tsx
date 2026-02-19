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
  const navbarClasses: string = `top-0 left-0 right-0 w-full px-4 sm:px-6 py-3 transition-all duration-300 z-50 border-b ${isScrolled
    ? `${isDarkMode
      ? "bg-black/95 backdrop-blur-md border-gray-800/50 shadow-lg shadow-black/10"
      : "bg-white/95 backdrop-blur-md border-gray-200/50 shadow-lg shadow-gray-900/10"
    }`
    : "bg-transparent border-transparent"
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
      <div className="mx-auto flex items-center justify-between">
        {/* Left Side */}
        <div className="flex items-center space-x-4">
          {/* Enhanced Dark Mode Toggle with Framer Motion */}
          <div className="md:hidden">
            {renderThemeToggle()}
          </div>

          {/* Social Media Icons */}
          <div className="hidden sm:flex items-center space-x-1 gap-5">
            <Link href={"https://www.linkedin.com/in/nikhilanand86/"}>
              <BsInstagram className="w-4 h-4" />
            </Link>
            <Link href={"https://x.com/niks_developer"}>
              <BsTwitter className="w-4 h-4" />
            </Link>
            <Link href={"https://github.com/niks-nikhil-anand"}>
              <FaGithub className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Logo - Centered on Desktop, Right on Mobile */}
        <div className="absolute right-4 md:left-1/2 md:right-auto md:transform md:-translate-x-1/2">
          <motion.a
            href="#home"
            className="flex items-center space-x-2 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className={`w-16 h-7 rounded-3xl  flex items-center justify-center font-bold text-lg transition-all duration-300 bg-primary text-primary-foreground group-hover:bg-primary/90 shadow-lg`}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              Niks
            </motion.div>
          </motion.a>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-2">
            {renderThemeToggle()}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
