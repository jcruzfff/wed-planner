"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { 
  Plus, 
  Search, 
  Filter,
  CheckCircle2,
  Clock,
  Star
} from "lucide-react";
import Link from "next/link";
import { PageContainer } from "@/components/layout/page-container";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { VendorCard } from "@/components/cards/vendor-card";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription 
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { cn, generateId, formatCurrency } from "@/lib/utils";
import type { Vendor, VendorStatus, TaskCategory } from "@/types";

// Demo vendors data
const initialVendors: Vendor[] = [
  {
    id: "1",
    wedding_id: "demo",
    name: "The Garden Estate",
    category: "venue",
    contact_name: "Jennifer Morrison",
    email: "events@gardenestate.com",
    phone: "(555) 123-4567",
    website: "https://gardenestate.com",
    instagram: "@gardenestate",
    address: "1234 Vineyard Lane, Napa Valley, CA",
    status: "booked",
    quoted_price: 12000,
    final_price: 12000,
    deposit_amount: 4000,
    deposit_paid: true,
    contract_signed: true,
    contract_url: null,
    notes: "Beautiful garden venue with mountain views",
    rating: 5,
    created_at: "",
    updated_at: "",
  },
  {
    id: "2",
    wedding_id: "demo",
    name: "Emily Rose Photography",
    category: "photography",
    contact_name: "Emily Chen",
    email: "emily@emilyrosephoto.com",
    phone: "(555) 234-5678",
    website: "https://emilyrosephoto.com",
    instagram: "@emilyrosephoto",
    address: null,
    status: "booked",
    quoted_price: 4500,
    final_price: 4200,
    deposit_amount: 1500,
    deposit_paid: true,
    contract_signed: true,
    contract_url: null,
    notes: "Loved her portfolio! Great communication",
    rating: 5,
    created_at: "",
    updated_at: "",
  },
  {
    id: "3",
    wedding_id: "demo",
    name: "Bloom & Wild Florals",
    category: "flowers",
    contact_name: "Maria Santos",
    email: "hello@bloomwild.com",
    phone: "(555) 345-6789",
    website: "https://bloomwild.com",
    instagram: "@bloomwildflorals",
    address: null,
    status: "quoted",
    quoted_price: 3500,
    final_price: null,
    deposit_amount: null,
    deposit_paid: false,
    contract_signed: false,
    contract_url: null,
    notes: "Waiting on revised quote for smaller arrangements",
    rating: null,
    created_at: "",
    updated_at: "",
  },
  {
    id: "4",
    wedding_id: "demo",
    name: "Harmony Strings",
    category: "music",
    contact_name: "David Park",
    email: "booking@harmonystrings.com",
    phone: "(555) 456-7890",
    website: null,
    instagram: "@harmonystrings",
    address: null,
    status: "contacted",
    quoted_price: null,
    final_price: null,
    deposit_amount: null,
    deposit_paid: false,
    contract_signed: false,
    contract_url: null,
    notes: "String quartet for ceremony",
    rating: null,
    created_at: "",
    updated_at: "",
  },
  {
    id: "5",
    wedding_id: "demo",
    name: "Delicious Catering Co.",
    category: "catering",
    contact_name: "Chef Michael",
    email: "events@deliciouscatering.com",
    phone: "(555) 567-8901",
    website: "https://deliciouscatering.com",
    instagram: null,
    address: null,
    status: "researching",
    quoted_price: null,
    final_price: null,
    deposit_amount: null,
    deposit_paid: false,
    contract_signed: false,
    contract_url: null,
    notes: "Recommended by venue",
    rating: null,
    created_at: "",
    updated_at: "",
  },
];

const categoryOptions: { value: TaskCategory; label: string }[] = [
  { value: "venue", label: "Venue" },
  { value: "photography", label: "Photographer" },
  { value: "videography", label: "Videographer" },
  { value: "catering", label: "Catering" },
  { value: "flowers", label: "Florist" },
  { value: "music", label: "Music/DJ" },
  { value: "officiant", label: "Officiant" },
  { value: "beauty", label: "Hair & Makeup" },
  { value: "attire", label: "Attire" },
  { value: "stationery", label: "Stationery" },
  { value: "transportation", label: "Transportation" },
  { value: "rentals", label: "Rentals" },
  { value: "decor", label: "Decor" },
  { value: "other", label: "Other" },
];

const statusOptions: { value: VendorStatus; label: string }[] = [
  { value: "researching", label: "Researching" },
  { value: "contacted", label: "Contacted" },
  { value: "quoted", label: "Quoted" },
  { value: "booked", label: "Booked" },
  { value: "declined", label: "Declined" },
];

const filterOptions = [
  { id: "all", label: "All" },
  { id: "booked", label: "Booked" },
  { id: "quoted", label: "Quoted" },
  { id: "researching", label: "Researching" },
];

