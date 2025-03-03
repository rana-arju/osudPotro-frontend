"use client";

import { useState, useEffect } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { createManufacturer } from "@/services/Manufacturers";

const manufacturerSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(2, "Manufacturer name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

type Manufacturer = z.infer<typeof manufacturerSchema>;

const updateManufacturer = async (
  manufacturer: Manufacturer
): Promise<Manufacturer> => {
  const response = await fetch(`/api/manufacturers/${manufacturer.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(manufacturer),
  });
  if (!response.ok) throw new Error("Failed to update manufacturer");
  return response.json();
};

const deleteManufacturer = async (id: number): Promise<void> => {
  const response = await fetch(`/api/manufacturers/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete manufacturer");
};

export default function Manufacturers({ manufacturers }: any) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingManufacturer, setEditingManufacturer] =
    useState<Manufacturer | null>(null);

  const form = useForm<Manufacturer>({
    resolver: zodResolver(manufacturerSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (values: Manufacturer) => {
    try {
      if (editingManufacturer) {
        const updated = await updateManufacturer({
          ...values,
          id: editingManufacturer.id,
        });

        toast.success("Manufacturer updated successfully");
      } else {
        const res = await createManufacturer(values);
        console.log(res);

        if (res.success) {
          toast.success(res?.message);
          form.reset();
        }
      }
      setIsDialogOpen(false);
      setEditingManufacturer(null);
      form.reset();
    } catch {
      toast.error("Somthing error");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteManufacturer(id);
      toast.success("Manufacturer deleted successfully");
    } catch {
      toast.error("destructive");
    }
  };

  const handleEdit = (manufacturer: Manufacturer) => {
    setEditingManufacturer(manufacturer);
    form.reset(manufacturer);
    setIsDialogOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Manufacturers</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingManufacturer(null);
                form.reset();
              }}
            >
              Add Manufacturer
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {editingManufacturer ? "Edit" : "Add"} Manufacturer
              </DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Manufacturer Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter manufacturer name"
                        />
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
                          placeholder="Enter manufacturer description"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">
                  {editingManufacturer ? "Update" : "Add"} Manufacturer
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {manufacturers.length ? (
              manufacturers.map((manufacturer: any) => (
                <TableRow key={manufacturer._id}>
                  <TableCell>{manufacturer.name}</TableCell>
                  <TableCell>{manufacturer.description}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mr-2"
                      onClick={() => handleEdit(manufacturer)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(manufacturer.id!)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-4">
                  No manufacturers found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
