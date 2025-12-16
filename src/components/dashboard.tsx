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
  AlertCircle,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { AddPriceModal } from "./add-price-modal";
import PriceList from "./price-list";
import Axios from "@/libs/axiosConfig";

interface PriceEntry {
  id: string;
  product: string;
  category: string;
  marketLocation: string;
  price: number;
  submittedBy?: string;
  createdAt: Date;
}

type FormError = {
  path?: string;
  message: string;
};

export default function Dashboard() {
  const [entries, setEntries] = useState<PriceEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState<FormError | null>(null);

  const fetchPrices = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await Axios.get("/price-entry");
      const data = response.data.data;
      const formattedEntries = data.map((entry: any) => ({
        ...entry,
        createdAt: new Date(entry.createdAt),
      }));

      setEntries(formattedEntries);
    } catch (err: any) {
      console.error("[v0] Error fetching prices:", err);
      setError({
        message: err.response?.data?.message || "Failed to load prices",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();
  }, []);

  const handleAddPrice = async (
    newEntry: Omit<PriceEntry, "id" | "createdAt">
  ) => {
    console.log({ newEntry });
    setError(null);
    try {
      const response = await Axios.post("/price-entry", newEntry);
      const data = response.data;

      if (!data) {
        setError({
          message: "Failed to add price entry",
        });
        return;
      }
      await fetchPrices();
    } catch (err: any) {
      console.error("[v0] Error adding price:", err);
      setError({
        path: err.response?.data?.path,
        message: err.response?.data?.message || "Failed to add price entry",
      });
    }
  };

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
              <AddPriceModal onSubmit={handleAddPrice} />
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
        {error && (
          <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg mb-6">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <p className="text-sm text-red-800">{error.message}</p>
          </div>
        )}

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
