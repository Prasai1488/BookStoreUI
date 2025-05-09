import React from "react";
import { Link } from "react-router-dom";
import {
  useGetCartQuery,
  useRemoveFromCartMutation,
  useDecreaseQuantityMutation,
  useAddToCartMutation,
} from "../../redux/features/cart/cartApi";
import { useAuth } from "../../context/AuthContext";
import { useAppDispatch } from "../../redux/hooks";
import { showToast } from "../../redux/features/toastSlice";

const CartPage = () => {
  const { currentUser } = useAuth();
  const dispatch = useAppDispatch();

  const { data: cartItems = [], isLoading } = useGetCartQuery(undefined, {
    skip: !currentUser,
  });

  const [removeFromCart] = useRemoveFromCartMutation();
  const [decreaseQuantity] = useDecreaseQuantityMutation();
  const [addToCart] = useAddToCartMutation();

  const handleRemove = async (bookId: number) => {
    try {
      await removeFromCart(bookId).unwrap();
      dispatch(showToast({ type: "success", message: "Removed from cart." }));
    } catch {
      dispatch(showToast({ type: "error", message: "Failed to remove item." }));
    }
  };

  const handleDecrease = async (bookId: number) => {
    try {
      await decreaseQuantity(bookId).unwrap(); // unwrap throws if error
      dispatch(
        showToast({ type: "success", message: "Quantity decreased by 1." })
      );
    } catch {
      dispatch(
        showToast({ type: "error", message: "Failed to decrease quantity." })
      );
    }
  };

  const handleIncrease = async (bookId: number) => {
    try {
      await addToCart(bookId).unwrap();
    } catch (error: any) {
      dispatch(
        showToast({
          type: "error",
          message: error?.data?.message || "Something went wrong",
        })
      );
    }
  };

  const total = cartItems.reduce(
    (acc: number, item: any) =>
      acc + item.quantity * (item.onSale ? item.salePrice : item.price),
    0
  );

  return (
    <div className="max-w-5xl mx-auto p-5">
      <h2 className="text-3xl font-semibold mb-6">🛒 Your Cart</h2>

      {isLoading ? (
        <p>Loading...</p>
      ) : cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item: any) => (
            <div
              key={item.bookId}
              className="flex items-center gap-4 border-b pb-4"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-20 h-28 object-cover rounded"
              />
              <div className="flex-1">
                <h4 className="text-lg font-medium">{item.title}</h4>
                <p className="text-sm text-gray-600">
                  Price: Rs. {item.onSale ? item.salePrice : item.price}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => handleDecrease(item.bookId)}
                    disabled={item.quantity <= 1}
                    className={`border px-2 rounded ${
                      item.quantity <= 1 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>
                  <button
                    onClick={() => handleIncrease(item.bookId)}
                    className="border px-2 rounded"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleRemove(item.bookId)}
                    className="ml-4 text-red-500 text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center mt-6 border-t pt-4">
            <h3 className="text-xl font-bold">Subtotal: Rs. {total}</h3>
            <button className="btn-primary px-6 py-2">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
