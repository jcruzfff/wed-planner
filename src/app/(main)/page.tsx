"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Heart, 
  Calendar, 
  DollarSign, 
  Users, 
  Store,
  ChevronRight,
  CheckCircle2,
  Clock
} from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useWeddingStore } from "@/lib/store/wedding-store";
import { daysUntil, formatCurrency, formatDate } from "@/lib/utils";

export default function HomePage() {
  const { wedding } = useWeddingStore();
  
  // Demo wedding data
  const weddingDate = new Date("2026-10-15");
  const daysLeft = daysUntil(weddingDate);
  const coupleNames = wedding?.partner1_name && wedding?.partner2_name 
    ? `${wedding.partner1_name} & ${wedding.partner2_name}`
    : "Erica & Jonathan";
  
  // Stats
  const totalBudget = 35000;
  const spentBudget = 12500;
  const budgetPercentage = Math.round((spentBudget / totalBudget) * 100);
  const confirmedGuests = 45;
  const totalGuests = 120;
  const guestPercentage = Math.round((confirmedGuests / totalGuests) * 100);
  const completedTasks = 12;
  const totalTasks = 45;
  const taskPercentage = Math.round((completedTasks / totalTasks) * 100);
  const bookedVendors = 3;
  const totalVendors = 8;

  const planningItems = [
    {
      title: "Timeline",
      description: "Tasks & checklist",
      href: "/plan/timeline",
      icon: Calendar,
      stat: `${completedTasks}/${totalTasks} completed`,
      progress: taskPercentage,
    },
    {
      title: "Budget",
      description: "Track expenses",
      href: "/plan/budget",
      icon: DollarSign,
      stat: `${formatCurrency(spentBudget)} of ${formatCurrency(totalBudget)}`,
      progress: budgetPercentage,
    },
    {
      title: "Guests",
      description: "RSVPs & seating",
      href: "/plan/guests",
      icon: Users,
      stat: `${confirmedGuests}/${totalGuests} confirmed`,
      progress: guestPercentage,
    },
    {
      title: "Vendors",
      description: "Manage bookings",
      href: "/vendors",
      icon: Store,
      stat: `${bookedVendors}/${totalVendors} booked`,
      progress: Math.round((bookedVendors / totalVendors) * 100),
    },
  ];

  return (
    <PageContainer className="pt-4">
      {/* Countdown Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Heart className="w-4 h-4 text-rose fill-rose" />
            <span className="text-sm text-muted-foreground">
              {formatDate(weddingDate)}
            </span>
          </div>
          <h1 className="text-2xl font-semibold font-(family-name:--font-playfair) mb-2">
            {coupleNames}
          </h1>
          <div className="flex items-baseline justify-center gap-2">
            <span className="text-5xl font-bold text-foreground">{daysLeft}</span>
            <span className="text-muted-foreground">days to go</span>
          </div>
        </div>
      </motion.div>

      {/* Planning Hub */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">
          Planning Hub
        </h2>
        <div className="space-y-3">
          {planningItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + index * 0.05 }}
            >
              <Link href={item.href}>
                <Card className="hover:shadow-md transition-shadow active:scale-[0.99]">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="shrink-0 w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold">{item.title}</h3>
                          <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {item.stat}
                        </p>
                        <Progress value={item.progress} className="h-1.5" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Quick Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-6"
      >
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">
          More Tools
        </h2>
        <Link href="/day-of">
          <Card className="hover:shadow-md transition-shadow active:scale-[0.99]">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
                <Clock className="w-4 h-4 text-foreground" />
              </div>
              <div className="flex-1">
                <span className="font-medium text-sm">Day-of Plan</span>
                <p className="text-xs text-muted-foreground">Run of show & vendor contacts</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </CardContent>
          </Card>
        </Link>
      </motion.div>

      {/* Next Up */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Next Up
          </h2>
          <Link 
            href="/plan/timeline" 
            className="text-sm text-primary font-medium hover:underline"
          >
            View all
          </Link>
        </div>
        <Card>
          <CardContent className="p-0 divide-y divide-border">
            {[
              { title: "Book your venue", due: "Due in 7 days", done: false },
              { title: "Create guest list draft", due: "Due in 14 days", done: false },
              { title: "Research photographers", due: "Completed", done: true },
            ].map((task, index) => (
              <div 
                key={index}
                className="flex items-center gap-3 p-4"
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  task.done 
                    ? "bg-primary border-primary" 
                    : "border-border"
                }`}>
                  {task.done && <CheckCircle2 className="w-4 h-4 text-primary-foreground" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`font-medium ${task.done ? "line-through text-muted-foreground" : ""}`}>
                    {task.title}
                  </p>
                  <p className="text-sm text-muted-foreground">{task.due}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </PageContainer>
  );
}
