import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import ReviewForm from "./ReviewAdd";
import { getAllReview } from "@/services/Review";
import { getCurrentUser } from "@/services/AuthService";


export async function CustomerReviews() {
  const res = await getAllReview();
  const reviews = res?.data
 const user = await getCurrentUser();
 
  return (
    <section className="py-12">
      <div className=" custom-container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          What Our Customers Say
        </h2>
        <div className="mb-5">{user && <ReviewForm />}</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews?.slice(0, 6).map((review: any) => (
            <Card key={review._id}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar>
                    <AvatarImage
                      src={review.user?.image}
                      alt={review.user.name}
                    />
                    <AvatarFallback>
                      {review.user.name
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{review.user.name}</p>
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
                <p className="text-muted-foreground">{review.comment}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
