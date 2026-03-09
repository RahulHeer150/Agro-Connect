import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//import mainlogo from "../assets/mainlogo.png";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { GoogleLogin } from "@react-oauth/google";

const UserSignup = () => {
  // Common fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("buyer");
  const [acceptTerms, setAcceptTerms] = useState(false);

  // Buyer fields
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [preferredCrops, setPreferredCrops] = useState([]);

  // Farmer fields
  const [farmLocation, setFarmLocation] = useState("");
  const [cropCategories, setCropCategories] = useState([]);
  const [farmingType, setFarmingType] = useState("");
  const [experience, setExperience] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    if (!acceptTerms) {
      return setError("Please accept Terms & Conditions");
    }

    setLoading(true);

    try {
      const payload = {
        name: fullName,
        email,
        phone,
        password,
        role,
        ...(role === "buyer" && {
          deliveryLocation,
          preferredCrops,
        }),
        ...(role === "farmer" && {
          farmLocation,
          cropCategories,
          farmingType,
          experience,
        }),
      };

      const res = await api.post("/users/register", payload, {
        headers: { Authorization: undefined },
      });

      if (res.data?.token && res.data?.user) {
        login(res.data.user, res.data.token);

        role === "farmer"
          ? navigate("/farmer/dashboard")
          : navigate("/marketplace");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-200">
      <div className="bg-white rounded-xl shadow-lg w-[400px] p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          {/* <img src={mainlogo} alt="AgroConnect Logo" className="w-56" /> */}
        </div>

        <form onSubmit={submitHandler}>
          {/* Common Fields */}
          <input
            type="text"
            placeholder="Full Name"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="bg-[#eeeeee] mb-3 rounded-lg px-4 py-2 border w-full"
          />

          <input
            type="email"
            placeholder="Email address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] mb-3 rounded-lg px-4 py-2 border w-full"
          />

          <input
            type="tel"
            placeholder="Phone number"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="bg-[#eeeeee] mb-3 rounded-lg px-4 py-2 border w-full"
          />

          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eeeeee] mb-3 rounded-lg px-4 py-2 border w-full"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="bg-[#eeeeee] mb-4 rounded-lg px-4 py-2 border w-full"
          />

          {/* Role Selection */}
          <div className="flex gap-4 mb-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="buyer"
                checked={role === "buyer"}
                onChange={() => setRole("buyer")}
              />
              Buyer
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="farmer"
                checked={role === "farmer"}
                onChange={() => setRole("farmer")}
              />
              Farmer
            </label>
          </div>

          {/* Buyer Fields */}
          {role === "buyer" && (
            <input
              type="text"
              placeholder="Delivery Location (optional)"
              value={deliveryLocation}
              onChange={(e) => setDeliveryLocation(e.target.value)}
              className="bg-[#eeeeee] mb-4 rounded-lg px-4 py-2 border w-full"
            />
          )}

          {/* Farmer Fields */}
          {role === "farmer" && (
            <>
              <input
                type="text"
                placeholder="Farm Location"
                required
                value={farmLocation}
                onChange={(e) => setFarmLocation(e.target.value)}
                className="bg-[#eeeeee] mb-3 rounded-lg px-4 py-2 border w-full"
              />

              <input
                type="text"
                placeholder="Crop Categories (comma separated)"
                required
                value={cropCategories}
                onChange={(e) => setCropCategories(e.target.value.split(","))}
                className="bg-[#eeeeee] mb-3 rounded-lg px-4 py-2 border w-full"
              />

              <input
                type="number"
                placeholder="Years of Experience (optional)"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="bg-[#eeeeee] mb-3 rounded-lg px-4 py-2 border w-full"
              />
            </>
          )}

          {/* Terms */}
          <label className="flex items-center gap-2 mb-3 text-sm">
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
            />
            I accept Terms & Conditions
          </label>

          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="bg-sky-500 text-white font-semibold rounded-lg px-4 py-2 w-full
                       hover:bg-gray-900 transition disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default UserSignup;
