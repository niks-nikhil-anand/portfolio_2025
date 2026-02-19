"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import {
  BsCheckCircle,
  BsExclamationTriangle
} from 'react-icons/bs';

interface NewsletterFormData {
  email: string;
  name?: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
}

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    if (!email.trim()) {
      toast.error('Please enter your email address', {
        description: 'Email is required to subscribe to the newsletter',
        icon: <BsExclamationTriangle className="w-4 h-4" />
      });
      return;
    }

    if (!validateEmail(email)) {
      toast.error('Invalid email address', {
        description: 'Please enter a valid email address',
        icon: <BsExclamationTriangle className="w-4 h-4" />
      });
      return;
    }

    setIsLoading(true);

    try {
      const formData: NewsletterFormData = {
        email: email.trim(),
        name: name.trim() || undefined
      };

      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data: ApiResponse = await response.json();

      if (response.ok && data.success) {
        toast.success('Successfully subscribed!', {
          description: data.message || 'Welcome to the newsletter! Check your email for confirmation.',
          icon: <BsCheckCircle className="w-4 h-4" />,
          duration: 5000
        });

        // Reset form
        setEmail('');
        setName('');
      } else {
        throw new Error(data.message || 'Subscription failed');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Something went wrong';

      toast.error('Subscription failed', {
        description: errorMessage,
        icon: <BsExclamationTriangle className="w-4 h-4" />,
        action: {
          label: 'Try again',
          onClick: () => handleSubmit()
        }
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="container mx-auto px-4 sm:px-6 py-12 my-16 bg-gradient-to-br from-primary/5 via-background to-secondary/5 rounded-3xl p-6 sm:p-12 text-center border border-border/50 shadow-sm"
    >
      <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 font-heading">
        Never miss a post
      </h3>
      <p className="text-muted-foreground mb-6">
        Subscribe to get notified when I publish new articles
      </p>

      <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto mb-6">
        <input
          type="text"
          placeholder="Your name (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
          disabled={isLoading}
        />
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-[1.5] px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
          disabled={isLoading}
          required
        />

        <motion.button
          onClick={handleSubmit}
          className="sm:px-8 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          whileHover={{ scale: isLoading ? 1 : 1.02 }}
          whileTap={{ scale: isLoading ? 1 : 0.98 }}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
              />
              <span>Subscribing...</span>
            </div>
          ) : (
            'Subscribe Now'
          )}
        </motion.button>
      </div>

      <p className="text-xs text-muted-foreground mt-4">
        We respect your privacy and will never share your email.
      </p>
    </motion.div>
  );
};

export default Newsletter;