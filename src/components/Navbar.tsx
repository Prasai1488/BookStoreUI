import { Link } from "react-router-dom";
import {
  HiMiniBars3CenterLeft,
  HiOutlineHeart,
  HiOutlineShoppingCart,
  HiOutlineUser,
} from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import avatarImg from "../assets/avatar.png";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";
import { useAppDispatch } from "../redux/hooks";
import { showToast } from "../redux/features/toastSlice";
import { useNavigate } from "react-router-dom";
import { useGetCartQuery } from "../redux/features/cart/cartApi";

const protectedNavigation = [
  { name: "Bookmark-List", href: "/bookmarks" },
  { name: "Orders", href: "/orders" },
  { name: "Cart Page", href: "/cart" },
  { name: "Check Out", href: "/checkout" },
];

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  //   const cartItems = useSelector((state: any) => state.cart.cartItems);
  const { currentUser, logout } = useAuth();
  const dispatch = useAppDispatch();
  const { data: cartItems = [] } = useGetCartQuery(undefined, {
    skip: !currentUser,
  });

  const cartCount = cartItems.reduce(
    (acc: number, item: any) => acc + item.quantity,
    0
  );

  const handleLogOut = () => {
    logout();
    dispatch(
      showToast({ type: "success", message: "Logged out successfully." })
    );
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm(""); // optional: clear after search
    }
  };

  return (
    <header className="max-w-screen-2xl mx-auto px-4 py-6">
      <nav className="flex justify-between items-center">
        {/* Left side */}
        <div className="flex items-center md:gap-16 gap-4">
          <Link to="/">
            <HiMiniBars3CenterLeft className="size-6" />
          </Link>

          {/* Search input */}
          <div className="relative sm:w-72 w-40 space-x-2">
            <IoSearchOutline className="absolute left-3 top-2.5 text-gray-600" />
            <input
              type="text"
              placeholder="Search here"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearch}
              className="bg-[#EAEAEA] w-full py-1 md:px-8 px-6 rounded-md focus:outline-none"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="relative flex items-center md:space-x-3 space-x-2">
          <div>
            {currentUser ? (
              <>
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  <img
                    src={avatarImg}
                    alt="user avatar"
                    className={`size-7 rounded-full ring-2 ring-blue-500`}
                  />
                </button>

                {/* Dropdown */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40">
                    <ul className="py-2">
                      <li className="block px-4 py-2 text-sm text-gray-500 border-b">
                        {currentUser.username || currentUser.email}
                      </li>

                      {protectedNavigation.map((item) => (
                        <li
                          key={item.name}
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <Link
                            to={item.href}
                            className="block px-4 py-2 text-sm hover:bg-gray-100"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}

                      <li>
                        <button
                          onClick={handleLogOut}
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login">
                <HiOutlineUser className="size-6" />
              </Link>
            )}
          </div>

          {/* Show only if logged in */}
          {currentUser && (
            <>
              <button className="hidden sm:block">
                <HiOutlineHeart className="size-6" />
              </button>
              <Link
                to="/cart"
                className="relative bg-primary p-1 sm:px-6 px-2 flex items-center rounded-sm"
              >
                <HiOutlineShoppingCart />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1.5">
                    {cartCount}
                  </span>
                )}
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
