import React, { useState } from "react";
import { useGetAllAdminBooksQuery } from "../../redux/features/admin/adminApi";
import BookFormModal from "../../components/admin/BookFormModal";
import { useAppDispatch } from "../../redux/hooks";
import { showConfirmation } from "../../redux/features/confirmation/confirmationSlice";
import { showToast } from "../../redux/features/toastSlice";
import { useDeleteBookMutation } from "../../redux/features/admin/adminApi";
import type { BookResponseDto } from "../../types/bookTypes";
import { useOutletContext } from "react-router-dom";

type OutletContextType = {
  setOnConfirmFn: React.Dispatch<React.SetStateAction<() => void>>;
};

const ManageBooks = () => {
  const [page, setPage] = useState(1);
  const pageSize = 6;

  const { setOnConfirmFn } = useOutletContext<OutletContextType>();
  const dispatch = useAppDispatch();

  const { data, isLoading, refetch } = useGetAllAdminBooksQuery({
    page,
    pageSize,
  });
  const books = data?.books || [];
  const totalPages = data?.totalPages || 1;

  const [deleteBook] = useDeleteBookMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<BookResponseDto | null>(null);

  const openCreateModal = () => {
    setEditingBook(null);
    setIsModalOpen(true);
  };

  const openEditModal = (book: BookResponseDto) => {
    setEditingBook(book);
    setIsModalOpen(true);
  };

  const confirmDelete = (id: number) => {
    dispatch(
      showConfirmation({
        message: "Are you sure you want to delete this book?",
      })
    );
    setOnConfirmFn(() => () => handleDelete(id));
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteBook(id).unwrap();
      dispatch(showToast({ type: "success", message: "Book deleted." }));
      refetch();
    } catch {
      dispatch(showToast({ type: "error", message: "Failed to delete book." }));
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold">📚 Manage Books</h2>
        <button onClick={openCreateModal} className="btn-primary">
          ➕ Add Book
        </button>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : books.length === 0 ? (
        <p className="text-gray-600">No books available.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {books.map((book) => (
              <div key={book.bookId} className="border rounded p-4 shadow">
                <h3 className="font-bold text-lg mb-1">{book.title}</h3>
                <p className="text-sm text-gray-600">By {book.author}</p>
                <div className="flex justify-between mt-3 text-sm">
                  <button
                    onClick={() => openEditModal(book)}
                    className="text-blue-600 hover:underline"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => confirmDelete(book.bookId)}
                    className="text-red-600 hover:underline"
                  >
                    🗑 Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              ⬅ Prev
            </button>
            <span className="text-sm font-medium">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Next ➡
            </button>
          </div>
        </>
      )}

      <BookFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          refetch();
        }}
        existingBook={editingBook || undefined}
      />
    </div>
  );
};

export default ManageBooks;
