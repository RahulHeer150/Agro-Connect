import React, { useEffect, useState } from "react";
import { getOrderById } from "../services/orderService";
import { useParams } from "react-router-dom";

const OrderDetails = () => {
  const [order, setorder] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(()=>{
    fetchOrder();
  },[])

  const fetchOrder = async () => {
    try {
      const data = await getOrderById(id);

      setorder(data.order);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Order Details</h1>

      <div className="bg-white rounded-x; shadow p-6">

        <h2>
          Buyer Information
        </h2>
        <p>
          <strong></strong>

        </p>

         <p>
          <strong></strong>

        </p>

         <p>
          <strong></strong>

        </p>

         <p>
          <strong></strong>

        </p>

         <p>
          <strong></strong>

        </p>


      </div>
    </div>

  );
};

export default OrderDetails;
