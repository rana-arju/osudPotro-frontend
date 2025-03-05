"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { addCart } from "@/redux/features/cartSlice";
import { useAppDispatch } from "@/redux/hooks";
import { Star, Truck, ShieldCheck, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

export default function ProductDetails({ product }: any) {
  const dispatch = useAppDispatch();
  const handleAddCart = () => {
    dispatch(addCart(product));
    toast.success("Add to cart Successfull");
  };
  return (
    <div>
      <Link href="/products" className="flex items-center text-primary mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Products
      </Link>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-background rounded-lg p-6 flex items-center justify-center">
          <Image
            src={product?.images?.[0] || "/placeholder.svg"}
            alt={product.name}
            width={400}
            height={400}
            className="object-contain"
          />
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center mt-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-muted-foreground">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>
          </div>

          <div>
            <span className="text-3xl font-bold">${product.price}</span>
            <p className="text-sm text-muted-foreground mt-1">
              {product.stock > 0
                ? `In Stock (${product.stock} available)`
                : "Out of Stock"}
            </p>
          </div>

          <div className="space-y-2">
            <p>
              <strong>Dosage:</strong> {product.dosage}
            </p>
            <p>
              <strong>Form:</strong> {product.type}
            </p>
            <p>
              <strong>Quantity:</strong> {product.quantity}
            </p>
            <Link
              href={`/manufacturer/${product.manufacturer._id}`}
              className="underline text-primary"
            >
              <strong>Manufacturer:</strong> {product.manufacturer.name}
            </Link>
          </div>

          <div className="flex space-x-4">
            <Button
              size="lg"
              className="flex-1 cursor-pointer"
              onClick={handleAddCart}
            >
              Add to Cart
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4">
            <div className="flex flex-col items-center text-center">
              <Truck className="h-6 w-6 text-primary mb-2" />
              <span className="text-sm">Free Delivery</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <ShieldCheck className="h-6 w-6 text-primary mb-2" />
              <span className="text-sm">Genuine Products</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Star className="h-6 w-6 text-primary mb-2" />
              <span className="text-sm">Quality Assured</span>
            </div>
          </div>
        </div>
      </div>

      <Separator className="my-10" />

      <Tabs defaultValue="description" className="w-full">
        <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3 md:grid-cols-4">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
          <TabsTrigger value="side-effects">Side Effects</TabsTrigger>
          <TabsTrigger value="precautions">Precautions</TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="mt-6">
          <div className="text-muted-foreground">
            <p>{product.description}</p>
          </div>
        </TabsContent>
        <TabsContent value="usage" className="mt-6">
          <div className="text-muted-foreground">
            <p>{product.usege}</p>
          </div>
        </TabsContent>
        <TabsContent value="side-effects" className="mt-6">
          <div className="text-muted-foreground">
            <p>{product.sideEffect}</p>
          </div>
        </TabsContent>
        <TabsContent value="precautions" className="mt-6">
          <div className="text-muted-foreground">
            <p>{product.precautions}</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
