"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, Check, X, ImageIcon, Loader2 } from "lucide-react";
import Image from "next/image";
import { PageContainer } from "@/components/layout/page-container";
import { Header } from "@/components/layout/header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Pin {
  id: string;
  title: string;
  imageUrl: string;
  thumbnailUrl: string;
  dominantColor: string | null;
}

// Quick search suggestions
const searchSuggestions = [
  "Flowers",
  "Venues",
  "Dresses",
  "Decor",
  "Cakes",
  "Tables",
  "Invitations",
  "Rings",
];

// User's moodboards
const userMoodboards = [
  { id: "1", name: "Florals", itemCount: 12 },
  { id: "2", name: "Venue Ideas", itemCount: 8 },
  { id: "3", name: "Table Settings", itemCount: 5 },
  { id: "4", name: "Attire", itemCount: 15 },
  { id: "5", name: "Decor Details", itemCount: 9 },
];

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const [pins, setPins] = useState<Pin[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [selectedPin, setSelectedPin] = useState<Pin | null>(null);
  const [savedPins, setSavedPins] = useState<Set<string>>(new Set());
  const [recentlySaved, setRecentlySaved] = useState<string | null>(null);

  const searchPins = useCallback(async (query: string, bookmark?: string) => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    try {
      const params = new URLSearchParams({ q: query });
      if (bookmark) params.append("bookmark", bookmark);
      
      const response = await fetch(`/api/pinterest/search?${params}`);
      const data = await response.json();
      
      // Ensure pins is always an array
      const newPins = Array.isArray(data.pins) ? data.pins : [];
      
      if (bookmark) {
        setPins(prev => [...prev, ...newPins]);
      } else {
        setPins(newPins);
      }
      setNextPage(data.nextPage || null);
    } catch (error) {
      console.error("Search error:", error);
      setPins([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial load with default search
  useEffect(() => {
    searchPins("wedding inspiration");
    setActiveSearch("wedding inspiration");
  }, [searchPins]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setActiveSearch(searchQuery);
      searchPins(searchQuery);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setActiveSearch(suggestion);
    searchPins(suggestion);
  };

  const handleLoadMore = () => {
    if (nextPage && !isLoading) {
      searchPins(activeSearch, nextPage);
    }
  };

  const handleSaveToBoard = (boardId: string, boardName: string) => {
    if (selectedPin) {
      setSavedPins(prev => new Set(prev).add(selectedPin.id));
      setRecentlySaved(boardName);
      setSelectedPin(null);
      setTimeout(() => setRecentlySaved(null), 2000);
    }
  };

  return (
    <>
      <Header title="Explore" />
      <PageContainer className="pt-2">
        {/* Search Bar */}
        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSearch}
          className="mb-4"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search Pinterest for ideas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 h-12 rounded-full bg-muted border-0"
            />
          </div>
        </motion.form>

        {/* Quick Search Suggestions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mb-4"
        >
          <div className="flex gap-2 overflow-x-auto hide-scrollbar -mx-4 px-4 pb-2">
            {searchSuggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => handleSuggestionClick(suggestion)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                  activeSearch.toLowerCase() === suggestion.toLowerCase()
                    ? "bg-foreground text-background"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Success Toast */}
        <AnimatePresence>
          {recentlySaved && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-20 left-4 right-4 z-50"
            >
              <Card className="p-3 bg-foreground text-background flex items-center gap-2 shadow-lg">
                <Check className="w-5 h-5 text-green-400" />
                <span className="text-sm font-medium">Saved to {recentlySaved}</span>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading State */}
        {isLoading && pins.length === 0 && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
        )}

        {/* Pinterest Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="columns-2 gap-3 space-y-3"
        >
          {(pins || []).map((pin, index) => (
            <motion.div
              key={`${pin.id}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(index * 0.03, 0.3) }}
              className="break-inside-avoid"
            >
              <button
                onClick={() => setSelectedPin(pin)}
                className="relative w-full rounded-2xl overflow-hidden group"
                style={{ backgroundColor: pin.dominantColor || "#f5f5f5" }}
              >
                <Image
                  src={pin.imageUrl || pin.thumbnailUrl}
                  alt={pin.title}
                  width={400}
                  height={600}
                  className="w-full h-auto object-cover"
                  unoptimized // For external Pinterest URLs
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                {/* Saved indicator */}
                {savedPins.has(pin.id) && (
                  <div className="absolute top-2 right-2 w-7 h-7 bg-foreground rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-background" />
                  </div>
                )}
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* Load More */}
        {nextPage && (
          <div className="py-8 flex justify-center">
            <Button
              variant="outline"
              onClick={handleLoadMore}
              disabled={isLoading}
              className="rounded-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Loading...
                </>
              ) : (
                "Load more"
              )}
            </Button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && pins.length === 0 && (
          <div className="text-center py-20">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Search for wedding inspiration</p>
          </div>
        )}

        {/* Board Picker Bottom Sheet */}
        <AnimatePresence>
          {selectedPin && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 flex items-end justify-center"
              onClick={() => setSelectedPin(null)}
            >
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-lg bg-card rounded-t-3xl overflow-hidden max-h-[80vh]"
              >
                {/* Handle */}
                <div className="pt-3 pb-2">
                  <div className="w-10 h-1 bg-muted-foreground/30 rounded-full mx-auto" />
                </div>

                {/* Header */}
                <div className="flex items-center justify-between px-4 pb-3">
                  <h3 className="font-semibold text-lg">Save to board</h3>
                  <button
                    onClick={() => setSelectedPin(null)}
                    className="p-2 hover:bg-muted rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Image Preview */}
                <div className="px-4 pb-4 border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-muted">
                      <Image
                        src={selectedPin.thumbnailUrl || selectedPin.imageUrl}
                        alt={selectedPin.title}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                        unoptimized
                      />
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{selectedPin.title}</p>
                  </div>
                </div>

                {/* Board List */}
                <div className="p-2 overflow-y-auto max-h-[50vh]">
                  {userMoodboards.map((board) => (
                    <button
                      key={board.id}
                      onClick={() => handleSaveToBoard(board.id, board.name)}
                      className="w-full flex items-center gap-3 p-3 hover:bg-muted rounded-xl transition-colors"
                    >
                      <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center shrink-0">
                        <ImageIcon className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-medium">{board.name}</p>
                        <p className="text-sm text-muted-foreground">{board.itemCount} pins</p>
                      </div>
                      <Plus className="w-5 h-5 text-muted-foreground" />
                    </button>
                  ))}
                </div>

                {/* Create New Board */}
                <div className="p-4 border-t border-border pb-8">
                  <Button variant="outline" className="w-full rounded-xl" asChild>
                    <a href="/moodboard">
                      <Plus className="w-4 h-4 mr-2" />
                      Create new board
                    </a>
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </PageContainer>
    </>
  );
}
