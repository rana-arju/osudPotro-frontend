import { Button } from "@/components/ui/button";
import { Clock, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function SpecialOffers() {
  return (
    <section className="py-8">
      <div className=" custom-container mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">
          Special Offers
        </h2>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          <div className="overflow-hidden rounded-lg bg-primary/10 dark:bg-primary/20 grid grid-cols-1 md:grid-cols-2 justify-center items-center">
            <div className="p-6 md:p-8 order-2 md:order-1 ">
              <div className="flex items-center gap-2 mb-2">
                <Tag className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">
                  25% OFF
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Wellness Essentials</h3>
              <p className="text-muted-foreground mb-4">
                Stock up on vitamins, supplements, and immunity boosters.
              </p>
              <div className="flex items-center gap-2 mb-4">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Offer ends in 3 days
                </span>
              </div>
              <Button asChild>
                <Link href="/products?category=wellness&offer=true">
                  Shop Now
                </Link>
              </Button>
            </div>
            <div className="bottom-0 right-0 w-64 h-64 md:w-64 md:h-64 overflow-hidden flex flex-col justify-center items-center order-1 md:order-2">
              <Image
                src="https://cdn.osudpotro.com/project_assets/All%20Medicine.webp?w=1080"
                alt="Personal care products"
                width={260}
                height={260}
                className="object-cover"
              />
            </div>
          </div>

          <div className="overflow-hidden rounded-lg bg-secondary/10 dark:bg-secondary/20 grid grid-cols-1 md:grid-cols-2 justify-center items-center">
            <div className="p-6 md:p-8 order-2 md:order-1">
              <div className="flex items-center gap-2 mb-2">
                <Tag className="h-4 w-4 text-secondary" />
                <span className="text-sm font-medium text-secondary">
                  Buy 1 Get 1 Free
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Personal Care</h3>
              <p className="text-muted-foreground mb-4 w-full">
                Premium skincare, oral care, and personal hygiene products.
              </p>
              <div className="flex items-center gap-2 mb-4">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Limited time offer
                </span>
              </div>
              <Button asChild>
                <Link href="/products?category=personal-care&offer=true">
                  Shop Now
                </Link>
              </Button>
            </div>
            <div className="bottom-0 right-0 w-64 h-64 md:w-64 md:h-64 overflow-hidden flex flex-col justify-center items-center order-1 md:order-2">
              <Image
                src="https://cdn.osudpotro.com/project_assets/Personal%20Care%20Products.webp?w=1080"
                alt="Personal care products"
                width={260}
                height={260}
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
