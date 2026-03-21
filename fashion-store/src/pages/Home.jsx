import { useEffect, useState, useContext ,useRef} from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import { SearchContext } from "../context/SearchContext";

export default function Home() {
  const productRef = useRef();
const [products, setProducts] = useState([
  {
    name: "Black T-Shirt",
    price: 799,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    description: "Classic black t-shirt made with premium cotton. Soft, breathable, and perfect for everyday wear."
  },
  {
    name: "White Oversized Tee",
    price: 999,
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500",
    description: "Classic black t-shirt made with premium cotton. Soft, breathable, and perfect for everyday wear."
  },
  {
    name: "Graphic Street Tee",
    price: 1199,
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500",
    description: "Classic black t-shirt made with premium cotton. Soft, breathable, and perfect for everyday wear."
  },
  {
    name: "Casual Cotton Tee",
    price: 699,
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500",
    description: "Classic black t-shirt made with premium cotton. Soft, breathable, and perfect for everyday wear."
  },
  {
    name: "Summer Light Tee",
    price: 899,
    image: "https://images.unsplash.com/photo-1520974735194-3f5d1c4e5b8b?w=500",
    description: "Classic black t-shirt made with premium cotton. Soft, breathable, and perfect for everyday wear."
  },
  {
    name: "Blue Denim Tee",
    price: 1099,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500",
    description: "Classic black t-shirt made with premium cotton. Soft, breathable, and perfect for everyday wear."
  },
    {
    name: "Black T-Shirt",
    price: 799,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    description: "Classic black t-shirt made with premium cotton. Soft, breathable, and perfect for everyday wear."
  },  {
    name: "Black T-Shirt",
    price: 799,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    description: "Classic black t-shirt made with premium cotton. Soft, breathable, and perfect for everyday wear."
  }
]);
  const { addToCart } = useContext(CartContext);
const { search } = useContext(SearchContext);
   useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(res => setProducts(res.data))
      .catch(() => {}); // prevent crash
  }, []);
const filteredProducts = products.filter((p) =>
  p.name.toLowerCase().includes((search || "").toLowerCase())
);

useEffect(() => {
  if (search && productRef.current) {
    productRef.current.scrollIntoView({ behavior: "smooth" });
  }
}, [search]);
  return (
    <div className="dark:bg-black dark:text-white min-h-screen">

      {/* HERO SECTION */}
      <div className="flex flex-col md:flex-row items-center justify-between px-10 py-20">

        <div className="max-w-xl">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            FIND CLOTHES THAT MATCH YOUR STYLE
          </h1>

          <p className="mt-6 text-gray-500 dark:text-gray-400">
            Browse through our diverse range of fashion. Discover your perfect style today.
          </p>

<Link to="/shop">

 <button  className="mt-8 px-8 py-3 bg-black text-white dark:bg-white dark:text-black rounded-lg hover:scale-105 transition">
            Shop Now
          </button>
         </Link>

          {/* STATS */}
          <div className="flex gap-10 mt-10 text-center">
            <div>
              <h2 className="text-xl font-bold">200+</h2>
              <p className="text-gray-500 text-sm">Brands</p>
            </div>
            <div>
              <h2 className="text-xl font-bold">2,000+</h2>
              <p className="text-gray-500 text-sm">Products</p>
            </div>
            <div>
              <h2 className="text-xl font-bold">30,000+</h2>
              <p className="text-gray-500 text-sm">Customers</p>
            </div>
          </div>
        </div>

        {/* IMAGE */}
        <div className="bg-gray-100 dark:bg-gray-800 p-5 rounded-xl">
          <img
            src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=500"
            className="w-80 md:w-[400px] rounded-lg object-cover"
          />
        </div>
      </div>

      {/* BRANDS */}
      <div className="flex flex-wrap justify-around py-6 border-y text-lg font-semibold">
        <span>VERSACE</span>
        <span>ZARA</span>
        <span>GUCCI</span>
        <span>PRADA</span>
        <span>Calvin Klein</span>
      </div>
{/* SEARCH TITLE */}
      {search && (
        <h2 className="text-2xl font-bold px-10 mt-6">
          Results for "{search}"
        </h2>
      )}

      {/* PRODUCTS */}
      <div className="p-10 grid grid-cols-1 md:grid-cols-3 gap-6">
 {filteredProducts.map((p, i) => (
          <Link
            to={`/product/${i}`}
            state={{ product: p }}
            key={i}
          >
      <div className="border rounded-lg p-4 shadow hover:scale-105 transition cursor-pointer">

        <img src={p.image} className="w-full h-40 object-cover rounded" />

        <h2 className="mt-3 font-semibold">{p.name}</h2>
        <p className="text-gray-500">₹{p.price}</p>

        <button
          onClick={(e) => {
            e.preventDefault();
            addToCart({ ...p, qty: 1, size: "M" });
          }}
          className="mt-3 w-full bg-black text-white py-2 rounded"
        >
          Add to Cart
        </button>

      </div>
    </Link>
))}
      </div>
  {filteredProducts.length === 0 && search && (
        <p className="text-center text-gray-500 mb-10">
          No products found 😢
        </p>
      )}
    </div>
  );
}
