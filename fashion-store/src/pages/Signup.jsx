import { useState } from "react";
import axios from "axios";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
  try {
    await axios.post("http://localhost:5000/signup", {
      email,
      password
    });

    alert("Signup successful ✅");

    // redirect to login
    window.location.href = "/login";

  } catch (err) {
     console.log(err.response?.data);  
    alert("Signup failed ❌");
  }
};

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-black">

      <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg w-80">

        <h1 className="text-2xl font-bold mb-6 text-center">Signup</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-black"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-black"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSignup}
          className="w-full bg-black text-white py-2 rounded hover:scale-105 transition"
        >
          Signup
        </button>

        {/* OPTIONAL LINK */}
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <span className="underline cursor-pointer">
            Login
          </span>
        </p>

      </div>

    </div>
  );
}