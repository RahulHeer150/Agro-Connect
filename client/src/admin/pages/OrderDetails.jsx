import React, { useEffect, useState } from "react";
import { getOrderById } from "../services/orderService";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader";

const OrderDetails = () => {
  const [order, setorder] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    try {
      const data = await getOrderById(id);
      console.log(data);

      setorder(data.order);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <Loader size="large" />;
  }
  if (!order) {
    return <h2>Order Not found!!</h2>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Order Details</h1>

      <div className="bg-white rounded-xl shadow p-6">
        <h2>Buyer Information</h2>
        <p>
          <strong>Name:</strong>
          {order.buyer?.name || "N/A"}
        </p>

        <p>
          <strong>Email:</strong>
          {order.buyer?.email || "N/A"}
        </p>

        <p>
          <strong>Phone:</strong>
          {order.buyer?.phone || "N/A"}
        </p>
      </div>

      {/* farmer Details  */}

      <div className="bg-white rounded-xl shadow p-6">
        <h2>Farmer Information</h2>
        <p>
          <strong>Name:</strong>
          {order.farmer?.name || "N/A"}
        </p>

        <p>
          <strong>Email:</strong>
          {order.farmer?.email || "N/A"}
        </p>

        <p>
          <strong>Phone:</strong>
          {order.farmer?.phone || "N/A"}
        </p>
      </div>

      {/* Order Details  */}

      <div className="bg-white rounded-xl shadow p-6">
        <h2>Shipping Address Infromation</h2>
        <p>
          <strong>Address Line:</strong>
          {order.shippingAddress?.addressLine || "N/A"}
        </p>

        <p>
          <strong>Village:</strong>
          {order.shippingAddress?.village || "N/A"}
        </p>

        <p>
          <strong>District:</strong>
          {order.shippingAddress?.district || "N/A"}
        </p>

        <p>
          <strong>State:</strong>
          {order.shippingAddress?.state || "N/A"}
        </p>
      </div>

      {/* Order Status  */}

      <div className="bg-white rounded-xl shadow p-6">
        <h2>Order Information</h2>
        <p>
          <strong>Total Amount:</strong>
          {order.totalAmount || "N/A"}
        </p>

        <p>
          <strong>PaymentStatus:</strong>
          {order.paymentStatus || "N/A"}
        </p>

        <p>
          <strong>Status:</strong>
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
        </p>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <div className="space-y-4">
          {order.items.map((item) => {
 const image =
        item.product?.images?.[0];

      const imagePath =
        image?.url || image;

      const imageUrl = imagePath
  ? imagePath.startsWith("http")
    ? imagePath
    : `http://localhost:5000${imagePath}`
  : "/placeholder.png";

            return (
              <div key={item._id} className="flex gap-4 border p-4 rounded-lg">
                <img
                  src={imageUrl}
                  alt={item.product?.name}
                  className="w-24 h-24 object-cover rounded"
                />

                <div>
                  <h3 className="font-semibold">
                    {item.product?.name || "N/A"}
                  </h3>

                  <p>Quantity:{item.quantity}</p>

                  <p>Price:{item.price}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
