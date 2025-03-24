"use client";
import { Button } from "@/components/ui/button";
import { addCart } from "@/redux/features/cartSlice";
import { useAppDispatch } from "@/redux/hooks";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

export default function ProductCard({ product }: any) {
 

  const dispatch = useAppDispatch();
  const handleAddCart = () => {
    dispatch(addCart(product));
    toast.success("Add to cart Successfull")
  };
  return (
    <div className="group relative overflow-hidden rounded-lg border bg-card transition-all hover:shadow-md">
      <Link href={`/products/${product._id}`} className="absolute inset-0 z-10">
        <span className="sr-only">View {product.name}</span>
      </Link>

      <div className="aspect-square overflow-hidden bg-muted/40">
        <Image
          src={
            product.images?.[0] ||
            "https://res.cloudinary.com/db8l1ulfq/image/upload/v1742804695/medicine_xhnv5i.avif"
          }
          alt={product.name}
          width={300}
          height={300}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      </div>

      <div className="p-4">
        <h3 className="font-medium text-card-foreground line-clamp-2">
          {product.name}
        </h3>
        
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>

        {/*     {product.rating && (
          <div className="mt-2 flex items-center">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill={
                    i < Math.floor(product.rating) ? "currentColor" : "none"
                  }
                  stroke="currentColor"
                  className={`h-3 w-3 ${
                    i < Math.floor(product.rating)
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              ))}
            </div>
            <span className="ml-1 text-xs text-muted-foreground">
              ({product.rating})
            </span>
          </div>
        )}
          */}

        <div className="mt-3 flex items-center justify-between">
          <p className="font-semibold text-primary">
            ${product.price.toFixed(2)}
          </p>
          <Button
            size="sm"
            variant="ghost"
            className="z-20 relative text-primary hover:text-primary-foreground hover:bg-primary cursor-pointer"
            onClick={handleAddCart}
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="sr-only">Add to cart</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
