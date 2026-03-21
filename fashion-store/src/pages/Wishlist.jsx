import { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="p-10 text-center text-xl">
        Your wishlist is empty ❤️
      </div>
    );
  }

  return (
    <div className="p-10 min-h-screen dark:bg-black dark:text-white">

      <h1 className="text-3xl font-bold mb-6">Your Wishlist ❤️</h1>

      <div className="space-y-5">

        {wishlist.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center border p-4 rounded-lg"
          >

            {/* LEFT */}
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                className="w-20 h-20 object-cover rounded"
              />

              <div>
                <h2 className="font-semibold">{item.name}</h2>
                <p className="text-gray-500">₹{item.price}</p>
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex gap-3">

              <button
                onClick={() => addToCart({ ...item, qty: 1, size: "M" })}
                className="bg-black text-white px-4 py-2 rounded"
              >
                Add to Cart
              </button>

              <button
                onClick={() => removeFromWishlist(item.name)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Remove
              </button>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
}