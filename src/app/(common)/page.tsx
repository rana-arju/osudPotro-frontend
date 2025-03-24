import FeaturedProducts from "@/components/featured-products";
import HeroSection from "@/components/hero-section";
import PopularCategories from "@/components/popular-categories";
import SpecialOffers from "@/components/special-offers";
import { CustomerReviews } from "@/components/customer-reviews";
import { BrandingSection } from "@/components/branding-slider";
import PromotionalSection from "@/components/promotional-section";
export default function Home() {
  return (
    <div >
  

      <HeroSection />
    
      <BrandingSection />
      <PopularCategories />
      <FeaturedProducts />
     
      <SpecialOffers />
      <PromotionalSection />
      <CustomerReviews />
    </div>
  );
}
