/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import NotFound from "@/app/not-found";
import sanitizeHtml from "sanitize-html";
export async function generateMetadata({ params }: any) {
  const { id } = await params;
  const response = await fetch(`https://portfolio-backend02.vercel.app/api/v1/blog/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const blogPosts = await response.json();
  const post = blogPosts?.data;
  return {
    title: post?.title || "No project found",
    description: post?.content || "No content found",
  };
}
export default async function BlogPost({ params }: any) {
  const { id } = await params;

  const response = await fetch(`https://portfolio-backend02.vercel.app/api/v1/blog/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const blogPosts = await response.json();
  const post = blogPosts?.data;

  if (!post) {
    return <NotFound />;
  }
  // Sanitize HTML to allow only safe elements from TinyMCE
  const safeHtml = sanitizeHtml(post?.content || "", {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "iframe"]),
    allowedAttributes: {
      a: ["href", "target", "rel"],
      img: ["src", "alt", "width", "height"],
      iframe: [
        "src",
        "width",
        "height",
        "frameborder",
        "allow",
        "allowfullscreen",
      ],
    },
  });
  return (
    <article className="custom-container mx-auto py-2">
      <Button asChild variant="ghost" className="mb-6">
        <Link href="/blogs">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Link>
      </Button>
      <Image
        src={post.image || "/placeholder.svg"}
        alt={post.title}
        width={1200}
        height={600}
        className="w-full h-[400px] object-cover rounded-lg mb-8"
      />
      <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100">
        {post.title}
      </h1>
      <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-600 dark:text-gray-300">
        <span>{post.author}</span>
        <span>{post.date}</span>
        <span>{post.readTime}</span>
      </div>
      <div className="flex flex-wrap gap-2 mb-8">
        {post?.tags?.map((tag: any) => (
          <Badge
            key={tag}
            variant="secondary"
            className="bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
          >
            {tag}
          </Badge>
        ))}
      </div>
      <div className="">
        {post?.content ? (
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: safeHtml }}
          />
        ) : (
          <p>Loading content...</p>
        )}
      </div>
    </article>
  );
}