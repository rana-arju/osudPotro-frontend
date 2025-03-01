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
     image:
       "https://www.lazzpharma.com/Content/ImageData/Product/Orginal/26a73e52-cabf-436e-8eeb-c6c216a23b88/DORMICUM.webp",
     category: "Pain Relief",
     rating: 4.5,
   },
   {
     id: 2,
     name: "Vitamin C 1000mg",
     description: "Immune system support",
     price: 12.99,
     image:
       "https://www.lazzpharma.com/Content/ImageData/Product/Small/57eda9a0-26d2-48db-a1e0-e09a61ccd8c4/SYSTEAR.webp",
     category: "Vitamins & Supplements",
     rating: 4.8,
   },
   {
     id: 3,
     name: "Digital Thermometer",
     description: "Accurate temperature measurement",
     price: 15.99,
     image:
       "https://www.lazzpharma.com/Content/ImageData/Product/Small/3dec2a62-5e7f-4a4b-857f-4530bb1e8f77/MIRAPRO.webp",
     category: "Medical Devices",
     rating: 4.3,
   },
   {
     id: 4,
     name: "First Aid Kit",
     description: "Essential medical supplies",
     price: 24.99,
     image:
       "https://www.lazzpharma.com/Content/ImageData/Product/Small/3dec2a62-5e7f-4a4b-857f-4530bb1e8f77/MIRAPRO.webp",
     category: "First Aid",
     rating: 4.7,
   },
   {
     id: 5,
     name: "Allergy Relief Tablets",
     description: "24-hour allergy symptom relief",
     price: 8.99,
     image:
       "https://www.lazzpharma.com/Content/ImageData/Product/Small/eba9c81a-75fd-4e0b-92d7-4dd3a01f2e98/FLUCLOX.webp",
     category: "Allergy",
     rating: 4.2,
   },
   {
     id: 6,
     name: "Blood Pressure Monitor",
     description: "Digital automatic BP monitor",
     price: 45.99,
     image:
       "https://www.lazzpharma.com/Content/ImageData/Product/Small/e91cf17d-6ab9-441c-8547-d630ba3fd8bb/DIAMICRON%20MR.webp",
     category: "Medical Devices",
     rating: 4.6,
   },
 ];

  return (
    <section className="py-8">
      <div className="container">
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