export default function VendorsPage() {
  const [vendors, setVendors] = useState(initialVendors);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  
  const [newVendor, setNewVendor] = useState({
    name: "",
    category: "other" as TaskCategory,
    contactName: "",
    email: "",
    phone: "",
    website: "",
    status: "researching" as VendorStatus,
  });

  const stats = useMemo(() => {
    const total = vendors.length;
    const booked = vendors.filter(v => v.status === "booked").length;
    const totalSpent = vendors
      .filter(v => v.status === "booked")
      .reduce((sum, v) => sum + (v.final_price || v.quoted_price || 0), 0);
    const depositssPaid = vendors
      .filter(v => v.deposit_paid)
      .reduce((sum, v) => sum + (v.deposit_amount || 0), 0);
    
    return { total, booked, totalSpent, depositssPaid };
  }, [vendors]);

  const filteredVendors = useMemo(() => {
    let result = vendors;
    
    // Apply filter
    if (filter !== "all") {
      result = result.filter(v => v.status === filter);
    }
    
    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(v =>
        v.name.toLowerCase().includes(query) ||
        v.contact_name?.toLowerCase().includes(query) ||
        v.category.toLowerCase().includes(query)
      );
    }
    
    // Sort: booked first, then by name
    return result.sort((a, b) => {
      if (a.status === "booked" && b.status !== "booked") return -1;
      if (a.status !== "booked" && b.status === "booked") return 1;
      return a.name.localeCompare(b.name);
    });
  }, [vendors, filter, searchQuery]);

  const addVendor = () => {
    const vendor: Vendor = {
      id: generateId(),
      wedding_id: "demo",
      name: newVendor.name,
      category: newVendor.category,
      contact_name: newVendor.contactName || null,
      email: newVendor.email || null,
      phone: newVendor.phone || null,
      website: newVendor.website || null,
      instagram: null,
      address: null,
      status: newVendor.status,
      quoted_price: null,
      final_price: null,
      deposit_amount: null,
      deposit_paid: false,
      contract_signed: false,
      contract_url: null,
      notes: null,
      rating: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    
    setVendors(prev => [vendor, ...prev]);
    setNewVendor({
      name: "",
      category: "other",
      contactName: "",
      email: "",
      phone: "",
      website: "",
      status: "researching",
    });
    setShowAddDialog(false);
  };

  return (
    <>
      <Header 
        title="Vendors" 
        showBack 
        rightAction={
          <Button size="icon-sm" onClick={() => setShowAddDialog(true)}>
            <Plus className="w-5 h-5" />
          </Button>
        }
      />
      <PageContainer className="pt-4">
        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 gap-3 mb-4"
        >
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-success" />
              <span className="text-sm text-muted-foreground">Booked</span>
            </div>
            <p className="text-2xl font-bold">{stats.booked}</p>
            <p className="text-xs text-muted-foreground">of {stats.total} vendors</p>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-4 h-4 text-warning" />
              <span className="text-sm text-muted-foreground">Committed</span>
            </div>
            <p className="text-2xl font-bold">{formatCurrency(stats.totalSpent)}</p>
            <p className="text-xs text-muted-foreground">
              {formatCurrency(stats.depositssPaid)} deposits paid
            </p>
          </Card>
        </motion.div>

        {/* Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-4"
        >
          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Booking Progress</span>
              <Badge variant="default">
                {stats.booked}/{stats.total} booked
              </Badge>
            </div>
            <Progress 
              value={(stats.booked / stats.total) * 100} 
              className="h-2"
            />
          </Card>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-4 space-y-3"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search vendors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 rounded-xl bg-muted border-0"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto hide-scrollbar -mx-4 px-4 pb-1">
            {filterOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setFilter(option.id)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                  filter === option.id
                    ? "bg-primary text-white"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Vendor List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-3 pb-4"
        >
          {filteredVendors.map((vendor, index) => (
            <motion.div
              key={vendor.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + index * 0.05 }}
            >
              <Link href={`/vendor/${vendor.id}`}>
                <VendorCard vendor={vendor} />
              </Link>
            </motion.div>
          ))}
          
          {filteredVendors.length === 0 && (
            <div className="text-center py-12">
              <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">
                {searchQuery 
                  ? "No vendors match your search" 
                  : "No vendors in this category"}
              </p>
            </div>
          )}
        </motion.div>

        {/* Add Vendor Dialog */}
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogContent className="max-w-md mx-4">
            <DialogHeader>
              <DialogTitle>Add Vendor</DialogTitle>
              <DialogDescription>
                Track a new vendor
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="name">Vendor Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Emily Rose Photography"
                  value={newVendor.name}
                  onChange={(e) => setNewVendor(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select
                    value={newVendor.category}
                    onValueChange={(value) => setNewVendor(prev => ({ ...prev, category: value as TaskCategory }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select
                    value={newVendor.status}
                    onValueChange={(value) => setNewVendor(prev => ({ ...prev, status: value as VendorStatus }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact">Contact Name</Label>
                <Input
                  id="contact"
                  placeholder="Primary contact"
                  value={newVendor.contactName}
                  onChange={(e) => setNewVendor(prev => ({ ...prev, contactName: e.target.value }))}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@vendor.com"
                    value={newVendor.email}
                    onChange={(e) => setNewVendor(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(555) 123-4567"
                    value={newVendor.phone}
                    onChange={(e) => setNewVendor(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
              </div>
              
              <Button 
                className="w-full" 
                onClick={addVendor}
                disabled={!newVendor.name.trim()}
              >
                Add Vendor
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </PageContainer>
    </>
  );
}
