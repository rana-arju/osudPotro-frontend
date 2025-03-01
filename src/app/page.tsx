import FeaturedProducts from "@/components/featured-products";
import HeroSection from "@/components/hero-section";
import PopularCategories from "@/components/popular-categories";
import SpecialOffers from "@/components/special-offers";
import "../styles/main.css"
import { CustomerReviews } from "@/components/customer-reviews";
import { BrandingSlider } from "@/components/branding-slider";
export default function Home() {
  return (
    <div className="space-y-10 pb-10">
      <HeroSection />
      <BrandingSlider />
      <FeaturedProducts />
      <PopularCategories />
      <SpecialOffers />
      <CustomerReviews />
    </div>
  );
}
