import Blogs from "@/components/Blogs";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Blogs- My best blogs",
  description:
    "Mohammad Rana Arju wrote many blog here is some blog about technologies and web development.",
};
export default async function BlogPage() {
  let blogPosts = [];

  try {
    const response = await fetch(`https://portfolio-backend02.vercel.app/api/v1/blog`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      next: { revalidate: 30 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    blogPosts = result?.data || [];
  } catch (error) {
    console?.error("Error fetching projects:", error);
    blogPosts = []; // Provide a fallback value
  }

  return (
    <main className="pt-16">
      <Blogs blogPosts={blogPosts} page={true} />
    </main>
  );
}