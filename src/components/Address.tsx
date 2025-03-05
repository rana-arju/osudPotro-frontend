"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cities } from "@/constant/cities";
import {
  citySelector,
  phoneSelector,
  shippingAddressSelector,
  updateCity,
  updateShippingAddress,
} from "@/redux/features/cartSlice";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Input } from "./ui/input";

export default function Address({ userData }: any) {
  const dispatch = useAppDispatch();
  const selectedCity = useAppSelector(citySelector);
  const shippingAddress = useAppSelector(shippingAddressSelector);
  const phoneSelect = useAppSelector(phoneSelector);


  const phone = userData?.phone || phoneSelect || "";
  const city = userData?.city || selectedCity || "";
  const address = userData?.address || shippingAddress || "";
  const handleCitySelect = (city: string) => {
    dispatch(updateCity(city));
  };

  const handleShippingAddress = (address: string) => {
    dispatch(updateShippingAddress(address));
  };
  const handlePhone = (phone: string) => {
    dispatch(updateShippingAddress(phone));
  };

  return (
    <div className="border-2 border-white bg-background brightness-105 rounded-md col-span-4  p-5 ">
      <div className="flex flex-col justify-between h-full">
        <h1 className="text-xl md:text-2xl font-bold">
          Provide Shipping Address
        </h1>
        <div className="mt-5">
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
          <label className="mb-2">Enter Address</label>
          <Textarea
            onChange={(e) => handleShippingAddress(e.target.value)}
            defaultValue={address}
            placeholder="Enter your address"
            className="border-2 border-primary"
            rows={5}
          />
          <label className="mt-5">Phone Number</label>
          <Input
            onChange={(e) => handlePhone(e.target.value)}
            defaultValue={phone}
            placeholder="Enter phone number"
            className="border-2 border-primary"
          />
        </div>
      </div>
    </div>
  );
}
