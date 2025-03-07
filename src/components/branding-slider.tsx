"use client";
import Marquee from "react-fast-marquee";
import Image from "next/image";
import { useTheme } from "next-themes";

const brands = [
  {
    name: "Brand 1",
    logo: "https://medex.com.bd/storage/images/company_logos/SSukJqe0TKV4AEAgYF1QeDcXuo5DlL.png",
  },
  {
    name: "Brand 2",
    logo: "https://medex.com.bd/storage/images/company_logos/nrFePdEnOORlkBjbp2eGWqk2G8wWNO.png",
  },
  {
    name: "Brand 3",
    logo: "https://businessinspection.com.bd/wp-content/uploads/2022/04/SQUARE-Pharma-1.jpg",
  },
  {
    name: "Brand 4",
    logo: "https://businessinspection.com.bd/wp-content/uploads/2022/04/incepta-pharma-1.jpg",
  },
  {
    name: "Brand 5",
    logo: "https://businessinspection.com.bd/wp-content/uploads/2022/04/BEXIMCO-PHARMA-1.jpg",
  },
  {
    name: "Brand 6",
    logo: "https://businessinspection.com.bd/wp-content/uploads/2022/04/Opsonin-Pharma-1.jpg",
  },
  {
    name: "Brand 7",
    logo: "https://businessinspection.com.bd/wp-content/uploads/2023/06/SKF_NEW_LOGO.png",
  },
  {
    name: "Brand 8",
    logo: "https://businessinspection.com.bd/wp-content/uploads/2022/04/Healthcare-Pharma-1.jpg",
  },
  {
    name: "Brand 9",
    logo: "https://businessinspection.com.bd/wp-content/uploads/2022/04/Renata-Pharma-1.jpg",
  },
  {
    name: "Brand 10",
    logo: "https://businessinspection.com.bd/wp-content/uploads/2022/04/Opsonin-Pharma-1.jpg",
  },
  {
    name: "Brand 11",
    logo: "https://businessinspection.com.bd/wp-content/uploads/2023/06/ACME-Laboratories-Ltd.png",
  },
];

export function BrandingSection() {
  const { theme } = useTheme();

  return (
    <section className="py-12 bg-muted">
      <div className="container px-4 md:px-6">
        <h2 className="text-2xl font-bold text-center mb-8">
          Trusted by Leading Brands
        </h2>
        <Marquee
          gradient={true}
          gradientColor={theme === "dark" ? "30, 41, 59" : "241, 245, 249"}
          gradientWidth={50}
          speed={40}
        >
          {brands?.map((brand, index) => (
            <div key={index} className="mx-4 flex items-center justify-center">
              <Image
                src={brand.logo || "/placeholder.svg"}
                alt={brand.name}
                width={100}
                height={50}
                className="max-w-[100px] h-auto "
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
