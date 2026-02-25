import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { isLoggedIn, user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // 🔹 Role-based links
  const publicLinks = [
    { name: "Home", path: "/" },
    { name: "Marketplace", path: "/marketplace" },
    { name: "Become a Farmer", path: "/register" },
  ];

  const buyerLinks = [
    { name: "Marketplace", path: "/marketplace" },
    { name: "My Orders", path: "/orders" },
  ];

  const farmerLinks = [
    { name: "Dashboard", path: "/farmer/dashboard" },
    { name: "My Products", path: "/farmer/products" },
    { name: "Orders", path: "/farmer/orders" },
  ];

  const navLinks = !isLoggedIn
    ? publicLinks
    : user?.role === "farmer"
    ? farmerLinks
    : buyerLinks;

  return (
    <nav className="fixed top-0 left-0 w-full bg-white z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
    
        {/* 🔹 Logo */}
        <Link to="/" className="text-2xl font-bold text-green-700">
          🌾 AgroConnect
        </Link>

        {/* 🔹 Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-gray-700 hover:text-green-700 font-medium"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* 🔹 Right Section */}
        <div className="hidden md:flex items-center gap-4">
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="text-gray-700 font-medium">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-green-700 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-800"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2"
              >
                <FaUserCircle className="text-2xl text-green-700" />
                <span className="font-medium">{user?.name || "User"}</span>
              </button>

              {/* 🔽 Profile Dropdown */}
              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-3 w-40 bg-white shadow-lg rounded-lg overflow-hidden"
                  >
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* 🔹 Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(true)}
          className="md:hidden text-2xl text-green-700"
        >
          <FiMenu />
        </button>
      </div>

      {/* 📱 Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-50"
          >
            <div className="p-5 flex justify-between items-center border-b">
              <span className="text-lg font-bold text-green-700">
                AgroConnect
              </span>
              <button onClick={() => setMobileOpen(false)}>
                <FiX className="text-2xl" />
              </button>
            </div>

            <div className="flex flex-col gap-4 p-5">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className="text-gray-700 font-medium"
                >
                  {link.name}
                </Link>
              ))}

              <hr />

              {!isLoggedIn ? (
                <>
                  <Link to="/login">Login</Link>
                  <Link
                    to="/register"
                    className="text-green-700 font-semibold"
                  >
                    Register
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/profile">Profile</Link>
                  <button
                    onClick={logout}
                    className="text-left text-red-600"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
