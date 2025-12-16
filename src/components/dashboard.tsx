// "use client";

// import { useState, useEffect } from "react";
// import AddPriceModal  from "@/components/add-price-modal";
// import { PriceList } from "@/components/price-list";
// import Axios from "@/libs/axiosConfig";
// import { signOut } from "next-auth/react";

// interface PriceEntry {
//   id: string;
//   product: string;
//   category: string;
//   marketLocation: string;
//   price: number;
//   submittedBy?: string;
//   dateCreated: Date;
// }

// type FormError = {
//   path?: string;
//   message: string;
// };

// export function Dashboard() {
//   const [entries, setEntries] = useState<PriceEntry[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<FormError | null>(null);

//   const fetchPrices = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await Axios.get("/price-entry");
//       const data = response.data.data;
//       const formattedEntries = data.map((entry: any) => ({
//         ...entry,
//         dateCreated: new Date(entry.createdAt),
//       }));

//       setEntries(formattedEntries);
//     } catch (err: any) {
//       console.error("[v0] Error fetching prices:", err);
//       setError({
//         message: err.response?.data?.message || "Failed to load prices",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPrices();
//   }, []);

//   const handleAddPrice = async (
//     newEntry: Omit<PriceEntry, "id" | "dateCreated">
//   ) => {
//     console.log({ newEntry });
//     setError(null);
//     try {
//       const response = await Axios.post("/price-entry", newEntry);
//       const data = response.data;

//       if (!data) {
//         setError({
//           message: "Failed to add price entry",
//         });
//         return;
//       }
//       await fetchPrices();
//     } catch (err: any) {
//       console.error("[v0] Error adding price:", err);
//       setError({
//         path: err.response?.data?.path,
//         message: err.response?.data?.message || "Failed to add price entry",
//       });
//     }
//   };

//   const handleSignOut = () => {
//     signOut({
//       redirect: true,
//       callbackUrl: "/login",
//     });
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       <div className="border-b bg-card">
//         <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
//           <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//             <div className="order-2 sm:order-1">
//               <h1 className="text-2xl font-semibold tracking-tight">
//                 Dashboard
//               </h1>
//               <p className="text-sm text-muted-foreground mt-1">
//                 View and manage marketplace prices
//               </p>
//             </div>
//             <div className="order-1 self-start sm:order-2 flex gap-2">
//               <AddPriceModal onSubmit={handleAddPrice} />
//               <button
//                 onClick={handleSignOut}
//                 className="h-11 w-36 rounded-md bg-destructive text-white font-semibold hover:bg-destructive/80"
//               >
//                 Sign Out
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
//         {error && (
//           <div className="mb-4 rounded-lg border border-destructive/50 bg-destructive/10 p-4">
//             <p className="text-sm text-destructive">{error.message}</p>
//           </div>
//         )}

//         {loading ? (
//           <div className="flex items-center justify-center py-16">
//             <p className="text-muted-foreground">Loading prices...</p>
//           </div>
//         ) : (
//           <PriceList entries={entries} />
//         )}
//       </div>
//     </div>
//   );
// }
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

// Types
interface PriceEntry {
  id: string;
  product: string;
  category: string;
  marketLocation: string;
  price: number;
  submittedBy?: string;
  createdAt: Date;
}

// PriceCard Component
function PriceCard({ entry }: { entry: PriceEntry }) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "GMD",
    }).format(price);
  };

  return (
    <div className="group relative bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-blue-300 overflow-hidden">
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-transparent rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />

      <div className="relative">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Package className="w-4 h-4 text-blue-600" />
              <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
                {entry.product}
              </h3>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-gray-600 mb-1">
              <Tag className="w-3.5 h-3.5" />
              <span>{entry.category}</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-gray-600">
              <MapPin className="w-3.5 h-3.5" />
              <span>{entry.marketLocation}</span>
            </div>
          </div>
        </div>

        {/* Price - Prominent Display */}
        <div className="mb-4 py-3 px-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
          <div className="flex items-baseline justify-between">
            <span className="text-sm font-medium text-gray-600">Price</span>
            <span className="text-2xl font-bold text-blue-700">
              {formatPrice(entry.price)}
            </span>
          </div>
        </div>

        {/* Footer Meta */}
        <div className="pt-3 border-t border-gray-100 space-y-1.5">
          {entry.submittedBy && (
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <User className="w-3.5 h-3.5" />
              <span>{entry.submittedBy}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Calendar className="w-3.5 h-3.5" />
            <span>{formatDate(entry.createdAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// EmptyState Component
function EmptyState() {
  return (
    <div className="text-center py-16 px-4">
      <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mb-4">
        <Package className="w-10 h-10 text-blue-600" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        No prices yet
      </h3>
      <p className="text-gray-600 max-w-sm mx-auto">
        Get started by adding your first price entry to track marketplace trends
      </p>
    </div>
  );
}

// PriceList Component
function PriceList({ entries }: { entries: PriceEntry[] }) {
  if (entries.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {entries.map((entry) => (
        <PriceCard key={entry.id} entry={entry} />
      ))}
    </div>
  );
}

// Main Dashboard Component
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
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            {/* Logo & Title */}
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

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* <AddPriceModal onSubmit={handleAddPrice} /> */}
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

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
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

        {/* Search & Filter Bar */}
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

        {/* Price List */}
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
