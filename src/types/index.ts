// Wedding Types
export interface Wedding {
  id: string;
  user_id: string;
  partner1_name: string;
  partner2_name: string;
  wedding_date: string | null;
  location: string | null;
  venue_name: string | null;
  estimated_guests: number | null;
  budget: number | null;
  style: WeddingStyle | null;
  created_at: string;
  updated_at: string;
}

export type WeddingStyle = 
  | "modern"
  | "rustic"
  | "classic"
  | "boho"
  | "romantic"
  | "minimalist"
  | "garden"
  | "beach"
  | "glamorous"
  | "vintage";

// Timeline & Tasks
export interface TimelineTask {
  id: string;
  wedding_id: string;
  title: string;
  description: string | null;
  category: TaskCategory;
  due_date: string | null;
  completed: boolean;
  completed_at: string | null;
  priority: "low" | "medium" | "high";
  parent_task_id: string | null;
  order: number;
  created_at: string;
  updated_at: string;
}

export type TaskCategory =
  | "venue"
  | "catering"
  | "photography"
  | "videography"
  | "music"
  | "flowers"
  | "attire"
  | "beauty"
  | "stationery"
  | "transportation"
  | "accommodation"
  | "decor"
  | "rentals"
  | "officiant"
  | "legal"
  | "honeymoon"
  | "gifts"
  | "other";

// Budget
export interface BudgetCategory {
  id: string;
  wedding_id: string;
  name: string;
  category: TaskCategory;
  allocated: number;
  spent: number;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface BudgetItem {
  id: string;
  wedding_id: string;
  category_id: string;
  vendor_id: string | null;
  name: string;
  description: string | null;
  estimated_cost: number;
  actual_cost: number | null;
  payment_status: PaymentStatus;
  due_date: string | null;
  paid_date: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export type PaymentStatus = "quote" | "deposit_paid" | "partial" | "paid" | "cancelled";

// Guests
export interface Guest {
  id: string;
  wedding_id: string;
  household_id: string | null;
  first_name: string;
  last_name: string;
  email: string | null;
  phone: string | null;
  relation: GuestRelation;
  side: "partner1" | "partner2" | "both";
  rsvp_status: RSVPStatus;
  rsvp_code: string;
  meal_choice: string | null;
  dietary_restrictions: string | null;
  plus_one_allowed: boolean;
  plus_one_name: string | null;
  table_id: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export type GuestRelation =
  | "family"
  | "friend"
  | "coworker"
  | "partner_family"
  | "partner_friend"
  | "other";

export type RSVPStatus = "pending" | "invited" | "confirmed" | "declined" | "maybe";

export interface Table {
  id: string;
  wedding_id: string;
  name: string;
  capacity: number;
  location: string | null;
  order: number;
  created_at: string;
}

// Vendors
export interface Vendor {
  id: string;
  wedding_id: string;
  name: string;
  category: TaskCategory;
  contact_name: string | null;
  email: string | null;
  phone: string | null;
  website: string | null;
  instagram: string | null;
  address: string | null;
  status: VendorStatus;
  quoted_price: number | null;
  final_price: number | null;
  deposit_amount: number | null;
  deposit_paid: boolean;
  contract_signed: boolean;
  contract_url: string | null;
  notes: string | null;
  rating: number | null;
  created_at: string;
  updated_at: string;
}

export type VendorStatus = "researching" | "contacted" | "quoted" | "booked" | "declined";

// Venues
export interface Venue {
  id: string;
  wedding_id: string;
  name: string;
  type: "ceremony" | "reception" | "both";
  address: string | null;
  city: string | null;
  state: string | null;
  latitude: number | null;
  longitude: number | null;
  capacity: number | null;
  price: number | null;
  contact_name: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  website: string | null;
  tour_date: string | null;
  tour_notes: string | null;
  ceremony_location: string | null;
  reception_location: string | null;
  rain_plan: string | null;
  parking_info: string | null;
  photos: string[];
  notes: string | null;
  is_booked: boolean;
  created_at: string;
  updated_at: string;
}

// Moodboards
export interface Moodboard {
  id: string;
  wedding_id: string;
  name: string;
  description: string | null;
  cover_image: string | null;
  color_palette: string[];
  created_at: string;
  updated_at: string;
}

export interface MoodboardItem {
  id: string;
  moodboard_id: string;
  image_url: string;
  source_url: string | null;
  tags: string[];
  notes: string | null;
  order: number;
  created_at: string;
}

// Day-of Events
export interface DayOfEvent {
  id: string;
  wedding_id: string;
  title: string;
  start_time: string;
  end_time: string | null;
  duration_minutes: number | null;
  location: string | null;
  description: string | null;
  assigned_to: string | null;
  vendor_id: string | null;
  order: number;
  created_at: string;
  updated_at: string;
}

// Messages
export interface Message {
  id: string;
  wedding_id: string;
  vendor_id: string | null;
  guest_id: string | null;
  subject: string | null;
  content: string;
  direction: "inbound" | "outbound";
  read: boolean;
  created_at: string;
}

// User Profile
export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  partner_id: string | null;
  created_at: string;
  updated_at: string;
}

// Onboarding State
export interface OnboardingData {
  partner1Name: string;
  partner2Name: string;
  weddingDate: string | null;
  dateNotSure: boolean;
  location: string;
  guestCount: number | null;
  style: WeddingStyle | null;
  budget: number | null;
}
