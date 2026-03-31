import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import mainlogo from "../assets/logo.png";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import bgImg from "../assets/farmer-1.jpg"

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    
    try {
      const res = await api.post(
        "/api/auth/login",
        { email, password },
        { headers: { Authorization: undefined } } // public route
      );

      /**
       * Expected response:
       * {
       *   token: "jwt",
       *   user: {
       *     name: "Rahul",
       *     role: "buyer" | "farmer"
       *   }
       * }
       */

      if (res.data?.token && res.data?.user) {
        login(res.data.user, res.data.token);

        
        // 🔀 Role-based redirect
        if (res.data.user.role === "farmer") {
          navigate("/farmer-dashboard");
        } else {
          navigate("/marketplace");
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
    style={{backgroundImage:`url(${bgImg})`}} 
    className="min-h-screen flex items-center justify-center bg-cover bg-center">
      <div className="bg-white rounded-xl shadow-lg w-[400px] p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src={mainlogo}
            alt="AgroConnect Logo"
            className="w-56"
          />
        </div>

        {/* Form */}
        <form onSubmit={submitHandler}>
          <input
            type="email"
            placeholder="Email address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] mb-4 rounded-lg px-4 py-2 border w-full"
          />

          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eeeeee] mb-4 rounded-lg px-4 py-2 border w-full"
          />

          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="bg-linear-to-r from-green-700 to-green-100  text-white font-semibold rounded-lg px-4 py-2 w-full
                       hover:bg-gray-900 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center mt-4 text-sm">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default UserLogin;
