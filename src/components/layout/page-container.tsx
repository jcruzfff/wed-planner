"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
  noBottomPadding?: boolean;
}

export function PageContainer({
  children,
  className,
  noPadding = false,
  noBottomPadding = false,
}: PageContainerProps) {
  return (
    <main
      className={cn(
        "min-h-screen",
        !noPadding && "px-4",
        !noBottomPadding && "pb-safe",
        className
      )}
    >
      {children}
    </main>
  );
}
