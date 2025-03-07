import FeaturedProducts from "@/components/featured-products";
import HeroSection from "@/components/hero-section";
import PopularCategories from "@/components/popular-categories";
import SpecialOffers from "@/components/special-offers";
import { CustomerReviews } from "@/components/customer-reviews";
import { BrandingSection } from "@/components/branding-slider";
export default function Home() {
  return (
    <div className="space-y-10 pb-10">
      <HeroSection />
      <BrandingSection />

      <FeaturedProducts />
      <PopularCategories />
      <SpecialOffers />
      <CustomerReviews />
    </div>
  );
}
