"use client";
import React from "react";
import { motion } from "framer-motion";

const marqueeItems = [
  "Full-Stack Developer",
  "App Developer",
  "Gen AI Developer",
  "Frontend Developer",
  "Backend Developer",
  "Tech Freelancer",
];

const TechMarquee = () => {
  return (
    <div className="relative w-full h-[500px] overflow-hidden flex items-center justify-center bg-white dark:bg-background">
      {/* First Marquee - Blue (Crossing downwards) */}
      <div className="absolute w-full transform -rotate-6 z-10">
        <div className="relative w-full flex items-center h-32 bg-blue-500 dark:bg-blue-600">
          <div className="relative z-10 w-full overflow-hidden">
            <motion.div
              className="flex whitespace-nowrap py-4"
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
              {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, index) => (
                <span
                  key={index}
                  className="inline-block px-8 text-2xl md:text-3xl lg:text-4xl font-bold text-white transition-colors duration-300"
                >
                  {item}
                  <span className="mx-4 opacity-50">•</span>
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Second Marquee - Red (Crossing upwards) */}
      <div className="absolute w-full transform rotate-6 z-20">
        <div className="relative w-full flex items-center h-32 bg-red-500 dark:bg-red-600 border-y border-white/20">
          <div className="relative z-10 w-full overflow-hidden">
            <motion.div
              className="flex whitespace-nowrap py-4"
              animate={{ x: [-2000, 0] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 25,
                  ease: "linear",
                },
              }}
            >
              {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, index) => (
                <span
                  key={index}
                  className="inline-block px-8 text-2xl md:text-3xl lg:text-4xl font-bold text-white transition-colors duration-300"
                >
                  {item}
                  <span className="mx-4 opacity-50">•</span>
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechMarquee;
