import React, { useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { showToast } from "../../redux/features/toastSlice";
import { useProcessOrderMutation } from "../../redux/features/orders/ordersApi";

const FulfillOrderPage = () => {
  const [claimCode, setClaimCode] = useState("");
  const [processOrder] = useProcessOrderMutation();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await processOrder(claimCode).unwrap();
      dispatch(showToast({ type: "success", message: result.message }));

      setClaimCode("");
    } catch (err: any) {
      dispatch(
        showToast({
          type: "error",
          message: err?.data?.message || "Invalid claim code",
        })
      );
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Fulfill Order</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={claimCode}
          onChange={(e) => setClaimCode(e.target.value.toUpperCase())}
          placeholder="Enter Claim Code"
          className="w-full border px-3 py-2 rounded"
          required
        />
        <button type="submit" className="btn-primary w-full">
          Process Order
        </button>
      </form>
    </div>
  );
};

export default FulfillOrderPage;
