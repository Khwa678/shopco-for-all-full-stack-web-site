import { useLocation } from "react-router-dom";
import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";

export default function Product() {
  const location = useLocation();
  const product = location.state?.product;

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("M");

  const { addToCart } = useContext(CartContext);
  const { addToWishlist, removeFromWishlist, wishlist } =
    useContext(WishlistContext);

  // ✅ FIX
  const isInWishlist =
    product && wishlist.find((item) => item.name === product.name);

  if (!product) {
    return (
      <div className="p-10 text-center text-red-500">
        Product not found ❌ <br />
        Please go back and select a product.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-start p-10 dark:bg-black dark:text-white">

      <div className="flex flex-col md:flex-row gap-10 max-w-5xl w-full">

        {/* IMAGE */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:w-96 rounded-lg object-cover"
        />

        {/* DETAILS */}
        <div className="flex-1">

          <h1 className="text-3xl font-bold">{product.name}</h1>

          <p className="text-yellow-500 mt-2">★★★★☆ (4.3)</p>

          <p className="text-xl mt-2 text-gray-500">
            ₹{product.price}
          </p>

          <p className="mt-4 text-gray-600 dark:text-gray-400">
            {product.description}
          </p>

          {/* SIZE */}
          <div className="mt-5">
            <p className="mb-2 font-semibold">Select Size:</p>
            {["S", "M", "L", "XL"].map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`px-3 py-1 border mr-2 rounded ${
                  size === s
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : ""
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* QUANTITY */}
          <div className="mt-5">
            <p className="mb-2 font-semibold">Quantity:</p>
            <input
              type="number"
              min="1"
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              className="border p-2 w-20 rounded"
            />
          </div>

          {/* 🔥 BUTTONS */}
          <div className="mt-6 flex gap-4">

            {/* ADD TO CART */}
            <button
              onClick={() => addToCart({ ...product, qty, size })}
              className="px-6 py-3 bg-black text-white dark:bg-white dark:text-black rounded"
            >
              Add to Cart
            </button>

            {/* WISHLIST */}
            <button
              onClick={() =>
                isInWishlist
                  ? removeFromWishlist(product.name)
                  : addToWishlist(product)
              }
              className="px-4 py-3 border rounded"
            >
              {isInWishlist ? "💔 Remove" : "❤️ Wishlist"}
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}