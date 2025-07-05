
import { useSearchParams } from "react-router-dom";
import { useFetchBooksQuery } from "../../redux/features/books/booksApi";
import BookCard from "../../components/books/BookCard";

const SearchResults = () => {
  const [params] = useSearchParams();
  const search = params.get("query") || "";

  const { data, isLoading } = useFetchBooksQuery({
    search,
    page: 1,
    pageSize: 20,
  });

  const books = data?.books || [];

  return (
    <div className="py-10 max-w-screen-xl mx-auto px-4">
      <h2 className="text-2xl font-semibold mb-4">
        Search results for: <span className="text-primary">"{search}"</span>
      </h2>

      {isLoading ? (
        <p>Loading...</p>
      ) : books.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <BookCard key={book.bookId} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
