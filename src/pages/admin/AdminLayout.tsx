import React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { useAppDispatch } from "../../redux/hooks";
import { useAuth } from "../../context/AuthContext";
import { showToast } from "../../redux/features/toastSlice";
import { apiSlice } from "../../redux/api/apiSlice";

const AdminLayout = () => {
  const { pathname } = useLocation();
  const { logout } = useAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const navItems = [
    { label: "Dashboard", path: "/admin-dashboard" },
    { label: "Manage Books", path: "/admin-dashboard/books" },
    { label: "Manage Announcements", path: "/admin-dashboard/announcements" },
  ];
  const handleLogOut = () => {
    logout(); // clears localStorage + context
    dispatch(apiSlice.util.resetApiState()); // resets all cached queries
    dispatch(
      showToast({ type: "success", message: "Logged out successfully." })
    );
    navigate("/login");
  };
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold mb-6">📚 Admin Panel</h2>
          <ul className="space-y-3">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`block px-3 py-2 rounded hover:bg-gray-700 ${
                    pathname === item.path ? "bg-gray-700" : ""
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogOut}
          className="flex items-center gap-2 text-sm px-3 py-2 mt-6 rounded hover:bg-gray-700"
        >
          <FiLogOut className="text-lg" />
          Logout
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-gray-50 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
