import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useGoogleLogin } from "@react-oauth/google";
import { motion } from "framer-motion";
import axios from "axios";
import mainlogo from "../assets/logo.png";
import bgImg from "../assets/farmer-1.jpg";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const UserSignup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("buyer");
  const [acceptTerms, setAcceptTerms] = useState(false);

  // 🌍 Farmer location state
  const [farmerLocation, setFarmerLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  // 📍 Get GPS location for farmer
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      return;
    }
    setLocationLoading(true);
    setLocationError("");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFarmerLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLocationLoading(false);
      },
      (err) => {
        setLocationError("Could not get location. Please allow location access.");
        setLocationLoading(false);
      }
    );
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    if (!acceptTerms) {
      return setError("Please accept Terms & Conditions");
    }

    // 🔴 Block farmer registration if no location
    if (role === "farmer" && !farmerLocation) {
      return setError("Please share your farm location to register as a farmer");
    }

    setLoading(true);

    try {
      const payload = {
        name: fullName,
        email,
        phone,
        password,
        role,
        // 🌍 Send lat/lng only for farmers
        ...(role === "farmer" && {
          lat: farmerLocation.lat,
          lng: farmerLocation.lng,
        }),
      };

      const res = await api.post("api/auth/register", payload, {
        headers: { Authorization: undefined },
      });

      if (res.data?.token && res.data?.user) {
        login(res.data.user, res.data.token);
        role === "farmer"
          ? navigate("/farmer-dashboard")
          : navigate("/");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const res = await axios.post(
        "http://localhost:5001/api/auth/google-login",
        { token: tokenResponse.access_token }
      );
      localStorage.setItem("token", res.data.token);
      navigate("/");
    },
    onError: () => console.log("Google Login Failed"),
  });

  return (
    <div
      style={{ backgroundImage: `url(${bgImg})` }}
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-lg w-[400px] p-8 my-20"
      >
        <div className="flex justify-center mb-3">
          <img src={mainlogo} alt="AgroConnect Logo" className="w-56" />
        </div>

        <motion.form
          onSubmit={submitHandler}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.input
            variants={itemVariants}
            type="text"
            placeholder="Full Name"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="bg-[#eeeeee] mb-3 rounded-lg px-4 py-1.5 border w-full"
          />

          <motion.input
            variants={itemVariants}
            type="email"
            placeholder="Email address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] mb-3 rounded-lg px-4 py-1.5 border w-full"
          />

          <motion.input
            variants={itemVariants}
            type="tel"
            placeholder="Phone number"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="bg-[#eeeeee] mb-3 rounded-lg px-4 py-1.5 border w-full"
          />

          <motion.input
            variants={itemVariants}
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eeeeee] mb-3 rounded-lg px-4 py-1.5 border w-full"
          />

          <motion.input
            variants={itemVariants}
            type="password"
            placeholder="Confirm Password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="bg-[#eeeeee] mb-4 rounded-lg px-4 py-1.5 border w-full"
          />


          {/* Role Selection */}
          <motion.div variants={itemVariants} className="flex gap-4 mb-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="buyer"
                checked={role === "buyer"}
                onChange={() => {
                  setRole("buyer");
                  setFarmerLocation(null);
                  setLocationError("");
                }}
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
          </motion.div>

          {/* 🌍 Farmer Location Section */}
          {role === "farmer" && (
            <motion.div
              variants={itemVariants}
              className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg"
            >
              <p className="text-sm text-green-800 font-medium mb-2">
                📍 Farm Location Required
              </p>

              {farmerLocation ? (
                <div className="text-xs text-green-700 space-y-1">
                  <p>✅ Location captured successfully</p>
                  <p className="text-gray-500">
                    Lat: {farmerLocation.lat.toFixed(5)}, Lng:{" "}
                    {farmerLocation.lng.toFixed(5)}
                  </p>
                  <button
                    type="button"
                    onClick={handleGetLocation}
                    className="text-green-600 underline text-xs mt-1"
                  >
                    Refresh location
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleGetLocation}
                  disabled={locationLoading}
                  className="w-full flex items-center justify-center gap-2 bg-green-600
                             hover:bg-green-700 text-white text-sm px-3 py-2 rounded-lg
                             transition disabled:opacity-50"
                >
                  {locationLoading ? "Getting location..." : "📡 Use My GPS Location"}
                </button>
              )}

              {locationError && (
                <p className="text-red-500 text-xs mt-2">{locationError}</p>
              )}
            </motion.div>
          )}

          <motion.label
            variants={itemVariants}
            className="flex items-center gap-2 mb-3 text-sm"
          >
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
            />
            I accept Terms & Conditions
          </motion.label>

          {error && (
            <motion.p
              variants={itemVariants}
              className="text-red-500 text-sm mb-3"
            >
              {error}
            </motion.p>
          )}

          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="bg-sky-500 text-white font-semibold rounded-lg px-4 py-2
                       w-full hover:bg-gray-900 transition disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Register"}
          </motion.button>

          <motion.div
            variants={itemVariants}
            className="flex items-center gap-3 text-slate-400 my-4"
          >
            <div className="flex-1 h-px bg-slate-700"></div>
            <span className="text-sm">or continue with</span>
            <div className="flex-1 h-px bg-slate-700"></div>
          </motion.div>

          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={() => googleLogin()}
            className="w-full flex items-center justify-center gap-3 px-4 py-3
                       rounded-lg border border-slate-600 text-black
                       hover:bg-slate-800 transition"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/281/281764.png"
              alt="google"
              className="w-5 h-5"
            />
            Continue with Google
          </motion.button>
        </motion.form>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default UserSignup;