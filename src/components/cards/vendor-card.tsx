"use client";

import * as React from "react";
import { ChevronRight, Phone, Mail, Globe, Instagram } from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import type { Vendor, VendorStatus, TaskCategory } from "@/types";

interface VendorCardProps {
  vendor: Vendor;
  onClick?: () => void;
  className?: string;
}

const statusConfig: Record<VendorStatus, { variant: "default" | "secondary" | "success" | "warning" | "muted"; label: string }> = {
  researching: { variant: "muted", label: "Researching" },
  contacted: { variant: "warning", label: "Contacted" },
  quoted: { variant: "secondary", label: "Quoted" },
  booked: { variant: "success", label: "Booked" },
  declined: { variant: "muted", label: "Declined" },
};

const categoryLabels: Record<TaskCategory, string> = {
  venue: "Venue",
  catering: "Catering",
  photography: "Photographer",
  videography: "Videographer",
  music: "Music",
  flowers: "Florist",
  attire: "Attire",
  beauty: "Beauty",
  stationery: "Stationery",
  transportation: "Transportation",
  accommodation: "Accommodation",
  decor: "Decor",
  rentals: "Rentals",
  officiant: "Officiant",
  legal: "Legal",
  honeymoon: "Honeymoon",
  gifts: "Gifts",
  other: "Other",
};

export function VendorCard({ vendor, onClick, className }: VendorCardProps) {
  const status = statusConfig[vendor.status];
  const price = vendor.final_price || vendor.quoted_price;
  
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
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-muted-foreground uppercase tracking-wide">
              {categoryLabels[vendor.category]}
            </span>
            <Badge variant={status.variant} className="text-xs py-0">
              {status.label}
            </Badge>
          </div>
          <h4 className="font-semibold text-foreground text-lg truncate">
            {vendor.name}
          </h4>
          {vendor.contact_name && (
            <p className="text-sm text-muted-foreground">{vendor.contact_name}</p>
          )}
        </div>
        <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
      </div>
      
      {price && (
        <div className="mb-3">
          <span className="text-lg font-semibold text-primary">
            {formatCurrency(price)}
          </span>
          {vendor.deposit_paid && (
            <span className="text-xs text-success ml-2">Deposit Paid</span>
          )}
        </div>
      )}
      
      <div className="flex items-center gap-3 text-muted-foreground">
        {vendor.phone && (
          <a
            href={`tel:${vendor.phone}`}
            onClick={(e) => e.stopPropagation()}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <Phone className="w-4 h-4" />
          </a>
        )}
        {vendor.email && (
          <a
            href={`mailto:${vendor.email}`}
            onClick={(e) => e.stopPropagation()}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <Mail className="w-4 h-4" />
          </a>
        )}
        {vendor.website && (
          <a
            href={vendor.website}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <Globe className="w-4 h-4" />
          </a>
        )}
        {vendor.instagram && (
          <a
            href={`https://instagram.com/${vendor.instagram.replace("@", "")}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <Instagram className="w-4 h-4" />
          </a>
        )}
        {vendor.contract_signed && (
          <Badge variant="success" className="text-xs py-0 ml-auto">
            Contract Signed
          </Badge>
        )}
      </div>
    </div>
  );
}
