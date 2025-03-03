"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
// Adjust based on your import system
import { cn } from "@/lib/utils";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import ImageUpload from "@/components/imageUpload";
import { useState } from "react";
import { useRouter } from "next/navigation";


const medicineSchema = z.object({
  name: z.string().min(2, "Medicine name must be at least 2 characters"),
  price: z.coerce.number().positive("Price must be positive"),
  images: z.array(z.string()).min(1, "At least one image is required"),
  quantity: z.coerce
    .number()
    .int()
    .positive("Quantity must be a positive integer"),
  type: z.string().min(2, "Type is required"),
  usage: z.string().optional(),
  sideEffect: z.string().optional(),
  precautions: z.string().optional(),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(1, "Category is required"),
  dosage: z.string().optional(),
  stockAvailable: z.boolean(),
  prescription: z.enum(["Yes", "No"]),
  expiryDate: z.date(),
  manufacturer: z.string().min(1, "Manufacturer is required"),
});

type Medicine = z.infer<typeof medicineSchema>;


const categories = ["Pain Relief", "Antibiotics", "Vitamins"];
const manufacturers = ["PharmaCorp", "MediLabs", "HealthTech"];

export default function AddMedicinePage() {
      const [imageUrls, setImageUrls] = useState<string[]>([]);
      const handleUploadComplete = (urls: string[]) => {
        setImageUrls(urls);
      };
  const form = useForm<Medicine>({
    resolver: zodResolver(medicineSchema),
    defaultValues: {
      name: "",
      price: 0,
      images: [],
      quantity: 0,
      type: "",
      usage: "",
      sideEffect: "",
      precautions: "",
      description: "",
      category: "",
      dosage: "",
      stockAvailable: true,
      prescription: "No",
      expiryDate: new Date(),
      manufacturer: "",
    },
  });

  const onSubmit = (values: Medicine) => {
    console.log(values, imageUrls);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 md:p-8 bg-white dark:bg-zinc-900 shadow-lg rounded-xl space-y-6">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-primary">
        Add New Medicine
      </h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Text Inputs */}
          {[
            { name: "name", label: "Medicine Name" },
            { name: "price", label: "Price", type: "number" },
            { name: "quantity", label: "Quantity", type: "number" },
            { name: "type", label: "Type" },
          ].map(({ name, label, type }) => (
            <FormField
              key={name}
              control={form.control}
              name={name as keyof Medicine}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{label}</FormLabel>
                  <FormControl>
                    <Input
                      type={type || "text"}
                      className="border border-gray-300 dark:border-gray-600 rounded-lg p-2"
                      {...field}
                      placeholder={`Enter ${label}`}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <ImageUpload onUploadComplete={handleUploadComplete} />

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-2">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    className="border border-gray-300 dark:border-gray-600 rounded-lg p-2"
                    {...field}
                    placeholder="Enter medicine description"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Category */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="border border-gray-300 dark:border-gray-600 rounded-lg">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Manufacturer */}
          <FormField
            control={form.control}
            name="manufacturer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Manufacturer</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="border border-gray-300 dark:border-gray-600 rounded-lg">
                      <SelectValue placeholder="Select Manufacturer" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {manufacturers.map((manu) => (
                      <SelectItem key={manu} value={manu}>
                        {manu}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Stock Available */}
          <FormField
            control={form.control}
            name="stockAvailable"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="m-0">Stock Available</FormLabel>
              </FormItem>
            )}
          />

          {/* Prescription */}
          <FormField
            control={form.control}
            name="prescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prescription Required</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="border border-gray-300 dark:border-gray-600 rounded-lg">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Expiry Date */}
          <FormField
            control={form.control}
            name="expiryDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Expiry Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className="w-full border border-gray-300 dark:border-gray-600"
                      >
                        {field.value
                          ? format(field.value, "PPP")
                          : "Pick a date"}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date() || date > new Date("2100-01-01")
                      }
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <div className="col-span-1 md:col-span-2">
            <Button type="submit" className="w-full py-3 text-lg font-semibold">
              Add Medicine
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
