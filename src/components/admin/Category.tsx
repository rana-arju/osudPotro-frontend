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
import { createCategory, deleteCategory } from "@/services/category";
import { toast } from "sonner";

const categorySchema = z.object({
  name: z.string().min(2, "Category name must be at least 2 characters"),
});

type Category = z.infer<typeof categorySchema>;

// Mock data for categories

export default function Categories({ categories }:any) {
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const form = useForm<Category>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: Category) => {
    try {
      const response = await createCategory(values);
      console.log(response);

      if (response?.success) {
        toast.success(response.message);
        //router.push("/");
        form.reset();
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Register failed. try again");
    }
  };

  const handleDelete = async(id: string) => {
   console.log(id);
   try {
     const res = await deleteCategory(id);
     if (res?.success) {
        toast.success(res?.message)
     }else{
        toast.error(res?.message)
     }
   } catch {
    toast.error("Category not deleted. try again")
    
   }
  
   
  };

  const editCategory = (category: Category) => {
    setEditingCategory(category);
    form.reset(category);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6">
        Manage Categories
      </h2>
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
          <Button type="submit" className="cursor-pointer">
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
            {categories?.length ? categories?.map((category: any) => (
              <TableRow key={category._id}>
                <TableCell>{category.name}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mr-2 cursor-pointer"
                    onClick={() => editCategory(category)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(category._id)}
                    className="cursor-pointer"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            )) : <p>No Category Found</p>}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
