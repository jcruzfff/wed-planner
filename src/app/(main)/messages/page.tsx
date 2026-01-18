"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { Header } from "@/components/layout/header";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const conversations = [
  {
    id: "1",
    name: "The Garden Estate",
    type: "Venue",
    avatar: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=100&h=100&fit=crop",
    lastMessage: "Great! We can confirm your booking for October 15th. I'll send over the contract shortly.",
    time: "2h ago",
    unread: 2,
  },
  {
    id: "2",
    name: "Emily Rose Photography",
    type: "Photographer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    lastMessage: "The engagement photos are ready! Check your email for the gallery link.",
    time: "Yesterday",
    unread: 0,
  },
  {
    id: "3",
    name: "Bloom & Wild Florals",
    type: "Florist",
    avatar: "https://images.unsplash.com/photo-1519741497674-611481863552?w=100&h=100&fit=crop",
    lastMessage: "Here are some options for the centerpieces based on your moodboard...",
    time: "2 days ago",
    unread: 0,
  },
  {
    id: "4",
    name: "Harmony Strings",
    type: "Music",
    avatar: null,
    lastMessage: "We'd be happy to play during your ceremony! Our availability for October...",
    time: "3 days ago",
    unread: 1,
  },
  {
    id: "5",
    name: "Delicious Catering Co.",
    type: "Catering",
    avatar: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=100&h=100&fit=crop",
    lastMessage: "Thank you for the tasting! Let me know which menu options you'd like to proceed with.",
    time: "1 week ago",
    unread: 0,
  },
];

export default function MessagesPage() {
  return (
    <>
      <Header title="Messages" />
      <PageContainer className="pt-4">
        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search messages..."
              className="pl-12 h-12 rounded-xl bg-muted border-0"
            />
          </div>
        </motion.div>

        {/* Conversations */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="space-y-1"
        >
          {conversations.map((conversation, index) => (
            <motion.div
              key={conversation.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + index * 0.05 }}
            >
              <button
                className={cn(
                  "w-full flex items-start gap-3 p-4 rounded-xl transition-colors hover:bg-muted/50 active:bg-muted text-left",
                  conversation.unread > 0 && "bg-primary/5"
                )}
              >
                <Avatar className="w-12 h-12 shrink-0">
                  {conversation.avatar ? (
                    <AvatarImage src={conversation.avatar} alt={conversation.name} />
                  ) : null}
                  <AvatarFallback className="bg-sage/10 text-sage">
                    {conversation.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        "font-medium truncate",
                        conversation.unread > 0 && "font-semibold"
                      )}>
                        {conversation.name}
                      </span>
                      <Badge variant="muted" className="text-[10px] py-0 px-1.5">
                        {conversation.type}
                      </Badge>
                    </div>
                    <span className="text-xs text-muted-foreground shrink-0">
                      {conversation.time}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className={cn(
                      "text-sm truncate pr-2",
                      conversation.unread > 0 
                        ? "text-foreground" 
                        : "text-muted-foreground"
                    )}>
                      {conversation.lastMessage}
                    </p>
                    {conversation.unread > 0 && (
                      <span className="shrink-0 w-5 h-5 bg-primary text-white text-xs font-medium rounded-full flex items-center justify-center">
                        {conversation.unread}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty state would go here if no messages */}
      </PageContainer>
    </>
  );
}
