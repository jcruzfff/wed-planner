"use client";

import * as React from "react";
import { ChevronRight, Check, X, Clock, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { Guest, RSVPStatus } from "@/types";
import { getInitials } from "@/lib/utils";

interface GuestRowProps {
  guest: Guest;
  onClick?: () => void;
  className?: string;
}

const rsvpConfig: Record<RSVPStatus, { icon: React.ReactNode; variant: "default" | "success" | "error" | "warning" | "muted"; label: string }> = {
  pending: {
    icon: <Clock className="w-3 h-3" />,
    variant: "muted",
    label: "Pending",
  },
  invited: {
    icon: <Clock className="w-3 h-3" />,
    variant: "warning",
    label: "Invited",
  },
  confirmed: {
    icon: <Check className="w-3 h-3" />,
    variant: "success",
    label: "Confirmed",
  },
  declined: {
    icon: <X className="w-3 h-3" />,
    variant: "error",
    label: "Declined",
  },
  maybe: {
    icon: <HelpCircle className="w-3 h-3" />,
    variant: "warning",
    label: "Maybe",
  },
};

export function GuestRow({ guest, onClick, className }: GuestRowProps) {
  const fullName = `${guest.first_name} ${guest.last_name}`;
  const rsvp = rsvpConfig[guest.rsvp_status];
  
  return (
    <div
      className={cn(
        "flex items-center gap-3 p-3 bg-card rounded-xl border border-border transition-all hover:shadow-sm cursor-pointer active:scale-[0.99]",
        className
      )}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <Avatar className="w-10 h-10">
        <AvatarFallback className="bg-sage/10 text-sage text-sm font-medium">
          {getInitials(fullName)}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h4 className="font-medium text-foreground truncate">{fullName}</h4>
          {guest.plus_one_allowed && guest.plus_one_name && (
            <span className="text-xs text-muted-foreground">+1</span>
          )}
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          {guest.meal_choice && (
            <span className="text-xs text-muted-foreground">
              {guest.meal_choice}
            </span>
          )}
          {guest.dietary_restrictions && (
            <span className="text-xs text-muted-foreground">
              • {guest.dietary_restrictions}
            </span>
          )}
        </div>
      </div>
      
      <Badge variant={rsvp.variant} className="gap-1 shrink-0">
        {rsvp.icon}
        {rsvp.label}
      </Badge>
      
      <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
    </div>
  );
}
