import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center px-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full text-center"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
          className="flex justify-center mb-6"
        >
          <CheckCircle size={80} className="text-green-600" />
        </motion.div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Payment Successful 🎉
        </h1>

        <p className="text-gray-600 mb-8">
          Your order has been placed successfully.  
          Farmers are preparing your fresh produce 🌾
        </p>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => navigate("/orders")}
            className="bg-green-700 text-white py-3 rounded-lg font-semibold
                       hover:bg-green-800 transition"
          >
            View My Orders
          </button>

          <button
            onClick={() => navigate("/marketplace")}
            className="text-green-700 font-medium hover:underline"
          >
            Continue Shopping
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
