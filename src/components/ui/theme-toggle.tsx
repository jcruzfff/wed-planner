"use client";

import { useState, useEffect } from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "@/lib/hooks/use-theme";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export function ThemeToggle({ className, showLabel = false }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const options = [
    { value: "light" as const, icon: Sun, label: "Light" },
    { value: "dark" as const, icon: Moon, label: "Dark" },
    { value: "system" as const, icon: Monitor, label: "System" },
  ];

  // Render placeholder during SSR to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className={cn("flex items-center gap-1 p-1 bg-muted rounded-full h-10", className)}>
        <div className="px-3 py-2 rounded-full bg-card w-10 h-8" />
        <div className="px-3 py-2 w-10 h-8" />
        <div className="px-3 py-2 w-10 h-8" />
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-1 p-1 bg-muted rounded-full", className)}>
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => setTheme(option.value)}
          className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-all",
            theme === option.value
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <option.icon className="w-4 h-4" />
          {showLabel && <span>{option.label}</span>}
        </button>
      ))}
    </div>
  );
}

export function ThemeToggleSimple({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  if (!mounted) {
    return (
      <div className={cn("p-2 rounded-full bg-muted w-9 h-9", className)} />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors",
        className
      )}
      aria-label="Toggle theme"
    >
      {resolvedTheme === "light" ? (
        <Moon className="w-5 h-5" />
      ) : (
        <Sun className="w-5 h-5" />
      )}
    </button>
  );
}
