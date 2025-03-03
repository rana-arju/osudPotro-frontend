"use client";

import { type ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  PlusSquare,
  ShoppingCart,
  Users,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";

interface AdminLayoutProps {
  children: ReactNode;
}

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: PlusSquare, label: "Manage Manufacturers", href: "/admin/manufacturers" },
  { icon: PlusSquare, label: "Manage Categories", href: "/admin/categories" },
  { icon: PlusSquare, label: "Manage Medicines", href: "/admin/medicines" },
  { icon: ShoppingCart, label: "Manage Orders", href: "/admin/orders" },
  { icon: Users, label: "Manage Users", href: "/admin/users" },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const Sidebar = () => (
    <div className="space-y-4 py-4">
      <div className="px-3 py-2">
      
        <h2 className="mb-2 px-4 text-lg font-semibold">Admin Panel</h2>
        <div className="space-y-1">
          {sidebarItems.map((item, index) => (
            <Link key={index} href={item.href}>
              <span
                className={cn(
                  "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground mb-1 ",
                  pathname === item.href ? "bg-accent" : "transparent"
                )}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
    
      <Header />
    <div className="flex min-h-screen">
      <aside className="hidden w-64 border-r bg-muted/50 lg:block">
        <Sidebar />
      </aside>
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <Sidebar />
        </SheetContent>
      </Sheet>
      <div className="flex-1">
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetTrigger asChild>
            <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle sidebar</span>
              </Button>
              <h1 className="font-semibold">Admin Panel</h1>
            </header>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <Sidebar />
          </SheetContent>
        </Sheet>

        <main className="flex-1 p-2 sm:p-4 md:p-6">{children}</main>
      </div>
    </div>
    </>
  );
}
