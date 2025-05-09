// src/pages/books/BookmarkedBooks.tsx

import { useGetBookmarksQuery } from "../../redux/features/books/booksApi";
import BookCard from "../../components/books/BookCard";

const BookmarkedBooks = () => {
  const { data: bookmarks = [], isLoading } = useGetBookmarksQuery();

  return (
    <div className="py-10 max-w-screen-xl mx-auto px-4">
      <h2 className="text-2xl font-semibold mb-4">📌 My Bookmarked Books</h2>

      {isLoading ? (
        <p>Loading bookmarks...</p>
      ) : bookmarks.length === 0 ? (
        <p className="text-gray-500">You haven’t bookmarked any books yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {bookmarks.map((book: any) => (
            <BookCard key={book.bookId} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookmarkedBooks;
