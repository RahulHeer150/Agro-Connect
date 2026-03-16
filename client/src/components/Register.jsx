import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useGoogleLogin } from "@react-oauth/google";
import { motion } from "framer-motion";
import axios from "axios";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const UserSignup = () => {

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("buyer");
  const [acceptTerms, setAcceptTerms] = useState(false);

  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [preferredCrops, setPreferredCrops] = useState([]);

  // const [farmLocation, setFarmLocation] = useState("");
  // const [cropCategories, setCropCategories] = useState([]);
  // const [farmingType, setFarmingType] = useState("");
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

      const res = await api.post("api/auth/register", payload, {
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

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {

      const res = await axios.post(
        "http://localhost:5001/api/auth/google-login",
        {
          token: tokenResponse.access_token,
        }
      );

      localStorage.setItem("token", res.data.token);
      navigate("/");

    },
    onError: () => {
      console.log("Google Login Failed");
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-200">

      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-lg w-[400px] p-8"
      >

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
            className="bg-[#eeeeee] mb-3 rounded-lg px-4 py-2 border w-full"
          />

          <motion.input
            variants={itemVariants}
            type="email"
            placeholder="Email address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] mb-3 rounded-lg px-4 py-2 border w-full"
          />

          <motion.input
            variants={itemVariants}
            type="tel"
            placeholder="Phone number"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="bg-[#eeeeee] mb-3 rounded-lg px-4 py-2 border w-full"
          />

          <motion.input
            variants={itemVariants}
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eeeeee] mb-3 rounded-lg px-4 py-2 border w-full"
          />

          <motion.input
            variants={itemVariants}
            type="password"
            placeholder="Confirm Password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="bg-[#eeeeee] mb-4 rounded-lg px-4 py-2 border w-full"
          />

          {/* Role Selection */}
          <motion.div variants={itemVariants} className="flex gap-4 mb-4">
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
          </motion.div>

          {/* Buyer Fields
          {role === "buyer" && (
            <motion.input
              variants={itemVariants}
              type="text"
              placeholder="Delivery Location (optional)"
              value={deliveryLocation}
              onChange={(e) => setDeliveryLocation(e.target.value)}
              className="bg-[#eeeeee] mb-4 rounded-lg px-4 py-2 border w-full"
            />
          // )}

          {/* Farmer Fields */}
          {/* {role === "farmer" && ( */}
            {/* <>
              <motion.input
                variants={itemVariants}
                type="text"
                placeholder="Farm Location"
                required
                value={farmLocation}
                onChange={(e) => setFarmLocation(e.target.value)}
                className="bg-[#eeeeee] mb-3 rounded-lg px-4 py-2 border w-full"
              />

              <motion.input
                variants={itemVariants}
                type="text"
                placeholder="Crop Categories (comma separated)"
                required
                value={cropCategories}
                onChange={(e) => setCropCategories(e.target.value.split(","))}
                className="bg-[#eeeeee] mb-3 rounded-lg px-4 py-2 border w-full"
              />

              <motion.input
                variants={itemVariants}
                type="number"
                placeholder="Years of Experience (optional)"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="bg-[#eeeeee] mb-3 rounded-lg px-4 py-2 border w-full"
              />
            </> */}
           {/* )}  */}

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
            <motion.p variants={itemVariants} className="text-red-500 text-sm mb-3">
              {error}
            </motion.p>
          )}

          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="bg-sky-500 text-white font-semibold rounded-lg px-4 py-2 w-full hover:bg-gray-900 transition disabled:opacity-50"
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
            onClick={() => googleLogin()}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg border border-slate-600 text-black hover:bg-slate-800 transition"
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