import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-10 rounded-xl shadow text-center">
        <h1 className="text-2xl font-bold text-green-700 mb-4">
          🎉 Order Placed Successfully!
        </h1>
        <p className="text-gray-600 mb-6">
          Your order has been received.
        </p>
        <Link
          to="/marketplace"
          className="text-green-700 font-semibold hover:underline"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
