"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Phone, 
  Mail, 
  Globe, 
  Instagram, 
  MapPin,
  FileText,
  DollarSign,
  Calendar,
  Star,
  Edit,
  MessageCircle,
  CheckCircle2,
  Clock
} from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { cn, formatCurrency } from "@/lib/utils";
import type { Vendor, VendorStatus } from "@/types";

// Demo vendor data
const vendorData: Vendor = {
  id: "1",
  wedding_id: "demo",
  name: "The Garden Estate",
  category: "venue",
  contact_name: "Jennifer Morrison",
  email: "events@gardenestate.com",
  phone: "(555) 123-4567",
  website: "https://gardenestate.com",
  instagram: "@gardenestate",
  address: "1234 Vineyard Lane, Napa Valley, CA 94558",
  status: "booked",
  quoted_price: 12000,
  final_price: 12000,
  deposit_amount: 4000,
  deposit_paid: true,
  contract_signed: true,
  contract_url: null,
  notes: "Beautiful garden venue with mountain views. Includes ceremony and reception spaces. 6-hour rental includes setup and breakdown time.",
  rating: 5,
  created_at: "",
  updated_at: "",
};

const statusConfig: Record<VendorStatus, { color: string; label: string }> = {
  researching: { color: "bg-gray-100 text-gray-700", label: "Researching" },
  contacted: { color: "bg-blue-100 text-blue-700", label: "Contacted" },
  quoted: { color: "bg-yellow-100 text-yellow-700", label: "Quoted" },
  booked: { color: "bg-green-100 text-green-700", label: "Booked" },
  declined: { color: "bg-red-100 text-red-700", label: "Declined" },
};

