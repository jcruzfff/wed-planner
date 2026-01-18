import type { TaskCategory } from "@/types";

interface TaskTemplate {
  title: string;
  description: string;
  category: TaskCategory;
  monthsBefore: number;
  priority: "low" | "medium" | "high";
  subTasks?: string[];
}

// Timeline templates based on months before wedding
export const timelineTemplates: TaskTemplate[] = [
  // 12+ months before
  {
    title: "Set your budget",
    description: "Determine your total wedding budget and how it will be split",
    category: "other",
    monthsBefore: 12,
    priority: "high",
    subTasks: [
      "Discuss budget with both families",
      "Research average costs in your area",
      "Create budget spreadsheet",
      "Allocate amounts to each category",
    ],
  },
  {
    title: "Create your guest list",
    description: "Draft your initial guest list with both sides of the family",
    category: "other",
    monthsBefore: 12,
    priority: "high",
    subTasks: [
      "List immediate family",
      "List extended family",
      "List close friends",
      "List work colleagues",
      "Discuss plus-ones",
    ],
  },
  {
    title: "Research and book venue",
    description: "Find and secure your ceremony and reception venues",
    category: "venue",
    monthsBefore: 12,
    priority: "high",
    subTasks: [
      "Research venue options",
      "Schedule venue tours",
      "Compare pricing and packages",
      "Ask about availability",
      "Review contract and book",
      "Pay deposit",
    ],
  },
  {
    title: "Start vendor research",
    description: "Begin researching key vendors like photographers and caterers",
    category: "other",
    monthsBefore: 11,
    priority: "medium",
  },
  
  // 10-11 months before
  {
    title: "Book photographer",
    description: "Research and hire your wedding photographer",
    category: "photography",
    monthsBefore: 10,
    priority: "high",
    subTasks: [
      "Browse portfolios online",
      "Schedule consultations",
      "Compare packages and pricing",
      "Check reviews and references",
      "Book and sign contract",
    ],
  },
  {
    title: "Book videographer",
    description: "Hire a videographer to capture your day",
    category: "videography",
    monthsBefore: 10,
    priority: "medium",
  },
  {
    title: "Choose wedding party",
    description: "Ask your bridesmaids, groomsmen, and other attendants",
    category: "other",
    monthsBefore: 10,
    priority: "medium",
  },
  
  // 8-9 months before
  {
    title: "Book caterer",
    description: "Select and book your catering service",
    category: "catering",
    monthsBefore: 9,
    priority: "high",
    subTasks: [
      "Research catering options",
      "Schedule tastings",
      "Discuss dietary restrictions",
      "Review menu options",
      "Book and sign contract",
    ],
  },
  {
    title: "Book entertainment/DJ",
    description: "Hire your DJ, band, or other entertainment",
    category: "music",
    monthsBefore: 9,
    priority: "medium",
  },
  {
    title: "Start dress shopping",
    description: "Begin looking for your wedding dress",
    category: "attire",
    monthsBefore: 9,
    priority: "medium",
    subTasks: [
      "Research dress styles",
      "Book bridal salon appointments",
      "Try on dresses",
      "Order dress (allow 4-6 months)",
    ],
  },
  {
    title: "Book florist",
    description: "Find and book your wedding florist",
    category: "flowers",
    monthsBefore: 8,
    priority: "medium",
  },
  {
    title: "Book officiant",
    description: "Find and book your wedding officiant",
    category: "officiant",
    monthsBefore: 8,
    priority: "high",
  },
  
  // 6-7 months before
  {
    title: "Order invitations",
    description: "Design and order your wedding invitations",
    category: "stationery",
    monthsBefore: 6,
    priority: "medium",
    subTasks: [
      "Choose invitation style",
      "Finalize wording",
      "Order invitations",
      "Order thank you cards",
    ],
  },
  {
    title: "Book hair and makeup",
    description: "Find and book your beauty team",
    category: "beauty",
    monthsBefore: 6,
    priority: "medium",
  },
  {
    title: "Plan honeymoon",
    description: "Research and book your honeymoon trip",
    category: "honeymoon",
    monthsBefore: 6,
    priority: "medium",
  },
  {
    title: "Register for gifts",
    description: "Create your wedding registry",
    category: "gifts",
    monthsBefore: 6,
    priority: "low",
  },
  
  // 4-5 months before
  {
    title: "Book transportation",
    description: "Arrange transportation for the wedding day",
    category: "transportation",
    monthsBefore: 5,
    priority: "low",
  },
  {
    title: "Order wedding cake",
    description: "Choose and order your wedding cake",
    category: "catering",
    monthsBefore: 4,
    priority: "medium",
    subTasks: [
      "Research bakeries",
      "Schedule cake tastings",
      "Choose design and flavors",
      "Place order",
    ],
  },
  {
    title: "Book rentals",
    description: "Reserve any additional rentals (tables, chairs, linens)",
    category: "rentals",
    monthsBefore: 4,
    priority: "medium",
  },
  {
    title: "Plan rehearsal dinner",
    description: "Organize the rehearsal dinner details",
    category: "other",
    monthsBefore: 4,
    priority: "medium",
  },
  
  // 2-3 months before
  {
    title: "Send invitations",
    description: "Mail out your wedding invitations",
    category: "stationery",
    monthsBefore: 3,
    priority: "high",
  },
  {
    title: "Finalize menu",
    description: "Confirm your catering menu selections",
    category: "catering",
    monthsBefore: 3,
    priority: "medium",
  },
  {
    title: "Schedule dress fittings",
    description: "Book your dress alteration appointments",
    category: "attire",
    monthsBefore: 3,
    priority: "medium",
  },
  {
    title: "Get marriage license",
    description: "Apply for your marriage license",
    category: "legal",
    monthsBefore: 2,
    priority: "high",
  },
  {
    title: "Create seating chart",
    description: "Plan your reception seating arrangement",
    category: "other",
    monthsBefore: 2,
    priority: "medium",
  },
  {
    title: "Write vows",
    description: "Write your personal wedding vows",
    category: "other",
    monthsBefore: 2,
    priority: "medium",
  },
  
  // 1 month before
  {
    title: "Confirm all vendors",
    description: "Contact all vendors to confirm details",
    category: "other",
    monthsBefore: 1,
    priority: "high",
    subTasks: [
      "Confirm venue details",
      "Confirm catering final count",
      "Confirm photographer timeline",
      "Confirm florist delivery",
      "Confirm transportation pickup",
    ],
  },
  {
    title: "Final dress fitting",
    description: "Complete your final dress fitting",
    category: "attire",
    monthsBefore: 1,
    priority: "medium",
  },
  {
    title: "Hair and makeup trial",
    description: "Do a trial run of your wedding day look",
    category: "beauty",
    monthsBefore: 1,
    priority: "medium",
  },
  {
    title: "Create day-of timeline",
    description: "Plan out the schedule for your wedding day",
    category: "other",
    monthsBefore: 1,
    priority: "high",
  },
  {
    title: "Prepare toasts",
    description: "Write or review speeches and toasts",
    category: "other",
    monthsBefore: 1,
    priority: "low",
  },
];

export function generateTimelineFromDate(weddingDate: Date): TaskTemplate[] {
  const today = new Date();
  const monthsUntilWedding = Math.ceil(
    (weddingDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24 * 30)
  );

  // Filter tasks that are still relevant based on months remaining
  return timelineTemplates.filter(
    (task) => task.monthsBefore <= monthsUntilWedding
  );
}

export function getTaskDueDate(weddingDate: Date, monthsBefore: number): Date {
  const dueDate = new Date(weddingDate);
  dueDate.setMonth(dueDate.getMonth() - monthsBefore);
  return dueDate;
}
