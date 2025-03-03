"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const manufacturerSchema = z.object({
  name: z.string().min(2, "Manufacturer name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

type Manufacturer = z.infer<typeof manufacturerSchema>;

// Mock data for manufacturers
const initialManufacturers = [
  { id: 1, name: "PharmaCorp", description: "Leading pharmaceutical company" },
  {
    id: 2,
    name: "MediLabs",
    description: "Innovative medical research and manufacturing",
  },
  {
    id: 3,
    name: "HealthTech",
    description: "Cutting-edge healthcare technology and medicines",
  },
];

export default function ManufacturersPage() {
  const [manufacturers, setManufacturers] = useState(initialManufacturers);
  const [editingManufacturer, setEditingManufacturer] =
    useState<Manufacturer | null>(null);

  const form = useForm<Manufacturer>({
    resolver: zodResolver(manufacturerSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = (values: Manufacturer) => {
    if (editingManufacturer) {
      setManufacturers(
        manufacturers.map((m) =>
          m.id === editingManufacturer.id ? { ...m, ...values } : m
        )
      );
      setEditingManufacturer(null);
    } else {
      setManufacturers([
        ...manufacturers,
        { id: manufacturers.length + 1, ...values },
      ]);
    }
    form.reset();
  };

  const deleteManufacturer = (id: number) => {
    setManufacturers(manufacturers.filter((m) => m.id !== id));
  };

  const editManufacturer = (manufacturer: Manufacturer) => {
    setEditingManufacturer(manufacturer);
    form.reset(manufacturer);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Manufacturers</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mb-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Manufacturer Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter manufacturer name" />
                </FormControl>
                <FormMessage className="text-red-500" />
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
                    placeholder="Enter manufacturer description"
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <Button type="submit">
            {editingManufacturer ? "Update" : "Add"} Manufacturer
          </Button>
        </form>
      </Form>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {manufacturers.map((manufacturer) => (
              <TableRow key={manufacturer.id}>
                <TableCell>{manufacturer.name}</TableCell>
                <TableCell>{manufacturer.description}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mr-2"
                    onClick={() => editManufacturer(manufacturer)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteManufacturer(manufacturer.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
