"use client";

import { useState, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  citySelector,
  shippingAddressSelector,
  phoneSelector,
  updateCity,
  updateShippingAddress,
  orderedProductsSelector,
  grandTotalSelector,
  subTotalSelector,
  shippingCostSelector,
  clearCart,
  orderSelector,
  findRequiredPrescription,
  nameSelector,
  updateCustomer,
  updatePhone,
} from "@/redux/features/cartSlice";
import { getMe } from "@/services/AuthService";
import type { IUser } from "@/types/User";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { cities } from "@/constant/cities";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { currencyFormatter } from "@/lib/currencyFormatter";
import ImageUpload from "./imageUpload";
import { placeOrder } from "@/services/cart";
import { useRouter } from "next/navigation";

export default function Checkout() {
  const [user, setUser] = useState<IUser | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const selectedCity = useAppSelector(citySelector);
  const nameSelect = useAppSelector(nameSelector);
  const shippingAddress = useAppSelector(shippingAddressSelector);

  const orderMedicines = useAppSelector(orderedProductsSelector);
  const subTotal = useAppSelector(subTotalSelector);
  const shippingCost = useAppSelector(shippingCostSelector);
  const grandTotal = useAppSelector(grandTotalSelector);
  const order = useAppSelector(orderSelector);
  const prescriptionRequired = useAppSelector(findRequiredPrescription);
  const router = useRouter();
  const phoneSelect = useAppSelector(phoneSelector);

  const phone = user?.phone || phoneSelect || "";
  const name = user?.name || nameSelect || "";
  const city = user?.city || selectedCity || "";
  const address = user?.address || shippingAddress || "";
  const handleCitySelect = (city: string) => {
    dispatch(updateCity(city));
  };


  const handleShippingAddress = (address: string) => {
    dispatch(updateShippingAddress(address));
  };
  const handlePhone = (phone: string) => {
    
    dispatch(updatePhone(phone));
  };
  const handleName = (name: string) => {
    dispatch(updateCustomer(name));
  };

  useEffect(() => {
    const getUser = async () => {
      const res = await getMe();
      const data = res?.data;
      setUser(data);
    };
    getUser();
  }, []);

  const handleUploadComplete = (urls: string[]) => setImageUrls(urls);
  const handleOrder = async () => {
    const orderLoading = toast.loading("Order is being placed");
    
    try {
      if (!user) {
        router.push("/login");
        throw new Error("Please login first.");
      }
      if (!city) {
        throw new Error("City is missing");
      }
      
      if (!address) {
        throw new Error("Shipping address is missing");
      }

      if (!phone) {
        throw new Error("Phone is missing");
      }


      if (order.medicines.length === 0) {
        throw new Error("Cart is empty, what are you trying to order ??");
      }

      order.shippingInfo.phone = phone;
      order.shippingInfo.city = city;
      order.shippingInfo.address = address;
      order.shippingInfo.customer = name;

      const res = await placeOrder({
        ...order,
        prescriptionImage: imageUrls[0],
      });

      if (res?.success) {
        toast.success(res.message, { id: orderLoading });
        dispatch(clearCart());
        if (res?.data) {
          const timer = setTimeout(() => {
            router.push(res?.data);
          }, 1000);
          return () => clearTimeout(timer);
        }
      } else {
        toast.error(res.message, { id: orderLoading });
      }
    } catch {
      toast.error("Order place failed. Try again", { id: orderLoading });
    }
  };
  return (
    <div className="py-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-white bg-background brightness-105 rounded-md col-span-4  p-5 ">
                <div className="flex flex-col justify-between h-full">
                  <h1 className="text-xl md:text-2xl font-bold">
                    Provide Shipping Address
                  </h1>
                  <div className="mt-5">
                    <label className="mt-5">Full Name</label>
                    <Input
                      onChange={(e) => handleName(e.target.value)}
                      defaultValue={name}
                      placeholder="Enter phone number"
                      className="border-2 border-primary mb-5"
                    />{" "}
                    <label className="mt-5">Email</label>
                    <Input
                      defaultValue={user?.email}
                      placeholder="Enter phone number"
                      className="border-2 border-primary mb-5"
                      disabled
                    />
                    <label>Select City</label>
                    <Select
                      onValueChange={(city) => handleCitySelect(city)}
                      defaultValue={city}
                    >
                      <SelectTrigger className="mb-5 border-2 border-primary">
                        <SelectValue placeholder="Select a city" />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.map((city) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <label className="mt-5">Phone Number</label>
                    <Input
                      onChange={(e) => handlePhone(e.target.value)}
                      defaultValue={phone}
                      placeholder="Enter phone number"
                      className="border-2 border-primary mb-5"
                    />
                    <label className="mb-2">Enter Address</label>
                    <Textarea
                      onChange={(e) => handleShippingAddress(e.target.value)}
                      defaultValue={address}
                      placeholder="Enter your address"
                      className="border-2 border-primary mb-5"
                      rows={5}
                    />
                    {orderMedicines.some(
                      (medicine) => medicine.prescription === "Yes"
                    ) && (
                      <div>
                        <label>Prescription Upload</label>
                        <ImageUpload onUploadComplete={handleUploadComplete} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{currencyFormatter(subTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{currencyFormatter(shippingCost)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>{currencyFormatter(grandTotal)}</span>
                </div>
              </div>
              <div className="relative group w-full mt-10">
                {order?.medicines?.length > 0 && (
                  <Button
                    onClick={handleOrder}
                    className="w-full text-lg  py-5 cursor-pointer"
                    disabled={
                      prescriptionRequired ? imageUrls.length === 0 : false
                    }
                  >
                    Order Now
                  </Button>
                )}

                {prescriptionRequired && imageUrls.length === 0 && (
                  <div className="absolute left-1/2 -top-10 -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    Please upload prescription to continue
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
