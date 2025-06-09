"use client";
import React from 'react';
import { motion } from 'framer-motion';

const marqueeItems = [
  'revolutionary products',
  'next-gen solutions',
  'product innovation',
  'market disruption',
  'product visionary',
  'game-changing products',
  'WAVEFORM',
  'product excellence',
  'cutting edge products',
  'future products',
  'breakthrough solutions',
  'product mastery'
];

const TechMarquee = () => {
  return (
    <div className="relative w-full h-64 overflow-hidden flex items-center transition-colors duration-300 bg-white dark:bg-background">
      
      {/* Single diagonal band */}
      <div className="absolute inset-0">
        <div 
          className="absolute w-full h-32 transform -skew-y-2 origin-top-left z-0 transition-colors duration-300 bg-blue-500 dark:bg-red-500"
          style={{ top: '30%' }}
        />
      </div>

      {/* Marquee content */}
      <div className="relative z-10 w-full overflow-hidden">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: [0, -2000] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 25,
              ease: "linear",
            },
          }}
        >
          {[...marqueeItems, ...marqueeItems].map((item, index) => (
            <span
              key={index}
              className="inline-block px-8 text-2xl md:text-3xl lg:text-4xl font-bold text-black dark:text-white shadow-md shadow-white dark:shadow-black transition-colors duration-300"
            >
              {item}
              <span className="mx-4">•</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* Gradient overlays for smooth edges */}
      <div className="absolute left-0 top-0 w-32 h-full z-20 transition-colors duration-300 bg-gradient-to-r from-white to-transparent dark:from-black" />
      <div className="absolute right-0 top-0 w-32 h-full z-20 transition-colors duration-300 bg-gradient-to-l from-white to-transparent dark:from-black" />
    </div>
  );
};

export default TechMarquee;
