import React, { useState } from "react";
import { forgotPassword } from "../api/authService";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await forgotPassword(email);

      setMessage(data.message);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

        <h2 className="text-2xl font-bold mb-4">
          Forgot Password
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full p-3 border rounded-lg mb-4"
            required
          />

          <button
            className="w-full bg-green-600 text-white py-3 rounded-lg"
          >
            Send Reset Link
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center">
            {message}
          </p>
        )}

      </div>

    </div>
  );
};

export default ForgotPassword;


