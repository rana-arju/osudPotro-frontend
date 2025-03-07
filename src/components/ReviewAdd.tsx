"use client";
import { useState } from "react";

import Modal from "./Modal"; // Import the modal
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useUser } from "@/context/UserContext";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createReview } from "@/services/Review";

const ReviewForm = () => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const router = useRouter();
  const { user } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (!user) {
        toast.error("Login please!");
        router.push("/auth/login");
        return;
      }

      const reviewData = {
        user: user?.userId,
        comment,
        rating,
      };

      const res = await createReview(reviewData);

      if (res?.success) {
        toast.success("Review added successfully. Thank you!");

        // Clear inputs
        setComment("");
        setRating(0);

        // Close the modal
        setIsModalOpen(false);
      } else {
        toast.error(res?.message || "Failed to add review.");
        setError(res?.message);
      }
    } catch {
      setError("Error submitting review. Please try again.");
      toast.error("Error submitting review. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer"
      >
        Add Review
      </Button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-2xl font-bold mb-4">Submit Your Review</h2>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="rating"
              className="block text-sm font-medium text-gray-700"
            >
              Rating
            </label>
            <input
              type="number"
              id="rating"
              name="rating"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="comment"
              className="block text-sm font-medium text-gray-700"
            >
              Comment
            </label>
            <Textarea
              id="comment"
              name="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your review here..."
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer"
            >
              {loading ? "Submitting..." : "Submit Review"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ReviewForm;
