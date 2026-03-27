import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-10 rounded-xl shadow-md text-center max-w-md">
        <h1 className="text-2xl font-bold text-green-600 mb-4">
          ✅ Order Placed Successfully
        </h1>

        <p className="text-gray-600 mb-6">
          Thank you for your purchase! Your order has been placed successfully.
        </p>

        <div className="space-y-3">
          <button
            onClick={() => navigate("/my-orders")}
            className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800"
          >
            View Orders
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full border py-2 rounded hover:bg-gray-100"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
