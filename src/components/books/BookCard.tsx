import React from "react";
import type { BookResponseDto } from "../../types/bookTypes";
import { Link } from "react-router-dom";

type Props = {
  book: BookResponseDto;
};

const BookCard: React.FC<Props> = ({ book }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow hover:shadow-md transition duration-300 bg-white flex flex-col h-full">
      <div className="relative h-48 overflow-hidden">
        <img
          src={book.imageUrl}
          alt={book.title}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold mb-1 line-clamp-2">
          {book.title}
        </h3>
        <p className="text-sm text-gray-600 mb-2">by {book.author}</p>
        <div className="mt-auto">
          <div className="text-primary font-bold text-md mb-2">
            {book.salePrice !== null ? (
              <>
                <span className="line-through text-gray-400 mr-2">
                  ${book.price.toFixed(2)}
                </span>
                <span>${book.salePrice.toFixed(2)}</span>
              </>
            ) : (
              <span>${book.price.toFixed(2)}</span>
            )}
          </div>
          <Link
            to={`/books/${book.bookId}`}
            className="inline-block text-sm text-blue-600 hover:underline"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
