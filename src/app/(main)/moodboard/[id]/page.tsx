"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Plus, 
  Link as LinkIcon, 
  Upload, 
  Trash2,
  Tag,
  X
} from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription 
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { generateId } from "@/lib/utils";
import type { MoodboardItem } from "@/types";

// Demo moodboard items
const initialItems: MoodboardItem[] = [
  {
    id: "1",
    moodboard_id: "1",
    image_url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=600&fit=crop",
    source_url: "https://pinterest.com",
    tags: ["romantic", "garden", "roses"],
    notes: "Love the cascading roses",
    order: 1,
    created_at: "",
  },
  {
    id: "2",
    moodboard_id: "1",
    image_url: "https://images.unsplash.com/photo-1522748906645-95d8adfd52c7?w=400&h=400&fit=crop",
    source_url: null,
    tags: ["minimal", "modern"],
    notes: null,
    order: 2,
    created_at: "",
  },
  {
    id: "3",
    moodboard_id: "1",
    image_url: "https://images.unsplash.com/photo-1561128290-006dc64dd8db?w=400&h=500&fit=crop",
    source_url: null,
    tags: ["greenery", "natural"],
    notes: "Perfect for ceremony arch",
    order: 3,
    created_at: "",
  },
  {
    id: "4",
    moodboard_id: "1",
    image_url: "https://images.unsplash.com/photo-1517263904808-5dc91e3e7044?w=400&h=350&fit=crop",
    source_url: null,
    tags: ["boho", "wildflowers"],
    notes: null,
    order: 4,
    created_at: "",
  },
  {
    id: "5",
    moodboard_id: "1",
    image_url: "https://images.unsplash.com/photo-1525258946800-98cbe595c8f7?w=400&h=450&fit=crop",
    source_url: null,
    tags: ["elegant", "white"],
    notes: null,
    order: 5,
    created_at: "",
  },
  {
    id: "6",
    moodboard_id: "1",
    image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
    source_url: null,
    tags: ["centerpiece", "blush"],
    notes: "Table centerpiece idea",
    order: 6,
    created_at: "",
  },
];

const suggestedTags = [
  "romantic", "modern", "rustic", "boho", "elegant", 
  "minimalist", "garden", "vintage", "coastal", "glamorous"
];

