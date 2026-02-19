"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import {
  BsCheckCircle,
  BsExclamationTriangle
} from 'react-icons/bs';

interface ContactFormData {
  email: string;
  name: string;
  message: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
}

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    if (!name.trim()) {
      toast.error('Please enter your name', {
        description: 'Name is required to send a message',
        icon: <BsExclamationTriangle className="w-4 h-4" />
      });
      return;
    }

    if (!email.trim()) {
      toast.error('Please enter your email address', {
        description: 'Email is required to reach back to you',
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

    if (!message.trim()) {
      toast.error('Please enter your message', {
        description: 'A message is required to contact me',
        icon: <BsExclamationTriangle className="w-4 h-4" />
      });
      return;
    }

    setIsLoading(true);

    try {
      const formData: ContactFormData = {
        email: email.trim(),
        name: name.trim(),
        message: message.trim()
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data: ApiResponse = await response.json();

      if (response.ok && data.success) {
        toast.success('Message sent!', {
          description: data.message || "Thank you for reaching out! I'll get back to you soon.",
          icon: <BsCheckCircle className="w-4 h-4" />,
          duration: 5000
        });

        // Reset form
        setEmail('');
        setName('');
        setMessage('');
      } else {
        throw new Error(data.message || 'Failed to send message');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Something went wrong';

      toast.error('Failed to send message', {
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
        Let&apos;s work together!
      </h3>
      <p className="text-muted-foreground mb-6">
        Have a project in mind or just want to say hi? I&apos;d love to hear from you.
      </p>

      <div className="flex flex-col gap-3 max-w-2xl mx-auto mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
            disabled={isLoading}
            required
          />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
            disabled={isLoading}
            required
          />
        </div>

        <textarea
          placeholder="How can I help you?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm min-h-[120px] resize-none"
          disabled={isLoading}
          required
        />

        <motion.button
          onClick={handleSubmit}
          className="w-full sm:w-auto sm:self-center sm:px-12 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
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
              <span>Sending...</span>
            </div>
          ) : (
            'Send Message'
          )}
        </motion.button>
      </div>

      <p className="text-xs text-muted-foreground mt-4">
        I’ll try to get back to you within 24 hours.
      </p>
    </motion.div>
  );
};

export default Newsletter;