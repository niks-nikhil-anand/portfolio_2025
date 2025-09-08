// components/(Dashboard)/Shared/NavbarAdmin.tsx
"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Moon, Sun, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

interface NavbarAdminProps {
  className?: string;
  onToggleSidebar?: () => void;
}

const NavbarAdmin: React.FC<NavbarAdminProps> = ({
  className,
  onToggleSidebar,
}) => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <nav
      className={cn(
        "h-16 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6",
        className
      )}
    >
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleSidebar}
          className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 md:hidden"
        >
          <Menu className="h-4 w-4" />
        </Button>

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
          🌠 Nikhil Anand - Portfolio Universe{" "}
        </h1>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleTheme}
          className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900"
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    </nav>
  );
};

export default NavbarAdmin;
