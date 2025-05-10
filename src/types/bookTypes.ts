export type BookResponseDto = {
  bookId: number;
  title: string;
  isbn: string;
  description: string;
  author: string;
  genre: string; // Enum as string
  language: string;
  format: string; // Enum as string
  publisher: string;
  publicationDate: string | null; // Nullable DateTime
  price: number;
  stockQuantity: number;
  isExclusive: boolean;
  onSale: boolean;
  salePrice: number | null;
  saleStart: string | null;
  saleEnd: string | null;
  imageUrl: string;
};

export type BookGenre =
  | "Fiction"
  | "NonFiction"
  | "Biography"
  | "History"
  | "Science"
  | "Mystery"
  | "Fantasy"
  | "Romance"
  | "SelfHelp"
  | "Other";

export const BookGenres: BookGenre[] = [
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

export type BookFormat = "Hardcover" | "Paperback" | "Ebook" | "Audiobook";

export const BookFormats: BookFormat[] = [
  "Hardcover",
  "Paperback",
  "Ebook",
  "Audiobook",
];
