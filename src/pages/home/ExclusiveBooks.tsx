import React from "react";
import BookCard from "../../components/books/BookCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useFetchBooksQuery } from "../../redux/features/books/booksApi";

const ExclusiveBooks = () => {
  const { data, isLoading } = useFetchBooksQuery({
    isExclusive: true,
    page: 1,
    pageSize: 15,
  });

  const books = data?.books?.filter((book) => book.isExclusive) || [];

  return (
    <div className="py-10">
      <h2 className="text-3xl font-semibold mb-6">🌟 Exclusive Collection</h2>

      {isLoading ? (
        <p>Loading...</p>
      ) : books.length === 0 ? (
        <p className="text-gray-500">No exclusive books found.</p>
      ) : (
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
      )}
    </div>
  );
};

export default ExclusiveBooks;
