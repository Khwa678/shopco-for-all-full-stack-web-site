import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, setCart } = useContext(CartContext);

  // REMOVE
  const removeItem = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  // INCREASE
  const increaseQty = (index) => {
    setCart((prev) =>
      prev.map((item, i) =>
        i === index
          ? { ...item, qty: item.qty + 1 }   // ✅ FIXED
          : item
      )
    );
  };

  // DECREASE
  const decreaseQty = (index) => {
    setCart((prev) =>
      prev.map((item, i) =>
        i === index && item.qty > 1
          ? { ...item, qty: item.qty - 1 }   // ✅ FIXED
          : item
      )
    );
  };

  // TOTAL
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,   // ✅ FIXED
    0
  );

  if (cart.length === 0) {
    return (
      <h1 className="p-10 text-xl min-h-screen">
        Your cart is empty 🛒
      </h1>
    );
  }

  return (
    <div className="p-10 min-h-screen">

      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      <div className="space-y-5">

        {cart.map((item, index) => (
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

                {/* SIZE */}
                <p className="text-sm text-gray-400">
                  Size: {item.size}
                </p>

                {/* QUANTITY */}
                <div className="flex items-center gap-3 mt-2">

                  <button
                    onClick={() => decreaseQty(index)}
                    className="px-3 py-1 bg-gray-300 rounded"
                  >
                    -
                  </button>

                  <span className="font-semibold">
                    {item.qty}   {/* ✅ FIXED */}
                  </span>

                  <button
                    onClick={() => increaseQty(index)}
                    className="px-3 py-1 bg-gray-300 rounded"
                  >
                    +
                  </button>

                </div>
              </div>
            </div>

            {/* RIGHT */}
            <button
              onClick={() => removeItem(index)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Remove
            </button>

          </div>
        ))}

      </div>

      {/* TOTAL */}
      <div className="mt-10 text-2xl font-bold">
        Total: ₹{total}
      </div>

      <Link to="/checkout">
        <button className="mt-6 bg-green-500 text-white px-6 py-3 rounded">
          Proceed to Checkout
        </button>
      </Link>

    </div>
  );
}