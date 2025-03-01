import ProductCard from "@/components/product-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function FeaturedProducts() {
  // Mock featured products data
  const featuredProducts = [
    {
      id: 1,
      name: "Paracetamol 500mg",
      description: "Pain reliever and fever reducer",
      price: 5.99,
      image: "/placeholder.svg?height=200&width=200",
      category: "Pain Relief",
      rating: 4.5,
    },
    {
      id: 2,
      name: "Vitamin C 1000mg",
      description: "Immune system support",
      price: 12.99,
      image: "/placeholder.svg?height=200&width=200",
      category: "Vitamins & Supplements",
      rating: 4.8,
    },
    {
      id: 3,
      name: "Digital Thermometer",
      description: "Accurate temperature measurement",
      price: 15.99,
      image: "/placeholder.svg?height=200&width=200",
      category: "Medical Devices",
      rating: 4.3,
    },
    {
      id: 4,
      name: "First Aid Kit",
      description: "Essential medical supplies",
      price: 24.99,
      image: "/placeholder.svg?height=200&width=200",
      category: "First Aid",
      rating: 4.7,
    },
  ];

  return (
    <section className="py-8">
      <div className="container px-4 md:px-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold tracking-tight">
            Featured Products
          </h2>
          <Button variant="outline" asChild>
            <Link href="/products">View All</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
