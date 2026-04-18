import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import DashboardStats from "./DashboardStats";
import OrderTable from "./OrderTable";
import Loader from "./Loader";
import { AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔐 Check if farmer is logged in
  useEffect(() => {
    console.log("👨‍🌾 Dashboard Auth Check:", { isLoggedIn, role: user?.role });
    
    if (!isLoggedIn || user?.role !== "farmer") {
      setError("Only farmers can access this dashboard");
      navigate("/login");
      return;
    }

    // Fetch farmer's data
    fetchDashboardData();
  }, [isLoggedIn, user, navigate]);

  // 📊 Fetch farmer's products and orders
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError("");

      // Fetch farmer's products
      const productsRes = await api.get("/api/products/my");
      setProducts(productsRes.data?.products || []);

      // Fetch farmer's orders
      const ordersRes = await api.get("/api/orders/farmer/my");
      setOrders(ordersRes.data?.orders || []);

      console.log("✅ Dashboard data loaded:", {
        products: productsRes.data?.products?.length || 0,
        orders: ordersRes.data?.orders?.length || 0,
      });
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Failed to load dashboard data";
      setError(errorMsg);
      toast.error(errorMsg);
      console.error("❌ Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // 💰 Calculate stats from real data
  const calculateStats = () => {
    const totalProducts = products.length;
    const activeOrders = orders.filter(
      (order) => order.status === "PLACED" || order.status === "SHIPPED"
    ).length;
    const completedOrders = orders.filter(
      (order) => order.status === "DELIVERED"
    ).length;

    const monthlyEarnings = orders
      .filter((order) => {
        const orderDate = new Date(order.createdAt);
        const now = new Date();
        return (
          orderDate.getMonth() === now.getMonth() &&
          orderDate.getFullYear() === now.getFullYear()
        );
      })
      .reduce((sum, order) => sum + order.totalAmount, 0);

    return [
      { title: "Total Products", value: totalProducts },
      { title: "Active Orders", value: activeOrders },
      { title: "Completed Orders", value: completedOrders },
      { title: "Monthly Earnings", value: `₹${monthlyEarnings.toLocaleString("en-IN")}` },
    ];
  };

  // ⏳ Loading state
  if (loading) {
    return <Loader />;
  }

  // ❌ Access denied
  if (!isLoggedIn || user?.role !== "farmer") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Access Denied
          </h2>
          <p className="text-gray-600 mb-6">
            Only farmers can access this dashboard.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // ❌ Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={fetchDashboardData}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const stats = calculateStats();
  const recentOrders = orders.slice(0, 10); // Show last 10 orders

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          👨‍🌾 Farmer Dashboard
        </h1>
        <p className="text-gray-600">
          Welcome, <span className="font-semibold">{user?.name}</span>! Here's
          your farm performance overview.
        </p>
      </div>

      {/* Statistics Grid */}
      <div className="grid md:grid-cols-4 gap-6 mb-10">
        {stats.map((s, i) => (
          <DashboardStats key={i} {...s} />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex gap-4 mb-10">
        <button
          onClick={() => navigate("/add-crop")}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition font-semibold"
        >
          + Add New Product
        </button>
        <button
          onClick={() => navigate("/my-products")}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
        >
          View All Products
        </button>
      </div>

      {/* Recent Orders Section */}
      {products.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              📦 Recent Orders
            </h2>
            {orders.length > 10 && (
              <button
                onClick={() => navigate("/orders")}
                className="text-blue-600 hover:underline font-semibold"
              >
                View All ({orders.length})
              </button>
            )}
          </div>

          {recentOrders.length > 0 ? (
            <OrderTable orders={recentOrders} />
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-4">No orders yet</p>
              <p className="text-gray-400">
                Your products will appear here once buyers order them.
              </p>
            </div>
          )}
        </div>
      )}

      {/* No Products State */}
      {products.length === 0 && (
        <div className="bg-white rounded-lg shadow-lg p-12 text-center">
          <div className="text-6xl mb-4">🌾</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            No Products Yet
          </h2>
          <p className="text-gray-600 mb-6">
            Start by adding your first crop or product to begin selling!
          </p>
          <button
            onClick={() => navigate("/add-crop")}
            className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition font-semibold"
          >
            + Add Your First Product
          </button>
        </div>
      )}

      {/* Data Summary */}
      <div className="mt-10 grid md:grid-cols-3 gap-6 text-sm text-gray-600">
        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
          <p className="font-semibold mb-2">📊 Total Products</p>
          <p className="text-2xl font-bold text-blue-600">{products.length}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-600">
          <p className="font-semibold mb-2">✅ Available Stock</p>
          <p className="text-2xl font-bold text-green-600">
            {products.reduce((sum, p) => sum + p.quantity, 0)} units
          </p>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-600">
          <p className="font-semibold mb-2">📈 Total Orders</p>
          <p className="text-2xl font-bold text-orange-600">{orders.length}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
