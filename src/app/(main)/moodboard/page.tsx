"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Palette, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { PageContainer } from "@/components/layout/page-container";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { generateId } from "@/lib/utils";
import type { Moodboard } from "@/types";

// Demo moodboards
const initialMoodboards: Moodboard[] = [
  {
    id: "1",
    wedding_id: "demo",
    name: "Florals",
    description: "Bouquet and centerpiece inspiration",
    cover_image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=400&fit=crop",
    color_palette: ["#E8D5D5", "#C9A9A6", "#8B7355", "#F5EBE0"],
    created_at: "",
    updated_at: "",
  },
  {
    id: "2",
    wedding_id: "demo",
    name: "Venue Ideas",
    description: "Dream venues and spaces",
    cover_image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=400&fit=crop",
    color_palette: ["#E8E4E1", "#C4B7A6", "#8B8178", "#F5F2EF"],
    created_at: "",
    updated_at: "",
  },
  {
    id: "3",
    wedding_id: "demo",
    name: "Table Settings",
    description: "Tablescapes and place settings",
    cover_image: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=400&h=400&fit=crop",
    color_palette: ["#F5EBE0", "#D4C4B0", "#A69076", "#E8DCD0"],
    created_at: "",
    updated_at: "",
  },
  {
    id: "4",
    wedding_id: "demo",
    name: "Attire",
    description: "Dress and suit inspiration",
    cover_image: "https://images.unsplash.com/photo-1594552072238-b8a33785b261?w=400&h=400&fit=crop",
    color_palette: ["#FFFFFF", "#F5F5F5", "#E8E8E8", "#DCDCDC"],
    created_at: "",
    updated_at: "",
  },
  {
    id: "5",
    wedding_id: "demo",
    name: "Decor Details",
    description: "Small touches and decorations",
    cover_image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=400&fit=crop",
    color_palette: ["#D4E9D7", "#A8C9AB", "#7BA37E", "#E8F3E9"],
    created_at: "",
    updated_at: "",
  },
];

export default function MoodboardsPage() {
  const [moodboards, setMoodboards] = useState(initialMoodboards);
  const [showAddSheet, setShowAddSheet] = useState(false);
  const [newBoardName, setNewBoardName] = useState("");

  const addMoodboard = () => {
    if (!newBoardName.trim()) return;
    
    const board: Moodboard = {
      id: generateId(),
      wedding_id: "demo",
      name: newBoardName,
      description: null,
      cover_image: null,
      color_palette: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    
    setMoodboards(prev => [board, ...prev]);
    setNewBoardName("");
    setShowAddSheet(false);
  };

  return (
    <>
      <Header 
        title="Boards" 
        rightAction={
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setShowAddSheet(true)}
            className="text-primary font-semibold"
          >
            <Plus className="w-4 h-4 mr-1" />
            New
          </Button>
        }
      />
      <PageContainer className="pt-4">
        {/* Color Palette Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Card className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-primary" />
                <span className="font-medium">Your Color Palette</span>
              </div>
              <Button variant="ghost" size="sm" className="text-primary h-8">
                Edit
              </Button>
            </div>
            <div className="flex gap-2">
              {["#5E7B6B", "#C4A69D", "#F5EBE0", "#E8D5D5", "#8B7355"].map((color, i) => (
                <div
                  key={i}
                  className="flex-1 h-10 rounded-lg"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Boards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold">Your Boards</h2>
            <span className="text-sm text-muted-foreground">
              {moodboards.length} boards
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Add New Board Card */}
            <motion.button
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 }}
              onClick={() => setShowAddSheet(true)}
              className="aspect-square rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 hover:border-primary hover:bg-primary/5 transition-colors active:scale-95"
            >
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <Plus className="w-5 h-5 text-muted-foreground" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">
                New Board
              </span>
            </motion.button>

            {/* Existing Boards */}
            {moodboards.map((board, index) => (
              <motion.div
                key={board.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.03 }}
              >
                <Link href={`/moodboard/${board.id}`}>
                  <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted group active:scale-95 transition-transform">
                    {board.cover_image ? (
                      <Image
                        src={board.cover_image}
                        alt={board.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Plus className="w-8 h-8 text-muted-foreground" />
                      </div>
                    )}
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/0 to-black/0" />
                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <h3 className="font-semibold text-white text-sm truncate">
                        {board.name}
                      </h3>
                      {board.description && (
                        <p className="text-white/70 text-xs truncate">
                          {board.description}
                        </p>
                      )}
                    </div>
                    {/* Color palette dots */}
                    {board.color_palette.length > 0 && (
                      <div className="absolute top-2 right-2 flex gap-0.5">
                        {board.color_palette.slice(0, 3).map((color, i) => (
                          <div
                            key={i}
                            className="w-3 h-3 rounded-full border border-white/50"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Add Board Bottom Sheet */}
        <AnimatePresence>
          {showAddSheet && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50"
              onClick={() => setShowAddSheet(false)}
            >
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="absolute bottom-0 left-0 right-0 bg-card rounded-t-3xl p-6 pb-10"
              >
                {/* Handle */}
                <div className="w-10 h-1 bg-muted-foreground/30 rounded-full mx-auto mb-6" />
                
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Create Board</h2>
                  <button
                    onClick={() => setShowAddSheet(false)}
                    className="p-2 hover:bg-muted rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                {/* Input */}
                <div className="mb-6">
                  <Input
                    placeholder="Board name"
                    value={newBoardName}
                    onChange={(e) => setNewBoardName(e.target.value)}
                    className="h-14 text-lg rounded-xl"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === "Enter") addMoodboard();
                    }}
                  />
                </div>
                
                {/* Create Button */}
                <Button 
                  className="w-full h-14 text-base rounded-xl" 
                  onClick={addMoodboard}
                  disabled={!newBoardName.trim()}
                >
                  Create Board
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </PageContainer>
    </>
  );
}
