"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { toast } from "sonner"
import { format } from "date-fns"
import Image from "next/image"
import { Trash2 } from "lucide-react"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

import ImageUpload from "@/components/imageUpload"

import { getMedicineById, updateMedicine } from "@/services/medicine"

// Form Schema
const medicineSchema = z.object({
  name: z.string().min(2, "Medicine name must be at least 2 characters"),
  price: z.coerce.number().positive("Price must be positive"),
  quantity: z.coerce.number().int().positive("Quantity must be positive integer"),
  type: z.string().min(2, "Type is required"),
  usege: z.string().optional(),
  sideEffect: z.string().optional(),
  precautions: z.string().optional(),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(1, "Category is required"),
  prescription: z.enum(["Yes", "No"]),
  expiryDate: z.date(),
  manufacturer: z.string().min(1, "Manufacturer is required"),
})

type Medicine = z.infer<typeof medicineSchema>

export default function EditMedicine({ categories, manufacturers }: any) {
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [existingImages, setExistingImages] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { id } = useParams<{ id: string }>() // Get medicine ID from URL params

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
  })

  // Fetch existing medicine data on load
  useEffect(() => {
    async function fetchMedicine() {
      try {
        setIsLoading(true)
        const res = await getMedicineById(id)
        if (res?.success && res?.data) {
          const medicine = res.data

          // Find the category and manufacturer IDs
          const categoryId = medicine.category._id || medicine.category
          const manufacturerId = medicine.manufacturer._id || medicine.manufacturer

          form.reset({
            name: medicine.name,
            price: medicine.price,
            quantity: medicine.quantity,
            type: medicine.type,
            usege: medicine.usege || "",
            sideEffect: medicine.sideEffect || "",
            precautions: medicine.precautions || "",
            description: medicine.description,
            category: categoryId,
            prescription: medicine.prescription,
            expiryDate: new Date(medicine.expiryDate),
            manufacturer: manufacturerId,
          })

          // Set existing images
          if (medicine.images && medicine.images.length > 0) {
            setExistingImages(medicine.images)
            setImageUrls(medicine.images)
          }
        } else {
          toast.error("Failed to fetch medicine details!")
        }
      } catch (error) {
        console.error("Error loading medicine:", error)
        toast.error("Error loading medicine data")
      } finally {
        setIsLoading(false)
      }
    }
    fetchMedicine()
  }, [id, form])

  const handleUploadComplete = (urls: string[]) => {
    // Combine existing images with new uploads
    setImageUrls([...existingImages, ...urls])
  }

  const handleRemoveExistingImage = (imageUrl: string) => {
    setExistingImages(existingImages.filter((url) => url !== imageUrl))
    setImageUrls(imageUrls.filter((url) => url !== imageUrl))
  }

  const onSubmit = async (values: Medicine) => {
    try {
      // Combine existing images that weren't removed with any new uploads
      const finalImageUrls = [...imageUrls]

      const updatedMedicine: any = {
        ...values,
        images: finalImageUrls,
      }

      const res = await updateMedicine(id, updatedMedicine)
      if (res.success) {
        toast.success("Medicine updated successfully!")
        router.push("/admin/medicines")
      } else {
        toast.error(res.message || "Update failed")
      }
    } catch (error) {
      console.error("Update error:", error)
      toast.error("Failed to update medicine. Try again!")
    }
  }

  const inputClass =
    "border border-gray-300 dark:border-gray-700 bg-transparent rounded-lg p-3 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition duration-300"

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6">
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <h1 className="text-2xl md:text-3xl font-bold text-center text-primary mb-6">Edit Medicine</h1>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Medicine Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter medicine name" className={inputClass} {...field} />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Medicine Type</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter medicine type" className={inputClass} {...field} />
                      </FormControl>
                      <FormMessage className="text-red-500" />
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
                        <Input type="number" placeholder="Enter price" className={inputClass} {...field} />
                      </FormControl>
                      <FormMessage className="text-red-500" />
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
                        <Input type="number" placeholder="Enter quantity" className={inputClass} {...field} />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                        <FormControl>
                          <SelectTrigger className={inputClass}>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories?.map((item: any) => (
                            <SelectItem key={item._id} value={item._id}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="manufacturer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Manufacturer</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                        <FormControl>
                          <SelectTrigger className={inputClass}>
                            <SelectValue placeholder="Select manufacturer" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {manufacturers?.map((item: any) => (
                            <SelectItem key={item._id} value={item._id}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="prescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prescription Required</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
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
                              className="w-full border border-gray-300 dark:border-gray-700 justify-start text-left font-normal"
                            >
                              {field.value ? format(field.value, "PPP") : "Pick a date"}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date() || date > new Date("2100-01-01")}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Description Fields */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter description" className={inputClass} rows={3} {...field} />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="usege"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Usage Instructions</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter usage instructions" className={inputClass} rows={3} {...field} />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sideEffect"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Side Effects</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter side effects" className={inputClass} rows={3} {...field} />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="precautions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Precautions</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter precautions" className={inputClass} rows={3} {...field} />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Images Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Medicine Images</h3>

                {/* Existing Images */}
                {existingImages.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-muted-foreground">Current Images</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {existingImages.map((imageUrl, index) => (
                        <div key={index} className="relative group">
                          <div className="aspect-square rounded-md overflow-hidden border border-gray-200 dark:border-gray-800">
                            <Image
                              src={imageUrl || "/placeholder.svg"}
                              alt={`Medicine image ${index + 1}`}
                              width={200}
                              height={200}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveExistingImage(imageUrl)}
                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            aria-label="Remove image"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Upload New Images */}
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Upload New Images</h4>
                  <ImageUpload onUploadComplete={handleUploadComplete} />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button type="button" variant="outline" className="mr-2" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button type="submit">Update Medicine</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

