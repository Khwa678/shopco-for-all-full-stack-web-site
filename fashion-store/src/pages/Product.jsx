import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";

export default function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);

 useEffect(() => {
  axios.get(`http://localhost:5000/api/products/${id}`)
    .then(res => setProduct(res.data))
    .catch(err => console.log(err));
}, [id]);

  if (!product) return <p className="p-10">Loading...</p>;

  return (
    <div className="p-10 dark:bg-black dark:text-white min-h-screen">

      <div className="flex flex-col md:flex-row gap-10">

        {/* IMAGE */}
        <img
          src={product.image}
          className="w-full md:w-96 rounded-lg object-cover"
        />

        {/* DETAILS */}
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-xl mt-2 text-gray-500">₹{product.price}</p>

          <button
            onClick={() => addToCart(product)}
            className="mt-5 px-6 py-3 bg-black text-white dark:bg-white dark:text-black rounded"
          >
            Add to Cart
          </button>
        </div>

      </div>

    </div>
  );
}