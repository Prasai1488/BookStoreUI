import React, { useState } from "react";
import {
  useGetOrdersQuery,
  useCancelOrderMutation,
} from "../../redux/features/orders/ordersApi";
import { useAppDispatch } from "../../redux/hooks";
import { showToast } from "../../redux/features/toastSlice";
import { showConfirmation } from "../../redux/features/confirmation/confirmationSlice";
import { useOutletContext } from "react-router-dom";


type OutletContextType = {
  setOnConfirmFn: React.Dispatch<React.SetStateAction<() => void>>;
};

type OrderStatus = "Pending" | "Completed" | "Cancelled";

const OrdersPage = () => {
  const dispatch = useAppDispatch();

  const { setOnConfirmFn } = useOutletContext<OutletContextType>();
  const [status, setStatus] = useState<OrderStatus | undefined>(undefined);

  const [page, setPage] = useState(1);

  const { data, isLoading, refetch } = useGetOrdersQuery(
    { page, pageSize: 5, status },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const [cancelOrder] = useCancelOrderMutation();

  const handleCancel = async (orderId: number) => {
    try {
      const res = await cancelOrder(orderId).unwrap();
      dispatch(
        showToast({
          type: "success",
          message: res.message || "Order cancelled.",
        })
      );
      refetch(); // ✅ Refresh orders after cancellation
    } catch (err: any) {
      dispatch(
        showToast({
          type: "error",
          message: err?.data?.message || "Failed to cancel order.",
        })
      );
    }
  };

  const confirmCancel = (orderId: number) => {
    dispatch(
      showConfirmation({
        message:
          "Are you sure you want to cancel this order? This action cannot be undone.",
      })
    );
    setOnConfirmFn(() => () => handleCancel(orderId));
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setStatus(val === "All" ? undefined : (val as OrderStatus));
    setPage(1);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h2 className="text-3xl font-semibold mb-6">📦 My Orders</h2>

      {/* 🔍 Filter */}
      <div className="mb-6 flex items-center gap-4">
        <label className="text-sm font-medium">Filter by Status:</label>
        <select
          onChange={handleStatusChange}
          value={status ?? "All"}
          className="border px-3 py-1 rounded"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : !data || data.orders.length === 0 ? (
        <p className="text-gray-600">No orders found.</p>
      ) : (
        <>
          <div className="space-y-6">
            {data.orders.map((order) => (
              <div key={order.orderId} className="border p-4 rounded shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold">Order #{order.orderId}</h4>
                  <span
                    className={`text-sm px-2 py-1 rounded ${
                      order.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : order.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                <p className="text-sm mb-2">
                  📅 {new Date(order.createdAt).toLocaleString()}
                </p>
                <p className="text-sm">💳 Total: Rs. {order.totalAmount}</p>
                <p className="text-sm mb-2">
                  🔐 Claim Code: <strong>{order.claimCode}</strong>
                </p>

                <div className="ml-4 mt-3 space-y-1">
                  {order.books.map((book, idx) => (
                    <p key={idx} className="text-sm text-gray-700">
                      • {book.title} × {book.quantity} @ Rs.{" "}
                      {book.priceAtPurchase}
                    </p>
                  ))}
                </div>

                {order.status === "Pending" && (
                  <button
                    onClick={() => confirmCancel(order.orderId)}
                    className="mt-4 text-red-600 border border-red-600 px-3 py-1 text-sm rounded hover:bg-red-50"
                  >
                    Cancel Order
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* 📄 Pagination */}
          <div className="mt-6 flex justify-between items-center">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-4 py-1 border rounded disabled:opacity-50"
            >
              ⬅ Prev
            </button>

            <span className="text-sm font-medium">
              Page {data.currentPage} of {data.totalPages}
            </span>

            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={page === data.totalPages}
              className="px-4 py-1 border rounded disabled:opacity-50"
            >
              Next ➡
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default OrdersPage;
