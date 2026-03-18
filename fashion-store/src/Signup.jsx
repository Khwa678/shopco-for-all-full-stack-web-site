import { useState } from "react";
import axios from "axios";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    await axios.post("http://localhost:5000/api/auth/signup", {
      email,
      password
    });

    alert("Signup successful");
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-5">Signup</h1>

      <input
        type="email"
        placeholder="Email"
        className="border p-2 mb-3 block"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-2 mb-3 block"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleSignup} className="bg-black text-white px-5 py-2">
        Signup
      </button>
    </div>
  );
}