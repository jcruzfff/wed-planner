"use client";

import { motion } from "framer-motion";
import { 
  Calendar, 
  DollarSign, 
  Users, 
  ChevronRight,
  CheckCircle2,
  Clock,
  AlertTriangle
} from "lucide-react";
import Link from "next/link";
import { PageContainer } from "@/components/layout/page-container";
import { Header } from "@/components/layout/header";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn, formatCurrency } from "@/lib/utils";

const planPillars = [
  {
    id: "timeline",
    title: "Timeline",
    subtitle: "Tasks & Checklist",
    href: "/plan/timeline",
    icon: Calendar,
    color: "bg-blue-500",
    stats: {
      completed: 12,
      total: 45,
      urgent: 3,
    },
  },
  {
    id: "budget",
    title: "Budget",
    subtitle: "Track expenses",
    href: "/plan/budget",
    icon: DollarSign,
    color: "bg-emerald-500",
    stats: {
      spent: 12500,
      total: 35000,
      onTrack: true,
    },
  },
  {
    id: "guests",
    title: "Guests",
    subtitle: "RSVPs & seating",
    href: "/plan/guests",
    icon: Users,
    color: "bg-purple-500",
    stats: {
      confirmed: 45,
      total: 120,
      pending: 28,
    },
  },
];

export default function PlanPage() {
  return (
    <>
      <Header title="Plan" />
      <PageContainer className="pt-4">
        {/* Overview Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Card className="bg-linear-to-br from-sage to-sage-dark border-0 text-white overflow-hidden">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-medium">Planning Progress</span>
              </div>
              <div className="flex items-end justify-between mb-3">
                <div>
                  <span className="text-4xl font-bold">27%</span>
                  <span className="text-white/70 ml-2">complete</span>
                </div>
                <Badge className="bg-white/20 text-white border-0">
                  On Track
                </Badge>
              </div>
              <Progress 
                value={27} 
                className="h-2 bg-white/20"
                indicatorClassName="bg-white"
              />
              <p className="text-sm text-white/70 mt-3">
                12 of 45 tasks completed • 220 days to go
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Plan Pillars */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4 mb-8"
        >
          <h2 className="text-lg font-semibold">Your Planning Hub</h2>
          
          {planPillars.map((pillar, index) => (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <Link href={pillar.href}>
                <Card className="hover:shadow-md transition-all active:scale-[0.98]">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className={cn("p-3 rounded-xl text-white", pillar.color)}>
                        <pillar.icon className="w-6 h-6" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-lg">{pillar.title}</h3>
                          <ChevronRight className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {pillar.subtitle}
                        </p>
                        
                        {/* Pillar-specific stats */}
                        {pillar.id === "timeline" && (
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1 text-sm">
                              <CheckCircle2 className="w-4 h-4 text-success" />
                              <span>{pillar.stats.completed}/{pillar.stats.total}</span>
                            </div>
                            {(pillar.stats.urgent ?? 0) > 0 && (
                              <div className="flex items-center gap-1 text-sm text-warning">
                                <AlertTriangle className="w-4 h-4" />
                                <span>{pillar.stats.urgent} urgent</span>
                              </div>
                            )}
                          </div>
                        )}
                        
                        {pillar.id === "budget" && (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span>{formatCurrency(pillar.stats.spent ?? 0)} spent</span>
                              <span className="text-muted-foreground">
                                of {formatCurrency(pillar.stats.total ?? 0)}
                              </span>
                            </div>
                            <Progress 
                              value={((pillar.stats.spent ?? 0) / (pillar.stats.total || 1)) * 100} 
                              className="h-1.5"
                            />
                          </div>
                        )}
                        
                        {pillar.id === "guests" && (
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1 text-sm">
                              <CheckCircle2 className="w-4 h-4 text-success" />
                              <span>{pillar.stats.confirmed} confirmed</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Clock className="w-4 h-4" />
                              <span>{pillar.stats.pending} pending</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-6"
        >
          <h2 className="text-lg font-semibold mb-3">More Planning Tools</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Moodboards", href: "/moodboard", icon: "🎨" },
              { label: "Vendors", href: "/explore", icon: "🏪" },
              { label: "Day-of Plan", href: "/day-of", icon: "📋" },
              { label: "Venue Details", href: "/venue", icon: "🏛️" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border hover:shadow-md transition-all active:scale-[0.98]"
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </div>
        </motion.div>
      </PageContainer>
    </>
  );
}
