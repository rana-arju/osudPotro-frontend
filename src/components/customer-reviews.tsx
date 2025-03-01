import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "/avatars/sarah-johnson.jpg",
    review:
      "Great service and fast delivery! The medicines were well-packaged and arrived on time.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "/avatars/michael-chen.jpg",
    review:
      "I love the wide range of products available. It's my go-to online pharmacy now.",
    rating: 4,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    avatar: "/avatars/emily-rodriguez.jpg",
    review:
      "The customer service is excellent. They helped me find the right product for my needs.",
    rating: 5,
  },
  {
    id: 4,
    name: "David Kim",
    avatar: "/avatars/david-kim.jpg",
    review:
      "Competitive prices and genuine products. I'm a satisfied repeat customer.",
    rating: 4,
  },
  {
    id: 5,
    name: "Lisa Patel",
    avatar: "/avatars/lisa-patel.jpg",
    review:
      "The website is easy to navigate, and the checkout process is smooth. Highly recommended!",
    rating: 5,
  },
  {
    id: 6,
    name: "John Smith",
    avatar: "/avatars/john-smith.jpg",
    review:
      "Reliable and trustworthy. I appreciate the detailed product information provided.",
    rating: 4,
  },
];

export function CustomerReviews() {
  return (
    <section className="py-12 bg-muted/50">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar>
                    <AvatarImage src={review.avatar} alt={review.name} />
                    <AvatarFallback>
                      {review.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{review.name}</p>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground">{review.review}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
