"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { 
  Plus, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  PieChart,
  AlertTriangle
} from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BudgetCard } from "@/components/cards/budget-card";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription 
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { cn, formatCurrency, generateId, calculatePercentage } from "@/lib/utils";
import type { BudgetCategory, BudgetItem } from "@/types";

// Demo budget data
const initialCategories: BudgetCategory[] = [
  { id: "1", wedding_id: "demo", name: "Venue", category: "venue", allocated: 12000, spent: 8000, order: 1, created_at: "", updated_at: "" },
  { id: "2", wedding_id: "demo", name: "Catering", category: "catering", allocated: 8000, spent: 2500, order: 2, created_at: "", updated_at: "" },
  { id: "3", wedding_id: "demo", name: "Photography", category: "photography", allocated: 4000, spent: 3500, order: 3, created_at: "", updated_at: "" },
  { id: "4", wedding_id: "demo", name: "Flowers", category: "flowers", allocated: 2500, spent: 0, order: 4, created_at: "", updated_at: "" },
  { id: "5", wedding_id: "demo", name: "Music & Entertainment", category: "music", allocated: 2000, spent: 1500, order: 5, created_at: "", updated_at: "" },
  { id: "6", wedding_id: "demo", name: "Attire", category: "attire", allocated: 3000, spent: 2200, order: 6, created_at: "", updated_at: "" },
  { id: "7", wedding_id: "demo", name: "Decor & Rentals", category: "decor", allocated: 2000, spent: 500, order: 7, created_at: "", updated_at: "" },
  { id: "8", wedding_id: "demo", name: "Stationery", category: "stationery", allocated: 800, spent: 300, order: 8, created_at: "", updated_at: "" },
];

const initialItems: BudgetItem[] = [
  { id: "1", wedding_id: "demo", category_id: "1", vendor_id: null, name: "Venue Deposit", description: "Garden Estate deposit", estimated_cost: 4000, actual_cost: 4000, payment_status: "paid", due_date: null, paid_date: "2026-01-15", notes: null, created_at: "", updated_at: "" },
  { id: "2", wedding_id: "demo", category_id: "1", vendor_id: null, name: "Venue Balance", description: "Remaining venue payment", estimated_cost: 4000, actual_cost: 4000, payment_status: "deposit_paid", due_date: "2026-09-15", paid_date: null, notes: null, created_at: "", updated_at: "" },
  { id: "3", wedding_id: "demo", category_id: "3", vendor_id: null, name: "Photography Package", description: "Emily Rose Photography - Premium Package", estimated_cost: 3500, actual_cost: 3500, payment_status: "deposit_paid", due_date: null, paid_date: null, notes: null, created_at: "", updated_at: "" },
];

