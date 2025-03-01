"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const brands = [
  { name: "Brand 1", logo: "/brands/brand1.svg" },
  { name: "Brand 2", logo: "/brands/brand2.svg" },
  { name: "Brand 3", logo: "/brands/brand3.svg" },
  { name: "Brand 4", logo: "/brands/brand4.svg" },
  { name: "Brand 5", logo: "/brands/brand5.svg" },
  { name: "Brand 6", logo: "/brands/brand6.svg" },
  { name: "Brand 7", logo: "/brands/brand7.svg" },
  { name: "Brand 8", logo: "/brands/brand8.svg" },
];

export function BrandingSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % (brands.length - 3));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + brands.length - 3) % (brands.length - 3)
    );
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section className="py-12 bg-muted">
      <div className="container px-4 md:px-6">
        <h2 className="text-2xl font-bold text-center mb-8">
          Trusted by Leading Brands
        </h2>
        <div className="relative">
          <div className="flex items-center justify-center">
            {brands
              .slice(currentIndex, currentIndex + 4)
              .map((brand, index) => (
                <div
                  key={index}
                  className="mx-4 transition-all duration-300 ease-in-out"
                >
                  <Image
                    src={brand.logo || "/placeholder.svg"}
                    alt={brand.name}
                    width={100}
                    height={100}
                    className="max-w-[100px]"
                  />
                </div>
              ))}
          </div>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 transform -translate-y-1/2"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 transform -translate-y-1/2"
            onClick={nextSlide}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
