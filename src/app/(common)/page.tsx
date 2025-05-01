import FeaturedProducts from "@/components/featured-products";
import HeroSection from "@/components/hero-section";
import PopularCategories from "@/components/popular-categories";
import SpecialOffers from "@/components/special-offers";
import { CustomerReviews } from "@/components/customer-reviews";
import { BrandingSection } from "@/components/branding-slider";
import PromotionalSection from "@/components/promotional-section";
import Blogs from "@/components/Blogs";
import NewsletterSectionAlt from "@/components/newsletter-section-alt";
export default async function Home() {
  let blogPosts = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/blog`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      next: { revalidate: 30 },
    });
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const result = await res.json();
    if (!result || !result.data) {
      throw new Error("No data found");
    }
    blogPosts = result?.data;
  } catch (error) {
    console?.error("Error fetching projects:", error);
  }
  return (
    <div>
      <HeroSection />

      <BrandingSection />
      <PopularCategories />
      <FeaturedProducts />

      <SpecialOffers />
      <PromotionalSection />
      <CustomerReviews />
      <Blogs blogPosts={blogPosts.slice(0, 3)} />
      <NewsletterSectionAlt />
    </div>
  );
}
