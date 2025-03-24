"use client"

import { useState, useEffect } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ModeToggle } from "@/components/mode-toggle"
import { ShoppingCart, User, Menu, ChevronDown } from "lucide-react"
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,

  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useUser } from "@/context/UserContext"
import { logout } from "@/services/AuthService"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { SearchBar } from "./search-bar"
import { Badge } from "@/components/ui/badge"


export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()
  const { user, refreshUser } = useUser()

  const [mounted, setMounted] = useState(false)

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Ensure theme is available on client side
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogout = async () => {
    await logout()
    await refreshUser()
    router.push("/")
    toast.success("Logout successful!")
  }

  if (!mounted) return null

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-sm"
          : "bg-background",
      )}
    >
      {/* Top bar with announcement or promotion */}
      <div className="bg-primary text-primary-foreground py-1.5 text-center text-sm font-medium">
        <p>Free shipping on orders over $50 | Same day delivery in select areas</p>
      </div>

      {/* Main header */}
      <div className="custom-container mx-auto flex h-16 items-center justify-between">
        {/* Mobile menu trigger and logo */}
        <div className="flex items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[350px]">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex flex-col h-full">
                <div className="py-4 border-b">
                  <Link href="/" className="flex items-center gap-2 mb-6">
                    <Image
                      src="https://cdn.osudpotro.com/appImage/web-osudpotro-logo.png?w=256"
                      width={120}
                      height={40}
                      alt="OsudPotro"
                      className="h-8 w-auto"
                    />
                  </Link>
            
                </div>

                <nav className="flex-1 overflow-auto py-6">
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold px-4">Main Menu</h4>
                      <div className="space-y-1">
                        <Link href="/" className="block px-4 py-2 text-sm hover:bg-muted rounded-md">
                          Home
                        </Link>
                        <Link href="/products" className="block px-4 py-2 text-sm hover:bg-muted rounded-md">
                          All Products
                        </Link>
                        <Link href="/cart" className="block px-4 py-2 text-sm hover:bg-muted rounded-md">
                          Cart
                        </Link>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold px-4">Categories</h4>
                      <div className="space-y-1">
                        <MobileSubmenu title="Medicines">
                          <Link
                            href="/products?category=pain-relief"
                            className="block px-4 py-2 text-sm hover:bg-muted rounded-md"
                          >
                            Pain Relief
                          </Link>
                          <Link
                            href="/products?category=cold-flu"
                            className="block px-4 py-2 text-sm hover:bg-muted rounded-md"
                          >
                            Cold & Flu
                          </Link>
                          <Link
                            href="/products?category=allergy"
                            className="block px-4 py-2 text-sm hover:bg-muted rounded-md"
                          >
                            Allergy
                          </Link>
                          <Link
                            href="/products?category=digestive"
                            className="block px-4 py-2 text-sm hover:bg-muted rounded-md"
                          >
                            Digestive Health
                          </Link>
                        </MobileSubmenu>

                        <MobileSubmenu title="Wellness">
                          <Link
                            href="/products?category=vitamins"
                            className="block px-4 py-2 text-sm hover:bg-muted rounded-md"
                          >
                            Vitamins & Supplements
                          </Link>
                          <Link
                            href="/products?category=immunity"
                            className="block px-4 py-2 text-sm hover:bg-muted rounded-md"
                          >
                            Immunity
                          </Link>
                          <Link
                            href="/products?category=sleep-stress"
                            className="block px-4 py-2 text-sm hover:bg-muted rounded-md"
                          >
                            Sleep & Stress
                          </Link>
                          <Link
                            href="/products?category=fitness"
                            className="block px-4 py-2 text-sm hover:bg-muted rounded-md"
                          >
                            Fitness & Nutrition
                          </Link>
                        </MobileSubmenu>

                        <MobileSubmenu title="Medical Devices">
                          <Link
                            href="/products?category=blood-pressure"
                            className="block px-4 py-2 text-sm hover:bg-muted rounded-md"
                          >
                            Blood Pressure
                          </Link>
                          <Link
                            href="/products?category=diabetes"
                            className="block px-4 py-2 text-sm hover:bg-muted rounded-md"
                          >
                            Diabetes Care
                          </Link>
                          <Link
                            href="/products?category=thermometers"
                            className="block px-4 py-2 text-sm hover:bg-muted rounded-md"
                          >
                            Thermometers
                          </Link>
                          <Link
                            href="/products?category=first-aid"
                            className="block px-4 py-2 text-sm hover:bg-muted rounded-md"
                          >
                            First Aid
                          </Link>
                        </MobileSubmenu>

                        <Link
                          href="/products?category=personal-care"
                          className="block px-4 py-2 text-sm hover:bg-muted rounded-md"
                        >
                          Personal Care
                        </Link>
                      </div>
                    </div>
                  </div>
                </nav>

                {user && (
                  <div className="border-t py-4">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center">
            <Image
              src="https://cdn.osudpotro.com/appImage/web-osudpotro-logo.png?w=256"
              width={120}
              height={40}
              alt="OsudPotro"
              className="h-8 w-auto"
            />
          </Link>
        </div>

        {/* Desktop navigation */}
        <NavigationMenu className="hidden md:flex mx-6">
          <NavigationMenuList className="gap-1">
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <div
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary cursor-pointer",
                    "flex h-10 items-center px-4 py-2",
                  )}
                >
                  Home
                </div>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-sm font-medium bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent hover:text-primary">
                Medicines
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-[550px] p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-medium text-sm mb-2 text-primary">Popular Categories</h3>
                      <ul className="space-y-2">
                        {[
                          { title: "Pain Relief", href: "/products?category=pain-relief" },
                          { title: "Cold & Flu", href: "/products?category=cold-flu" },
                          { title: "Allergy", href: "/products?category=allergy" },
                          { title: "Digestive Health", href: "/products?category=digestive" },
                        ].map((item) => (
                          <li key={item.title}>
                            <Link href={item.href} className="text-sm hover:text-primary">
                              {item.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4">
                        <Link
                          href="/products?category=medicines"
                          className="text-sm font-medium text-primary hover:underline"
                        >
                          View All Medicines →
                        </Link>
                      </div>
                    </div>
                    <div className="bg-muted/30 rounded-lg p-4">
                      <h3 className="font-medium text-sm mb-2">Featured Products</h3>
                      <div className="space-y-3">
                        <FeaturedItem
                          title="Pain Relief Bundle"
                          description="Complete pain management solution"
                          href="/products/pain-relief-bundle"
                          discount="15% OFF"
                        />
                        <FeaturedItem
                          title="Allergy Season Kit"
                          description="Everything you need for allergy season"
                          href="/products/allergy-season-kit"
                          discount="New"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-sm font-medium bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent hover:text-primary">
                Wellness
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-[550px] p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-medium text-sm mb-2 text-primary">Popular Categories</h3>
                      <ul className="space-y-2">
                        {[
                          { title: "Vitamins & Supplements", href: "/products?category=vitamins" },
                          { title: "Immunity", href: "/products?category=immunity" },
                          { title: "Sleep & Stress", href: "/products?category=sleep-stress" },
                          { title: "Fitness & Nutrition", href: "/products?category=fitness" },
                        ].map((item) => (
                          <li key={item.title}>
                            <Link href={item.href} className="text-sm hover:text-primary">
                              {item.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4">
                        <Link
                          href="/products?category=wellness"
                          className="text-sm font-medium text-primary hover:underline"
                        >
                          View All Wellness Products →
                        </Link>
                      </div>
                    </div>
                    <div className="bg-muted/30 rounded-lg p-4">
                      <h3 className="font-medium text-sm mb-2">Featured Products</h3>
                      <div className="space-y-3">
                        <FeaturedItem
                          title="Immunity Booster Pack"
                          description="Complete immune support system"
                          href="/products/immunity-booster-pack"
                          discount="20% OFF"
                        />
                        <FeaturedItem
                          title="Sleep Well Bundle"
                          description="Natural sleep aids and supplements"
                          href="/products/sleep-well-bundle"
                          discount="New"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/products" legacyBehavior passHref>
                <div
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary  cursor-pointer",
                    "flex h-10 items-center px-4 py-2",
                  )}
                >
               All Medicines
                </div>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
    
        {/* Right side - search, cart, user */}
        <div className="flex items-center gap-1 sm:gap-2">
        <SearchBar
            isSearchOpen={isSearchOpen}
            onSearchToggle={() => setIsSearchOpen(!isSearchOpen)}
            className={cn(
              "flex items-center transition-all",
              isSearchOpen ? "w-full md:w-80" : "w-4 md:w-80"
            )}
          />

          <Button variant="ghost" size="icon" className="relative" asChild>
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                0
              </span>
              <span className="sr-only">Cart</span>
            </Link>
          </Button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="cursor-pointer">
                  <User className="h-5 w-5" />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
              
           
                <DropdownMenuItem asChild>
                  <Link href={user?.role === "admin" ? "/admin" : "/user/account"}>Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/user/orders">My Orders</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/user/prescriptions">My Prescriptions</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="ghost" size="sm" className="hidden sm:flex" asChild>
              <Link href="/auth">Sign In</Link>
            </Button>
          )}

          <ModeToggle />
        </div>
      </div>
    </header>
  )
}

// Featured item component for mega menu
function FeaturedItem({ title, description, href, discount }:any) {
  return (
    <Link href={href} className="block group">
      <div className="flex items-start gap-2">
        <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center shrink-0">
          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-primary" />
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-medium group-hover:text-primary transition-colors">{title}</h4>
            {discount && (
              <Badge variant="outline" className="text-[10px] h-4 px-1.5 border-primary/30 text-primary">
                {discount}
              </Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
    </Link>
  )
}

// Mobile submenu component
function MobileSubmenu({ title, children }:any) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <button
        className="flex items-center justify-between w-full px-4 py-2 text-sm hover:bg-muted rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "transform rotate-180" : ""}`} />
      </button>
      {isOpen && <div className="pl-4 mt-1 mb-2 border-l ml-4">{children}</div>}
    </div>
  )
}