export default function MoodboardDetailPage() {
  const params = useParams();
  const boardId = params.id as string;
  
  const [items, setItems] = useState(initialItems);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MoodboardItem | null>(null);
  
  const [newItem, setNewItem] = useState({
    imageUrl: "",
    sourceUrl: "",
    notes: "",
    tags: [] as string[],
  });

  const addTag = (tag: string) => {
    if (!newItem.tags.includes(tag)) {
      setNewItem(prev => ({ ...prev, tags: [...prev.tags, tag] }));
    }
  };

  const removeTag = (tag: string) => {
    setNewItem(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }));
  };

  const addItem = () => {
    const item: MoodboardItem = {
      id: generateId(),
      moodboard_id: boardId,
      image_url: newItem.imageUrl,
      source_url: newItem.sourceUrl || null,
      tags: newItem.tags,
      notes: newItem.notes || null,
      order: items.length + 1,
      created_at: new Date().toISOString(),
    };
    
    setItems(prev => [item, ...prev]);
    setNewItem({ imageUrl: "", sourceUrl: "", notes: "", tags: [] });
    setShowAddDialog(false);
  };

  const deleteItem = (itemId: string) => {
    setItems(prev => prev.filter(i => i.id !== itemId));
    setSelectedItem(null);
  };

  // Get board name based on ID (in real app, fetch from DB)
  const boardName = boardId === "1" ? "Florals" : 
                    boardId === "2" ? "Venue Ideas" : 
                    boardId === "3" ? "Table Settings" : "Moodboard";

  return (
    <>
      <Header 
        title={boardName} 
        showBack 
        rightAction={
          <Button size="icon-sm" onClick={() => setShowAddDialog(true)}>
            <Plus className="w-5 h-5" />
          </Button>
        }
      />
      <PageContainer className="pt-4" noPadding>
        {/* Masonry Grid */}
        <div className="columns-2 gap-3 px-4 pb-4">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="break-inside-avoid mb-3"
            >
              <button
                onClick={() => setSelectedItem(item)}
                className="relative group w-full rounded-xl overflow-hidden bg-muted"
              >
                <img
                  src={item.image_url}
                  alt=""
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                
                {/* Tags */}
                {item.tags.length > 0 && (
                  <div className="absolute bottom-2 left-2 right-2 flex flex-wrap gap-1">
                    {item.tags.slice(0, 2).map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="secondary"
                        className="text-[10px] py-0 bg-white/90"
                      >
                        {tag}
                      </Badge>
                    ))}
                    {item.tags.length > 2 && (
                      <Badge 
                        variant="secondary"
                        className="text-[10px] py-0 bg-white/90"
                      >
                        +{item.tags.length - 2}
                      </Badge>
                    )}
                  </div>
                )}
              </button>
            </motion.div>
          ))}
        </div>

        {items.length === 0 && (
          <div className="text-center py-12 px-4">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground mb-4">
              Start adding inspiration to your board
            </p>
            <Button onClick={() => setShowAddDialog(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Image
            </Button>
          </div>
        )}

        {/* Add Item Dialog */}
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogContent className="max-w-md mx-4">
            <DialogHeader>
              <DialogTitle>Add Inspiration</DialogTitle>
              <DialogDescription>
                Save an image to your moodboard
              </DialogDescription>
            </DialogHeader>
            
            <Tabs defaultValue="url" className="mt-4">
              <TabsList className="w-full">
                <TabsTrigger value="url" className="flex-1">
                  <LinkIcon className="w-4 h-4 mr-2" />
                  From URL
                </TabsTrigger>
                <TabsTrigger value="upload" className="flex-1">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload
                </TabsTrigger>
              </TabsList>

              <TabsContent value="url" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="imageUrl">Image URL</Label>
                  <Input
                    id="imageUrl"
                    placeholder="https://..."
                    value={newItem.imageUrl}
                    onChange={(e) => setNewItem(prev => ({ ...prev, imageUrl: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sourceUrl">Source URL (optional)</Label>
                  <Input
                    id="sourceUrl"
                    placeholder="Where did you find this?"
                    value={newItem.sourceUrl}
                    onChange={(e) => setNewItem(prev => ({ ...prev, sourceUrl: e.target.value }))}
                  />
                </div>
              </TabsContent>

              <TabsContent value="upload" className="mt-4">
                <div className="border-2 border-dashed border-border rounded-xl p-8 text-center">
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Drag & drop or click to upload
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="file-upload"
                  />
                  <Button variant="outline" size="sm" className="mt-3" asChild>
                    <label htmlFor="file-upload">Choose File</label>
                  </Button>
                </div>
              </TabsContent>
            </Tabs>

            <div className="space-y-4">
              {/* Tags */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Tags
                </Label>
                <div className="flex flex-wrap gap-2">
                  {newItem.tags.map((tag) => (
                    <Badge 
                      key={tag} 
                      variant="default"
                      className="cursor-pointer"
                      onClick={() => removeTag(tag)}
                    >
                      {tag}
                      <X className="w-3 h-3 ml-1" />
                    </Badge>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {suggestedTags
                    .filter(t => !newItem.tags.includes(t))
                    .slice(0, 6)
                    .map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="outline"
                        className="cursor-pointer hover:bg-primary/10"
                        onClick={() => addTag(tag)}
                      >
                        + {tag}
                      </Badge>
                    ))}
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes">Notes (optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="What do you love about this?"
                  value={newItem.notes}
                  onChange={(e) => setNewItem(prev => ({ ...prev, notes: e.target.value }))}
                  rows={2}
                />
              </div>

              <Button 
                className="w-full" 
                onClick={addItem}
                disabled={!newItem.imageUrl.trim()}
              >
                Save to Board
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Item Detail Dialog */}
        <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
          <DialogContent className="max-w-md mx-4 p-0 overflow-hidden">
            {selectedItem && (
              <>
                <img
                  src={selectedItem.image_url}
                  alt=""
                  className="w-full h-auto max-h-[50vh] object-cover"
                />
                <div className="p-4 space-y-3">
                  {selectedItem.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.tags.map((tag) => (
                        <Badge key={tag} variant="default">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  {selectedItem.notes && (
                    <p className="text-sm text-muted-foreground">
                      {selectedItem.notes}
                    </p>
                  )}

                  {selectedItem.source_url && (
                    <a 
                      href={selectedItem.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline flex items-center gap-1"
                    >
                      <LinkIcon className="w-3 h-3" />
                      View Source
                    </a>
                  )}

                  <div className="flex gap-2 pt-2">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => setSelectedItem(null)}
                    >
                      Close
                    </Button>
                    <Button 
                      variant="destructive"
                      size="icon"
                      onClick={() => deleteItem(selectedItem.id)}
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
