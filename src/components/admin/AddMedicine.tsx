"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import ImageUpload from "@/components/imageUpload";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { createMedicine } from "@/services/medicine";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Schema
const medicineSchema = z.object({
  name: z.string().min(2, "Medicine name must be at least 2 characters"),
  price: z.coerce.number().positive("Price must be positive"),
  //images: z.array(z.string()).min(1, "At least one image is required"),
  quantity: z.coerce
    .number()
    .int()
    .positive("Quantity must be a positive integer"),
  type: z.string().min(2, "Type is required"),
  usege: z.string().optional(),
  sideEffect: z.string().optional(),
  precautions: z.string().optional(),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(1, "Category is required"),

  prescription: z.enum(["Yes", "No"]),
  expiryDate: z.date(),
  manufacturer: z.string().min(1, "Manufacturer is required"),
});

type Medicine = z.infer<typeof medicineSchema>;

export default function AddMedicine({ categories, manufacturers }: any) {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const router = useRouter();
  const form = useForm<Medicine>({
    resolver: zodResolver(medicineSchema),
    defaultValues: {
      name: "",
      price: 0,
      quantity: 0,
      type: "",
      usege: "",
      sideEffect: "",
      precautions: "",
      description: "",
      category: "",
      prescription: "No",
      expiryDate: new Date(),
      manufacturer: "",
    },
  });

  const handleUploadComplete = (urls: string[]) => setImageUrls(urls);

  const onSubmit = async (values: Medicine) => {
    try {
      const medicineData = {
        ...values,
        images: imageUrls,
      };
      const res = await createMedicine(medicineData);
      if (res.success) {
        toast.success(res?.message);
        router.push("/admin/medicines");
        form.reset();
      } else {
        toast.error(res?.message);
      }
    } catch {
      toast.error("Medicine create failed! try again");
    }
  };

  const inputClass =
    "border border-gray-400 dark:border-gray-700 bg-transparent rounded-lg p-3 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition duration-300";

  return (
    <div className="max-w-3xl mx-auto p-1 sm:p-4 md:p-6 bg-white dark:bg-zinc-900 shadow-xl rounded-xl">
      <h1 className="text-2xl md:text-3xl font-bold text-center text-primary mb-6">
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
            { name: "type", label: "Medicine Type" },
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
                      placeholder={`Enter ${label}`}
                      className={inputClass}
                      {...field}
                      value={
                        typeof field.value === "boolean" ||
                        field.value instanceof Date
                          ? ""
                          : field.value
                      }
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          ))}
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
          {/* Textareas */}
          {[
            { name: "usege", label: "Usage Instructions" },
            { name: "sideEffect", label: "Side Effects" },
            { name: "precautions", label: "Precautions" },
            { name: "description", label: "Description" },
          ].map(({ name, label }) => (
            <FormField
              key={name}
              control={form.control}
              name={name as keyof Medicine}
              render={({ field }) => (
                <FormItem className="col-span-1 md:col-span-2">
                  <FormLabel>{label}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={`Enter ${label}`}
                      className={inputClass}
                      {...field}
                      value={
                        typeof field.value === "boolean" ||
                        field.value instanceof Date
                          ? ""
                          : field.value
                      }
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          ))}

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
                    <SelectTrigger className={inputClass}>
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories?.map((cat: any) => (
                      <SelectItem key={cat._id} value={cat._id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-500" />
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
                    <SelectTrigger className={inputClass}>
                      <SelectValue placeholder="Select Manufacturer" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {manufacturers?.map((manu: any) => (
                      <SelectItem key={manu._id} value={manu._id}>
                        {manu.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          {/* Stock Checkbox */}

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
                    <SelectTrigger className={inputClass}>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          {/* Expiry Date */}

          <ImageUpload onUploadComplete={handleUploadComplete} />

          <Button
            type="submit"
            className="col-span-1 md:col-span-2 cursor-pointer"
          >
            Add Medicine
          </Button>
        </form>
      </Form>
    </div>
  );
}
