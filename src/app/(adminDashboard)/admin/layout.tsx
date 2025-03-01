import type { ReactNode } from "react";
import Link from "next/link";
import { LayoutDashboard, PlusSquare, ShoppingCart, Users } from "lucide-react";

interface AdminLayoutProps {
  children: ReactNode;
}

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: PlusSquare, label: "Manage Medicines", href: "/admin/medicines" },
  { icon: ShoppingCart, label: "Manage Orders", href: "/admin/orders" },
  { icon: Users, label: "Manage Users", href: "/admin/users" },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex h-screen bg-background">
      <aside className="w-64 bg-muted/50 border-r">
        <div className="p-4">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
        </div>
        <nav className="mt-4">
          {sidebarItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="flex items-center px-4 py-2 text-sm hover:bg-muted"
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  );
}
