"use client"

import { useState } from "react"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Register from "@/components/auth/register"
import Login from "@/components/auth/login"
import Link from "next/link"

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login")

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        {/* Left Column - Auth Forms */}
        <div className="w-full order-2 lg:order-1">
          <Card className="w-full shadow-lg border-0">
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-center mb-2">
                <Link href="/">
                
                
                <Image
                  src="https://cdn.osudpotro.com/appImage/web-osudpotro-logo.png?w=256"
                  alt="OsudPotro Logo"
                  width={80}
                  height={80}
                  className="h-12 w-auto"
                />
                </Link>
              </div>
              <CardTitle className="text-2xl font-bold text-center">
                Welcome to <span className="text-primary">OsudPotro</span>
              </CardTitle>
              <CardDescription className="text-center">Your trusted medicine e-commerce platform</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                  <Login />
                </TabsContent>
                <TabsContent value="register">
                  <Register />
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 pt-0">
              <div className="relative w-full">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Quick Access</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 w-full">
                <QuickLoginButton type="admin" setActiveTab={setActiveTab} />
                <QuickLoginButton type="user" setActiveTab={setActiveTab} />
              </div>
            </CardFooter>
          </Card>
        </div>

        {/* Right Column - Image */}
        <div className="w-full hidden lg:block order-1 lg:order-2 h-full">
          <div className="relative w-full h-[600px] lg:h-full rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="https://ap-pharmo.myshopify.com/cdn/shop/files/image.png?v=1722827724&width=3000"
              alt="Medicine related image"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <h2 className="text-2xl font-bold mb-2">OsudPotro</h2>
              <p className="text-sm opacity-90">Your trusted healthcare partner for all your medicine needs</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface QuickLoginButtonProps {
  type: "admin" | "user"
  setActiveTab: (tab: string) => void
}

function QuickLoginButton({ type, setActiveTab }: QuickLoginButtonProps) {
  const handleQuickLogin = () => {
    // Switch to login tab
    setActiveTab("login")

    // Use setTimeout to ensure the login form is rendered before accessing it
    setTimeout(() => {
      // Get the login form instance from the window object
      const loginForm = (window as any).loginFormInstance

      if (loginForm) {
        if (type === "admin") {
          loginForm.setValue("email", "admin@gmail.com", { shouldValidate: true })
          loginForm.setValue("password", "admin123", { shouldValidate: true })
        } else {
          loginForm.setValue("email", "rana@gmail.com", { shouldValidate: true })
          loginForm.setValue("password", "12345678", { shouldValidate: true })
        }
      }
    }, 100)
  }

  return (
    <button
      onClick={handleQuickLogin}
      className={`flex items-center justify-center gap-2 py-2 px-4 rounded-md text-sm font-medium transition-colors
        ${
          type === "admin"
            ? "bg-amber-100 text-amber-700 hover:bg-amber-200"
            : "bg-blue-100 text-blue-700 hover:bg-blue-200"
        }`}
    >
      {type === "admin" ? "Admin Demo" : "User Login"}
    </button>
  )
}

