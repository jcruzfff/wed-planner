"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggleSimple } from "@/components/ui/theme-toggle";

interface HeaderProps {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  rightAction?: React.ReactNode;
  showThemeToggle?: boolean;
  transparent?: boolean;
  className?: string;
}

export function Header({
  title,
  subtitle,
  showBack = false,
  rightAction,
  showThemeToggle = false,
  transparent = false,
  className,
}: HeaderProps) {
  const router = useRouter();
  
  return (
    <header
      className={cn(
        "sticky top-0 z-40 flex items-center justify-between h-14 px-4",
        transparent ? "bg-transparent" : "glass border-b border-border/50",
        className
      )}
    >
      <div className="flex items-center gap-2 min-w-[60px]">
        {showBack && (
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => router.back()}
            className="rounded-full"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
        )}
      </div>
      
      <div className="flex-1 text-center">
        {title && (
          <h1 className="font-semibold text-foreground text-base leading-tight truncate">
            {title}
          </h1>
        )}
        {subtitle && (
          <p className="text-xs text-muted-foreground truncate">{subtitle}</p>
        )}
      </div>
      
      <div className="flex items-center gap-2 min-w-[60px] justify-end">
        {showThemeToggle && <ThemeToggleSimple />}
        {rightAction}
      </div>
    </header>
  );
}
