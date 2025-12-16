"use client";
import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  Plus,
  LogOut,
  Package,
  MapPin,
  Tag,
  User,
  Calendar,
  Search,
  Filter,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { AddPriceModal } from "./add-price-modal";
import PriceList from "./price-list";

interface PriceEntry {
  id: string;
  product: string;
  category: string;
  marketLocation: string;
  price: number;
  submittedBy?: string;
  createdAt: Date;
}
export default function Dashboard() {
  const [entries, setEntries] = useState<PriceEntry[]>([
    {
      id: "1",
      product: "Rice (50kg bag)",
      category: "Grains",
      marketLocation: "Serekunda Market",
      price: 2500,
      submittedBy: "John Doe",
      createdAt: new Date("2024-12-15T10:30:00"),
    },
    {
      id: "2",
      product: "Tomatoes (1kg)",
      category: "Vegetables",
      marketLocation: "Brikama Market",
      price: 45,
      submittedBy: "Jane Smith",
      createdAt: new Date("2024-12-15T11:15:00"),
    },
    {
      id: "3",
      product: "Cooking Oil (5L)",
      category: "Oils",
      marketLocation: "Bakau Market",
      price: 450,
      submittedBy: "Ahmed Hassan",
      createdAt: new Date("2024-12-15T09:45:00"),
    },
    {
      id: "4",
      product: "Onions (1kg)",
      category: "Vegetables",
      marketLocation: "Serekunda Market",
      price: 35,
      submittedBy: "Fatou Jallow",
      createdAt: new Date("2024-12-14T16:20:00"),
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEntries = entries.filter(
    (entry) =>
      entry.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.marketLocation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSignOut = () => {
    signOut({
      redirect: true,
      callbackUrl: "/login",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-md">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Price Tracker
                </h1>
                <p className="text-sm text-gray-600">Marketplace Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleSignOut}
                className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-300 bg-white text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all duration-200"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Entries
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {entries.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Markets</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {new Set(entries.map((e) => e.marketLocation)).size}
                </p>
              </div>
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Categories</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {new Set(entries.map((e) => e.category)).size}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Tag className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products, categories, or markets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <button className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-300 bg-white text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all duration-200">
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading prices...</p>
            </div>
          </div>
        ) : (
          <PriceList entries={filteredEntries} />
        )}
      </main>
    </div>
  );
}
