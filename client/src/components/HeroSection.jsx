import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";

import farmer1 from "../assets/farmer-1.jpg";
import farmer2 from "../assets/farmer-2.jpg";
import farmer3 from "../assets/farmer-3.jpg";
import farmer4 from "../assets/farmer-4.jpg";
import farmer5 from "../assets/farmer-5.jpg";

const images = [farmer1, farmer2, farmer3, farmer4, farmer5];

const HeroSection = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuth();
  const [index, setIndex] = useState(0);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-screen bg-linear-to-b from-green-50 to-white overflow-hidden mt-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[90vh] items-center px-6 lg:px-24">

        {/* LEFT CONTENT */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            From Farmers to Your Home
            <span className="text-green-700"> — Fair & Fresh</span>
          </h1>

          <p className="text-gray-600 text-lg mb-8 max-w-xl">
            AgroConnect connects farmers directly with buyers, removing
            middlemen and ensuring fair prices and fresh local produce.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <button
              onClick={() => navigate("/marketplace")}
              className="bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition"
            >
              Explore Marketplace
            </button>

            <button
              onClick={() =>
                !isLoggedIn
                  ? navigate("/register")
                  : user?.role === "farmer"
                  ? navigate("/farmer/dashboard")
                  : navigate("/marketplace")
              }
              className="border border-green-700 text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition"
            >
              Become a Farmer
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="flex gap-10 text-sm text-gray-600">
            <div>
              <p className="text-xl font-bold text-green-700">100%</p>
              <p>Direct Trade</p>
            </div>
            <div>
              <p className="text-xl font-bold text-green-700">0</p>
              <p>Middlemen</p>
            </div>
            <div>
              <p className="text-xl font-bold text-green-700">Fresh</p>
              <p>Local Produce</p>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE (FINAL SIZE TUNED) */}
        <div className="relative w-full lg:w-[90%] h-[360px] md:h-[420px] lg:h-[480px] mt-12 lg:mt-0 ml-auto">
          <AnimatePresence mode="wait">
            <motion.img
              key={images[index]}
              src={images[index]}
              alt="AgroConnect farmers"
              className="absolute inset-0 w-full h-full object-cover rounded-3xl shadow-xl"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;

