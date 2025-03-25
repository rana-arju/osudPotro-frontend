"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Package, FileText, ShoppingBag, Settings, User } from "lucide-react"
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

export function UserDashboardSidebar() {
  const pathname = usePathname()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div className="h-full py-6">
      <div className="px-6 mb-6">
        <h2 className="text-xl font-semibold">My Account</h2>
      </div>

      <nav className="space-y-1 px-3">
        {routes.map((route) => {
          const isActive = pathname === route.href

          return (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground font-medium"
                  : "hover:bg-muted text-muted-foreground hover:text-foreground",
              )}
            >
              <route.icon className="h-5 w-5" />
              {route.title}
            </Link>
          )
        })}
      </nav>

     
    </div>
  )
}

