"use client";
import React from 'react';
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { BsArrowRight, BsDiagram3 } from "react-icons/bs";
import ParticlesBackground from "@/components/shared/ParticlesBackground";

const RoadmapPage = () => {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
      {/* Background with particles */}
      <ParticlesBackground />
      
      <div className="relative z-10 container mx-auto px-4 pt-32 pb-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-6"
          >
            <Badge variant="secondary" className="px-4 py-1.5 text-sm font-medium border-primary/20 bg-primary/5 text-primary shadow-[0_0_15px_rgba(var(--primary),0.1)]">
              ✨ Learning Paths
            </Badge>
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Strategic <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/50">Roadmaps</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Deep-dive learning paths curated for mastering complex technical domains. 
            Each roadmap provides a step-by-step journey from foundations to advanced mastery.
          </p>
        </motion.div>

        {/* Roadmaps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* System Design Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link href="/html/system-design-roadmap.html" className="group block h-full">
              <Card className="h-full border-border/50 bg-background/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(var(--primary),0.1)] overflow-hidden flex flex-col group-hover:-translate-y-1">
                <CardHeader className="relative pb-0">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                    <BsDiagram3 className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-2xl font-bold">System Design Expert</CardTitle>
                  <CardDescription className="text-muted-foreground mt-2 line-clamp-3">
                    A comprehensive guide to designing high-scale distributed systems. Covers HTTP, API Paradigms, DB Scaling, CAP Theorem, and classic architecture patterns.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow pt-6">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-[10px] uppercase tracking-wider font-semibold opacity-80">Scalability</Badge>
                    <Badge variant="outline" className="text-[10px] uppercase tracking-wider font-semibold opacity-80">Distributed Systems</Badge>
                    <Badge variant="outline" className="text-[10px] uppercase tracking-wider font-semibold opacity-80">Architecture</Badge>
                  </div>
                </CardContent>
                <CardFooter className="pt-0 pb-6 px-6">
                  <Button variant="ghost" className="w-full justify-between group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 border border-transparent group-hover:border-primary">
                    Explore Roadmap
                    <BsArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RoadmapPage;