import React from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import {
  useGetCartQuery,
  useRemoveFromCartMutation,
  useDecreaseQuantityMutation,
  useAddToCartMutation,
} from "../../redux/features/cart/cartApi";
import { useAuth } from "../../context/AuthContext";
import { useAppDispatch } from "../../redux/hooks";
import { showToast } from "../../redux/features/toastSlice";
import { usePlaceOrderMutation } from "../../redux/features/orders/ordersApi";
import { showConfirmation } from "../../redux/features/confirmation/confirmationSlice";

// Define the outlet context type
type OutletContextType = {
  setOnConfirmFn: React.Dispatch<React.SetStateAction<() => void>>;
};

const CartPage = () => {
  const { currentUser } = useAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { setOnConfirmFn } = useOutletContext<OutletContextType>();

  const { data: cartItems = [], isLoading } = useGetCartQuery(undefined, {
    skip: !currentUser,
  });

  const [removeFromCart] = useRemoveFromCartMutation();
  const [decreaseQuantity] = useDecreaseQuantityMutation();
  const [addToCart] = useAddToCartMutation();
  const [placeOrder, { isLoading: isPlacingOrder }] = usePlaceOrderMutation();

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
      await decreaseQuantity(bookId).unwrap();
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

  const handlePlaceOrder = async () => {
    try {
      const result = await placeOrder(undefined).unwrap();
      dispatch(showToast({ type: "success", message: result.message }));
      navigate("/orders");
    } catch (err: any) {
      dispatch(
        showToast({
          type: "error",
          message: err?.data?.message || "Failed to place order",
        })
      );
    }
  };

  const handleCheckoutClick = () => {
    dispatch(
      showConfirmation({
        message:
          "Are you sure you want to place this order? An email will be sent with your claim code and bill. You must present the claim code and your membership ID at the store to complete your purchase.",
      })
    );
    setOnConfirmFn(() => handlePlaceOrder);
  };

  const total = cartItems.reduce(
    (acc: number, item: any) =>
      acc + item.quantity * (item.onSale ? item.salePrice : item.price),
    0
  );

  const totalQuantity = cartItems.reduce(
    (acc: number, item: any) => acc + item.quantity,
    0
  );

  const subtotal = cartItems.reduce(
    (acc: number, item: any) =>
      acc + item.quantity * (item.onSale ? item.salePrice : item.price),
    0
  );

  let discount = 0;
  let base5Percent = false;
  let extra10Percent = false;

  // Apply 5% discount if 5+ books
  if (totalQuantity >= 5) {
    base5Percent = true;
    discount += subtotal * 0.05;
  }

  // Optional: simulate completed orders if available in currentUser
  // Example: currentUser.completedOrders = 10
  if (currentUser?.completedOrders >= 10) {
    extra10Percent = true;
    const afterBase = subtotal - (base5Percent ? subtotal * 0.05 : 0);
    discount += afterBase * 0.1;
  }

  const finalTotal = subtotal - discount;

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
            <div className="text-sm space-y-1 text-gray-800">
              <p>
                📚 Subtotal ({totalQuantity} books): Rs. {subtotal.toFixed(2)}
              </p>

              {base5Percent && (
                <p className="text-green-600">
                  🎁 5% discount applied: - Rs. {(subtotal * 0.05).toFixed(2)}
                </p>
              )}

              {extra10Percent && (
                <p className="text-green-600">
                  💳 Loyalty discount (10%): - Rs.{" "}
                  {(finalTotal * 0.1).toFixed(2)}
                </p>
              )}

              <p className="font-bold text-lg pt-2">
                Total: Rs. {finalTotal.toFixed(2)}
              </p>
            </div>

            <button
              onClick={handleCheckoutClick}
              disabled={isPlacingOrder}
              className="btn-primary px-6 py-2"
            >
              {isPlacingOrder ? "Placing Order..." : "Proceed to Checkout"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
