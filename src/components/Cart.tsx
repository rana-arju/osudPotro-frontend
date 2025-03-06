"use client";

import PaymentDetails from "@/components/PaymentDetails";
import { Button } from "@/components/ui/button";

import {
  clearCart,
  decrementOrderQuantity,
  incrementOrderQuantity,
  orderedProductsSelector,
  removeFromCart,
} from "@/redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { toast } from "sonner";

export default function Cart() {
  const dispatch = useAppDispatch();
  const orderMedicines = useAppSelector(orderedProductsSelector);

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id));
    toast.success("Remove one Medicine from cart");
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6">
          Your Cart
        </h1>
        <Button
          variant="default"
          size="sm"
          className="ml-4 cursor-pointer uppercase"
          onClick={() => dispatch(clearCart())}
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Clear Cart
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          {orderMedicines.length > 0 ? (
            <>
              {orderMedicines.map((item) => (
                <div key={item._id} className="flex gap-4 py-4 border-b">
                  <div className="w-24 h-24 bg-background rounded-md overflow-hidden flex-shrink-0">
                    <Image
                      src={item.images[0] || "/placeholder.svg"}
                      alt={item.name}
                      width={100}
                      height={100}
                      className="object-contain w-full h-full"
                    />
                  </div>

                  <div className="flex-1 flex flex-col">
                    <Link
                      href={`/products/${item._id}`}
                      className="font-medium hover:underline line-clamp-1"
                    >
                      {item.name}
                    </Link>
                    <span className="text-muted-foreground text-sm my-2">
                      Unit Price: ${item.price.toFixed(2)}
                    </span>

                    <div className="flex items-center mt-auto">
                      <div className="flex items-center border rounded-md">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-none cursor-pointer"
                          onClick={() =>
                            dispatch(decrementOrderQuantity(item._id))
                          }
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center">
                          {item.orderQuantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-none cursor-pointer"
                          onClick={() =>
                            dispatch(incrementOrderQuantity(item._id))
                          }
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-4 cursor-pointer"
                        onClick={() => handleRemoveItem(item._id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remove
                      </Button>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-medium">
                      ${(item.orderQuantity * item.price).toFixed(2)}
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
          <PaymentDetails />
        </div>
      </div>
    </div>
  );
}
