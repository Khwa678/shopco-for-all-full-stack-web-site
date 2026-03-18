import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 const handleLogin = async () => {
  try {
    const res = await axios.post("http://localhost:5000/login", {
      email,
      password
    });

    // store token + user
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", res.data.email);

    alert("Login successful ✅");

    // redirect to home
    window.location.href = "/";

  } catch (err) {
    alert("Invalid credentials ❌");
  }
};
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-black">

      <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg w-80">

        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 mb-4 rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-4 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-black text-white py-2 rounded hover:scale-105 transition"
        >
          Login
        </button>

      </div>
    </div>
  );
}