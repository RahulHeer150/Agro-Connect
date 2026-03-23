import OrderTable from "./OrderTable";
import EmptyState from "./EmptyState";
import { useCart } from "../context/CartContext";

const Orders = () => {

  const [orders, setOrders] = useState([]);
  const getMyOrdersAPI= useCart();

useEffect(() => {
  const loadOrders = async () => {
    const res = await getMyOrdersAPI();
    setOrders(res.data.orders);
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
