"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Plus, 
  Clock, 
  MapPin, 
  User,
  Phone,
  Download,
  Share2,
  ChevronRight,
  Edit,
  Trash2
} from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription 
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { generateId } from "@/lib/utils";
import type { DayOfEvent } from "@/types";

// Demo day-of events
const initialEvents: DayOfEvent[] = [
  { id: "1", wedding_id: "demo", title: "Venue Opens / Setup Begins", start_time: "10:00", end_time: null, duration_minutes: 120, location: "The Garden Estate", description: "Vendors arrive and begin setup", assigned_to: null, vendor_id: null, order: 1, created_at: "", updated_at: "" },
  { id: "2", wedding_id: "demo", title: "Florist Arrives", start_time: "11:00", end_time: null, duration_minutes: 90, location: "The Garden Estate", description: "Floral installations and bouquets", assigned_to: "Maria (Bloom & Wild)", vendor_id: "3", order: 2, created_at: "", updated_at: "" },
  { id: "3", wedding_id: "demo", title: "Hair & Makeup Begins", start_time: "12:00", end_time: null, duration_minutes: 180, location: "Bridal Suite", description: "Bride and bridesmaids get ready", assigned_to: "Lisa (Glam Squad)", vendor_id: null, order: 3, created_at: "", updated_at: "" },
  { id: "4", wedding_id: "demo", title: "Photographer Arrives", start_time: "14:00", end_time: null, duration_minutes: null, location: "Bridal Suite", description: "Getting ready photos", assigned_to: "Emily Rose", vendor_id: "2", order: 4, created_at: "", updated_at: "" },
  { id: "5", wedding_id: "demo", title: "First Look", start_time: "15:00", end_time: "15:30", duration_minutes: 30, location: "Garden Terrace", description: "Private first look moment", assigned_to: null, vendor_id: null, order: 5, created_at: "", updated_at: "" },
  { id: "6", wedding_id: "demo", title: "Wedding Party Photos", start_time: "15:30", end_time: "16:30", duration_minutes: 60, location: "Garden & Grounds", description: "Formal photos with wedding party", assigned_to: null, vendor_id: null, order: 6, created_at: "", updated_at: "" },
  { id: "7", wedding_id: "demo", title: "Guests Arrive", start_time: "16:30", end_time: null, duration_minutes: 30, location: "Main Entrance", description: "Guests begin arriving for ceremony", assigned_to: null, vendor_id: null, order: 7, created_at: "", updated_at: "" },
  { id: "8", wedding_id: "demo", title: "Ceremony Begins", start_time: "17:00", end_time: "17:30", duration_minutes: 30, location: "Garden Pavilion", description: "Wedding ceremony", assigned_to: null, vendor_id: null, order: 8, created_at: "", updated_at: "" },
  { id: "9", wedding_id: "demo", title: "Cocktail Hour", start_time: "17:30", end_time: "18:30", duration_minutes: 60, location: "West Terrace", description: "Drinks and appetizers", assigned_to: null, vendor_id: null, order: 9, created_at: "", updated_at: "" },
  { id: "10", wedding_id: "demo", title: "Grand Entrance", start_time: "18:30", end_time: null, duration_minutes: 15, location: "Reception Hall", description: "Introduction of the wedding party and couple", assigned_to: "DJ Mike", vendor_id: null, order: 10, created_at: "", updated_at: "" },
  { id: "11", wedding_id: "demo", title: "First Dance", start_time: "18:45", end_time: null, duration_minutes: 5, location: "Dance Floor", description: "First dance as married couple", assigned_to: null, vendor_id: null, order: 11, created_at: "", updated_at: "" },
  { id: "12", wedding_id: "demo", title: "Dinner Service", start_time: "19:00", end_time: "20:30", duration_minutes: 90, location: "Reception Hall", description: "Seated dinner service", assigned_to: null, vendor_id: null, order: 12, created_at: "", updated_at: "" },
  { id: "13", wedding_id: "demo", title: "Toasts & Speeches", start_time: "20:00", end_time: null, duration_minutes: 30, location: "Reception Hall", description: "Best man and maid of honor speeches", assigned_to: null, vendor_id: null, order: 13, created_at: "", updated_at: "" },
  { id: "14", wedding_id: "demo", title: "Cake Cutting", start_time: "20:30", end_time: null, duration_minutes: 15, location: "Reception Hall", description: "Cake cutting ceremony", assigned_to: null, vendor_id: null, order: 14, created_at: "", updated_at: "" },
  { id: "15", wedding_id: "demo", title: "Parent Dances", start_time: "20:45", end_time: null, duration_minutes: 10, location: "Dance Floor", description: "Father-daughter and mother-son dances", assigned_to: null, vendor_id: null, order: 15, created_at: "", updated_at: "" },
  { id: "16", wedding_id: "demo", title: "Open Dancing", start_time: "21:00", end_time: "23:00", duration_minutes: 120, location: "Dance Floor", description: "Party time!", assigned_to: null, vendor_id: null, order: 16, created_at: "", updated_at: "" },
  { id: "17", wedding_id: "demo", title: "Last Dance & Send Off", start_time: "23:00", end_time: null, duration_minutes: 15, location: "Main Entrance", description: "Sparkler send-off", assigned_to: null, vendor_id: null, order: 17, created_at: "", updated_at: "" },
];

