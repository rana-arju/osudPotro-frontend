"use client";

import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import ProductCard from "@/components/product-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllMedicine } from "@/services/medicine";
import { IProduct } from "@/types/Product";
import axios from "axios";

interface ICategory {
  _id: string;
  name: string;
}

export default function ShopPage() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [filters, setFilters] = useState({
    category: "all",
    minPrice: "",
    maxPrice: "",
    prescription: "all",
    availability: "all",
    sort: "all",
  });

  const searchParams = useSearchParams();
  const { ref, inView } = useInView();

  useEffect(() => {
    fetchCategories();
    const initialSearchTerm = searchParams.get("searchTerm") || "";
    setFilters((prev) => ({ ...prev, searchTerm: initialSearchTerm }));
  }, [searchParams]);

  useEffect(() => {
    if (inView && hasMore) {
      loadMoreProducts();
    }
  }, [ref, inView]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/category`
      );
      setCategories(response.data.data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const loadMoreProducts = async () => {
    if (loading) return;
    setLoading(true);

    const finalFilters = {
      ...filters,
      category: filters.category === "all" ? undefined : filters.category,
      prescription:
        filters.prescription === "all" ? undefined : filters.prescription,
      availability:
        filters.availability === "all" ? undefined : filters.availability,
      sort: filters.sort === "all" ? undefined : filters.sort,
    };

    try {
      const result = await getAllMedicine({ ...finalFilters, page, limit: 10 });

      if (result?.data?.length === 0) {
        setHasMore(false);
      } else {
        setProducts((prev) => [...prev, ...result.data]);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Failed to load products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key: string, value: string | number) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setProducts([]);
    setPage(1);
    setHasMore(true);
  };

  const applyFilters = () => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
    loadMoreProducts();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Shop</h1>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters sidebar */}
        <div className="w-full md:w-64 shrink-0 space-y-6">
          <div>
            <h3 className="font-medium mb-2">Categories</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="category-all"
                  checked={filters.category === "all"}
                  onCheckedChange={() => handleFilterChange("category", "all")}
                />
                <Label htmlFor="category-all">All Categories</Label>
              </div>
              {categories.map((category) => (
                <div key={category._id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category._id}`}
                    checked={filters.category === category._id}
                    onCheckedChange={() =>
                      handleFilterChange("category", category._id)
                    }
                  />
                  <Label htmlFor={`category-${category._id}`}>
                    {category.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-medium mb-2">Price Range</h3>
            <div className="flex items-center space-x-2 mb-2">
              <Input
                type="number"
                placeholder="Min"
                value={filters.minPrice}
                onChange={(e) => handleFilterChange("minPrice", e.target.value)}
                className="w-20"
              />
              <span>-</span>
              <Input
                type="number"
                placeholder="Max"
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                className="w-20"
              />
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-medium mb-2">Prescription Required</h3>
            <Select
              value={filters.prescription}
              onValueChange={(value) =>
                handleFilterChange("prescription", value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          <div>
            <h3 className="font-medium mb-2">Availability</h3>
            <Select
              value={filters.availability}
              onValueChange={(value) =>
                handleFilterChange("availability", value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="in-stock">In Stock</SelectItem>
                <SelectItem value="out-of-stock">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={applyFilters} className="w-full">
            Apply Filters
          </Button>
        </div>

        {/* Products grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">All Products</h2>
            <Select
              value={filters.sort}
              onValueChange={(value) => handleFilterChange("sort", value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Default</SelectItem>
                <SelectItem value="-createdAt">Newest</SelectItem>
                <SelectItem value="price">Price: Low to High</SelectItem>
                <SelectItem value="-price">Price: High to Low</SelectItem>
                <SelectItem value="name">Name: A-Z</SelectItem>
                <SelectItem value="-name">Name: Z-A</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No products found.</p>
          )}

          {loading && (
            <p className="text-center mt-4">Loading more products...</p>
          )}
          {!loading && hasMore && <div ref={ref} className="h-10" />}
        </div>
      </div>
    </div>
  );
}
