"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Check, Calendar, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDateShort } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import type { TimelineTask, TaskCategory } from "@/types";

interface TaskCardProps {
  task: TimelineTask;
  onToggle?: () => void;
  onExpand?: () => void;
  expanded?: boolean;
  subTasks?: TimelineTask[];
  className?: string;
}

const categoryColors: Record<TaskCategory, string> = {
  venue: "bg-purple-100 text-purple-700",
  catering: "bg-orange-100 text-orange-700",
  photography: "bg-blue-100 text-blue-700",
  videography: "bg-indigo-100 text-indigo-700",
  music: "bg-pink-100 text-pink-700",
  flowers: "bg-rose-100 text-rose-700",
  attire: "bg-violet-100 text-violet-700",
  beauty: "bg-fuchsia-100 text-fuchsia-700",
  stationery: "bg-amber-100 text-amber-700",
  transportation: "bg-cyan-100 text-cyan-700",
  accommodation: "bg-teal-100 text-teal-700",
  decor: "bg-emerald-100 text-emerald-700",
  rentals: "bg-lime-100 text-lime-700",
  officiant: "bg-sky-100 text-sky-700",
  legal: "bg-slate-100 text-slate-700",
  honeymoon: "bg-yellow-100 text-yellow-700",
  gifts: "bg-red-100 text-red-700",
  other: "bg-gray-100 text-gray-700",
};

const categoryLabels: Record<TaskCategory, string> = {
  venue: "Venue",
  catering: "Catering",
  photography: "Photo",
  videography: "Video",
  music: "Music",
  flowers: "Flowers",
  attire: "Attire",
  beauty: "Beauty",
  stationery: "Stationery",
  transportation: "Transport",
  accommodation: "Lodging",
  decor: "Decor",
  rentals: "Rentals",
  officiant: "Officiant",
  legal: "Legal",
  honeymoon: "Honeymoon",
  gifts: "Gifts",
  other: "Other",
};

export function TaskCard({
  task,
  onToggle,
  onExpand,
  expanded = false,
  subTasks = [],
  className,
}: TaskCardProps) {
  const isOverdue = task.due_date && new Date(task.due_date) < new Date() && !task.completed;
  
  return (
    <div
      className={cn(
        "bg-card rounded-xl border border-border p-4 transition-all",
        task.completed && "opacity-60",
        className
      )}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <button
          onClick={onToggle}
          className={cn(
            "shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all mt-0.5",
            task.completed
              ? "bg-primary border-primary"
              : "border-gray-300 hover:border-primary"
          )}
        >
          <AnimatePresence>
            {task.completed && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h4
              className={cn(
                "font-medium text-foreground leading-tight",
                task.completed && "line-through text-muted-foreground"
              )}
            >
              {task.title}
            </h4>
            {subTasks.length > 0 && (
              <button
                onClick={onExpand}
                className="shrink-0 p-1 hover:bg-muted rounded-full transition-colors"
              >
                <ChevronRight
                  className={cn(
                    "w-4 h-4 text-muted-foreground transition-transform",
                    expanded && "rotate-90"
                  )}
                />
              </button>
            )}
          </div>
          
          {task.description && (
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {task.description}
            </p>
          )}
          
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <span
              className={cn(
                "text-xs px-2 py-0.5 rounded-full font-medium",
                categoryColors[task.category]
              )}
            >
              {categoryLabels[task.category]}
            </span>
            
            {task.due_date && (
              <span
                className={cn(
                  "flex items-center gap-1 text-xs",
                  isOverdue ? "text-error" : "text-muted-foreground"
                )}
              >
                {isOverdue ? (
                  <AlertCircle className="w-3 h-3" />
                ) : (
                  <Calendar className="w-3 h-3" />
                )}
                {formatDateShort(task.due_date)}
              </span>
            )}
            
            {task.priority === "high" && !task.completed && (
              <Badge variant="error" className="text-xs py-0">
                High Priority
              </Badge>
            )}
          </div>
        </div>
      </div>
      
      {/* Sub-tasks */}
      <AnimatePresence>
        {expanded && subTasks.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-3 ml-9 pl-3 border-l-2 border-muted space-y-2">
              {subTasks.map((subTask) => (
                <div
                  key={subTask.id}
                  className="flex items-center gap-2 text-sm"
                >
                  <div
                    className={cn(
                      "w-4 h-4 rounded border flex items-center justify-center",
                      subTask.completed
                        ? "bg-primary border-primary"
                        : "border-gray-300"
                    )}
                  >
                    {subTask.completed && (
                      <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                    )}
                  </div>
                  <span
                    className={cn(
                      subTask.completed && "line-through text-muted-foreground"
                    )}
                  >
                    {subTask.title}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
