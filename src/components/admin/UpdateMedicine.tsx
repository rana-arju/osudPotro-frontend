"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import { format } from "date-fns";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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

import ImageUpload from "@/components/imageUpload";

import { getMedicineById, updateMedicine } from "@/services/medicine";

// Form Schema
const medicineSchema = z.object({
  name: z.string().min(2, "Medicine name must be at least 2 characters"),
  price: z.coerce.number().positive("Price must be positive"),
  quantity: z.coerce
    .number()
    .int()
    .positive("Quantity must be positive integer"),
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

export default function EditMedicine({ categories, manufacturers }: any) {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const router = useRouter();
  const { id } = useParams<{ id: string }>(); // Get medicine ID from URL params

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

  // Fetch existing medicine data on load
  useEffect(() => {
    async function fetchMedicine() {
      try {
        const res = await getMedicineById(id);
        if (res?.success && res?.data) {
          const medicine = res.data;
          form.reset({
            name: medicine.name,
            price: medicine.price,
            quantity: medicine.quantity,
            type: medicine.type,
            usege: medicine.usege || "",
            sideEffect: medicine.sideEffect || "",
            precautions: medicine.precautions || "",
            description: medicine.description,
            category: medicine.category.name,
            prescription: medicine.prescription,
            expiryDate: new Date(medicine.expiryDate),
            manufacturer: medicine.manufacturer.name,
          });
          setImageUrls(medicine.images || []);
        } else {
          toast.error("Failed to fetch medicine details!");
        }
      } catch {
        toast.error("Error loading medicine data");
      }
    }
    fetchMedicine();
  }, [id, form]);

  const handleUploadComplete = (urls: string[]) => setImageUrls(urls);

  const onSubmit = async (values: Medicine) => {
    try {
      const updatedMedicine: any = {
        ...values,
        images: imageUrls,
      };
      const res = await updateMedicine(id, updatedMedicine);
      if (res.success) {
        toast.success("Medicine updated successfully!");
        router.push("/admin/medicines");
      } else {
        toast.error(res.message || "Update failed");
      }
    } catch {
      toast.error("Failed to update medicine. Try again!");
    }
  };

  const inputClass =
    "border border-gray-400 dark:border-gray-700 bg-transparent rounded-lg p-3 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition duration-300";

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white dark:bg-zinc-900 shadow-xl rounded-xl">
      <h1 className="text-2xl md:text-3xl font-bold text-center text-primary mb-6">
        Edit Medicine
      </h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {[
            { name: "name", label: "Medicine Name" },
            { name: "price", label: "Price", type: "number" },
            { name: "quantity", label: "Quantity", type: "number" },
            { name: "type", label: "Medicine Type" },
          ].map(({ name, label, type }: any) => (
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

          {/* Category & Manufacturer */}
          {[
            { name: "category", options: categories },
            { name: "manufacturer", options: manufacturers },
          ].map(({ name, options }) => (
            <FormField
              key={name}
              control={form.control}
              name={name as keyof Medicine}
              render={({ field }) => {
                console.log("field asdfa", field);

                return (
                  <FormItem>
                    <FormLabel>{name}</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value?.toString()}
                    >
                      <SelectTrigger className={inputClass}>
                        <SelectValue placeholder={`Select ${name}`} />
                      </SelectTrigger>
                      <SelectContent>
                        {options?.map((item: any) => (
                          <SelectItem key={item._id} value={item._id}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          ))}

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

          <ImageUpload onUploadComplete={handleUploadComplete} />

          <Button type="submit" className="col-span-2 cursor-pointer">
            Update Medicine
          </Button>
        </form>
      </Form>
    </div>
  );
}
