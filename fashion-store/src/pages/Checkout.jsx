import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import axios from "axios";

export default function Checkout() {
  const { cart, setCart } = useContext(CartContext);

  // 🔥 FORM STATE
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
  });

  // 🔥 PAYMENT METHOD
  const [method, setMethod] = useState("upi");

  // 🔥 TOTAL
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 FAKE PAYMENT (WORKING)
  
const handlePayment = async () => {
  if (!form.name || !form.address || !form.phone) {
    alert("Fill all fields");
    return;
  }

  try {
    const res = await axios.post(
      "http://localhost:5000/api/payment/create-order",
      { amount: total }
    );

    const order = res.data;

    const options = {
      key: "rzp_test_1DP5mmOlF5G5ag", // test key
      amount: order.amount,
      currency: "INR",
      name: "SHOP.CO",
      description: "Order Payment",
      order_id: order.id,

      handler: async function (response) {
        alert("✅ Payment Success");

        await axios.post("http://localhost:5000/api/orders", {
          ...form,
          items: cart,
          total,
          paymentId: response.razorpay_payment_id,
        });

        setCart([]);
      },

      prefill: {
        name: form.name,
        contact: form.phone,
      },

      theme: {
        color: "#000",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

  } catch (err) {
    console.log(err);
    alert("Payment failed ❌");
  }

    try {
      // simulate payment delay
      setTimeout(async () => {

        await axios.post("http://localhost:5000/api/orders", {
          ...form,
          items: cart,
          total,
          paymentMethod: method,
          status: "Paid",
        });

        alert("🎉 Payment Successful!");

        setCart([]);

      }, 1000);

    } catch (err) {
      console.log(err);
      alert("Error ❌");
    }
  };

  // 🔥 EMPTY CART
  if (cart.length === 0) {
    return <h1 className="p-10">Cart is empty 🛒</h1>;
  }

  return (
    <div className="p-10 dark:bg-black dark:text-white min-h-screen">

      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="grid md:grid-cols-2 gap-10">

        {/* LEFT: FORM */}
        <div className="space-y-4">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />

        </div>

        {/* RIGHT: SUMMARY */}
        <div className="border p-6 rounded-lg">

          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          {cart.map((item, i) => (
            <div key={i} className="flex justify-between mb-2">
              <span>{item.name} x {item.quantity}</span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}

          <hr className="my-4" />

          <h2 className="text-xl font-bold">Total: ₹{total}</h2>

          {/* 🔥 PAYMENT OPTIONS */}
          <div className="mt-4 space-y-2">

            <button
              onClick={() => setMethod("upi")}
              className={`w-full p-2 border rounded ${
                method === "upi" ? "bg-black text-white" : ""
              }`}
            >
              UPI (GPay / PhonePe)
            </button>

            <button
              onClick={() => setMethod("card")}
              className={`w-full p-2 border rounded ${
                method === "card" ? "bg-black text-white" : ""
              }`}
            >
              Card Payment 💳
            </button>

            <button
              onClick={() => setMethod("cod")}
              className={`w-full p-2 border rounded ${
                method === "cod" ? "bg-black text-white" : ""
              }`}
            >
              Cash on Delivery
            </button>

          </div>

          {/* 🔥 PAY BUTTON */}
          <button
            onClick={handlePayment}
            className="mt-6 w-full bg-black text-white py-3 rounded hover:scale-105 transition"
          >
            Pay Now 💳
          </button>

        </div>

      </div>

    </div>
  );
}