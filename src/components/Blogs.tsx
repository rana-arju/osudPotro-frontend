"use client"
import Link from "next/link";
import Image from "next/image";
import moment from "moment";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import sanitizeHtml from "sanitize-html";

import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";


export default function Blogs({ blogPosts, page }: any) {
  // Function to strip HTML tags for preview
const getFirstWords = (html: string, wordLimit: number) => {
  // Remove all HTML tags to get plain text
  const plainText = sanitizeHtml(html, { allowedTags: [] }).trim();

  // Split by spaces and take the first `wordLimit` words
  const words = plainText.split(/\s+/).slice(0, wordLimit).join(" ");

  return words + (plainText.split(/\s+/).length > wordLimit ? "..." : "");
};

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-2xl font-bold inline-block  uppercase">
          Blogs


        </h3>
{
    !page &&    <Link href="/blogs">
    <Button className="cursor-pointer">


    More Blogs
    </Button>
    </Link>
}
     
      </div>

      {blogPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts?.map((post:any) => (
            <Link href={`/blogs/${post?._id}`} key={post?._id}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                <CardHeader className="p-0">
                  <Image
                    src={post?.image || "/blog.webp"}
                    alt={post?.title}
                    width={600}
                    height={400}
                    className="w-full h-48 object-cover"
                  />
                </CardHeader>
                <CardContent className="p-4">
                  <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">
                    {post?.title?.split(/\s+/).slice(0, 10).join(" ") + "..."}
                  </h2>
                  <div className="prose max-w-none">
                    <p>{getFirstWords(post.content, 20)}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post?.tags?.map((tag:any) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="p-4 bg-gray-50 dark:bg-gray-800 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex justify-between w-full">
                    <span>Rana Arju</span>
                    <span>{moment(post?.createdAt).format("MMM Do YY")}</span>
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div>
          <h2 className="text-primary text-bold text-center h-14 text-xl">
            There are no blog
          </h2>
        </div>
      )}
    </div>
  );
}