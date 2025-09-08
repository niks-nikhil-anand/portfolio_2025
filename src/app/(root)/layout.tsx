// app/admin/layout.tsx
"use client";
import React, { ReactNode } from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

interface AdminLayoutProps {
  children: ReactNode;
}

const RootLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <>
     <div>
        <Navbar/>
        {children}
        <Footer/>
     </div>
    </>
  );
};

export default RootLayout;
