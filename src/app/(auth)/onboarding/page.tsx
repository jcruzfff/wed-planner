"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, 
  Calendar, 
  MapPin, 
  Users, 
  Palette, 
  DollarSign,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useWeddingStore } from "@/lib/store/wedding-store";
import type { WeddingStyle } from "@/types";

const TOTAL_STEPS = 6;

const weddingStyles: { id: WeddingStyle; label: string; emoji: string }[] = [
  { id: "modern", label: "Modern", emoji: "✨" },
  { id: "rustic", label: "Rustic", emoji: "🌾" },
  { id: "classic", label: "Classic", emoji: "🏛️" },
  { id: "boho", label: "Boho", emoji: "🌸" },
  { id: "romantic", label: "Romantic", emoji: "💕" },
  { id: "minimalist", label: "Minimalist", emoji: "◻️" },
  { id: "garden", label: "Garden", emoji: "🌿" },
  { id: "beach", label: "Beach", emoji: "🏖️" },
  { id: "glamorous", label: "Glamorous", emoji: "💎" },
  { id: "vintage", label: "Vintage", emoji: "🕰️" },
];

const budgetRanges = [
  { id: "10000", label: "Under $10k", value: 10000 },
  { id: "25000", label: "$10k - $25k", value: 25000 },
  { id: "50000", label: "$25k - $50k", value: 50000 },
  { id: "75000", label: "$50k - $75k", value: 75000 },
  { id: "100000", label: "$75k - $100k", value: 100000 },
  { id: "150000", label: "$100k+", value: 150000 },
];

const guestCountRanges = [
  { id: "intimate", label: "Intimate (under 50)", value: 50 },
  { id: "small", label: "Small (50-100)", value: 100 },
  { id: "medium", label: "Medium (100-150)", value: 150 },
  { id: "large", label: "Large (150-250)", value: 250 },
  { id: "grand", label: "Grand (250+)", value: 300 },
];

