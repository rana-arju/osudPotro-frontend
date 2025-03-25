"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Package, FileText, ShoppingBag, Settings, User, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const routes = [
  {
    title: "Dashboard",
    href: "/user/account",
    icon: Home,
  },
  {
    title: "Profile",
    href: "/user/profile",
    icon: User,
  },
  {
    title: "Orders",
    href: "/user/orders",
    icon: Package,
  },
  {
    title: "Prescriptions",
    href: "/user/prescriptions",
    icon: FileText,
  },
 
  {
    title: "Shopping",
    href: "/products",
    icon: ShoppingBag,
  },
  {
    title: "Settings",
    href: "/user/settings",
    icon: Settings,
  },
]

export function MobileSidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)


  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="h-9 w-9 p-0">
            <Menu className="h-5 w-5" />
            <SheetTitle className="sr-only">Toggle menu</SheetTitle>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[240px] sm:w-[300px] p-0">
          <div className="flex flex-col h-full">
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="font-semibold text-lg">My Account</h2>
         
            </div>
            <div className="flex-1 overflow-auto py-2">
              <nav className="grid gap-1 px-2">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
                      pathname === route.href
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <route.icon className="h-5 w-5" />
                    {route.title}
                  </Link>
                ))}
              </nav>
            </div>
        
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

