// src/redux/features/orders/ordersApi.ts
import { apiSlice } from "../../api/apiSlice";

type OrderStatus = "Pending" | "Completed" | "Cancelled";

type GetOrdersQueryArgs = {
  page?: number;
  pageSize?: number;
  status?: OrderStatus;
};

type GetOrdersResponse = {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
  orders: {
    orderId: number;
    totalAmount: number;
    claimCode: string;
    status: OrderStatus;
    createdAt: string;
    books: {
      bookId: number;
      title: string;
      quantity: number;
      priceAtPurchase: number;
    }[];
  }[];
};

export const ordersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    placeOrder: builder.mutation({
      query: () => ({
        url: "/member/orders",
        method: "POST",
      }),
      invalidatesTags: ["Cart"], // ✅ Refresh cart after order
    }),
    getOrders: builder.query<GetOrdersResponse, GetOrdersQueryArgs>({
      query: ({ page = 1, pageSize = 5, status } = {}) => {
        const params = new URLSearchParams();
        params.append("page", page.toString());
        params.append("pageSize", pageSize.toString());
        if (status) params.append("status", status);
        return `/member/orders?${params.toString()}`;
      },
      providesTags: ["Orders"],
    }),

    cancelOrder: builder.mutation({
      query: (id: number) => ({
        url: `/member/orders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Orders"], // ✅ Refresh orders after cancellation
    }),
    processOrder: builder.mutation({
      query: (claimCode: string) => ({
        url: `/staff/orders/process?claimCode=${claimCode}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  usePlaceOrderMutation,
  useGetOrdersQuery,
  useCancelOrderMutation,
  useProcessOrderMutation,
} = ordersApi;
