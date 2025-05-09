import React from "react";
import { useGetMyReviewsQuery } from "../../redux/features/reviews/reviewsApi";

const MyReviewsPage = () => {
  const {
    data: reviews = [],
    isLoading,
    refetch,
  } = useGetMyReviewsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">📝 My Reviews</h2>

      {isLoading ? (
        <p>Loading...</p>
      ) : reviews.length === 0 ? (
        <p className="text-gray-500">You haven't submitted any reviews yet.</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="p-4 border rounded shadow-sm">
              <h4 className="font-semibold text-lg">{review.bookTitle}</h4>
              <p className="text-yellow-500">⭐ {review.rating}</p>
              <p className="text-gray-700">{review.comment}</p>
              <p className="text-xs text-gray-500">
                {new Date(review.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReviewsPage;
