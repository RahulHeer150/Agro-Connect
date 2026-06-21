import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { resetPassword } from "../api/authService";

const ResetPassword = () => {
  const { token } = useParams();

  const navigate = useNavigate();

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword,
    setConfirmPassword] = useState("");

  const [message, setMessage] =
    useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      newPassword !== confirmPassword
    ) {
      return setMessage(
        "Passwords do not match"
      );
    }

    try {
      const data =
        await resetPassword(
          token,
          newPassword
        );

      setMessage(data.message);

      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Reset failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

        <h2 className="text-2xl font-bold mb-4">
          Reset Password
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) =>
              setNewPassword(
                e.target.value
              )
            }
            className="w-full p-3 border rounded-lg mb-4"
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
            className="w-full p-3 border rounded-lg mb-4"
            required
          />

          <button
            className="w-full bg-green-600 text-white py-3 rounded-lg"
          >
            Reset Password
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

export default ResetPassword;
