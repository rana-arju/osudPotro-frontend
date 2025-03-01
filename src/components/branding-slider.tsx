"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const brands = [
  {
    name: "Brand 1",
    logo: "https://cdn2.arogga.com/eyJidWNrZXQiOiJhcm9nZ2EiLCJrZXkiOiJQcm9kdWN0QnJhbmQtcGJfYmFubmVyXC8xMDAwNDRcLzEwMDA0NC1JbmNlcHRhLVBoYXJtYWNldXRpY2Fscy1MdGQtYmNvb25iLnBuZyIsImVkaXRzIjpbXX0=",
  },
  {
    name: "Brand 2",
    logo: "https://cdn2.arogga.com/eyJidWNrZXQiOiJhcm9nZ2EiLCJrZXkiOiJQcm9kdWN0QnJhbmQtcGJfYmFubmVyXC8xMDAwMTZcLzEwMDAxNi1TcXVhcmUtUGhhcm1hY2V1dGljYWxzLVBMQy1mb2xpenUucG5nIiwiZWRpdHMiOltdfQ==",
  },
  {
    name: "Brand 3",
    logo: "https://cdn2.arogga.com/eyJidWNrZXQiOiJhcm9nZ2EiLCJrZXkiOiJQcm9kdWN0QnJhbmQtcGJfYmFubmVyXC8xMDAwMjlcLzEwMDAyOS1CZXhpbWNvLVBoYXJtYWNldXRpY2Fscy1MdGQtNWdtNGEwLnBuZyIsImVkaXRzIjpbXX0=",
  },
  {
    name: "Brand 4",
    logo: "https://cdn2.arogga.com/eyJidWNrZXQiOiJhcm9nZ2EiLCJrZXkiOiJQcm9kdWN0QnJhbmQtcGJfYmFubmVyXC8xMDAwMDZcLzEwMDAwNi1SZW5hdGEtTGltaXRlZC1veDRwNGYucG5nIiwiZWRpdHMiOltdfQ==",
  },
  {
    name: "Brand 5",
    logo: "https://cdn2.arogga.com/eyJidWNrZXQiOiJhcm9nZ2EiLCJrZXkiOiJQcm9kdWN0QnJhbmQtcGJfYmFubmVyXC8xMDAwNjNcLzEwMDA2My1Fc2theWVmLVBoYXJtYWNldXRpY2Fscy1MdGQtNzVwdTJhLnBuZyIsImVkaXRzIjpbXX0=",
  },
  {
    name: "Brand 6",
    logo: "https://cdn2.arogga.com/eyJidWNrZXQiOiJhcm9nZ2EiLCJrZXkiOiJQcm9kdWN0QnJhbmQtcGJfYmFubmVyXC8xMDAwNDVcLzEwMDA0NS1Mb2dvLXdvcmtzXzAwMTFfMTctN3dxcXMwLnBuZyIsImVkaXRzIjpbXX0=",
  },
  {
    name: "Brand 7",
    logo: "https://cdn2.arogga.com/eyJidWNrZXQiOiJhcm9nZ2EiLCJrZXkiOiJQcm9kdWN0QnJhbmQtcGJfYmFubmVyXC8xMDAwMzBcLzEwMDAzMC1Mb2dvLXdvcmtzXzAwMTZfMTYtdmxnazhzLnBuZyIsImVkaXRzIjpbXX0=",
  },
  {
    name: "Brand 8",
    logo: "https://cdn2.arogga.com/eyJidWNrZXQiOiJhcm9nZ2EiLCJrZXkiOiJQcm9kdWN0QnJhbmQtcGJfYmFubmVyXC8xMDAwNDNcLzEwMDA0My1CZWFjb24tUGhhcm1hY2V1dGljYWxzLUx0ZC1oY3BlczEucG5nIiwiZWRpdHMiOltdfQ==",
  },
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
