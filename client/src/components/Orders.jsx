import OrderTable from "./OrderTable";
import EmptyState from "./EmptyState";
import { getFarmerOrdersAPI } from "../api/orderapi";
import { useState, useEffect } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const res = await getFarmerOrdersAPI();
        setOrders(res.data.orders || []);
      } catch (error) {
        console.error("Failed to load farmer orders", error);
      }
    };
    loadOrders();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Orders</h1>
      {orders.length === 0 ? (
        <EmptyState message="No orders yet." />
      ) : (
        <OrderTable orders={orders} />
      )}
    </div>
  );
};

export default Orders;
