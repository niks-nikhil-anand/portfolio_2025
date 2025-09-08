"use client";

import React from "react";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  Layout,
  TrendingUp,
  FolderOpen,
  FileText,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarAdminProps {
  className?: string;
}

const handleLogout = async () => {
  try {
    console.log("Logging out...");

    // Call the logout API
    const response = await fetch("/api/auth/log-out", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log("✅ Logout successful:", data.message);
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "/login";
    } else {
      const errorData = await response.json();
      console.error("❌ Logout failed:", errorData.message);
    }
  } catch (error) {
    console.error("❌ Logout error:", error);
  }
};

const SidebarAdmin: React.FC<SidebarAdminProps> = ({ className }) => {
  const menuItems = [
    { icon: Layout, label: "Dashboard", href: "/dashboard" },
    { icon: BarChart3, label: "Analytics", href: "/analytics" },
    { icon: TrendingUp, label: "Traffics", href: "/traffics" },
    { icon: FolderOpen, label: "Projects", href: "/projects" },
    { icon: FileText, label: "Blogs", href: "/blogs" },
  ];

  return (
    <aside
      className={cn(
        "w-64 h-screen bg-white dark:bg-black border-r border-gray-200 dark:border-gray-800 flex flex-col",
        className
      )}
    >
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-xl font-semibold text-black dark:text-white">
          Admin Panel
        </h2>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <li key={index}>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 cursor-pointer"
                >
                  <Icon className="mr-3 h-4 w-4" />
                  {item.label}
                </Button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mx-4 my-3">
        <div className="bg-yellow-200 dark:bg-yellow-800/40 p-3 rounded-md shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-t-4 border-yellow-400 dark:border-yellow-600">
          <p className="text-sm text-yellow-900 dark:text-yellow-100 font-medium italic text-center">
            ☕ &quot;One day, I&apos;ll make your annual salary. Before my
            coffee gets cold.&quot;
          </p>
        </div>
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-800 mt-auto">
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="w-full justify-start text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-700 dark:hover:text-red-300 cursor-pointer"
        >
          <LogOut className="mr-3 h-4 w-4" />
          Logout
        </Button>
      </div>
    </aside>
  );
};

export default SidebarAdmin;