export default function OnboardingPage() {
  const router = useRouter();
  const { 
    onboardingData, 
    onboardingStep, 
    setOnboardingData, 
    setOnboardingStep,
    resetOnboarding 
  } = useWeddingStore();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localData, setLocalData] = useState(onboardingData);

  const updateLocalData = (data: Partial<typeof localData>) => {
    setLocalData(prev => ({ ...prev, ...data }));
  };

  const currentStep = onboardingStep;
  const progress = ((currentStep + 1) / TOTAL_STEPS) * 100;

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return localData.partner1Name.trim() && localData.partner2Name.trim();
      case 1:
        return localData.dateNotSure || localData.weddingDate;
      case 2:
        return localData.location.trim();
      case 3:
        return localData.guestCount !== null;
      case 4:
        return localData.style !== null;
      case 5:
        return localData.budget !== null;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS - 1) {
      setOnboardingData(localData);
      setOnboardingStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setOnboardingStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setOnboardingData(localData);
    
    // In a real app, this would save to Supabase
    // For demo, we'll just simulate a delay and redirect
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    resetOnboarding();
    router.push("/");
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <motion.div
            key="names"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-rose/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-rose" />
              </div>
              <h2 className="text-2xl font-bold font-(family-name:--font-playfair)">
                Who&apos;s getting married?
              </h2>
              <p className="text-muted-foreground mt-2">
                Enter both of your names
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="partner1">Partner 1</Label>
                <Input
                  id="partner1"
                  placeholder="First name"
                  value={localData.partner1Name}
                  onChange={(e) => updateLocalData({ partner1Name: e.target.value })}
                  className="text-center text-lg h-14"
                />
              </div>
              <div className="flex items-center justify-center">
                <Heart className="w-5 h-5 text-rose fill-rose" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="partner2">Partner 2</Label>
                <Input
                  id="partner2"
                  placeholder="First name"
                  value={localData.partner2Name}
                  onChange={(e) => updateLocalData({ partner2Name: e.target.value })}
                  className="text-center text-lg h-14"
                />
              </div>
            </div>
          </motion.div>
        );

      case 1:
        return (
          <motion.div
            key="date"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold font-(family-name:--font-playfair)">
                When&apos;s the big day?
              </h2>
              <p className="text-muted-foreground mt-2">
                This helps us create your timeline
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="date"
                  value={localData.weddingDate || ""}
                  onChange={(e) => updateLocalData({ 
                    weddingDate: e.target.value,
                    dateNotSure: false 
                  })}
                  disabled={localData.dateNotSure}
                  className="text-center text-lg h-14"
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
              <div className="text-center text-muted-foreground">or</div>
              <Button
                variant={localData.dateNotSure ? "default" : "outline"}
                className="w-full h-14"
                onClick={() => updateLocalData({ 
                  dateNotSure: !localData.dateNotSure,
                  weddingDate: null 
                })}
              >
                {localData.dateNotSure && <Check className="w-5 h-5 mr-2" />}
                We haven&apos;t decided yet
              </Button>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="location"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold font-(family-name:--font-playfair)">
                Where will you celebrate?
              </h2>
              <p className="text-muted-foreground mt-2">
                City or region for your wedding
              </p>
            </div>

            <div className="space-y-2">
              <Input
                placeholder="e.g., San Francisco, CA"
                value={localData.location}
                onChange={(e) => updateLocalData({ location: e.target.value })}
                className="text-center text-lg h-14"
              />
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            key="guests"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold font-(family-name:--font-playfair)">
                How many guests?
              </h2>
              <p className="text-muted-foreground mt-2">
                Approximate number of people
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {guestCountRanges.map((range) => (
                <button
                  key={range.id}
                  onClick={() => updateLocalData({ guestCount: range.value })}
                  className={cn(
                    "p-4 rounded-xl border-2 text-left transition-all",
                    localData.guestCount === range.value
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <span className="font-medium">{range.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            key="style"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-rose/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="w-8 h-8 text-rose" />
              </div>
              <h2 className="text-2xl font-bold font-(family-name:--font-playfair)">
                What&apos;s your vibe?
              </h2>
              <p className="text-muted-foreground mt-2">
                Choose the style that speaks to you
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {weddingStyles.map((style) => (
                <button
                  key={style.id}
                  onClick={() => updateLocalData({ style: style.id })}
                  className={cn(
                    "p-4 rounded-xl border-2 text-center transition-all",
                    localData.style === style.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <span className="text-2xl mb-1 block">{style.emoji}</span>
                  <span className="font-medium">{style.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        );

      case 5:
        return (
          <motion.div
            key="budget"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold font-(family-name:--font-playfair)">
                What&apos;s your budget?
              </h2>
              <p className="text-muted-foreground mt-2">
                This helps us tailor recommendations
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {budgetRanges.map((range) => (
                <button
                  key={range.id}
                  onClick={() => updateLocalData({ budget: range.value })}
                  className={cn(
                    "p-4 rounded-xl border-2 text-center transition-all",
                    localData.budget === range.value
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <span className="font-medium">{range.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex-1 flex flex-col px-6 py-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">
            Step {currentStep + 1} of {TOTAL_STEPS}
          </span>
          <span className="text-sm font-medium">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex gap-3 mt-8">
        {currentStep > 0 && (
          <Button
            variant="outline"
            size="lg"
            onClick={handleBack}
            className="flex-1"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back
          </Button>
        )}
        <Button
          size="lg"
          onClick={handleNext}
          disabled={!canProceed() || isSubmitting}
          className="flex-1"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
              Creating your plan...
            </>
          ) : currentStep === TOTAL_STEPS - 1 ? (
            <>
              Get Started
              <Heart className="w-5 h-5 ml-1 fill-current" />
            </>
          ) : (
            <>
              Continue
              <ChevronRight className="w-5 h-5 ml-1" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