// Demo vendor call sheet
const vendorCallSheet = [
  { name: "The Garden Estate", role: "Venue", contact: "Jennifer Morrison", phone: "(555) 123-4567", arrivalTime: "10:00 AM", location: "Main Venue" },
  { name: "Emily Rose Photography", role: "Photographer", contact: "Emily Chen", phone: "(555) 234-5678", arrivalTime: "2:00 PM", location: "Bridal Suite" },
  { name: "Bloom & Wild Florals", role: "Florist", contact: "Maria Santos", phone: "(555) 345-6789", arrivalTime: "11:00 AM", location: "Main Venue" },
  { name: "Delicious Catering", role: "Catering", contact: "Chef Michael", phone: "(555) 567-8901", arrivalTime: "3:00 PM", location: "Kitchen" },
  { name: "Harmony Strings", role: "Ceremony Music", contact: "David Park", phone: "(555) 456-7890", arrivalTime: "4:00 PM", location: "Garden Pavilion" },
  { name: "DJ Mike", role: "Reception DJ", contact: "Mike Johnson", phone: "(555) 678-9012", arrivalTime: "5:30 PM", location: "Reception Hall" },
];

export default function DayOfPage() {
  const [events, setEvents] = useState(initialEvents);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<DayOfEvent | null>(null);
  
  const [newEvent, setNewEvent] = useState({
    title: "",
    startTime: "",
    endTime: "",
    location: "",
    description: "",
    assignedTo: "",
  });

  const addEvent = () => {
    const event: DayOfEvent = {
      id: generateId(),
      wedding_id: "demo",
      title: newEvent.title,
      start_time: newEvent.startTime,
      end_time: newEvent.endTime || null,
      duration_minutes: null,
      location: newEvent.location || null,
      description: newEvent.description || null,
      assigned_to: newEvent.assignedTo || null,
      vendor_id: null,
      order: events.length + 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    
    setEvents(prev => [...prev, event].sort((a, b) => 
      a.start_time.localeCompare(b.start_time)
    ));
    setNewEvent({
      title: "",
      startTime: "",
      endTime: "",
      location: "",
      description: "",
      assignedTo: "",
    });
    setShowAddDialog(false);
  };

  const deleteEvent = (eventId: string) => {
    setEvents(prev => prev.filter(e => e.id !== eventId));
    setSelectedEvent(null);
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  return (
    <>
      <Header 
        title="Day-of Plan" 
        showBack 
        rightAction={
          <Button size="icon-sm" onClick={() => setShowAddDialog(true)}>
            <Plus className="w-5 h-5" />
          </Button>
        }
      />
      <PageContainer className="pt-4">
        <Tabs defaultValue="timeline" className="mb-6">
          <TabsList className="w-full">
            <TabsTrigger value="timeline" className="flex-1">Timeline</TabsTrigger>
            <TabsTrigger value="callsheet" className="flex-1">Vendor Contacts</TabsTrigger>
          </TabsList>

          <TabsContent value="timeline" className="mt-4">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-2 mb-4"
            >
              <Button variant="outline" className="flex-1" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
              <Button variant="outline" className="flex-1" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </motion.div>

            {/* Timeline */}
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[23px] top-0 bottom-0 w-0.5 bg-border" />
              
              <div className="space-y-4">
                {events.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="relative flex gap-4"
                  >
                    {/* Time dot */}
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-card border-2 border-primary flex items-center justify-center shadow-sm">
                        <Clock className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                    
                    {/* Event Card */}
                    <button
                      onClick={() => setSelectedEvent(event)}
                      className="flex-1 text-left"
                    >
                      <Card className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <Badge variant="outline" className="mb-2">
                                {formatTime(event.start_time)}
                                {event.end_time && ` - ${formatTime(event.end_time)}`}
                              </Badge>
                              <h3 className="font-semibold">{event.title}</h3>
                            </div>
                            <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
                          </div>
                          
                          {(event.location || event.assigned_to) && (
                            <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                              {event.location && (
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  {event.location}
                                </span>
                              )}
                              {event.assigned_to && (
                                <span className="flex items-center gap-1">
                                  <User className="w-3 h-3" />
                                  {event.assigned_to}
                                </span>
                              )}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="callsheet" className="mt-4">
            {/* Vendor Call Sheet */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-2 mb-4"
            >
              <Button variant="outline" className="flex-1" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
              <Button variant="outline" className="flex-1" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share with Team
              </Button>
            </motion.div>

            <div className="space-y-3">
              {vendorCallSheet.map((vendor, index) => (
                <motion.div
                  key={vendor.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <Badge variant="muted" className="mb-2">{vendor.role}</Badge>
                          <h3 className="font-semibold">{vendor.name}</h3>
                          <p className="text-sm text-muted-foreground">{vendor.contact}</p>
                        </div>
                        <a
                          href={`tel:${vendor.phone}`}
                          className="p-2 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Phone className="w-5 h-5 text-primary" />
                        </a>
                      </div>
                      
                      <div className="flex gap-4 text-sm text-muted-foreground mt-3 pt-3 border-t border-border">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Arrives: {vendor.arrivalTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {vendor.location}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Add Event Dialog */}
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogContent className="max-w-md mx-4">
            <DialogHeader>
              <DialogTitle>Add Event</DialogTitle>
              <DialogDescription>
                Add an event to your day-of timeline
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="title">Event Name</Label>
                <Input
                  id="title"
                  placeholder="e.g., First Dance"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={newEvent.startTime}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, startTime: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endTime">End Time (optional)</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={newEvent.endTime}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, endTime: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="e.g., Dance Floor"
                  value={newEvent.location}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, location: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="assignedTo">Assigned To (optional)</Label>
                <Input
                  id="assignedTo"
                  placeholder="e.g., DJ Mike"
                  value={newEvent.assignedTo}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, assignedTo: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Notes (optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Additional details..."
                  value={newEvent.description}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                  rows={2}
                />
              </div>
              
              <Button 
                className="w-full" 
                onClick={addEvent}
                disabled={!newEvent.title.trim() || !newEvent.startTime}
              >
                Add Event
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Event Detail Dialog */}
        <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
          <DialogContent className="max-w-md mx-4">
            {selectedEvent && (
              <>
                <DialogHeader>
                  <DialogTitle>{selectedEvent.title}</DialogTitle>
                </DialogHeader>
                
                <div className="space-y-4 mt-4">
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-xl">
                    <Clock className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Time</p>
                      <p className="font-medium">
                        {formatTime(selectedEvent.start_time)}
                        {selectedEvent.end_time && ` - ${formatTime(selectedEvent.end_time)}`}
                      </p>
                    </div>
                  </div>

                  {selectedEvent.location && (
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-xl">
                      <MapPin className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Location</p>
                        <p className="font-medium">{selectedEvent.location}</p>
                      </div>
                    </div>
                  )}

                  {selectedEvent.assigned_to && (
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-xl">
                      <User className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Assigned To</p>
                        <p className="font-medium">{selectedEvent.assigned_to}</p>
                      </div>
                    </div>
                  )}

                  {selectedEvent.description && (
                    <div className="p-3 bg-muted rounded-xl">
                      <p className="text-sm text-muted-foreground mb-1">Notes</p>
                      <p>{selectedEvent.description}</p>
                    </div>
                  )}

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" className="flex-1">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button 
                      variant="destructive"
                      size="icon"
                      onClick={() => deleteEvent(selectedEvent.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
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
