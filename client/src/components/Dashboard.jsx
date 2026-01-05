import DashboardStats from "../../components/farmer/DashboardStats";
import OrderTable from "../../components/farmer/OrderTable";

const Dashboard = () => {
  const stats = [
    { title: "Total Products", value: 10 },
    { title: "Active Orders", value: 3 },
    { title: "Completed Orders", value: 21 },
    { title: "Monthly Earnings", value: "₹18,200" },
  ];

  const recentOrders = [];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Dashboard</h1>

      <div className="grid md:grid-cols-4 gap-6 mb-10">
        {stats.map((s, i) => (
          <DashboardStats key={i} {...s} />
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-4">
        Recent Orders
      </h2>

      <OrderTable orders={recentOrders} />
    </div>
  );
};

export default Dashboard;
