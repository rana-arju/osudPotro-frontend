"use client"

import React from "react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Lock, Mail, User } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { registerUser } from "@/services/AuthService"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useUser } from "@/context/UserContext"

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

type RegisterFormValues = z.infer<typeof registerSchema>

const Register = () => {
  const router = useRouter()
  const { refreshUser } = useUser()
  const [isLoading, setIsLoading] = React.useState(false)

  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  async function onRegisterSubmit(values: RegisterFormValues) {
    setIsLoading(true)
    try {
      const response = await registerUser(values)
      if (response?.success) {
        toast.success(response.message)
        router.push("/")
        await refreshUser()
      } else {
        toast.error(response?.message || "Registration failed")
      }
    } catch  {
      toast.error("Registration failed. Please try again")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...registerForm}>
      <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
        <FormField
          control={registerForm.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="John Doe" {...field} className="pl-10" />
                </div>
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={registerForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input type="email" placeholder="john@example.com" {...field} className="pl-10" />
                </div>
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={registerForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input type="password" placeholder="••••••••" {...field} className="pl-10" />
                </div>
              </FormControl>
              <FormMessage className="text-red-500" />
              <p className="text-xs text-muted-foreground mt-1">Password must be at least 8 characters long</p>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full cursor-pointer" disabled={isLoading}>
          {isLoading ? "Creating account..." : "Create Account"}
        </Button>
      </form>
    </Form>
  )
}

export default Register

