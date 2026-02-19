import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full py-8 px-6 border-t border-border bg-background transition-colors duration-300">
      <div className="max-w-6xl mx-auto text-center space-y-2">
        <p className="text-sm font-medium text-foreground">
          © 2026 Nikhil Anand • Full Stack Engineer
        </p>
        <p className="text-xs text-muted-foreground italic">
          "A journey of a thousand light-years begins with a single step."
        </p>
      </div>
    </footer>
  );
};

export default Footer;