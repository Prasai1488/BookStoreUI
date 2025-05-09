import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../components/Login";
import Register from "../components/Register";
import Home from "../pages/home/Home";
import SingleBook from "../pages/books/SingleBook";
import SearchResults from "../pages/books/SearchResults";
import BookmarkedBooks from "../pages/books/BookmarkedBooks";
import ProtectedRoute from "./ProtectedRoute";
import CartPage from "../pages/cart/CartPage";
import OrdersPage from "../pages/orders/OrdersPage";
import StaffRoute from "./StaffRoute";
import FulfillOrderPage from "../pages/orders/FulfillOrderPage";
import MyReviewsPage from "../pages/books/MyReviewsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Common layout for all routes
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/books/:id",
        element: <SingleBook />,
      },
      {
        path: "/search",
        element: <SearchResults />,
      },
      {
        path: "/bookmarks", // 🔒 Protected but still inside App layout
        element: (
          <ProtectedRoute>
            <BookmarkedBooks />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/orders",
        element: (
          <ProtectedRoute>
            <OrdersPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/my-reviews",
        element: (
          <ProtectedRoute>
            <MyReviewsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/fulfill-order",
        element: (
          <StaffRoute>
            <FulfillOrderPage />
          </StaffRoute>
        ),
      },
    ],
  },
]);

export default router;
