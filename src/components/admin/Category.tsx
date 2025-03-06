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
import {
  createCategory,
  deleteCategory,
  getCategoryById,
  updateCategory,
} from "@/services/category";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const categorySchema = z.object({
  name: z.string().min(2, "Category name must be at least 2 characters"),
  _id: z.string().optional(),
});

type Category = z.infer<typeof categorySchema>;

export default function Categories({ categories }: { categories: Category[] }) {
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(
    null
  );
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const form = useForm<Category>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
    },
  });

  const fetchCategoryData = async (id: string) => {
    try {
      const res = await getCategoryById(id);

      if (res?.success) {
        setEditingCategoryId(id);
        setIsEditModalOpen(true);
        form.reset({ name: res.data.name });
      } else {
        toast.error("Failed to fetch category data.");
      }
    } catch {
      toast.error("Error fetching category data.");
    }
  };

  const handleAddCategory = async (values: Partial<Category>) => {
   
    try {
      const response = await createCategory(values);
      if (response?.success) {
        toast.success(response.message);
        form.reset();
      } else {
        toast.error(response?.message);
      }
    } catch {
      toast.error("Failed to add category. Please try again.");
    }
  };

  const handleUpdateCategory = async (values: Category) => {
    if (!editingCategoryId) return;
    try {
      const response = await updateCategory(editingCategoryId, values);
      if (response?.success) {
        toast.success(response.message);
        setIsEditModalOpen(false);
      } else {
        toast.error(response?.message);
      }
    } catch {
      toast.error("Failed to update category. Please try again.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteCategory(id);
      if (res?.success) {
        toast.success(res?.message);
      } else {
        toast.error(res?.message);
      }
    } catch {
      toast.error("Category not deleted. Please try again.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6">
        Manage Categories
      </h2>

      {/* Add Category Form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleAddCategory)}
          className="space-y-4 mb-6"
        >
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
          <Button type="submit" className="cursor-pointer">
            Add Category
          </Button>
        </form>
      </Form>

      {/* Categories Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories?.length ? (
              categories.map((category) => (
                <TableRow key={category._id}>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mr-2 cursor-pointer"
                      onClick={() =>
                        category._id && fetchCategoryData(category._id)
                      }
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => category._id && handleDelete(category._id)}
                      className="cursor-pointer"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2}>No Category Found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit Category Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleUpdateCategory)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <Button type="submit" className="cursor-pointer">
                Update Category
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
