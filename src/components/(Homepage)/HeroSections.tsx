"use client";
import React, { useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { BsArrowRight } from "react-icons/bs";
import Link from "next/link";

import ParticlesBackground from "@/components/shared/ParticlesBackground";




const HeroSection: React.FC = () => {
  return (
    <div className="relative min-h-[70vh] sm:h-[75vh] md:h-[80vh] flex items-center overflow-hidden bg-background text-foreground transition-colors duration-300 backdrop-blur-md border-border">
      {/* Particles Background */}
      <ParticlesBackground />



      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full py-20 px-4 sm:px-6 lg:px-8 text-center pt-32">
        <motion.div
          className="mx-auto flex flex-col items-center"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
        >
          {/* Top Badge */}
          <motion.div
            className="mb-6 sm:mb-8"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
            }}
          >
            <span className="px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-md shadow-[0_0_15px_rgba(var(--primary),0.2)]">
              ✨ Building Intelligent Web Solutions
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-none flex flex-row flex-wrap items-center justify-center gap-3 sm:gap-6 mb-6"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
            }}
          >
            <span className="block text-foreground font-heading">Nikhil</span>
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/50 font-heading drop-shadow-sm">
              Anand
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-muted-foreground whitespace-nowrap mb-10 max-w-3xl leading-relaxed"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
            }}
          >
            Full Stack Developer & Gen AI Enthusiast
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4 sm:px-0"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
            }}
          >
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 shadow-[0_0_20px_rgba(var(--primary),0.3)] hover:shadow-[0_0_30px_rgba(var(--primary),0.5)] text-base h-12 px-8 rounded-xl font-semibold w-full sm:w-auto"
            >
              Hire me
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border/50 bg-background/50 backdrop-blur-sm hover:bg-accent hover:text-accent-foreground transition-all duration-300 text-base h-12 px-8 rounded-xl font-semibold w-full sm:w-auto flex items-center justify-center gap-2 group"
              asChild
            >
              <Link href="#projects">
                View Projects
                <BsArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-foreground rounded-full flex justify-center transition-colors duration-300">
          <div className="w-0.5 sm:w-1 h-2 sm:h-3 bg-foreground rounded-full mt-2 transition-colors duration-300" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;