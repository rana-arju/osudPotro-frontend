"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ModeToggle } from "@/components/mode-toggle";
import {  ShoppingCart, User, Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useUser } from "@/context/UserContext";
import { logout } from "@/services/AuthService";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { SearchBar } from "./search-bar";
import { DialogTitle } from "./ui/dialog";

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const router = useRouter();
  const { user, refreshUser } = useUser();
  const handleLogout = async () => {
   await logout();
   await refreshUser(); // This won't trigger any loading spinner now
   router.push("/");
   toast.success("Logout successful!");
  };

  return (
    <header className="sticky  top-0 z-50 w-full border-b bg-primary text-primary backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className=" custom-container px-2 sm:px-6 lg:px-8 flex h-16 items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <DialogTitle className="sr-only">Toggle menu</DialogTitle>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium pl-5 pt-4">
              <Link
                href="/"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Image
                  src="https://cdn.osudpotro.com/appImage/web-osudpotro-logo.png?w=256"
                  width={100}
                  height={100}
                  alt="OsudPotro"
                />
              </Link>
              <Link href="/" className="hover:text-primary">
                Home
              </Link>
              <Link href="/products" className="hover:text-primary">
                All Products
              </Link>
              <Link
                href="/products?category=medicines"
                className="hover:text-primary"
              >
                Medicines
              </Link>
              <Link
                href="/products?category=wellness"
                className="hover:text-primary"
              >
                Wellness
              </Link>
              <Link
                href="/products?category=devices"
                className="hover:text-primary"
              >
                Medical Devices
              </Link>
              <Link
                href="/products?category=personal-care"
                className="hover:text-primary"
              >
                Personal Care
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        <Link href="/" className="mr-6">
          <Image
            src="https://cdn.osudpotro.com/appImage/web-osudpotro-logo.png?w=256"
            width={100}
            height={100}
            alt="OsudPotro"
          />
        </Link>

        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Medicines</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {[
                    {
                      title: "Pain Relief",
                      href: "/products?category=pain-relief",
                      description:
                        "Painkillers, anti-inflammatory drugs, and more",
                    },
                    {
                      title: "Cold & Flu",
                      href: "/products?category=cold-flu",
                      description: "Remedies for cough, cold, and flu symptoms",
                    },
                    {
                      title: "Allergy",
                      href: "/products?category=allergy",
                      description:
                        "Antihistamines and allergy relief medications",
                    },
                    {
                      title: "Digestive Health",
                      href: "/products?category=digestive",
                      description: "Antacids, laxatives, and digestive aids",
                    },
                  ].map((item) => (
                    <ListItem
                      key={item.title}
                      title={item.title}
                      href={item.href}
                      description={item.description}
                    />
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Wellness</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {[
                    {
                      title: "Vitamins & Supplements",
                      href: "/products?category=vitamins",
                      description:
                        "Multivitamins, minerals, and dietary supplements",
                    },
                    {
                      title: "Immunity",
                      href: "/products?category=immunity",
                      description: "Immune system boosters and support",
                    },
                    {
                      title: "Sleep & Stress",
                      href: "/products?category=sleep-stress",
                      description: "Sleep aids and stress management products",
                    },
                    {
                      title: "Fitness & Nutrition",
                      href: "/products?category=fitness",
                      description: "Protein supplements and fitness nutrition",
                    },
                  ].map((item) => (
                    <ListItem
                      key={item.title}
                      title={item.title}
                      href={item.href}
                      description={item.description}
                    />
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Medical Devices</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {[
                    {
                      title: "Blood Pressure",
                      href: "/products?category=blood-pressure",
                      description: "BP monitors and accessories",
                    },
                    {
                      title: "Diabetes Care",
                      href: "/products?category=diabetes",
                      description: "Glucose monitors and diabetes supplies",
                    },
                    {
                      title: "Thermometers",
                      href: "/products?category=thermometers",
                      description: "Digital and infrared thermometers",
                    },
                    {
                      title: "First Aid",
                      href: "/products?category=first-aid",
                      description: "First aid kits and medical supplies",
                    },
                  ].map((item) => (
                    <ListItem
                      key={item.title}
                      title={item.title}
                      href={item.href}
                      description={item.description}
                    />
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/products" legacyBehavior passHref>
                <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                  All Products
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="ml-auto flex items-center gap-2">
          <SearchBar
            isSearchOpen={isSearchOpen}
            onSearchToggle={() => setIsSearchOpen(!isSearchOpen)}
            className={cn(
              "flex items-center",
              isSearchOpen ? "w-full md:w-80" : "w-4 md:w-80"
            )}
          />

          <Button variant="ghost" size="icon" asChild>
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Cart</span>
            </Link>
          </Button>
          {user ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <User className="h-5 w-5 cursor-pointer" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link
                      href={
                        user?.role === "admin"
                          ? "/admin"
                          : "/user/account"
                      }
                    >
                      Dashboard
                      <span className="sr-only">Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <button onClick={handleLogout}>Logout</button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button variant="ghost" size="sm" asChild>
              <Link href="/auth">Sign In</Link>
            </Button>
          )}

          <ModeToggle />
        </div>
      </div>
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { title: string; description: string }
>(({ className, title, description, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {description}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
