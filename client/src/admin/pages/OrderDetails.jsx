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
  if(loading){
    return <Loader size="large"/>
  }
  if(!order){
    return <h2>Order Not found!!</h2>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Order Details</h1>

      <div className="bg-white rounded-x; shadow p-6">
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
    </div>
  );
};

export default OrderDetails;
