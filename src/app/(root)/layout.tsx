// app/admin/layout.tsx
"use client";
import React, { ReactNode } from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import Chatbot from "@/components/shared/Chatbot";

interface AdminLayoutProps {
  children: ReactNode;
}

const RootLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <>
      <div>
        <Navbar />
        {children}
        <Footer />
        <Chatbot />
      </div>
    </>
  );
};

export default RootLayout;
