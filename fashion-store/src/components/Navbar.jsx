import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { SearchContext } from "../context/SearchContext";

export default function Navbar() {
  const { cart } = useContext(CartContext);
  const { search, setSearch } = useContext(SearchContext);

  // 🌙 Dark Mode Toggle
  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");

    localStorage.setItem(
      "theme",
      document.documentElement.classList.contains("dark")
        ? "dark"
        : "light"
    );
  };

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <nav className="flex justify-between items-center px-10 py-4 shadow-md dark:bg-black dark:text-white">

      {/* LEFT: LOGO */}
      <h1 className="text-2xl font-bold">SHOP.CO</h1>

      {/* CENTER: NAV LINKS + SEARCH */}
      <div className="flex items-center gap-8">

        <Link to="/" className="hover:underline">Home</Link>

        {/* 🔍 SEARCH BAR (ADDED) */}
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-1 rounded w-40 text-black"
        />

        <Link to="/cart" className="hover:underline">
          Cart ({cart.length})
        </Link>

      </div>

      {/* RIGHT: AUTH + DARK MODE */}
      <div className="flex items-center gap-4">

        <Link
          to="/login"
          className="px-4 py-2 border rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          Login
        </Link>

        <Link
          to="/signup"
          className="px-4 py-2 bg-black text-white rounded dark:bg-white dark:text-black transition"
        >
          Signup
        </Link>

        <button
          onClick={toggleDarkMode}
          className="px-4 py-2 border rounded"
        >
          🌙
        </button>

        <Link to="/wishlist" className="ml-4">
          ❤️ Wishlist
        </Link>

      </div>
    </nav>
  );
}