export default function VendorDetailPage() {
  const params = useParams();
  const vendorId = params.id as string;
  
  const [vendor] = useState(vendorData);
  const [notes, setNotes] = useState(vendor.notes || "");

  const totalPrice = vendor.final_price || vendor.quoted_price || 0;
  const paidAmount = vendor.deposit_paid ? (vendor.deposit_amount || 0) : 0;
  const remainingBalance = totalPrice - paidAmount;
  const paymentProgress = totalPrice > 0 ? (paidAmount / totalPrice) * 100 : 0;

  return (
    <>
      <Header 
        title={vendor.name} 
        showBack 
        rightAction={
          <Button variant="ghost" size="icon-sm">
            <Edit className="w-5 h-5" />
          </Button>
        }
      />
      <PageContainer className="pt-4">
        {/* Status & Category */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 mb-4"
        >
          <Badge className={cn("capitalize", statusConfig[vendor.status].color)}>
            {statusConfig[vendor.status].label}
          </Badge>
          <Badge variant="outline" className="capitalize">
            {vendor.category}
          </Badge>
          {vendor.rating && (
            <div className="flex items-center gap-1 ml-auto">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "w-4 h-4",
                    i < vendor.rating! 
                      ? "fill-yellow-400 text-yellow-400" 
                      : "text-gray-300"
                  )}
                />
              ))}
            </div>
          )}
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="mb-4">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {vendor.contact_name && (
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-muted rounded-lg">
                    <MessageCircle className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Contact</p>
                    <p className="font-medium">{vendor.contact_name}</p>
                  </div>
                </div>
              )}
              
              {vendor.phone && (
                <a 
                  href={`tel:${vendor.phone}`}
                  className="flex items-center gap-3 hover:bg-muted p-2 -m-2 rounded-lg transition-colors"
                >
                  <div className="p-2 bg-muted rounded-lg">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium text-primary">{vendor.phone}</p>
                  </div>
                </a>
              )}
              
              {vendor.email && (
                <a 
                  href={`mailto:${vendor.email}`}
                  className="flex items-center gap-3 hover:bg-muted p-2 -m-2 rounded-lg transition-colors"
                >
                  <div className="p-2 bg-muted rounded-lg">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium text-primary">{vendor.email}</p>
                  </div>
                </a>
              )}
              
              {vendor.website && (
                <a 
                  href={vendor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:bg-muted p-2 -m-2 rounded-lg transition-colors"
                >
                  <div className="p-2 bg-muted rounded-lg">
                    <Globe className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Website</p>
                    <p className="font-medium text-primary">Visit website</p>
                  </div>
                </a>
              )}
              
              {vendor.instagram && (
                <a 
                  href={`https://instagram.com/${vendor.instagram.replace("@", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:bg-muted p-2 -m-2 rounded-lg transition-colors"
                >
                  <div className="p-2 bg-muted rounded-lg">
                    <Instagram className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Instagram</p>
                    <p className="font-medium text-primary">{vendor.instagram}</p>
                  </div>
                </a>
              )}
              
              {vendor.address && (
                <a 
                  href={`https://maps.google.com/?q=${encodeURIComponent(vendor.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:bg-muted p-2 -m-2 rounded-lg transition-colors"
                >
                  <div className="p-2 bg-muted rounded-lg">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Address</p>
                    <p className="font-medium text-primary">{vendor.address}</p>
                  </div>
                </a>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Payment Info */}
        {totalPrice > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="mb-4">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Payment Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Total</p>
                    <p className="text-lg font-bold">{formatCurrency(totalPrice)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Paid</p>
                    <p className="text-lg font-bold text-success">{formatCurrency(paidAmount)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Balance</p>
                    <p className="text-lg font-bold">{formatCurrency(remainingBalance)}</p>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Payment progress</span>
                    <span>{Math.round(paymentProgress)}%</span>
                  </div>
                  <Progress value={paymentProgress} className="h-2" />
                </div>

                <div className="flex gap-2">
                  <div className={cn(
                    "flex-1 p-3 rounded-lg flex items-center gap-2",
                    vendor.deposit_paid ? "bg-success/10" : "bg-muted"
                  )}>
                    {vendor.deposit_paid ? (
                      <CheckCircle2 className="w-4 h-4 text-success" />
                    ) : (
                      <Clock className="w-4 h-4 text-muted-foreground" />
                    )}
                    <span className="text-sm font-medium">
                      Deposit {vendor.deposit_paid ? "Paid" : "Pending"}
                    </span>
                  </div>
                  <div className={cn(
                    "flex-1 p-3 rounded-lg flex items-center gap-2",
                    vendor.contract_signed ? "bg-success/10" : "bg-muted"
                  )}>
                    {vendor.contract_signed ? (
                      <CheckCircle2 className="w-4 h-4 text-success" />
                    ) : (
                      <FileText className="w-4 h-4 text-muted-foreground" />
                    )}
                    <span className="text-sm font-medium">
                      Contract {vendor.contract_signed ? "Signed" : "Pending"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="mb-4">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add notes about this vendor..."
                rows={4}
                className="resize-none"
              />
              {notes !== vendor.notes && (
                <Button size="sm" className="mt-2">
                  Save Notes
                </Button>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 gap-3 pb-4"
        >
          {vendor.phone && (
            <Button variant="outline" className="h-12" asChild>
              <a href={`tel:${vendor.phone}`}>
                <Phone className="w-4 h-4 mr-2" />
                Call
              </a>
            </Button>
          )}
          {vendor.email && (
            <Button variant="outline" className="h-12" asChild>
              <a href={`mailto:${vendor.email}`}>
                <Mail className="w-4 h-4 mr-2" />
                Email
              </a>
            </Button>
          )}
          {vendor.address && (
            <Button variant="outline" className="h-12 col-span-2" asChild>
              <a 
                href={`https://maps.google.com/?q=${encodeURIComponent(vendor.address)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MapPin className="w-4 h-4 mr-2" />
                Get Directions
              </a>
            </Button>
          )}
        </motion.div>
      </PageContainer>
    </>
  );
}
