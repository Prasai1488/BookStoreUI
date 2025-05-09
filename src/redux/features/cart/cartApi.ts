// src/redux/features/cart/cartApi.ts
import { apiSlice } from "../../api/apiSlice";

export const cartApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => "/member/cart",
      providesTags: ["Cart"], // ✅ Tag for cache tracking
    }),
    addToCart: builder.mutation({
      query: (bookId: number) => ({
        url: `/member/cart/${bookId}`,
        method: "POST",
      }),
      invalidatesTags: ["Cart"], // ✅ Invalidate cart after add
    }),
    removeFromCart: builder.mutation({
      query: (bookId: number) => ({
        url: `/member/cart/${bookId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
    decreaseQuantity: builder.mutation({
      query: (bookId: number) => ({
        url: `/member/cart/${bookId}/decrease`,
        method: "PUT",
      }),
      invalidatesTags: ["Cart"],
    }),
    clearCart: builder.mutation({
      query: () => ({
        url: `/member/cart`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useDecreaseQuantityMutation,
  useClearCartMutation,
} = cartApi;
