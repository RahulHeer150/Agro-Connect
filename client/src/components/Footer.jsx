import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-14">

        {/* Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand Column */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">
              🌾 AgroConnect
            </h3>
            <p className="text-sm leading-relaxed">
              Connecting farmers directly with buyers for fair,
              transparent, and sustainable trade.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 mt-5">
              <a
                href="#"
                aria-label="Facebook"
                className="hover:text-white transition"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="hover:text-white transition"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="hover:text-white transition"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">
              Platform
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/marketplace" className="hover:text-white">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-white">
                  Become a Farmer
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white">
                  Why AgroConnect
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">
              Support
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/contact" className="hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/help" className="hover:text-white">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/report" className="hover:text-white">
                  Report an Issue
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">
              Legal
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/terms" className="hover:text-white">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/refund" className="hover:text-white">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between text-sm">
          <p>
            © {new Date().getFullYear()} AgroConnect. All rights reserved.
          </p>

          <div className="flex items-center gap-2 mt-4 sm:mt-0">
            <FaEnvelope />
            <span>support@agroconnect.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;