export default function BudgetPage() {
  const [categories, setCategories] = useState(initialCategories);
  const [items, setItems] = useState(initialItems);
  const [showAddDialog, setShowAddDialog] = useState(false);
  
  // New item form state
  const [newItem, setNewItem] = useState({
    name: "",
    categoryId: "",
    estimatedCost: "",
    actualCost: "",
    paymentStatus: "quote" as BudgetItem["payment_status"],
  });

  const stats = useMemo(() => {
    const totalBudget = categories.reduce((sum, c) => sum + c.allocated, 0);
    const totalSpent = categories.reduce((sum, c) => sum + c.spent, 0);
    const remaining = totalBudget - totalSpent;
    const percentUsed = calculatePercentage(totalSpent, totalBudget);
    const isOverBudget = totalSpent > totalBudget;
    
    return { totalBudget, totalSpent, remaining, percentUsed, isOverBudget };
  }, [categories]);

  const addItem = () => {
    const item: BudgetItem = {
      id: generateId(),
      wedding_id: "demo",
      category_id: newItem.categoryId,
      vendor_id: null,
      name: newItem.name,
      description: null,
      estimated_cost: parseFloat(newItem.estimatedCost) || 0,
      actual_cost: newItem.actualCost ? parseFloat(newItem.actualCost) : null,
      payment_status: newItem.paymentStatus,
      due_date: null,
      paid_date: null,
      notes: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    
    setItems(prev => [...prev, item]);
    
    // Update category spent amount
    if (item.actual_cost) {
      setCategories(prev =>
        prev.map(c =>
          c.id === item.category_id
            ? { ...c, spent: c.spent + (item.actual_cost || 0) }
            : c
        )
      );
    }
    
    setNewItem({
      name: "",
      categoryId: "",
      estimatedCost: "",
      actualCost: "",
      paymentStatus: "quote",
    });
    setShowAddDialog(false);
  };

  return (
    <>
      <Header 
        title="Budget" 
        showBack 
        rightAction={
          <Button size="icon-sm" onClick={() => setShowAddDialog(true)}>
            <Plus className="w-5 h-5" />
          </Button>
        }
      />
      <PageContainer className="pt-4">
        {/* Budget Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="bg-linear-to-br from-emerald-500 to-emerald-600 border-0 text-white mb-6">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  <span className="font-medium">Total Budget</span>
                </div>
                {stats.isOverBudget ? (
                  <Badge className="bg-white/20 text-white border-0">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    Over Budget
                  </Badge>
                ) : (
                  <Badge className="bg-white/20 text-white border-0">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    On Track
                  </Badge>
                )}
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-white/70 text-xs mb-1">Total</p>
                  <p className="text-xl font-bold">{formatCurrency(stats.totalBudget)}</p>
                </div>
                <div>
                  <p className="text-white/70 text-xs mb-1">Spent</p>
                  <p className="text-xl font-bold">{formatCurrency(stats.totalSpent)}</p>
                </div>
                <div>
                  <p className="text-white/70 text-xs mb-1">Remaining</p>
                  <p className={cn(
                    "text-xl font-bold",
                    stats.isOverBudget && "text-yellow-200"
                  )}>
                    {stats.isOverBudget ? "-" : ""}{formatCurrency(Math.abs(stats.remaining))}
                  </p>
                </div>
              </div>
              
              <Progress 
                value={Math.min(stats.percentUsed, 100)} 
                className="h-2 bg-white/20"
                indicatorClassName={cn(
                  stats.isOverBudget ? "bg-yellow-300" : 
                  stats.percentUsed > 80 ? "bg-yellow-300" : "bg-white"
                )}
              />
              <p className="text-sm text-white/70 mt-2">
                {stats.percentUsed}% of budget used
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 gap-3 mb-6"
        >
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-success/10 rounded-full">
                <TrendingDown className="w-4 h-4 text-success" />
              </div>
              <span className="text-sm text-muted-foreground">Deposits Paid</span>
            </div>
            <p className="text-lg font-semibold">
              {formatCurrency(items.filter(i => i.payment_status !== "quote").reduce((sum, i) => sum + (i.actual_cost || 0), 0))}
            </p>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-warning/10 rounded-full">
                <DollarSign className="w-4 h-4 text-warning" />
              </div>
              <span className="text-sm text-muted-foreground">Pending</span>
            </div>
            <p className="text-lg font-semibold">
              {formatCurrency(stats.remaining > 0 ? stats.remaining : 0)}
            </p>
          </Card>
        </motion.div>

        {/* Category Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">By Category</h2>
            <Button variant="ghost" size="sm" className="text-primary">
              <PieChart className="w-4 h-4 mr-1" />
              View Chart
            </Button>
          </div>
          
          <div className="space-y-3">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
              >
                <BudgetCard
                  category={category.name}
                  categoryType={category.category}
                  allocated={category.allocated}
                  spent={category.spent}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Expenses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-6"
        >
          <h2 className="text-lg font-semibold mb-3">Recent Expenses</h2>
          <Card>
            <CardContent className="p-0 divide-y divide-border">
              {items.slice(0, 5).map((item) => {
                const category = categories.find(c => c.id === item.category_id);
                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4"
                  >
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {category?.name}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">
                        {formatCurrency(item.actual_cost || item.estimated_cost)}
                      </p>
                      <Badge 
                        variant={
                          item.payment_status === "paid" ? "success" :
                          item.payment_status === "quote" ? "muted" : "warning"
                        }
                        className="text-xs"
                      >
                        {item.payment_status === "paid" ? "Paid" :
                         item.payment_status === "quote" ? "Quote" :
                         item.payment_status === "deposit_paid" ? "Deposit" : "Partial"}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </motion.div>

        {/* Add Expense Dialog */}
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogContent className="max-w-md mx-4">
            <DialogHeader>
              <DialogTitle>Add Expense</DialogTitle>
              <DialogDescription>
                Track a new expense or quote
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="name">Expense Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Venue deposit"
                  value={newItem.name}
                  onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Category</Label>
                <Select
                  value={newItem.categoryId}
                  onValueChange={(value) => setNewItem(prev => ({ ...prev, categoryId: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="estimated">Estimated Cost</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="estimated"
                      type="number"
                      placeholder="0"
                      className="pl-8"
                      value={newItem.estimatedCost}
                      onChange={(e) => setNewItem(prev => ({ ...prev, estimatedCost: e.target.value }))}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="actual">Actual Cost</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="actual"
                      type="number"
                      placeholder="0"
                      className="pl-8"
                      value={newItem.actualCost}
                      onChange={(e) => setNewItem(prev => ({ ...prev, actualCost: e.target.value }))}
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Payment Status</Label>
                <Select
                  value={newItem.paymentStatus}
                  onValueChange={(value) => setNewItem(prev => ({ ...prev, paymentStatus: value as BudgetItem["payment_status"] }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="quote">Quote</SelectItem>
                    <SelectItem value="deposit_paid">Deposit Paid</SelectItem>
                    <SelectItem value="partial">Partially Paid</SelectItem>
                    <SelectItem value="paid">Paid in Full</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                className="w-full" 
                onClick={addItem}
                disabled={!newItem.name.trim() || !newItem.categoryId}
              >
                Add Expense
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </PageContainer>
    </>
  );
}
