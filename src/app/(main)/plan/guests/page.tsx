"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { 
  Plus, 
  Search, 
  Users, 
  Check, 
  Clock, 
  Mail,
  Share2,
  UserPlus,
  Utensils
} from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { GuestRow } from "@/components/cards/guest-row";
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
import { Switch } from "@/components/ui/switch";
import { cn, generateId } from "@/lib/utils";
import type { Guest, GuestRelation } from "@/types";

// Demo guests data
const initialGuests: Guest[] = [
  { id: "1", wedding_id: "demo", household_id: null, first_name: "Emma", last_name: "Johnson", email: "emma@example.com", phone: null, relation: "family", side: "partner1", rsvp_status: "confirmed", rsvp_code: "ABC123", meal_choice: "Chicken", dietary_restrictions: null, plus_one_allowed: true, plus_one_name: "David Johnson", table_id: null, notes: null, created_at: "", updated_at: "" },
  { id: "2", wedding_id: "demo", household_id: null, first_name: "Michael", last_name: "Chen", email: "michael@example.com", phone: null, relation: "friend", side: "partner1", rsvp_status: "confirmed", rsvp_code: "DEF456", meal_choice: "Fish", dietary_restrictions: "Gluten-free", plus_one_allowed: true, plus_one_name: null, table_id: null, notes: null, created_at: "", updated_at: "" },
  { id: "3", wedding_id: "demo", household_id: null, first_name: "Sarah", last_name: "Williams", email: "sarah@example.com", phone: null, relation: "friend", side: "partner2", rsvp_status: "pending", rsvp_code: "GHI789", meal_choice: null, dietary_restrictions: null, plus_one_allowed: false, plus_one_name: null, table_id: null, notes: null, created_at: "", updated_at: "" },
  { id: "4", wedding_id: "demo", household_id: null, first_name: "James", last_name: "Brown", email: "james@example.com", phone: null, relation: "coworker", side: "partner1", rsvp_status: "declined", rsvp_code: "JKL012", meal_choice: null, dietary_restrictions: null, plus_one_allowed: false, plus_one_name: null, table_id: null, notes: null, created_at: "", updated_at: "" },
  { id: "5", wedding_id: "demo", household_id: null, first_name: "Lisa", last_name: "Davis", email: "lisa@example.com", phone: null, relation: "partner_family", side: "partner2", rsvp_status: "confirmed", rsvp_code: "MNO345", meal_choice: "Vegetarian", dietary_restrictions: "Vegetarian", plus_one_allowed: true, plus_one_name: "Tom Davis", table_id: null, notes: null, created_at: "", updated_at: "" },
  { id: "6", wedding_id: "demo", household_id: null, first_name: "Robert", last_name: "Miller", email: "robert@example.com", phone: null, relation: "family", side: "partner1", rsvp_status: "invited", rsvp_code: "PQR678", meal_choice: null, dietary_restrictions: null, plus_one_allowed: true, plus_one_name: null, table_id: null, notes: null, created_at: "", updated_at: "" },
  { id: "7", wedding_id: "demo", household_id: null, first_name: "Jennifer", last_name: "Garcia", email: "jennifer@example.com", phone: null, relation: "friend", side: "partner2", rsvp_status: "confirmed", rsvp_code: "STU901", meal_choice: "Beef", dietary_restrictions: null, plus_one_allowed: false, plus_one_name: null, table_id: null, notes: null, created_at: "", updated_at: "" },
  { id: "8", wedding_id: "demo", household_id: null, first_name: "William", last_name: "Martinez", email: null, phone: null, relation: "partner_friend", side: "partner2", rsvp_status: "maybe", rsvp_code: "VWX234", meal_choice: null, dietary_restrictions: null, plus_one_allowed: false, plus_one_name: null, table_id: null, notes: null, created_at: "", updated_at: "" },
];

const filterOptions = [
  { id: "all", label: "All" },
  { id: "confirmed", label: "Confirmed" },
  { id: "pending", label: "Pending" },
  { id: "declined", label: "Declined" },
];

const relationOptions: { value: GuestRelation; label: string }[] = [
  { value: "family", label: "Family" },
  { value: "partner_family", label: "Partner's Family" },
  { value: "friend", label: "Friend" },
  { value: "partner_friend", label: "Partner's Friend" },
  { value: "coworker", label: "Coworker" },
  { value: "other", label: "Other" },
];

