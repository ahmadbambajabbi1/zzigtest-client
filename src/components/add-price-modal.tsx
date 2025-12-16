"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";

interface PriceEntry {
  product: string;
  category: string;
  marketLocation: string;
  price: number;
}

interface AddPriceModalProps {
  onSubmit: (entry: PriceEntry) => Promise<void>;
}

export function AddPriceModal({ onSubmit }: AddPriceModalProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    product: "",
    category: "",
    marketLocation: "",
    price: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.product ||
      !formData.category ||
      !formData.marketLocation ||
      !formData.price
    ) {
      return;
    }

    setLoading(true);

    try {
      await onSubmit({
        product: formData.product,
        category: formData.category,
        marketLocation: formData.marketLocation,
        price: Number.parseFloat(formData.price),
      });

      // Reset form and close modal
      setFormData({
        product: "",
        category: "",
        marketLocation: "",
        price: "",
      });
      setOpen(false);
    } catch (err) {
      console.error("[v0] Error in form submission:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          Add Price
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Price Entry</DialogTitle>
          <DialogDescription>
            Submit a new marketplace price entry to the public database
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="product">Product Name</Label>
              <Input
                id="product"
                placeholder="Enter product name"
                value={formData.product}
                onChange={(e) =>
                  setFormData({ ...formData, product: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                placeholder="Enter category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="marketLocation">Market Location</Label>
              <Input
                id="marketLocation"
                placeholder="Enter marketLocation location"
                value={formData.marketLocation}
                onChange={(e) =>
                  setFormData({ ...formData, marketLocation: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit Entry"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
