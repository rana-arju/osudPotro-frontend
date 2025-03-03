"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

const categorySchema = z.object({
  name: z.string().min(2, "Category name must be at least 2 characters"),
});

type Category = z.infer<typeof categorySchema>;

// Mock data for categories
const initialCategories = [
  { id: 1, name: "Pain Relief" },
  { id: 2, name: "Antibiotics" },
  { id: 3, name: "Vitamins" },
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState(initialCategories);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const form = useForm<Category>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (values: Category) => {
    if (editingCategory) {
      setCategories(
        categories.map((cat) =>
          cat.id === editingCategory.id ? { ...cat, ...values } : cat
        )
      );
      setEditingCategory(null);
    } else {
      setCategories([...categories, { id: categories.length + 1, ...values }]);
    }
    form.reset();
  };

  const deleteCategory = (id: number) => {
    setCategories(categories.filter((cat) => cat.id !== id));
  };

  const editCategory = (category: Category) => {
    setEditingCategory(category);
    form.reset(category);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Categories</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mb-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter category name" />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <Button type="submit">
            {editingCategory ? "Update" : "Add"} Category
          </Button>
        </form>
      </Form>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.name}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mr-2"
                    onClick={() => editCategory(category)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteCategory(category.id)}
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
