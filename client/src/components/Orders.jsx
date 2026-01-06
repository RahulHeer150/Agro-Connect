import OrderTable from "./OrderTable";
import EmptyState from "./EmptyState";

const Orders = () => {
  const orders = [];

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
