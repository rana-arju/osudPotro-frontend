import FeaturedProducts from "@/components/featured-products";
import HeroSection from "@/components/hero-section";
import PopularCategories from "@/components/popular-categories";
import SpecialOffers from "@/components/special-offers";
import { CustomerReviews } from "@/components/customer-reviews";
import { BrandingSection } from "@/components/branding-slider";
import PromotionalSection from "@/components/promotional-section";
import Blogs from "@/components/Blogs";
export default async function Home() {
  let blogPosts = [];

  try {



    const res = await fetch(`https://portfolio-backend02.vercel.app/api/v1/blog`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      next: { revalidate: 30 },
    });
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const result = await res.json();
    blogPosts = result.data;
  } catch (error) {
    console?.error("Error fetching projects:", error);
  }
  return (
    <div >
  

      <HeroSection />
    
      <BrandingSection />
      <PopularCategories />
      <FeaturedProducts />
     
      <SpecialOffers />
      <PromotionalSection />
      <CustomerReviews />
      <Blogs blogPosts={blogPosts} />
    </div>
  );
}
