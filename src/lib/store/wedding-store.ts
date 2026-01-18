import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  Wedding,
  TimelineTask,
  BudgetCategory,
  BudgetItem,
  Guest,
  Vendor,
  Venue,
  Moodboard,
  DayOfEvent,
  OnboardingData,
} from "@/types";

interface WeddingState {
  // Current wedding data
  wedding: Wedding | null;
  isLoading: boolean;
  
  // Cached data
  tasks: TimelineTask[];
  budgetCategories: BudgetCategory[];
  budgetItems: BudgetItem[];
  guests: Guest[];
  vendors: Vendor[];
  venues: Venue[];
  moodboards: Moodboard[];
  dayOfEvents: DayOfEvent[];
  
  // Onboarding state
  onboardingData: OnboardingData;
  onboardingStep: number;
  
  // Actions
  setWedding: (wedding: Wedding | null) => void;
  setLoading: (loading: boolean) => void;
  setTasks: (tasks: TimelineTask[]) => void;
  setBudgetCategories: (categories: BudgetCategory[]) => void;
  setBudgetItems: (items: BudgetItem[]) => void;
  setGuests: (guests: Guest[]) => void;
  setVendors: (vendors: Vendor[]) => void;
  setVenues: (venues: Venue[]) => void;
  setMoodboards: (moodboards: Moodboard[]) => void;
  setDayOfEvents: (events: DayOfEvent[]) => void;
  
  // Onboarding actions
  setOnboardingData: (data: Partial<OnboardingData>) => void;
  setOnboardingStep: (step: number) => void;
  resetOnboarding: () => void;
  
  // Task actions
  toggleTask: (taskId: string) => void;
  addTask: (task: TimelineTask) => void;
  updateTask: (taskId: string, updates: Partial<TimelineTask>) => void;
  
  // Guest actions
  addGuest: (guest: Guest) => void;
  updateGuest: (guestId: string, updates: Partial<Guest>) => void;
  removeGuest: (guestId: string) => void;
  
  // Budget actions
  addBudgetItem: (item: BudgetItem) => void;
  updateBudgetItem: (itemId: string, updates: Partial<BudgetItem>) => void;
  
  // Vendor actions
  addVendor: (vendor: Vendor) => void;
  updateVendor: (vendorId: string, updates: Partial<Vendor>) => void;
  
  // Reset
  reset: () => void;
}

const initialOnboardingData: OnboardingData = {
  partner1Name: "",
  partner2Name: "",
  weddingDate: null,
  dateNotSure: false,
  location: "",
  guestCount: null,
  style: null,
  budget: null,
};

export const useWeddingStore = create<WeddingState>()(
  persist(
    (set) => ({
      // Initial state
      wedding: null,
      isLoading: true,
      tasks: [],
      budgetCategories: [],
      budgetItems: [],
      guests: [],
      vendors: [],
      venues: [],
      moodboards: [],
      dayOfEvents: [],
      onboardingData: initialOnboardingData,
      onboardingStep: 0,
      
      // Setters
      setWedding: (wedding) => set({ wedding }),
      setLoading: (isLoading) => set({ isLoading }),
      setTasks: (tasks) => set({ tasks }),
      setBudgetCategories: (budgetCategories) => set({ budgetCategories }),
      setBudgetItems: (budgetItems) => set({ budgetItems }),
      setGuests: (guests) => set({ guests }),
      setVendors: (vendors) => set({ vendors }),
      setVenues: (venues) => set({ venues }),
      setMoodboards: (moodboards) => set({ moodboards }),
      setDayOfEvents: (dayOfEvents) => set({ dayOfEvents }),
      
      // Onboarding
      setOnboardingData: (data) =>
        set((state) => ({
          onboardingData: { ...state.onboardingData, ...data },
        })),
      setOnboardingStep: (step) => set({ onboardingStep: step }),
      resetOnboarding: () =>
        set({
          onboardingData: initialOnboardingData,
          onboardingStep: 0,
        }),
      
      // Task actions
      toggleTask: (taskId) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  completed: !task.completed,
                  completed_at: !task.completed ? new Date().toISOString() : null,
                }
              : task
          ),
        })),
      addTask: (task) =>
        set((state) => ({
          tasks: [...state.tasks, task],
        })),
      updateTask: (taskId, updates) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId ? { ...task, ...updates } : task
          ),
        })),
      
      // Guest actions
      addGuest: (guest) =>
        set((state) => ({
          guests: [...state.guests, guest],
        })),
      updateGuest: (guestId, updates) =>
        set((state) => ({
          guests: state.guests.map((guest) =>
            guest.id === guestId ? { ...guest, ...updates } : guest
          ),
        })),
      removeGuest: (guestId) =>
        set((state) => ({
          guests: state.guests.filter((guest) => guest.id !== guestId),
        })),
      
      // Budget actions
      addBudgetItem: (item) =>
        set((state) => ({
          budgetItems: [...state.budgetItems, item],
        })),
      updateBudgetItem: (itemId, updates) =>
        set((state) => ({
          budgetItems: state.budgetItems.map((item) =>
            item.id === itemId ? { ...item, ...updates } : item
          ),
        })),
      
      // Vendor actions
      addVendor: (vendor) =>
        set((state) => ({
          vendors: [...state.vendors, vendor],
        })),
      updateVendor: (vendorId, updates) =>
        set((state) => ({
          vendors: state.vendors.map((vendor) =>
            vendor.id === vendorId ? { ...vendor, ...updates } : vendor
          ),
        })),
      
      // Reset all state
      reset: () =>
        set({
          wedding: null,
          isLoading: false,
          tasks: [],
          budgetCategories: [],
          budgetItems: [],
          guests: [],
          vendors: [],
          venues: [],
          moodboards: [],
          dayOfEvents: [],
          onboardingData: initialOnboardingData,
          onboardingStep: 0,
        }),
    }),
    {
      name: "wedding-storage",
      partialize: (state) => ({
        onboardingData: state.onboardingData,
        onboardingStep: state.onboardingStep,
      }),
    }
  )
);
