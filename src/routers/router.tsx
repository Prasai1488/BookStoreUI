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
import AdminRoute from "./AdminRoute";
import AdminLayout from "../pages/admin/AdminLayout";
import ManageBooks from "../pages/admin/ManageBooks";
import AdminDashboard from "../pages/admin/AdminDashboard";
import ManageAnnouncements from "../pages/admin/ManageAnnouncements";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Public layout with Navbar/Footer
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/books/:id", element: <SingleBook /> },
      { path: "/search", element: <SearchResults /> },
      {
        path: "/bookmarks",
        element: (
          <ProtectedRoute>
            <BookmarkedBooks />
          </ProtectedRoute>
        ),
      },
      {
        path: "/cart",
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

  // 🔒 Separate route for Admin Dashboard (No Navbar/Footer)
  {
    path: "/admin-dashboard",
    element: (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),
    children: [
      { path: "", element: <AdminDashboard /> },
      { path: "books", element: <ManageBooks /> },
      { path: "announcements", element: <ManageAnnouncements /> },
    ],
  },
]);

export default router;
