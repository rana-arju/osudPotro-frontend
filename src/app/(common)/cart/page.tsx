import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  // Mock cart data
  const cartItems = [
    {
      id: 1,
      name: "Paracetamol 500mg",
      price: 5.99,
      quantity: 2,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      name: "Vitamin C 1000mg",
      price: 12.99,
      quantity: 1,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 3,
      name: "Digital Thermometer",
      price: 15.99,
      quantity: 1,
      image: "/placeholder.svg?height=100&width=100",
    },
  ];

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 4.99;
  const total = subtotal + shipping;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          {cartItems.length > 0 ? (
            <>
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 py-4 border-b">
                  <div className="w-24 h-24 bg-background rounded-md overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={100}
                      height={100}
                      className="object-contain w-full h-full"
                    />
                  </div>

                  <div className="flex-1 flex flex-col">
                    <Link
                      href={`/products/${item.id}`}
                      className="font-medium hover:underline"
                    >
                      {item.name}
                    </Link>
                    <span className="text-muted-foreground text-sm">
                      Unit Price: ${item.price.toFixed(2)}
                    </span>

                    <div className="flex items-center mt-auto">
                      <div className="flex items-center border rounded-md">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-none"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-none"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <Button variant="ghost" size="sm" className="ml-4">
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remove
                      </Button>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">
                Looks like you haven&apos;t added anything to your cart yet.
              </p>
              <Button asChild>
                <Link href="/products">Browse Products</Link>
              </Button>
            </div>
          )}
        </div>

        <div className="bg-muted/40 rounded-lg p-6 h-fit">
          <h2 className="text-lg font-medium mb-4">Order Summary</h2>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>
                Subtotal (
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)
              </span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="flex justify-between font-medium text-lg mb-6">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="coupon"
                className="text-sm font-medium mb-1 block"
              >
                Coupon Code
              </label>
              <div className="flex gap-2">
                <Input id="coupon" placeholder="Enter coupon" />
                <Button variant="outline">Apply</Button>
              </div>
            </div>

            <Button className="w-full">Proceed to Checkout</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
