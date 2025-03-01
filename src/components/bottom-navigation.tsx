"use client";

import { Home, Search, ShoppingCart, User, Pill } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function BottomNavigation() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/products", label: "Products", icon: Pill },
    { href: "/search", label: "Search", icon: Search },
    { href: "/cart", label: "Cart", icon: ShoppingCart },
    { href: "/account", label: "Account", icon: User },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 z-50 w-full h-16 bg-background border-t">
      <div className="grid h-full grid-cols-5">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <Icon className={cn("h-5 w-5", isActive && "text-primary")} />
              <span className="text-xs mt-1">{item.label}</span>
              {isActive && (
                <span className="absolute top-0 left-1/2 h-1 w-10 -translate-x-1/2 rounded-full bg-primary" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
