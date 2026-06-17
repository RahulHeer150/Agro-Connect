import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";

import { getAllOrders } from "../services/orderService";

const Orders = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getAllOrders();

      setOrders(data.orders);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* heading */}

      <h1 className="text-3xl font-bold mb-2">Order Management</h1>

      <p className="text-gray-500 mb-6">Showing</p>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by Order ID, Buyer, Farmer or Status..."
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-green-700 text-white">
            <tr>
              <th className="p-4 text-left">Order ID</th>

              <th className="p-4 text-left">Buyer</th>

              <th className="p-4 text-left">Farmer</th>

              <th className="p-4 text-left">Products</th>

              <th className="p-4 text-left">Amount</th>

              <th className="p-4 text-left">Payment</th>

              <th className="p-4 text-left">Status</th>

              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => {
              <tr key={order._id} className="border-b">
                <td className="p-4">{order._id.slice(-6)}</td>

                <td className="p-4">{order.buyer?.name}</td>

                <td className="p-4">{order.farmer?.name}</td>

                <td className="p-4">{order.items.length}</td>

                <td className="p-4">{order.totalAmount}</td>

                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      order.paymentStatus === "paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.paymentStatus}
                  </span>
                </td>

                <td className="p-4">
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm">
                    {order.status}
                  </span>
                </td>

                <td className="p-4">View</td>
              </tr>;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
