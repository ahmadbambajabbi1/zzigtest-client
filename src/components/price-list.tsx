import { Package, MapPin, Tag, Calendar } from "lucide-react";
interface PriceEntry {
  id: string;
  product: string;
  category: string;
  marketLocation: string;
  price: number;
  submittedBy?: string;
  createdAt: Date;
}

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
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-transparent rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />

      <div className="relative">
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
        <div className="mb-4 py-3 px-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
          <div className="flex items-baseline justify-between">
            <span className="text-sm font-medium text-gray-600">Price</span>
            <span className="text-2xl font-bold text-blue-700">
              {formatPrice(entry.price)}
            </span>
          </div>
        </div>

        <div className="pt-3 border-t border-gray-100 space-y-1.5">
          {/* {entry.submittedBy && (
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <User className="w-3.5 h-3.5" />
              <span>{entry.submittedBy}</span>
            </div>
          )} */}
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

export default function PriceList({ entries }: { entries: PriceEntry[] }) {
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
