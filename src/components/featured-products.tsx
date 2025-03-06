import ProductCard from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { getAllMedicine } from "@/services/medicine";
import Link from "next/link";

export default async function FeaturedProducts() {
  // Mock featured products data
 const res =await getAllMedicine();
 const featuredProducts = res?.data;

  return (
    <section className="py-8">
      <div >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold tracking-tight">
            Featured Products
          </h2>
          <Button variant="outline" asChild>
            <Link href="/products">View All</Link>
          </Button>
        </div>
        {featuredProducts?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts?.map((product: any) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <p className="flex flex-col justify-center items-center text-xl capitalize font-bold text-primary">
            There are no Medicine
          </p>
        )}
      </div>
    </section>
  );
}
