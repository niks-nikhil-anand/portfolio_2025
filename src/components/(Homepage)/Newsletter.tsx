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
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="container mx-auto px-6 py-12 my-16 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 text-center border border-border"
    >
      <h3 className="text-2xl font-bold text-foreground mb-2">
        Never miss a post
      </h3>
      <p className="text-muted-foreground mb-6">
        Subscribe to get notified when I publish new articles
      </p>
      
      <div className="flex  gap-3 max-w-md mx-auto mb-4">
        <input
          type="text"
          placeholder="Your name (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          disabled={isLoading}
        />
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          disabled={isLoading}
          required
        />
     

      <motion.button
        onClick={handleSubmit}
        className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        whileHover={{ scale: isLoading ? 1 : 1.02 }}
        whileTap={{ scale: isLoading ? 1 : 0.98 }}
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex items-center space-x-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
            />
            <span>Subscribing...</span>
          </div>
        ) : (
          'Subscribe'
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