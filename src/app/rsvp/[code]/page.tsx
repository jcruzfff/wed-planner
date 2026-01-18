"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Heart, Check, X, Utensils, Music, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

// Demo wedding data - in real app, this would be fetched based on the RSVP code
const weddingData = {
  couple: "Sarah & Michael",
  date: "October 15, 2026",
  venue: "The Garden Estate",
  location: "Napa Valley, CA",
  mealOptions: ["Beef", "Chicken", "Fish", "Vegetarian", "Vegan"],
};

// Demo guest data - in real app, this would be fetched based on the RSVP code
const guestData = {
  firstName: "Emma",
  lastName: "Johnson",
  plusOneAllowed: true,
  plusOneName: "",
};

export default function RSVPPage() {
  const params = useParams();
  const code = params.code as string;
  
  const [step, setStep] = useState<"welcome" | "form" | "success">("welcome");
  const [attending, setAttending] = useState<boolean | null>(null);
  const [formData, setFormData] = useState({
    mealChoice: "",
    dietaryRestrictions: "",
    plusOneComing: false,
    plusOneName: guestData.plusOneName,
    plusOneMeal: "",
    songRequest: "",
    message: "",
  });

  const handleSubmit = () => {
    // In real app, this would submit to Supabase
    setStep("success");
  };

  if (step === "success") {
    return (
      <div className="min-h-screen bg-linear-to-b from-cream to-white flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-success" />
          </div>
          <h1 className="text-3xl font-bold font-(family-name:--font-playfair) mb-3">
            Thank You!
          </h1>
          <p className="text-muted-foreground mb-6">
            {attending 
              ? `We can't wait to celebrate with you on ${weddingData.date}!`
              : "We're sorry you can't make it. We'll miss you!"}
          </p>
          <Card className="text-left">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">Event Details</h3>
              <p className="text-sm text-muted-foreground">{weddingData.date}</p>
              <p className="text-sm text-muted-foreground">{weddingData.venue}</p>
              <p className="text-sm text-muted-foreground">{weddingData.location}</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-cream to-white">
      {/* Header */}
      <div className="text-center pt-12 pb-8 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Heart className="w-10 h-10 text-rose mx-auto mb-4 fill-rose" />
          <h1 className="text-3xl font-bold font-(family-name:--font-playfair) mb-2">
            {weddingData.couple}
          </h1>
          <p className="text-muted-foreground">{weddingData.date}</p>
          <p className="text-muted-foreground text-sm">{weddingData.venue}</p>
        </motion.div>
      </div>

      <div className="max-w-md mx-auto px-6 pb-12">
        {step === "welcome" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="mb-6">
              <CardContent className="p-6 text-center">
                <p className="text-lg mb-2">
                  Hello, <span className="font-semibold">{guestData.firstName}</span>!
                </p>
                <p className="text-muted-foreground">
                  We would be honored to have you celebrate our special day with us.
                </p>
              </CardContent>
            </Card>

            <h2 className="text-xl font-semibold text-center mb-4">
              Will you be joining us?
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => {
                  setAttending(true);
                  setStep("form");
                }}
                className={cn(
                  "p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3",
                  "border-border hover:border-success hover:bg-success/5"
                )}
              >
                <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
                  <Check className="w-6 h-6 text-success" />
                </div>
                <span className="font-medium">Joyfully Accept</span>
              </button>

              <button
                onClick={() => {
                  setAttending(false);
                  setStep("form");
                }}
                className={cn(
                  "p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3",
                  "border-border hover:border-error hover:bg-error/5"
                )}
              >
                <div className="w-12 h-12 rounded-full bg-error/10 flex items-center justify-center">
                  <X className="w-6 h-6 text-error" />
                </div>
                <span className="font-medium">Regretfully Decline</span>
              </button>
            </div>
          </motion.div>
        )}

        {step === "form" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {attending ? (
              <>
                {/* Meal Selection */}
                <div className="space-y-3">
                  <Label className="flex items-center gap-2">
                    <Utensils className="w-4 h-4" />
                    Meal Selection
                  </Label>
                  <Select
                    value={formData.mealChoice}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, mealChoice: value }))}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Choose your meal" />
                    </SelectTrigger>
                    <SelectContent>
                      {weddingData.mealOptions.map((meal) => (
                        <SelectItem key={meal} value={meal.toLowerCase()}>
                          {meal}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Dietary Restrictions */}
                <div className="space-y-3">
                  <Label className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Dietary Restrictions (optional)
                  </Label>
                  <Input
                    placeholder="e.g., Gluten-free, nut allergy"
                    value={formData.dietaryRestrictions}
                    onChange={(e) => setFormData(prev => ({ ...prev, dietaryRestrictions: e.target.value }))}
                  />
                </div>

                {/* Plus One */}
                {guestData.plusOneAllowed && (
                  <Card className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-medium">Bringing a guest?</span>
                      <div className="flex gap-2">
                        <Button
                          variant={formData.plusOneComing ? "default" : "outline"}
                          size="sm"
                          onClick={() => setFormData(prev => ({ ...prev, plusOneComing: true }))}
                        >
                          Yes
                        </Button>
                        <Button
                          variant={!formData.plusOneComing ? "default" : "outline"}
                          size="sm"
                          onClick={() => setFormData(prev => ({ ...prev, plusOneComing: false }))}
                        >
                          No
                        </Button>
                      </div>
                    </div>
                    
                    {formData.plusOneComing && (
                      <div className="space-y-3">
                        <Input
                          placeholder="Guest's name"
                          value={formData.plusOneName}
                          onChange={(e) => setFormData(prev => ({ ...prev, plusOneName: e.target.value }))}
                        />
                        <Select
                          value={formData.plusOneMeal}
                          onValueChange={(value) => setFormData(prev => ({ ...prev, plusOneMeal: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Guest's meal choice" />
                          </SelectTrigger>
                          <SelectContent>
                            {weddingData.mealOptions.map((meal) => (
                              <SelectItem key={meal} value={meal.toLowerCase()}>
                                {meal}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </Card>
                )}

                {/* Song Request */}
                <div className="space-y-3">
                  <Label className="flex items-center gap-2">
                    <Music className="w-4 h-4" />
                    Song Request (optional)
                  </Label>
                  <Input
                    placeholder="What song will get you on the dance floor?"
                    value={formData.songRequest}
                    onChange={(e) => setFormData(prev => ({ ...prev, songRequest: e.target.value }))}
                  />
                </div>
              </>
            ) : (
              <Card className="p-6 text-center">
                <p className="text-muted-foreground">
                  We're sorry you won't be able to join us. You'll be missed!
                </p>
              </Card>
            )}

            {/* Message */}
            <div className="space-y-3">
              <Label>Leave a message for the couple (optional)</Label>
              <Textarea
                placeholder="Share your well wishes..."
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                rows={3}
              />
            </div>

            {/* Submit */}
            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setStep("welcome")}
              >
                Back
              </Button>
              <Button
                className="flex-1"
                onClick={handleSubmit}
                disabled={attending === true && !formData.mealChoice}
              >
                Submit RSVP
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
