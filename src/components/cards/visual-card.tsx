"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface VisualCardProps {
  title: string;
  subtitle?: string;
  imageUrl?: string;
  badge?: string;
  badgeVariant?: "default" | "secondary" | "success" | "warning" | "error";
  onClick?: () => void;
  aspectRatio?: "square" | "video" | "portrait";
  size?: "sm" | "md" | "lg";
  className?: string;
  children?: React.ReactNode;
}

export function VisualCard({
  title,
  subtitle,
  imageUrl,
  badge,
  badgeVariant = "default",
  onClick,
  aspectRatio = "video",
  size = "md",
  className,
  children,
}: VisualCardProps) {
  const aspectRatioClass = {
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[3/4]",
  }[aspectRatio];

  const sizeClass = {
    sm: "min-w-[160px]",
    md: "min-w-[240px]",
    lg: "min-w-[300px]",
  }[size];

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-muted cursor-pointer transition-all duration-300 hover:shadow-lg active:scale-[0.98]",
        aspectRatioClass,
        sizeClass,
        className
      )}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      ) : (
        <div className="absolute inset-0 bg-linear-to-br from-sage-light to-sage" />
      )}
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 gradient-overlay" />
      
      {/* Badge */}
      {badge && (
        <div className="absolute top-3 left-3">
          <Badge variant={badgeVariant} className="shadow-sm">
            {badge}
          </Badge>
        </div>
      )}
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="text-white font-semibold text-lg leading-tight">
          {title}
        </h3>
        {subtitle && (
          <p className="text-white/80 text-sm mt-1">{subtitle}</p>
        )}
        {children}
      </div>
    </div>
  );
}
