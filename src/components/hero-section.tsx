"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

export default function HeroSection() {
  const [mounted, setMounted] = useState(false)

  // Ensure theme is available on client side
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
 

    <section className="relative w-full overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 w-full h-full">
        <Image src="https://templatekit.jegtheme.com/farmacy/wp-content/uploads/sites/287/2022/06/two-pharmacists-working-together-at-pharmacy.jpg" alt="Background" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-[#072a4d]/95 to-[#072a4d]/80 dark:from-[#0A2540]/95 dark:to-[#0A2540]/80" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-48 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
      </div>

      {/* Content container */}
      <div className="container relative mx-auto px-4 md:px-6 py-16 md:py-24 lg:py-32">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          {/* Left column - Text content */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block rounded-full bg-primary/20 dark:bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary dark:text-primary-foreground backdrop-blur-sm">
              New: Free Delivery on Orders Over $50
            </div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-white dark:text-white">
              Your Health, <span className="text-primary">Our Priority</span>
            </h1>
            <p className="text-[#E5E5E5] dark:text-[#E5E5E5] text-lg md:text-xl max-w-xl">
              Get your medicines delivered at your doorstep. Fast, reliable, and secure. We ensure quality healthcare is
              always accessible.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 text-base font-medium px-8"
              >
                <Link href="/products">Shop Now</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-primary hover:bg-white/10 dark:border-white dark:text-white dark:hover:bg-white/10 text-base font-medium px-8"
              >
                <Link href="/products?category=offers">View Offers</Link>
              </Button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 pt-4 items-center">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  </svg>
                </div>
                <span className="text-white/80 text-sm">Trusted by 10,000+ customers</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M12 22V8" />
                    <path d="m5 12-2-2 2-2" />
                    <path d="m19 12 2-2-2-2" />
                    <path d="M5 10h14" />
                    <path d="M5 2h14v6H5z" />
                  </svg>
                </div>
                <span className="text-white/80 text-sm">Same-day delivery</span>
              </div>
            </div>
          </motion.div>

          {/* Right column - Feature cards */}
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative w-full max-w-[550px] aspect-[4/3] rounded-2xl overflow-hidden backdrop-blur-sm border border-white/10">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 rounded-2xl flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4 p-6 w-full">
                  {featureCards.map((card, index) => (
                    <motion.div
                      key={index}
                      className="bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-xl p-5 shadow-lg border border-white/20"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-3">
                        {card.icon}
                      </div>
                      <h3 className="font-medium text-white">{card.title}</h3>
                      <p className="text-sm text-white/70 mt-1">{card.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

   
    </section>
 
  )
}

// Feature cards data
const featureCards = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-primary"
      >
        <path d="m12 14 4-4" />
        <path d="M3.34 17a10 10 0 1 1 17.32 0" />
      </svg>
    ),
    title: "Genuine Medicines",
    description: "100% authentic products",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-primary"
      >
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    ),
    title: "Care & Support",
    description: "24/7 customer service",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-primary"
      >
        <rect width="20" height="14" x="2" y="5" rx="2" />
        <line x1="2" x2="22" y1="10" y2="10" />
      </svg>
    ),
    title: "Secure Payments",
    description: "Multiple payment options",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-primary"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      </svg>
    ),
    title: "Fast Delivery",
    description: "Quick & reliable shipping",
  },
]

