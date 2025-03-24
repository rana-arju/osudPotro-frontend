"use client"

import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "sonner"
import { createManufacturer, deleteManufacturer, updateManufacturer } from "@/services/Manufacturers"
import { Card, CardContent } from "@/components/ui/card"
import { Edit, Trash2, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const manufacturerSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(2, "Manufacturer name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
})

type Manufacturer = z.infer<typeof manufacturerSchema>

export default function Manufacturers({ manufacturers }: any) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingManufacturer, setEditingManufacturer] = useState<Manufacturer | null>(null)
  const [localManufacturers, setLocalManufacturers] = useState(manufacturers || [])

  const form = useForm<Manufacturer>({
    resolver: zodResolver(manufacturerSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  })

  const onSubmit = async (values: Manufacturer) => {
    try {
      if (editingManufacturer) {
        const updated = await updateManufacturer(values, editingManufacturer._id!)

        if (updated?.success) {
          toast.success("Manufacturer updated successfully")
          // Update local state
          setLocalManufacturers(
            localManufacturers.map((m:any) => (m._id === editingManufacturer._id ? { ...m, ...values } : m)),
          )
          form.reset({
            name: "",
            description: "",
          })
        }
      } else {
        const res = await createManufacturer(values)

        if (res.success) {
          toast.success(res?.message)
          // Add to local state if we have the new manufacturer data
          if (res.data) {
            setLocalManufacturers([...localManufacturers, res.data])
          }
          form.reset({
            name: "",
            description: "",
          })
        }
      }
      setIsDialogOpen(false)
      setEditingManufacturer(null)
      form.reset()
    } catch {
      toast.error("Something went wrong")
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteManufacturer(id)
      if (res.success) {
        toast.success(res?.message)
        // Remove from local state
        setLocalManufacturers(localManufacturers.filter((m:any) => m._id !== id))
      } else {
        toast.error(res?.message)
      }
    } catch {
      toast.error("Failed to delete manufacturer")
    }
  }

  const handleEdit = (manufacturer: Manufacturer) => {
    setEditingManufacturer(manufacturer)
    form.reset(manufacturer)
    setIsDialogOpen(true)
  }

  return (
    <div className="p-4 sm:p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Manage Manufacturers</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="cursor-pointer"
              onClick={() => {
                setEditingManufacturer(null)
                form.reset()
              }}
            >
              Add Manufacturer
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{editingManufacturer ? "Edit" : "Add"} Manufacturer</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Manufacturer Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter manufacturer name" />
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
                        <Textarea {...field} placeholder="Enter manufacturer description" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="cursor-pointer">
                  {editingManufacturer ? "Update" : "Add"} Manufacturer
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Desktop view - Table */}
      <div className="hidden md:block rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {localManufacturers.length ? (
              localManufacturers.map((manufacturer: any) => (
                <TableRow key={manufacturer._id}>
                  <TableCell className="font-medium">{manufacturer.name}</TableCell>
                  <TableCell className="line-clamp-1 max-w-48">{manufacturer.description}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      className="mr-2 cursor-pointer"
                      onClick={() => handleEdit(manufacturer)}
                    >
                      <Edit className="h-4 w-4 mr-1" /> Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="cursor-pointer"
                      onClick={() => handleDelete(manufacturer._id!)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" /> Delete
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

      {/* Mobile view - Cards */}
      <div className="md:hidden space-y-4">
        {localManufacturers.length ? (
          localManufacturers.map((manufacturer: any) => (
            <Card key={manufacturer._id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <h3 className="font-medium">{manufacturer.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{manufacturer.description}</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(manufacturer)}>
                        <Edit className="h-4 w-4 mr-2" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() => handleDelete(manufacturer._id!)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-8 bg-muted/30 rounded-lg">
            <p className="text-muted-foreground">No manufacturers found</p>
          </div>
        )}
      </div>
    </div>
  )
}

