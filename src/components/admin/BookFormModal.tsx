import React, { useEffect, useState } from "react";
import type { BookGenre, BookFormat } from "../../types/bookTypes";
import { BookGenres, BookFormats } from "../../types/bookTypes";
import {
  useCreateBookMutation,
  useUpdateBookMutation,
} from "../../redux/features/admin/adminApi";
import { useAppDispatch } from "../../redux/hooks";
import { showToast } from "../../redux/features/toastSlice";

interface BookFormData {
  title: string;
  isbn?: string;
  description?: string;
  author: string;
  genre: BookGenre;
  language?: string;
  format: BookFormat;
  publisher?: string;
  publicationDate?: string;
  price: number;
  stockQuantity: number;
  isExclusive: boolean;
  onSale: boolean;
  salePrice?: number;
  saleStart?: string;
  saleEnd?: string;
  imageUrl?: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  existingBook?: any;
}

const BookFormModal: React.FC<Props> = ({ isOpen, onClose, existingBook }) => {
  const dispatch = useAppDispatch();
  const [createBook] = useCreateBookMutation();
  const [updateBook] = useUpdateBookMutation();
  const isEditMode = !!existingBook;

  const [form, setForm] = useState<BookFormData>({
    title: "",
    author: "",
    description: "",
    genre: "Fiction",
    format: "Hardcover",
    price: 0,
    stockQuantity: 0,
    isExclusive: false,
    onSale: false,
  });

  useEffect(() => {
    if (isOpen) {
      if (existingBook) {
        setForm({
          ...existingBook,
          publicationDate: existingBook.publicationDate?.split("T")[0] || "",
          saleStart: existingBook.saleStart?.split("T")[0] || "",
          saleEnd: existingBook.saleEnd?.split("T")[0] || "",
        });
      } else {
        setForm({
          title: "",
          author: "",
          description: "",
          genre: "Fiction",
          format: "Hardcover",
          price: 0,
          stockQuantity: 0,
          isExclusive: false,
          onSale: false,
        });
      }
    }
  }, [existingBook, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    const val =
      type === "checkbox" && e.target instanceof HTMLInputElement
        ? e.target.checked
        : value;

    setForm((prev) => ({ ...prev, [name]: val }));
  };

  const openUploadWidget = () => {
    // @ts-ignore
    window.cloudinary.openUploadWidget(
      {
        cloudName: "ddywsujdj", // 🔁 Replace with your actual Cloud Name
        uploadPreset: "bookstore_preset", // 🔁 Your unsigned preset name
        sources: ["local", "camera"],
        folder: "bookstore", // Optional
        cropping: false,
        multiple: false,
      },
      (error: any, result: any) => {
        if (!error && result.event === "success") {
          setForm((prev) => ({ ...prev, imageUrl: result.info.secure_url }));
          dispatch(
            showToast({
              type: "success",
              message: "Image uploaded successfully!",
            })
          );
        }
      }
    );
  };

  const handleSubmit = async () => {
    const errors: string[] = [];

    if (!form.title.trim()) errors.push("Title is required");
    if (!form.author.trim()) errors.push("Author is required");
    if (!form.price || form.price <= 0)
      errors.push("Price must be greater than 0");
    if (!form.stockQuantity || form.stockQuantity < 0)
      errors.push("Stock quantity must be 0 or more");

    if (errors.length > 0) {
      dispatch(showToast({ type: "error", message: errors[0] }));
      return;
    }

    try {
      if (isEditMode) {
        await updateBook({ id: existingBook.bookId, data: form }).unwrap();
        dispatch(showToast({ type: "success", message: "Book updated." }));
      } else {
        await createBook(form).unwrap();
        dispatch(showToast({ type: "success", message: "Book created." }));
      }
      onClose();
    } catch (err: any) {
      dispatch(
        showToast({
          type: "error",
          message: err?.data?.message || "Operation failed",
        })
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[90%] max-w-2xl overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-semibold mb-4">
          {isEditMode ? "✏️ Edit Book" : "➕ Add New Book"}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title *"
            className="border p-2 rounded"
          />
          <input
            name="author"
            value={form.author}
            onChange={handleChange}
            placeholder="Author *"
            className="border p-2 rounded"
          />
          <textarea
            name="description"
            value={form.description || ""}
            onChange={handleChange}
            placeholder="Description"
            rows={3}
            className="border p-2 rounded col-span-1 sm:col-span-2"
          />
          <select
            name="genre"
            value={form.genre}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            {BookGenres.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
          <select
            name="format"
            value={form.format}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            {BookFormats.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            placeholder="Price *"
            className="border p-2 rounded"
          />
          <input
            name="stockQuantity"
            type="number"
            value={form.stockQuantity}
            onChange={handleChange}
            placeholder="Stock Quantity"
            className="border p-2 rounded"
          />
          <input
            name="isbn"
            value={form.isbn || ""}
            onChange={handleChange}
            placeholder="ISBN"
            className="border p-2 rounded"
          />
          <input
            name="language"
            value={form.language || ""}
            onChange={handleChange}
            placeholder="Language"
            className="border p-2 rounded"
          />
          <input
            name="publisher"
            value={form.publisher || ""}
            onChange={handleChange}
            placeholder="Publisher"
            className="border p-2 rounded"
          />
          <input
            name="publicationDate"
            type="date"
            value={form.publicationDate || ""}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            name="salePrice"
            type="number"
            value={form.salePrice || ""}
            onChange={handleChange}
            placeholder="Sale Price"
            className="border p-2 rounded"
          />
          <input
            name="saleStart"
            type="date"
            value={form.saleStart || ""}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            name="saleEnd"
            type="date"
            value={form.saleEnd || ""}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <div className="col-span-1 sm:col-span-2">
            <button
              onClick={openUploadWidget}
              className="bg-blue-600 text-white px-4 py-2 rounded mb-2"
            >
              Upload Image
            </button>
            {form.imageUrl && (
              <img
                src={form.imageUrl}
                alt="Uploaded preview"
                className="h-32 mt-2 rounded"
              />
            )}
          </div>
        </div>

        <div className="flex gap-4 mt-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="onSale"
              checked={form.onSale}
              onChange={handleChange}
            />
            On Sale
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isExclusive"
              checked={form.isExclusive}
              onChange={handleChange}
            />
            Exclusive
          </label>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button onClick={handleSubmit} className="btn-primary px-6 py-2">
            {isEditMode ? "Update" : "Create"}
          </button>
          <button onClick={onClose} className="px-6 py-2 border rounded">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookFormModal;
