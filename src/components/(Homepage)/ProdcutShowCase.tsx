"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Rocket, Mic, Sparkles } from "lucide-react";

const ProductShowcase = () => {
  return (
    <section className="relative bg-gradient-to-b from-background to-muted/50 py-16">
      <div className="container mx-auto px-6">
        {/* Flex Layout */}
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative flex-1 w-full"
          >
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1000&h=700&fit=crop"
                alt="IELTS Mate Preview"
                width={1000}
                height={700}
                className="object-cover w-full h-auto"
              />
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex-1 text-center lg:text-left"
          >
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-1.5 mb-4 text-sm font-medium text-blue-600 bg-blue-100 rounded-full dark:bg-blue-900/40 dark:text-blue-300">
              <Rocket className="w-4 h-4 mr-2" />
              🚀 Launching Soon
            </div>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              IELTS Mate
            </h2>

            <p className="text-lg text-muted-foreground mb-8 max-w-xl">
              Your AI-powered voice assistant for IELTS Speaking Test prep.  
              Practice with real-time simulations, instant feedback, and level-based learning powered by OpenAI + Vapi.
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {[
                {
                  icon: Mic,
                  title: "Real-time Speaking",
                  desc: "Simulate IELTS interviews with AI prompts.",
                },
                {
                  icon: Sparkles,
                  title: "Smart Feedback",
                  desc: "Get instant evaluation with improvement tips.",
                },
                {
                  icon: Rocket,
                  title: "Level-based Practice",
                  desc: "Choose Easy, Medium, or Hard difficulty.",
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="p-5 bg-card rounded-xl shadow-md border border-border hover:shadow-lg transition-all"
                >
                  <feature.icon className="w-6 h-6 text-blue-500 mb-2" />
                  <h4 className="font-semibold text-foreground mb-1">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Button size="lg" className="px-8 py-6 text-lg font-semibold shadow-lg">
              Join Waitlist
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
