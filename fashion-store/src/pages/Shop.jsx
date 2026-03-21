import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import { SearchContext } from "../context/SearchContext";

export default function Shop() {
  const [products, setProducts] = useState([]);

  const { addToCart } = useContext(CartContext);
  const { search } = useContext(SearchContext); // ✅ FIXED (inside)

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="dark:bg-black dark:text-white min-h-screen p-10">

      <h1 className="text-4xl font-bold mb-10 text-center">
        🛍️ Shop Our Collection
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {products
          .filter((p) =>
            p.name.toLowerCase().includes((search || "").toLowerCase())
          )
          .map((p, i) => (
            <Link
              to={`/product/${i}`}
              state={{ product: p }}
              key={i}
            >
              <div className="border rounded-xl p-4 shadow hover:scale-105 transition cursor-pointer">

                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-48 object-cover rounded-lg"
                />

                <h2 className="mt-3 font-semibold text-lg">{p.name}</h2>
                <p className="text-gray-500">₹{p.price}</p>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    addToCart({ ...p, qty: 1, size: "M" }); // 🔥 better
                  }}
                  className="mt-4 w-full bg-black text-white py-2 rounded-lg"
                >
                  Add to Cart
                </button>

              </div>
            </Link>
        ))}

      </div>
    </div>
  );
}