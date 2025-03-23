"use client"

import React from "react"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Lock, Mail } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { loginUser } from "@/services/AuthService"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useUser } from "@/context/UserContext"
import Link from "next/link"

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
})

type LoginFormValues = z.infer<typeof loginSchema>

const Login = () => {
  const router = useRouter()
  const { refreshUser } = useUser()
  const [isLoading, setIsLoading] = React.useState(false)

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // Expose the form instance to the window object for the quick login buttons
  React.useEffect(() => {
    ;(window as any).loginFormInstance = loginForm

    // Cleanup function
    return () => {
      ;(window as any).loginFormInstance = undefined
    }
  }, [loginForm])

  async function onLoginSubmit(values: LoginFormValues) {
    setIsLoading(true)
    try {
      const response = await loginUser(values)

      if (response?.success) {
        toast.success(response.message)
        router.push("/")
        await refreshUser()
      } else {
        toast.error(response?.message || "Login failed")
      }
    } catch {
      toast.error("Login failed. Please try again")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...loginForm}>
      <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
        <FormField
          control={loginForm.control}
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
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={loginForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>Password</FormLabel>
                <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <FormControl>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input type="password" placeholder="••••••••" {...field} className="pl-10" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full cursor-pointer" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </Form>
  )
}

export default Login

