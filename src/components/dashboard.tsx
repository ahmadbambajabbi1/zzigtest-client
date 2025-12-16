"use client";

import { useState, useEffect } from "react";
import { AddPriceModal } from "@/components/add-price-modal";
import { PriceList } from "@/components/price-list";
import Axios from "@/libs/axiosConfig";
import { signOut } from "next-auth/react";

interface PriceEntry {
  id: string;
  product: string;
  category: string;
  marketLocation: string;
  price: number;
  submittedBy?: string;
  dateCreated: Date;
}

type FormError = {
  path?: string;
  message: string;
};

export function Dashboard() {
  const [entries, setEntries] = useState<PriceEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<FormError | null>(null);

  const fetchPrices = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await Axios.get("/price-entry");
      const data = response.data.data;
      const formattedEntries = data.map((entry: any) => ({
        ...entry,
        dateCreated: new Date(entry.createdAt),
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
    newEntry: Omit<PriceEntry, "id" | "dateCreated">
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

  const handleSignOut = () => {
    signOut({
      redirect: true,
      callbackUrl: "/login",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="order-2 sm:order-1">
              <h1 className="text-2xl font-semibold tracking-tight">
                Dashboard
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                View and manage marketplace prices
              </p>
            </div>
            <div className="order-1 self-start sm:order-2 flex gap-2">
              <AddPriceModal onSubmit={handleAddPrice} />
              <button
                onClick={handleSignOut}
                className="h-11 w-36 rounded-md bg-destructive text-white font-semibold hover:bg-destructive/80"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-4 rounded-lg border border-destructive/50 bg-destructive/10 p-4">
            <p className="text-sm text-destructive">{error.message}</p>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <p className="text-muted-foreground">Loading prices...</p>
          </div>
        ) : (
          <PriceList entries={entries} />
        )}
      </div>
    </div>
  );
}
