import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import BookCard from "../../components/books/BookCard";
import { useFetchBooksQuery } from "../../redux/features/books/booksApi";

const genres = [
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

const priceOptions = [
  { label: "Sort by price", value: "" },
  { label: "Low to High", value: "asc" },
  { label: "High to Low", value: "desc" },
];

const Recommended = () => {
  const [selectedGenre, setSelectedGenre] = useState("Choose a genre");
  const [priceOrder, setPriceOrder] = useState("");

  const queryParams: any = {
    page: 1,
    pageSize: 9,
    sortBy: priceOrder ? "price" : "publicationDate",
    order: priceOrder || "desc",
  };

  if (selectedGenre !== "Choose a genre") {
    queryParams.genre = selectedGenre;
  }

  const { data, isLoading } = useFetchBooksQuery(queryParams);
  const books = data?.books || [];

  return (
    <div className="py-16">
      <h2 className="text-3xl font-semibold mb-6">📚 📖 All Books</h2>

      {/* Filters */}
      <div className="mb-8 flex flex-wrap gap-4 items-center">
        <select
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 focus:outline-none"
        >
          {genres.map((genre, idx) => (
            <option key={idx} value={genre}>
              {genre}
            </option>
          ))}
        </select>

        <select
          onChange={(e) => setPriceOrder(e.target.value)}
          className="border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 focus:outline-none"
        >
          {priceOptions.map((option, idx) => (
            <option key={idx} value={option.value}>
              {option.label}
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
          {books.map((book: any) => (
            <SwiperSlide key={book.bookId}>
              <BookCard book={book} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default Recommended;
