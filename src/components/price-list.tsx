"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface PriceEntry {
  id: string;
  product: string;
  category: string;
  marketLocation: string;
  price: number;
  submittedBy: string;
  dateCreated: Date;
}

interface PriceListProps {
  entries: PriceEntry[];
}

export function PriceList({ entries }: PriceListProps) {
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

  if (entries.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16">
          <p className="text-muted-foreground text-center">
            No price entries yet. Click "Add Price" to submit the first entry!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {entries.map((entry) => (
        <div
          key={entry.id}
          className="flex flex-col gap-2 rounded-md border bg-card p-4 transition-colors hover:bg-accent/50"
        >
          <h3 className="text-md font-semibold leading-tight">
            {entry.product}
          </h3>

          <div className="text-sm text-muted-foreground">
            <p>Category: {entry.category}</p>
            <p>Market: {entry.marketLocation}</p>
          </div>

          <div className="flex flex-col items-end mt-2">
            <div className="text-xl font-bold tabular-nums">
              {formatPrice(entry.price)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
