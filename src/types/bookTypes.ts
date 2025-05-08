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
