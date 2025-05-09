import { FiShoppingCart, FiBookmark } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  useFetchBookByIdQuery,
  useGetBookReviewsQuery,
  useAddBookmarkMutation,
  useRemoveBookmarkMutation,
  useGetBookmarksQuery,
} from "../../redux/features/books/booksApi";
import { useAddToCartMutation } from "../../redux/features/cart/cartApi";
import { useAuth } from "../../context/AuthContext";
import { showToast } from "../../redux/features/toastSlice";
import { useAppDispatch } from "../../redux/hooks";
import { useState } from "react";

const SingleBook = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentUser } = useAuth();
  const bookId = parseInt(id!);
  const { data: bookmarks = [] } = useGetBookmarksQuery(undefined, {
    skip: !currentUser,
  });
  const [addBookmark] = useAddBookmarkMutation();
  const [removeBookmark] = useRemoveBookmarkMutation();
  const [isProcessing, setIsProcessing] = useState(false);
  const [addToCart] = useAddToCartMutation();

  const isBookmarked = bookmarks.some((b) => b.bookId === bookId);

  const {
    data: book,
    isLoading,
    isError,
  } = useFetchBookByIdQuery(id!, { skip: !id });

  const {
    data: reviews,
    isLoading: isReviewsLoading,
    isError: isReviewsError,
  } = useGetBookReviewsQuery(id!, { skip: !id });

  const handleBookmarkToggle = async () => {
    try {
      setIsProcessing(true);
      if (isBookmarked) {
        await removeBookmark(bookId);
        dispatch(showToast({ type: "success", message: "Bookmark removed." }));
      } else {
        await addBookmark(bookId);
        dispatch(showToast({ type: "success", message: "Book bookmarked!" }));
      }
    } catch (err) {
      dispatch(showToast({ type: "error", message: "Bookmark failed!" }));
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAddToCart = async () => {
    try {
      await addToCart(bookId).unwrap();
      dispatch(showToast({ type: "success", message: "Book added to cart!" }));
    } catch (error: any) {
      dispatch(
        showToast({
          type: "error",
          message: error?.data || "Failed to add to cart.",
        })
      );
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error while trying to load book info</div>;

  return (
    <div className="grid md:grid-cols-2 gap-8 p-5 max-w-5xl mx-auto">
      {/* Book Info Section */}
      <div className="shadow-md p-5 rounded-lg bg-white">
        <h1 className="text-2xl font-bold mb-6">{book?.title}</h1>
        <img src={book?.imageUrl} alt={book?.title} className="mb-6 w-full" />
        <div className="mb-5 text-gray-700 space-y-2">
          <p>
            <strong>Author:</strong> {book?.author || "admin"}
          </p>
          <p>
            <strong>Published:</strong> {book?.publicationDate}
          </p>
          <p>
            <strong>Category:</strong> {book?.genre}
          </p>
          <p>
            <strong>Stock Quantity:</strong> {book?.stockQuantity} pcs
          </p>
          <p>
            <strong>Price:</strong> Rs. {book?.price}
          </p>
          <p>
            <strong>Format:</strong> {book?.format}
          </p>
          <p>
            <strong>Description:</strong> {book?.description}
          </p>
        </div>
        {currentUser?.role === "Member" && (
          <div className="flex gap-3">
            <button
              onClick={handleAddToCart}
              disabled={!book?.stockQuantity}
              className={`btn-primary px-6 flex items-center gap-2 ${
                !book?.stockQuantity ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <FiShoppingCart />
              Add to Cart
            </button>

            <button
              onClick={handleBookmarkToggle}
              disabled={isProcessing}
              className={`border px-4 py-2 rounded flex items-center gap-2 transition ${
                isBookmarked
                  ? "text-blue-600 border-blue-600 bg-blue-50"
                  : "text-gray-600 border-gray-300 bg-white"
              }`}
            >
              <FiBookmark
                className={`transition ${
                  isBookmarked ? "fill-blue-600 text-blue-600" : "text-gray-500"
                }`}
              />
              {isBookmarked ? "Bookmarked" : "Bookmark"}
            </button>
          </div>
        )}
      </div>

      {/* Review Section */}
      <div className="shadow-md p-5 rounded-lg bg-white">
        <h2 className="text-xl font-semibold mb-4">📚 Reviews</h2>
        {isReviewsLoading ? (
          <p>Loading reviews...</p>
        ) : isReviewsError ? (
          <p>Error loading reviews.</p>
        ) : reviews?.length === 0 ? (
          <p className="text-gray-500">No reviews yet for this book.</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((review: any) => (
              <div key={review.id} className="border-b pb-4 border-gray-200">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium">{review.reviewer}</span>
                  <span className="text-yellow-500">⭐ {review.rating}</span>
                </div>
                <p className="text-gray-600">{review.comment}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(review.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleBook;
