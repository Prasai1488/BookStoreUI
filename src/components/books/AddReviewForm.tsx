import React, { useState } from "react";
import { useLeaveReviewMutation } from "../../redux/features/reviews/reviewsApi";
import { showToast } from "../../redux/features/toastSlice";
import { useAppDispatch } from "../../redux/hooks";

type Props = {
  bookId: number;
};

const AddReviewForm: React.FC<Props> = ({ bookId }) => {
  const dispatch = useAppDispatch();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [leaveReview, { isLoading }] = useLeaveReviewMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await leaveReview({ bookId, rating, comment }).unwrap();
      dispatch(showToast({ type: "success", message: "Review submitted." }));
      setRating(5);
      setComment("");
    } catch (err: any) {
      dispatch(
        showToast({
          type: "error",
          message:
            err?.data?.message ||
            "You can only review books you’ve purchased and not already reviewed.",
        })
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 max-w-md mt-6">
      <h4 className="text-lg font-semibold">Leave a Review</h4>

      <label className="block text-sm font-medium">
        Rating:
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="mt-1 block w-full border rounded px-2 py-1"
        >
          {[5, 4, 3, 2, 1].map((val) => (
            <option key={val} value={val}>
              {val} Star{val > 1 && "s"}
            </option>
          ))}
        </select>
      </label>

      <label className="block text-sm font-medium">
        Comment:
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          className="mt-1 block w-full border rounded px-3 py-2"
          required
        />
      </label>

      <button
        type="submit"
        disabled={isLoading}
        className="btn-primary px-4 py-2 disabled:opacity-50"
      >
        {isLoading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
};

export default AddReviewForm;