export default function GuestsPage() {
  const [guests, setGuests] = useState(initialGuests);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
  
  // New guest form state
  const [newGuest, setNewGuest] = useState({
    firstName: "",
    lastName: "",
    email: "",
    relation: "friend" as GuestRelation,
    side: "partner1" as "partner1" | "partner2" | "both",
    plusOneAllowed: false,
  });

  const stats = useMemo(() => {
    const total = guests.length;
    const confirmed = guests.filter(g => g.rsvp_status === "confirmed").length;
    const declined = guests.filter(g => g.rsvp_status === "declined").length;
    const pending = guests.filter(g => 
      g.rsvp_status === "pending" || g.rsvp_status === "invited" || g.rsvp_status === "maybe"
    ).length;
    const plusOnes = guests.filter(g => g.plus_one_name).length;
    const attending = confirmed + plusOnes;
    
    return { total, confirmed, declined, pending, plusOnes, attending };
  }, [guests]);

  const filteredGuests = useMemo(() => {
    let result = guests;
    
    // Apply filter
    switch (filter) {
      case "confirmed":
        result = result.filter(g => g.rsvp_status === "confirmed");
        break;
      case "pending":
        result = result.filter(g => 
          g.rsvp_status === "pending" || g.rsvp_status === "invited" || g.rsvp_status === "maybe"
        );
        break;
      case "declined":
        result = result.filter(g => g.rsvp_status === "declined");
        break;
    }
    
    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(g =>
        `${g.first_name} ${g.last_name}`.toLowerCase().includes(query) ||
        g.email?.toLowerCase().includes(query)
      );
    }
    
    // Sort alphabetically
    return result.sort((a, b) => 
      `${a.last_name} ${a.first_name}`.localeCompare(`${b.last_name} ${b.first_name}`)
    );
  }, [guests, filter, searchQuery]);

  const addGuest = () => {
    const guest: Guest = {
      id: generateId(),
      wedding_id: "demo",
      household_id: null,
      first_name: newGuest.firstName,
      last_name: newGuest.lastName,
      email: newGuest.email || null,
      phone: null,
      relation: newGuest.relation,
      side: newGuest.side,
      rsvp_status: "pending",
      rsvp_code: generateId().toUpperCase().slice(0, 6),
      meal_choice: null,
      dietary_restrictions: null,
      plus_one_allowed: newGuest.plusOneAllowed,
      plus_one_name: null,
      table_id: null,
      notes: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    
    setGuests(prev => [...prev, guest]);
    setNewGuest({
      firstName: "",
      lastName: "",
      email: "",
      relation: "friend",
      side: "partner1",
      plusOneAllowed: false,
    });
    setShowAddDialog(false);
  };

  return (
    <>
      <Header 
        title="Guest List" 
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
          className="grid grid-cols-3 gap-3 mb-4"
        >
          <Card className="p-3 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Check className="w-4 h-4 text-success" />
            </div>
            <p className="text-2xl font-bold">{stats.confirmed}</p>
            <p className="text-xs text-muted-foreground">Confirmed</p>
          </Card>
          
          <Card className="p-3 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Clock className="w-4 h-4 text-warning" />
            </div>
            <p className="text-2xl font-bold">{stats.pending}</p>
            <p className="text-xs text-muted-foreground">Pending</p>
          </Card>
          
          <Card className="p-3 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Users className="w-4 h-4 text-primary" />
            </div>
            <p className="text-2xl font-bold">{stats.attending}</p>
            <p className="text-xs text-muted-foreground">Attending</p>
          </Card>
        </motion.div>

        {/* RSVP Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-4"
        >
          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">RSVP Progress</span>
              <span className="text-sm text-muted-foreground">
                {stats.confirmed + stats.declined} of {stats.total} responded
              </span>
            </div>
            <div className="flex gap-1 h-2 rounded-full overflow-hidden bg-muted">
              <div 
                className="bg-success transition-all"
                style={{ width: `${(stats.confirmed / stats.total) * 100}%` }}
              />
              <div 
                className="bg-error transition-all"
                style={{ width: `${(stats.declined / stats.total) * 100}%` }}
              />
            </div>
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-success" />
                {stats.confirmed} confirmed
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-error" />
                {stats.declined} declined
              </span>
            </div>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex gap-2 mb-4"
        >
          <Button variant="outline" className="flex-1" size="sm">
            <Mail className="w-4 h-4 mr-2" />
            Send Invites
          </Button>
          <Button variant="outline" className="flex-1" size="sm">
            <Share2 className="w-4 h-4 mr-2" />
            Share RSVP Link
          </Button>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-4 space-y-3"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search guests..."
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

        {/* Guest List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-2 pb-4"
        >
          {filteredGuests.map((guest, index) => (
            <motion.div
              key={guest.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 + index * 0.03 }}
            >
              <GuestRow
                guest={guest}
                onClick={() => setSelectedGuest(guest)}
              />
            </motion.div>
          ))}
          
          {filteredGuests.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">
                {searchQuery 
                  ? "No guests match your search" 
                  : "No guests in this category"}
              </p>
            </div>
          )}
        </motion.div>

        {/* Add Guest Dialog */}
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogContent className="max-w-md mx-4">
            <DialogHeader>
              <DialogTitle>Add Guest</DialogTitle>
              <DialogDescription>
                Add a new guest to your list
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="First name"
                    value={newGuest.firstName}
                    onChange={(e) => setNewGuest(prev => ({ ...prev, firstName: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Last name"
                    value={newGuest.lastName}
                    onChange={(e) => setNewGuest(prev => ({ ...prev, lastName: e.target.value }))}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email (optional)</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="guest@example.com"
                  value={newGuest.email}
                  onChange={(e) => setNewGuest(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Relation</Label>
                  <Select
                    value={newGuest.relation}
                    onValueChange={(value) => setNewGuest(prev => ({ ...prev, relation: value as GuestRelation }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {relationOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Side</Label>
                  <Select
                    value={newGuest.side}
                    onValueChange={(value) => setNewGuest(prev => ({ ...prev, side: value as "partner1" | "partner2" | "both" }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="partner1">Partner 1</SelectItem>
                      <SelectItem value="partner2">Partner 2</SelectItem>
                      <SelectItem value="both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="plusOne">Allow Plus One</Label>
                  <p className="text-xs text-muted-foreground">Guest can bring a date</p>
                </div>
                <Switch
                  id="plusOne"
                  checked={newGuest.plusOneAllowed}
                  onCheckedChange={(checked) => setNewGuest(prev => ({ ...prev, plusOneAllowed: checked }))}
                />
              </div>
              
              <Button 
                className="w-full" 
                onClick={addGuest}
                disabled={!newGuest.firstName.trim() || !newGuest.lastName.trim()}
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Add Guest
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Guest Detail Dialog */}
        <Dialog open={!!selectedGuest} onOpenChange={() => setSelectedGuest(null)}>
          <DialogContent className="max-w-md mx-4">
            {selectedGuest && (
              <>
                <DialogHeader>
                  <DialogTitle>
                    {selectedGuest.first_name} {selectedGuest.last_name}
                  </DialogTitle>
                  <DialogDescription>
                    {selectedGuest.email || "No email provided"}
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4 mt-4">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-xl">
                    <span className="text-sm">RSVP Status</span>
                    <Badge 
                      variant={
                        selectedGuest.rsvp_status === "confirmed" ? "success" :
                        selectedGuest.rsvp_status === "declined" ? "error" : "warning"
                      }
                    >
                      {selectedGuest.rsvp_status}
                    </Badge>
                  </div>
                  
                  {selectedGuest.meal_choice && (
                    <div className="flex items-center justify-between p-3 bg-muted rounded-xl">
                      <span className="text-sm flex items-center gap-2">
                        <Utensils className="w-4 h-4" />
                        Meal Choice
                      </span>
                      <span className="font-medium">{selectedGuest.meal_choice}</span>
                    </div>
                  )}
                  
                  {selectedGuest.dietary_restrictions && (
                    <div className="p-3 bg-warning/10 rounded-xl">
                      <span className="text-sm text-warning font-medium">
                        Dietary: {selectedGuest.dietary_restrictions}
                      </span>
                    </div>
                  )}
                  
                  {selectedGuest.plus_one_name && (
                    <div className="flex items-center justify-between p-3 bg-muted rounded-xl">
                      <span className="text-sm">Plus One</span>
                      <span className="font-medium">{selectedGuest.plus_one_name}</span>
                    </div>
                  )}
                  
                  <div className="p-3 bg-muted rounded-xl">
                    <span className="text-xs text-muted-foreground">RSVP Code</span>
                    <p className="font-mono font-medium">{selectedGuest.rsvp_code}</p>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </PageContainer>
    </>
  );
}
