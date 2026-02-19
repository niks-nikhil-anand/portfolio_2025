"use client";
import React, { useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  originalY: number;
  waveOffset: number;
  waveSpeed: number;
}

const ParticlesBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const timeRef = useRef<number>(0);

  const getParticleCount = useCallback((): number => {
    if (typeof window === "undefined") return 150;

    const width = window.innerWidth;
    const height = window.innerHeight;
    const area = width * height;

    // Base particle count on screen size
    if (width < 640) return Math.floor(area / 8000); // Mobile
    if (width < 1024) return Math.floor(area / 6000); // Tablet
    return Math.floor(area / 4000); // Desktop
  }, []);

  const initParticles = useCallback(
    (canvas: HTMLCanvasElement): void => {
      const particleCount = getParticleCount();
      particlesRef.current = [];

      for (let i = 0; i < particleCount; i++) {
        const y = Math.random() * canvas.height;
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: y,
          originalY: y,
          vx: (Math.random() - 0.5) * 0.5, // Slower horizontal movement
          vy: (Math.random() - 0.5) * 0.3, // Slower vertical movement
          size: Math.random() * 1.5 + 0.5, // Smaller particles (0.5-2px)
          waveOffset: Math.random() * Math.PI * 2,
          waveSpeed: Math.random() * 0.02 + 0.01, // Wave speed variation
        });
      }
    },
    [getParticleCount]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = (): void => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initParticles(canvas);
    };

    // Function to get current theme colors
    const getThemeColors = () => {
      const isDark = document.documentElement.classList.contains('dark');
      return {
        background: isDark ? '#000000' : '#ffffff',
        particle: isDark ? '#ffffff' : '#000000'
      };
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const animate = (): void => {
      timeRef.current += 0.016; // Roughly 60fps time increment

      const colors = getThemeColors();
      ctx.fillStyle = colors.background;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle) => {
        // Update horizontal position
        particle.x += particle.vx;

        // Create wavy vertical movement
        const waveAmplitude = 20; // Height of the wave
        particle.y =
          particle.originalY +
          Math.sin(timeRef.current * particle.waveSpeed + particle.waveOffset) *
          waveAmplitude;

        // Update original Y position slowly
        particle.originalY += particle.vy;

        // Boundary collision - wrap around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.originalY < 0) particle.originalY = canvas.height;
        if (particle.originalY > canvas.height) particle.originalY = 0;

        // Draw circular particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = colors.particle;
        ctx.globalAlpha = 0.4; // More subtle opacity
        ctx.fill();
        ctx.closePath();
      });

      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Listen for theme changes
    const observer = new MutationObserver(() => {
      // Animation will pick up theme changes automatically
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      observer.disconnect();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "none" }}
    />
  );
};



const HeroSection: React.FC = () => {
  return (
    <div className="relative min-h-[70vh] sm:h-[75vh] md:h-[80vh] flex items-center overflow-hidden bg-background text-foreground transition-colors duration-300 backdrop-blur-md border-border">
      {/* Particles Background */}
      <ParticlesBackground />



      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full py-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="mx-auto space-y-6 sm:space-y-8 lg:space-y-12">
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight leading-none flex flex-row flex-wrap items-center justify-center gap-2 sm:gap-6">
            <span className="block text-foreground font-heading">Nikhil</span>
            <span className="block text-foreground font-heading">Anand</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-medium text-muted-foreground whitespace-nowrap">
            Full Stack Developer
          </p>

          {/* Optional CTA Button */}
          <div className="pt-4">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Hire me
            </Button>
          </div>
        </div>
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