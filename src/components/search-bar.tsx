"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDebounce } from "@/hooks/use-debounce";
import { toast } from "sonner";

interface Medicine {
  _id: string;
  name: string;
  type: string;
  price: number;
  description: string;
  category: {
    _id: string;
    name: string;
  };
  manufacturer: {
    _id: string;
    name: string;
  };
  images: string[];
}

interface SearchBarProps {
  isSearchOpen?: boolean;
  onSearchToggle?: () => void;
  className?: string;
}

export function SearchBar({
  isSearchOpen,

  className,
}: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<Medicine[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const debouncedSearch = useDebounce(searchQuery, 300);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchResults = async () => {
      if (debouncedSearch.length < 2) {
        setResults([]);
        setError(null);
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${
            process.env.NEXT_PUBLIC_BACKEND_API
          }/medicine?searchTerm=${encodeURIComponent(debouncedSearch)}&limit=5`
        );
        if (!response.ok) {
          throw new Error(`Search failed: ${response.statusText}`);
        }
        const data = await response.json();
        setResults(data.data || []);
      } catch (error) {
        console.error("Search error:", error);
        setError("An error occurred while searching. Please try again.");
        toast.error("Failed to fetch search results. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [debouncedSearch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setShowResults(true);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setResults([]);
    setShowResults(false);
  };

  const handleResultClick = (medicineId: string) => {
    router.push(`/products/${medicineId}`);
    handleClearSearch();
  };

  return (
    <div ref={searchRef} className={cn("relative", className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
        <Input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search medicines, products..."
          className={cn(
            "w-full pl-10 pr-10 border-2 border-primary",
            isSearchOpen !== undefined &&
              (isSearchOpen ? "block" : "hidden md:block")
          )}
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
            onClick={handleClearSearch}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {showResults && (results.length > 0 || isLoading || error) && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-background border rounded-md shadow-lg max-h-[80vh] overflow-y-auto z-50">
          {isLoading ? (
            <div className="p-4 text-center text-muted-foreground">
              Loading...
            </div>
          ) : error ? (
            <div className="p-4 text-center text-destructive">{error}</div>
          ) : (
            <div className="p-2">
              {results?.map((medicine) => (
                <button
                  key={medicine._id}
                  onClick={() => handleResultClick(medicine._id)}
                  className="w-full text-left p-3 hover:bg-muted rounded-md transition-colors flex items-start gap-3 cursor-pointer"
                >
                  {medicine.images && medicine.images.length > 0 ? (
                    <Image
                      src={medicine.images[0] || "/placeholder.svg"}
                      alt={medicine.name}
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-muted rounded flex items-center justify-center">
                      <Search className="h-4 w-4 text-muted-foreground" />
                    </div>
                  )}
                  <div>
                    <h4 className="font-medium text-sm line-clamp-2">
                      {medicine.name}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Price: {medicine.price} tk
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {medicine.category.name} • {medicine.manufacturer.name}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
