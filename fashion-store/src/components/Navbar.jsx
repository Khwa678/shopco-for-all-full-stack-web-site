import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";

export default function Navbar() {
  const { cart } = useContext(CartContext);

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

      {/* CENTER: NAV LINKS */}
      <div className="flex items-center gap-8">
        <Link to="/" className="hover:underline">Home</Link>
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

      </div>
    </nav>
  );
}