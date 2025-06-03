"use client";

import * as React from "react";
import { Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export const DarkModeToggle = () => {
  const { setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      className="hover:bg-accent/10 h-9 w-9 rounded-full p-0"
      size="icon"
      onClick={() =>
        setTheme((prevMode) => (prevMode === "light" ? "dark" : "light"))
      }
    >
      <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <span className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0">
        🌙
      </span>

      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};
