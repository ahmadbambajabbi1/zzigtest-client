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
    <Card>
      <CardHeader>
        <CardTitle>Recent Price Entries</CardTitle>
        <CardDescription>
          Public marketplace price submissions from all users
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="flex flex-col gap-3 rounded-lg border bg-card p-4 transition-colors hover:bg-accent/50"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-1">
                  <h3 className="font-semibold leading-none">
                    {entry.product}
                  </h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                    <span>Category: {entry.category}</span>
                    <span>Market: {entry.marketLocation}</span>
                  </div>
                </div>
                <div className="text-2xl font-bold tabular-nums sm:text-right">
                  {formatPrice(entry.price)}
                </div>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                <span>Submitted by </span>
                {/* <span>{formatDate(entry?.createdAt)}</span> */}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
