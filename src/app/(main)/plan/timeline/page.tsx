"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Filter, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  ChevronDown,
  Search
} from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TaskCard } from "@/components/cards/task-card";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { cn, generateId, formatDateShort } from "@/lib/utils";
import type { TimelineTask, TaskCategory } from "@/types";

// Demo tasks data
const initialTasks: TimelineTask[] = [
  {
    id: "1",
    wedding_id: "demo",
    title: "Book your venue",
    description: "Research and book your ceremony and reception venues",
    category: "venue",
    due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    completed: false,
    completed_at: null,
    priority: "high",
    parent_task_id: null,
    order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    wedding_id: "demo",
    title: "Create guest list draft",
    description: "Start compiling your guest list with both sides of the family",
    category: "other",
    due_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    completed: false,
    completed_at: null,
    priority: "medium",
    parent_task_id: null,
    order: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "3",
    wedding_id: "demo",
    title: "Research photographers",
    description: "Browse portfolios and shortlist 5-10 photographers",
    category: "photography",
    due_date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
    completed: true,
    completed_at: new Date().toISOString(),
    priority: "medium",
    parent_task_id: null,
    order: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "4",
    wedding_id: "demo",
    title: "Set your budget",
    description: "Determine your total wedding budget and allocate to categories",
    category: "other",
    due_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    completed: true,
    completed_at: new Date().toISOString(),
    priority: "high",
    parent_task_id: null,
    order: 4,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "5",
    wedding_id: "demo",
    title: "Book photographer",
    description: "Schedule consultations and book your wedding photographer",
    category: "photography",
    due_date: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
    completed: false,
    completed_at: null,
    priority: "high",
    parent_task_id: null,
    order: 5,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "6",
    wedding_id: "demo",
    title: "Choose wedding party",
    description: "Ask your bridesmaids and groomsmen",
    category: "other",
    due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    completed: false,
    completed_at: null,
    priority: "low",
    parent_task_id: null,
    order: 6,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "7",
    wedding_id: "demo",
    title: "Book caterer",
    description: "Research and book your wedding catering",
    category: "catering",
    due_date: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
    completed: false,
    completed_at: null,
    priority: "medium",
    parent_task_id: null,
    order: 7,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "8",
    wedding_id: "demo",
    title: "Book florist",
    description: "Find and book your wedding florist",
    category: "flowers",
    due_date: new Date(Date.now() + 75 * 24 * 60 * 60 * 1000).toISOString(),
    completed: false,
    completed_at: null,
    priority: "medium",
    parent_task_id: null,
    order: 8,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const categoryOptions: { value: TaskCategory; label: string }[] = [
  { value: "venue", label: "Venue" },
  { value: "catering", label: "Catering" },
  { value: "photography", label: "Photography" },
  { value: "videography", label: "Videography" },
  { value: "music", label: "Music" },
  { value: "flowers", label: "Flowers" },
  { value: "attire", label: "Attire" },
  { value: "beauty", label: "Beauty" },
  { value: "stationery", label: "Stationery" },
  { value: "transportation", label: "Transportation" },
  { value: "decor", label: "Decor" },
  { value: "officiant", label: "Officiant" },
  { value: "other", label: "Other" },
];

const filterOptions = [
  { id: "all", label: "All Tasks" },
  { id: "todo", label: "To Do" },
  { id: "completed", label: "Completed" },
  { id: "overdue", label: "Overdue" },
];

export default function TimelinePage() {
  const [tasks, setTasks] = useState<TimelineTask[]>(initialTasks);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [expandedTasks, setExpandedTasks] = useState<Set<string>>(new Set());
  
  // New task form state
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    category: "other" as TaskCategory,
    priority: "medium" as "low" | "medium" | "high",
    dueDate: "",
  });

  const toggleTask = (taskId: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId
          ? {
              ...task,
              completed: !task.completed,
              completed_at: !task.completed ? new Date().toISOString() : null,
            }
          : task
      )
    );
  };

  const toggleExpand = (taskId: string) => {
    setExpandedTasks(prev => {
      const next = new Set(prev);
      if (next.has(taskId)) {
        next.delete(taskId);
      } else {
        next.add(taskId);
      }
      return next;
    });
  };

  const addTask = () => {
    const task: TimelineTask = {
      id: generateId(),
      wedding_id: "demo",
      title: newTask.title,
      description: newTask.description || null,
      category: newTask.category,
      due_date: newTask.dueDate || null,
      completed: false,
      completed_at: null,
      priority: newTask.priority,
      parent_task_id: null,
      order: tasks.length + 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    
    setTasks(prev => [task, ...prev]);
    setNewTask({
      title: "",
      description: "",
      category: "other",
      priority: "medium",
      dueDate: "",
    });
    setShowAddDialog(false);
  };

  const filteredTasks = useMemo(() => {
    let result = tasks;
    
    // Apply filter
    switch (filter) {
      case "todo":
        result = result.filter(t => !t.completed);
        break;
      case "completed":
        result = result.filter(t => t.completed);
        break;
      case "overdue":
        result = result.filter(
          t => !t.completed && t.due_date && new Date(t.due_date) < new Date()
        );
        break;
    }
    
    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        t =>
          t.title.toLowerCase().includes(query) ||
          t.description?.toLowerCase().includes(query)
      );
    }
    
    // Sort by due date
    return result.sort((a, b) => {
      if (!a.due_date) return 1;
      if (!b.due_date) return -1;
      return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
    });
  }, [tasks, filter, searchQuery]);

  // Group tasks by time period
  const groupedTasks = useMemo(() => {
    const groups: { label: string; tasks: TimelineTask[] }[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const thisWeek: TimelineTask[] = [];
    const thisMonth: TimelineTask[] = [];
    const upcoming: TimelineTask[] = [];
    const noDueDate: TimelineTask[] = [];
    const completed: TimelineTask[] = [];

    filteredTasks.forEach(task => {
      if (task.completed) {
        completed.push(task);
        return;
      }
      
      if (!task.due_date) {
        noDueDate.push(task);
        return;
      }
      
      const dueDate = new Date(task.due_date);
      const diffDays = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      
      if (diffDays <= 7) {
        thisWeek.push(task);
      } else if (diffDays <= 30) {
        thisMonth.push(task);
      } else {
        upcoming.push(task);
      }
    });

    if (thisWeek.length > 0) groups.push({ label: "This Week", tasks: thisWeek });
    if (thisMonth.length > 0) groups.push({ label: "This Month", tasks: thisMonth });
    if (upcoming.length > 0) groups.push({ label: "Upcoming", tasks: upcoming });
    if (noDueDate.length > 0) groups.push({ label: "No Due Date", tasks: noDueDate });
    if (completed.length > 0 && filter !== "todo") {
      groups.push({ label: "Completed", tasks: completed });
    }

    return groups;
  }, [filteredTasks, filter]);

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const overdue = tasks.filter(
      t => !t.completed && t.due_date && new Date(t.due_date) < new Date()
    ).length;
    
    return { total, completed, overdue, progress: Math.round((completed / total) * 100) };
  }, [tasks]);

  return (
    <>
      <Header 
        title="Timeline" 
        showBack 
        rightAction={
          <Button size="icon-sm" onClick={() => setShowAddDialog(true)}>
            <Plus className="w-5 h-5" />
          </Button>
        }
      />
      <PageContainer className="pt-4">
        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-xl border border-border p-4 mb-4"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>{stats.completed} done</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{stats.total - stats.completed} left</span>
              </div>
              {stats.overdue > 0 && (
                <div className="flex items-center gap-1 text-sm text-error">
                  <AlertTriangle className="w-4 h-4" />
                  <span>{stats.overdue} overdue</span>
                </div>
              )}
            </div>
            <Badge variant="default">{stats.progress}%</Badge>
          </div>
          <Progress value={stats.progress} className="h-2" />
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-4 space-y-3"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 rounded-xl bg-muted border-0"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto hide-scrollbar -mx-4 px-4 pb-1">
            {filterOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setFilter(option.id)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                  filter === option.id
                    ? "bg-primary text-white"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                {option.label}
                {option.id === "overdue" && stats.overdue > 0 && (
                  <span className="ml-1 text-xs">({stats.overdue})</span>
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Task Groups */}
        <div className="space-y-6 pb-4">
          {groupedTasks.map((group, groupIndex) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + groupIndex * 0.1 }}
            >
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">
                {group.label}
              </h3>
              <div className="space-y-3">
                {group.tasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onToggle={() => toggleTask(task.id)}
                    onExpand={() => toggleExpand(task.id)}
                    expanded={expandedTasks.has(task.id)}
                  />
                ))}
              </div>
            </motion.div>
          ))}
          
          {filteredTasks.length === 0 && (
            <div className="text-center py-12">
              <CheckCircle2 className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">
                {searchQuery 
                  ? "No tasks match your search" 
                  : filter === "completed"
                    ? "No completed tasks yet"
                    : "All caught up! Great job!"}
              </p>
            </div>
          )}
        </div>

        {/* Add Task Dialog */}
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogContent className="max-w-md mx-4">
            <DialogHeader>
              <DialogTitle>Add New Task</DialogTitle>
              <DialogDescription>
                Create a new task for your wedding timeline
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="title">Task Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Book venue"
                  value={newTask.title}
                  onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description (optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Add more details..."
                  value={newTask.description}
                  onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select
                    value={newTask.category}
                    onValueChange={(value) => setNewTask(prev => ({ ...prev, category: value as TaskCategory }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Select
                    value={newTask.priority}
                    onValueChange={(value) => setNewTask(prev => ({ ...prev, priority: value as "low" | "medium" | "high" }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date (optional)</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask(prev => ({ ...prev, dueDate: e.target.value }))}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
              
              <Button 
                className="w-full" 
                onClick={addTask}
                disabled={!newTask.title.trim()}
              >
                Add Task
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </PageContainer>
    </>
  );
}
