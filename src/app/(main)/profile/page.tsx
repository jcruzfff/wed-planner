"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Heart, 
  Bell, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  Calendar,
  Share2,
  Download,
  Smartphone,
  Loader2,
  Shield,
  Settings
} from "lucide-react";
import Link from "next/link";
import { PageContainer } from "@/components/layout/page-container";
import { Header } from "@/components/layout/header";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useAuth } from "@/lib/hooks/use-auth";

const menuSections = [
  {
    title: "Wedding",
    items: [
      { icon: Calendar, label: "Wedding Details", href: "/settings/wedding" },
      { icon: Heart, label: "Partner Account", href: "/settings/partner", badge: "Linked" },
      { icon: Share2, label: "Share Planning", href: "/settings/share" },
    ],
  },
  {
    title: "App Settings",
    items: [
      { icon: Bell, label: "Notifications", href: "/settings/notifications" },
      { icon: Smartphone, label: "Install App", href: "/settings/install" },
    ],
  },
  {
    title: "Support",
    items: [
      { icon: HelpCircle, label: "Help Center", href: "/help" },
      { icon: Shield, label: "Privacy Policy", href: "/settings/privacy" },
      { icon: Download, label: "Export Data", href: "/export" },
    ],
  },
];

export default function ProfilePage() {
  const { signOut, user } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
      setIsSigningOut(false);
    }
  };

  return (
    <>
      <Header title="Profile" />
      <PageContainer className="pt-4">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="mb-6">
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop" />
                  <AvatarFallback className="text-lg bg-sage/10 text-sage">
                    SM
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold">Sarah Mitchell</h2>
                  <p className="text-sm text-muted-foreground">sarah@example.com</p>
                  <Badge variant="default" className="mt-2">
                    Premium Plan
                  </Badge>
                </div>
                <Button variant="ghost" size="icon">
                  <Settings className="w-5 h-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Wedding Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="mb-6 bg-linear-to-br from-rose-light/30 to-rose/20 border-rose/20">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-muted-foreground">Your Wedding</span>
                <Button variant="ghost" size="sm" className="text-primary h-8">
                  Edit
                </Button>
              </div>
              <h3 className="text-lg font-semibold font-(family-name:--font-playfair)">
                Erica & Jonathan
              </h3>
              <p className="text-sm text-muted-foreground">October 15, 2026 • Napa Valley, CA</p>
              <div className="flex gap-4 mt-3 text-sm">
                <div>
                  <span className="font-semibold">120</span>
                  <span className="text-muted-foreground"> guests</span>
                </div>
                <div>
                  <span className="font-semibold">$35k</span>
                  <span className="text-muted-foreground"> budget</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Theme Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <h3 className="text-sm font-medium text-muted-foreground mb-2 px-1">
            Appearance
          </h3>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Theme</span>
                <ThemeToggle />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Menu Sections */}
        {menuSections.map((section, sectionIndex) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + sectionIndex * 0.1 }}
            className="mb-6"
          >
            <h3 className="text-sm font-medium text-muted-foreground mb-2 px-1">
              {section.title}
            </h3>
            <Card>
              <CardContent className="p-0 divide-y divide-border">
                {section.items.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="w-full flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors text-left"
                  >
                    <div className="p-2 bg-muted rounded-lg">
                      <item.icon className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <span className="flex-1 font-medium">{item.label}</span>
                    {item.badge && (
                      <Badge variant="success" className="mr-2">
                        {item.badge}
                      </Badge>
                    )}
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </Link>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        ))}

        {/* Sign Out */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <Button 
            variant="ghost" 
            className="w-full justify-start text-error hover:text-error hover:bg-error/10"
            onClick={handleSignOut}
            disabled={isSigningOut}
          >
            {isSigningOut ? (
              <Loader2 className="w-5 h-5 mr-3 animate-spin" />
            ) : (
              <LogOut className="w-5 h-5 mr-3" />
            )}
            {isSigningOut ? "Signing out..." : "Sign Out"}
          </Button>
        </motion.div>

        {/* Version */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-xs text-muted-foreground pb-4"
        >
          <p>Wed Planner v1.0.0</p>
          <p className="mt-1">Made with ❤️ for your special day</p>
        </motion.div>
      </PageContainer>
    </>
  );
}
