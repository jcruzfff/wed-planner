"use client";

import * as React from "react";
import { ChevronRight } from "lucide-react";
import { cn, formatCurrency, calculatePercentage } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import type { TaskCategory } from "@/types";

interface BudgetCardProps {
  category: string;
  categoryType: TaskCategory;
  allocated: number;
  spent: number;
  onClick?: () => void;
  className?: string;
}

const categoryIcons: Record<TaskCategory, string> = {
  venue: "🏛️",
  catering: "🍽️",
  photography: "📸",
  videography: "🎬",
  music: "🎵",
  flowers: "💐",
  attire: "👗",
  beauty: "💄",
  stationery: "✉️",
  transportation: "🚗",
  accommodation: "🏨",
  decor: "✨",
  rentals: "🪑",
  officiant: "💒",
  legal: "📋",
  honeymoon: "✈️",
  gifts: "🎁",
  other: "📦",
};

export function BudgetCard({
  category,
  categoryType,
  allocated,
  spent,
  onClick,
  className,
}: BudgetCardProps) {
  const percentage = calculatePercentage(spent, allocated);
  const remaining = allocated - spent;
  const isOverBudget = spent > allocated;
  
  return (
    <div
      className={cn(
        "bg-card rounded-xl border border-border p-4 transition-all hover:shadow-md cursor-pointer active:scale-[0.98]",
        className
      )}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{categoryIcons[categoryType]}</span>
          <div>
            <h4 className="font-medium text-foreground">{category}</h4>
            <p className="text-sm text-muted-foreground">
              {formatCurrency(spent)} of {formatCurrency(allocated)}
            </p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-muted-foreground" />
      </div>
      
      <Progress
        value={Math.min(percentage, 100)}
        className="h-2"
        indicatorClassName={cn(
          isOverBudget ? "bg-error" : percentage > 80 ? "bg-warning" : "bg-primary"
        )}
      />
      
      <div className="flex justify-between items-center mt-2">
        <span className="text-xs text-muted-foreground">
          {percentage}% used
        </span>
        <span
          className={cn(
            "text-xs font-medium",
            isOverBudget ? "text-error" : "text-success"
          )}
        >
          {isOverBudget ? "-" : ""}
          {formatCurrency(Math.abs(remaining))} {isOverBudget ? "over" : "left"}
        </span>
      </div>
    </div>
  );
}
