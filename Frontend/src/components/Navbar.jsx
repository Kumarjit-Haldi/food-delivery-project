import React, { useEffect, useState } from "react";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  // ---------------- CART COUNT ----------------
  const updateCartCount = () => {
    const savedCart = localStorage.getItem("foodnest-cart");

    if (savedCart) {
      const cart = JSON.parse(savedCart);

      const totalItems = cart.reduce(
        (total, item) => total + item.quantity,
        0
      );

      setCartCount(totalItems);
    } else {
      setCartCount(0);
    }
  };

  // ---------------- LOGIN USER ----------------
  const updateUser = () => {
    const savedUser = localStorage.getItem("foodnest-user");

    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    } else {
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    updateCartCount();
    updateUser();

    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  // URL change হলে user information আবার check করবে
  useEffect(() => {
    updateUser();
  }, [location.pathname]);

  // ---------------- LOGOUT ----------------
  const handleLogout = () => {
    localStorage.removeItem("foodnest-token");
    localStorage.removeItem("foodnest-user");

    setCurrentUser(null);
    setIsOpen(false);

    navigate("/login");
  };

  const navItems = [
    { name: "Home", path: "/home" },
    { name: "Menu", path: "/products" },
    { name: "Search", path: "/search" },
    { name: "Orders", path: "/orders" },
  ];

  const navLinkStyle = ({ isActive }) =>
    `relative group flex items-center px-3 py-2 text-sm font-semibold transition-all duration-300 ${
      isActive
        ? "text-orange-500"
        : "text-gray-700 hover:text-orange-500"
    }`;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200/70 bg-white/80 backdrop-blur-xl shadow-sm">

      {/* Main Navbar */}
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">

        {/* Logo */}
        <Link
          to="/home"
          className="group flex items-center gap-3"
        >
          <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-orange-400 via-orange-500 to-red-500 shadow-lg shadow-orange-200 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">

            <div className="absolute inset-0 bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <svg
              className="relative h-6 w-6 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8c-3.5 0-6 2.2-6 5.2C6 16.5 8.7 19 12 19s6-2.5 6-5.8C18 10.2 15.5 8 12 8Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 8c-.5-2 1-3.5 3-4 2 .5 3.5 2 3 4"
              />
            </svg>
          </div>

          <div className="leading-none">
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">
              Food
              <span className="text-orange-500">Nest</span>
            </h1>

            <p className="mt-1 text-[10px] font-medium tracking-[0.25em] text-gray-400">
              SMART FOOD • AI
            </p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-2 md:flex">

          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={navLinkStyle}
            >
              {item.name}

              <span className="absolute bottom-0 left-3 h-[2px] w-0 rounded-full bg-orange-500 transition-all duration-300 group-hover:w-[calc(100%-24px)]" />
            </NavLink>
          ))}

          {/* Cart */}
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `relative ml-2 flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                isActive
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-200"
                  : "bg-gray-100 text-gray-700 hover:bg-orange-50 hover:text-orange-500"
              }`
            }
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l2.4 11.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L21 7H6"
              />
              <circle cx="10" cy="20" r="1" />
              <circle cx="18" cy="20" r="1" />
            </svg>

            Cart

            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
              {cartCount}
            </span>
          </NavLink>

          {/* User / Login */}
          <div className="ml-3 flex items-center gap-2">

            {currentUser ? (
              <>
                {/* User Name */}
                <div className="flex items-center gap-2 rounded-xl bg-orange-50 px-4 py-2.5 text-sm font-semibold text-orange-600">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
                    {currentUser.name?.charAt(0).toUpperCase()}
                  </div>

                  <span className="max-w-[120px] truncate">
                    {currentUser.name}
                  </span>
                </div>
                {/* Admin Dashboard */}
                 {currentUser?.role === "admin" && (
                <Link
                 to="/admin"
                className="rounded-xl px-4 py-2.5 text-sm font-semibold text-orange-500 transition-all duration-300 hover:bg-orange-50"
               >
                 Admin Dashboard
                 </Link>
                  )}

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-700 transition-all duration-300 hover:bg-red-50 hover:text-red-500"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                {/* Login */}
                <Link
                  to="/login"
                  className="rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-700 transition-all duration-300 hover:bg-gray-100 hover:text-orange-500"
                >
                  Login
                </Link>

                {/* Register */}
                <Link
                  to="/register"
                  className="rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-orange-200 transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-orange-300"
                >
                  Register
                </Link>
              </>
            )}

          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-xl bg-gray-100 p-3 text-gray-700 transition-all duration-300 hover:bg-orange-50 hover:text-orange-500 md:hidden"
        >
          {isOpen ? (
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 6l12 12M18 6L6 18"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden border-t border-gray-100 bg-white transition-all duration-300 md:hidden ${
          isOpen
            ? "max-h-[600px] opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-2 px-5 py-5">

          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-orange-50 text-orange-500"
                    : "text-gray-700 hover:bg-gray-50 hover:text-orange-500"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

          {/* Mobile Cart */}
          <NavLink
            to="/cart"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-700 transition-all hover:bg-orange-50 hover:text-orange-500"
          >
            <span>Cart</span>

            <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
              {cartCount}
            </span>
          </NavLink>

          {/* Mobile User */}
          {currentUser ? (
            <>
              <div className="flex items-center gap-3 rounded-xl bg-orange-50 px-4 py-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white">
                  {currentUser.name?.charAt(0).toUpperCase()}
                </div>

                <div>
                  <p className="text-xs text-gray-400">
                    Logged in as
                  </p>

                  <p className="text-sm font-bold text-gray-800">
                    {currentUser.name}
                  </p>
                </div>
              </div>
              {/* Mobile Admin Dashboard */}
            {currentUser?.role === "admin" && (
            <Link
             to="/admin"
           onClick={() => setIsOpen(false)}
             className="block rounded-xl border border-orange-200 px-4 py-3 text-center text-sm font-bold text-orange-500 transition-all duration-300 hover:bg-orange-50"
                 >
             Admin Dashboard
             </Link>
              )}
              {/* Mobile Logout */}
              <button
                onClick={handleLogout}
                className="block w-full rounded-xl border border-red-200 px-4 py-3 text-center text-sm font-bold text-red-500 transition-all duration-300 hover:bg-red-50"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Mobile Login */}
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block rounded-xl border border-gray-200 px-4 py-3 text-center text-sm font-bold text-gray-700 transition-all duration-300 hover:border-orange-300 hover:text-orange-500"
              >
                Login
              </Link>

              {/* Mobile Register */}
              <Link
                to="/register"
                onClick={() => setIsOpen(false)}
                className="block rounded-xl bg-orange-500 px-4 py-3 text-center text-sm font-bold text-white shadow-md shadow-orange-200 transition-all duration-300 hover:bg-orange-600"
              >
                Create Account
              </Link>
            </>
          )}

        </div>
      </div>

    </nav>
  );
};

export default Navbar;