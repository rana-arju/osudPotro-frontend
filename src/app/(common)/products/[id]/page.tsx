import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Truck, ShieldCheck, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ProductPage({ params }: { params: { id: string } }) {
  // Mock product data - in a real app, fetch this based on params.id
  const product = {
    id: params.id,
    name: "Paracetamol 500mg",
    description: "Pain reliever and fever reducer",
    longDescription:
      "Paracetamol is a medication used to treat fever and mild to moderate pain. At a standard dose, paracetamol only slightly decreases body temperature; it is inferior to ibuprofen in that respect, and the benefits of its use for fever are unclear.",
    price: 5.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Pain Relief",
    rating: 4.5,
    reviews: 128,
    stock: 50,
    dosage: "500mg",
    form: "Tablets",
    quantity: "20 tablets",
    manufacturer: "MediPharm",
    usage:
      "Take 1-2 tablets every 4-6 hours as needed. Do not exceed 8 tablets in 24 hours.",
    sideEffects:
      "Rare side effects may include nausea, stomach pain, loss of appetite, headache, yellowing of skin or eyes. Seek medical attention if you experience any of these symptoms.",
    precautions:
      "Do not use with other products containing paracetamol. Consult your doctor if you have liver disease, kidney disease, or alcohol dependency.",
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
            src={product.image || "/placeholder.svg"}
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
              <strong>Form:</strong> {product.form}
            </p>
            <p>
              <strong>Quantity:</strong> {product.quantity}
            </p>
            <p>
              <strong>Manufacturer:</strong> {product.manufacturer}
            </p>
          </div>

          <div className="flex space-x-4">
            <Button size="lg" className="flex-1">
              Add to Cart
            </Button>
            <Button size="lg" variant="outline" className="flex-1">
              Buy Now
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
            <p>{product.longDescription}</p>
          </div>
        </TabsContent>
        <TabsContent value="usage" className="mt-6">
          <div className="text-muted-foreground">
            <p>{product.usage}</p>
          </div>
        </TabsContent>
        <TabsContent value="side-effects" className="mt-6">
          <div className="text-muted-foreground">
            <p>{product.sideEffects}</p>
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
