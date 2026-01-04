import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { XCircle } from "lucide-react";

const PaymentFailure = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-red-50 flex items-center justify-center px-6">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full text-center"
      >
        {/* Icon */}
        <motion.div
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <XCircle size={80} className="text-red-600" />
        </motion.div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Payment Failed 😔
        </h1>

        <p className="text-gray-600 mb-8">
          Something went wrong during the payment. Don’t worry — your order is
          not charged.
        </p>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => navigate("/checkout")}
            className="bg-red-600 text-white py-3 rounded-lg font-semibold
                       hover:bg-red-700 transition"
          >
            Retry Payment
          </button>

          <button
            onClick={() => navigate("/cart")}
            className="text-red-600 font-medium hover:underline"
          >
            Back to Cart
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentFailure;
