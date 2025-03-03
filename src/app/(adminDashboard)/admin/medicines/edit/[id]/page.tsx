"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

const medicineSchema = z.object({
  name: z.string().min(2, "Medicine name must be at least 2 characters"),
  price: z.number().positive("Price must be positive"),
  images: z.array(z.string()).min(1, "At least one image is required"),
  quantity: z.number().int().positive("Quantity must be a positive integer"),
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

// Mock data for categories and manufacturers
const categories = [
  { id: "1", name: "Pain Relief" },
  { id: "2", name: "Antibiotics" },
  { id: "3", name: "Vitamins" },
];

const manufacturers = [
  { id: "1", name: "PharmaCorp" },
  { id: "2", name: "MediLabs" },
  { id: "3", name: "HealthTech" },
];

export default function EditMedicinePage() {
  const params = useParams();
  const [medicine, setMedicine] = useState<Medicine | null>(null);

  const form = useForm<Medicine>({
    resolver: zodResolver(medicineSchema),
    defaultValues: medicine || {
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

  useEffect(() => {
    // Fetch medicine data based on the ID from params
    // This is a mock fetch, replace with actual API call
    const fetchMedicine = async () => {
      // Simulating API call
      const response = await new Promise<Medicine>((resolve) =>
        setTimeout(
          () =>
            resolve({
              name: "Sample Medicine",
              price: 9.99,
              images: ["image1.jpg"],
              quantity: 100,
              type: "Tablet",
              usage: "Take with water",
              sideEffect: "May cause drowsiness",
              precautions: "Do not drive after taking",
              description: "A sample medicine description",
              category: "1",
              dosage: "1 tablet daily",
              stockAvailable: true,
              prescription: "No",
              expiryDate: new Date("2024-12-31"),
              manufacturer: "1",
            }),
          1000
        )
      );
      setMedicine(response);
      form.reset(response);
    };

    fetchMedicine();
  }, [params.id, form.reset]);

  const onSubmit = (values: Medicine) => {
    console.log(values);
    // Here you would typically send this data to your backend to update the medicine
  };

  if (!medicine) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Edit Medicine</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Medicine Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter medicine name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    step="0.01"
                    placeholder="Enter price"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    placeholder="Enter quantity"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter medicine type" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Enter medicine description"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
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
                    <SelectTrigger>
                      <SelectValue placeholder="Select a manufacturer" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {manufacturers.map((manufacturer) => (
                      <SelectItem key={manufacturer.id} value={manufacturer.id}>
                        {manufacturer.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="stockAvailable"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Stock Available</FormLabel>
                  <FormDescription>
                    Is this medicine currently in stock?
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
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
                    <SelectTrigger>
                      <SelectValue placeholder="Select prescription requirement" />
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
          <FormField
            control={form.control}
            name="expiryDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Expiry Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date() || date > new Date("2100-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Update Medicine</Button>
        </form>
      </Form>
    </div>
  );
}
