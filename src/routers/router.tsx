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
    ],
  },
]);

export default router;
