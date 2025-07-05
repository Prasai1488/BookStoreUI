import React, { useState } from "react";
import BookCard from "../../components/books/BookCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useGetBestSellingBooksQuery } from "../../redux/features/books/booksApi";

const BestSellers = () => {
  const [page, setPage] = useState(1);
  const pageSize = 15;

  const { data, isLoading } = useGetBestSellingBooksQuery({ page, pageSize });

  const books = data?.bestSellers || [];

  return (
    <div className="py-10">
      <h2 className="text-3xl font-semibold mb-6">🏆 Best Sellers (books with more that 5 sales)</h2>

      {isLoading ? (
        <p>Loading...</p>
      ) : books.length > 0 ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          navigation={true}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 40 },
            1024: { slidesPerView: 2, spaceBetween: 50 },
            1180: { slidesPerView: 3, spaceBetween: 50 },
          }}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {books.map((book) => (
            <SwiperSlide key={book.bookId}>
              <BookCard book={book} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-gray-500">No best sellers found.</p>
      )}

      {/* Pagination Controls */}
      <div className="mt-6 flex justify-center gap-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-4 py-2 font-medium">
          Page {data?.currentPage || 1} of {data?.totalPages || 1}
        </span>
        <button
          disabled={page === data?.totalPages}
          onClick={() =>
            setPage((p) => (p < (data?.totalPages || 1) ? p + 1 : p))
          }
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BestSellers;
