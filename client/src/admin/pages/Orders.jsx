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
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter((order) => {
    const search = searchTerm.toLowerCase();

    return (
      order._id.toLowerCase().includes(search) ||
      order.buyer?.name?.toLowerCase().includes(search) ||
      order.farmer?.name?.toLowerCase().includes(search) ||
      order.status?.toLowerCase().includes(search)
    );
  });

  if (loading) {
    return <Loader size="large" />;
  }

  return (
    <div>
      {/* Heading */}
      <h1 className="text-3xl font-bold mb-2">
        Orders Management
      </h1>

      <p className="text-gray-500 mb-6">
        Showing {filteredOrders.length} of {orders.length} orders
      </p>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by Order ID, Buyer, Farmer or Status..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
          className="
            w-full
            p-3
            border
            rounded-lg
            focus:outline-none
            focus:ring-2
            focus:ring-green-500
          "
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-green-700 text-white">
            <tr>
              <th className="p-4 text-left">
                Order ID
              </th>

              <th className="p-4 text-left">
                Buyer
              </th>

              <th className="p-4 text-left">
                Farmer
              </th>

              <th className="p-4 text-left">
                Products
              </th>

              <th className="p-4 text-left">
                Amount
              </th>

              <th className="p-4 text-left">
                Payment
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b hover:bg-gray-50"
                >
                  {/* Order ID */}
                  <td className="p-4">
                    #{order._id.slice(-6)}
                  </td>

                  {/* Buyer */}
                  <td className="p-4">
                    {order.buyer?.name || "N/A"}
                  </td>

                  {/* Farmer */}
                  <td className="p-4">
                    {order.farmer?.name || "N/A"}
                  </td>

                  {/* Product Count */}
                  <td className="p-4">
                    {order.items?.length || 0}
                  </td>

                  {/* Amount */}
                  <td className="p-4 font-medium">
                    ₹{order.totalAmount}
                  </td>

                  {/* Payment Status */}
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        order.paymentStatus === "paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </td>

                  {/* Order Status */}
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        order.status === "DELIVERED"
                          ? "bg-green-100 text-green-700"
                          : order.status === "CANCELLED"
                          ? "bg-red-100 text-red-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="p-4">
                    <button
                      onClick={() =>
                        navigate(
                          `/admin/orders/${order._id}`
                        )
                      }
                      className="
                        bg-blue-600
                        hover:bg-blue-700
                        text-white
                        px-3
                        py-1
                        rounded-lg
                      "
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="
                    text-center
                    py-8
                    text-gray-500
                  "
                >
                  No Orders Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;