import React, { useState } from "react";
import BookCard from "../../components/books/BookCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useFetchBooksQuery } from "../../redux/features/books/booksApi";

const categories = [
  "Choose a genre",
  "Fiction",
  "NonFiction",
  "Biography",
  "History",
  "Science",
  "Mystery",
  "Fantasy",
  "Romance",
  "SelfHelp",
  "Other",
];

const HotDeals = () => {
  const [selectedCategory, setSelectedCategory] = useState("Choose a genre");

  const { data, isLoading } = useFetchBooksQuery({
    onSale: true,
    page: 1,
    pageSize: 15,
  });

  const books = data?.books || [];

  const filteredBooks =
    selectedCategory === "Choose a genre"
      ? books
      : books.filter((book) => book.genre === selectedCategory);

  return (
    <div className="py-10">
      <h2 className="text-3xl font-semibold mb-6">🔥 On Sale Books</h2>

      {/* Category Filter */}
      <div className="mb-8 flex items-center">
        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          name="category"
          id="category"
          className="border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 focus:outline-none"
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {isLoading ? (
        <p>Loading...</p>
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
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <SwiperSlide key={book.bookId}>
                <BookCard book={book} />
              </SwiperSlide>
            ))
          ) : (
            <p className="text-gray-500">No books found for this category.</p>
          )}
        </Swiper>
      )}
    </div>
  );
};

export default HotDeals;
