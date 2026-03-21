import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import Product from "./pages/Product";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Checkout from "./pages/Checkout";
import Shop from "./pages/Shop";
import Wishlist from "./pages/Wishlist";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/login" element={<Login />} />
<Route path="/signup" element={<Signup />} />
<Route path="/checkout" element={<Checkout />} />
    <Route path="/shop" element={<Shop />} />
     <Route path="/wishlist" element={<Wishlist />} />
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;
