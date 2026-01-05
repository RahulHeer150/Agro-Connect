import DashboardStats from "../../components/farmer/DashboardStats";
import OrderTable from "../../components/farmer/OrderTable";

const Dashboard = () => {
  // dummy data (replace with API later)
  const stats = [
    { title: "Total Products", value: 12 },
    { title: "Active Orders", value: 4 },
    { title: "Completed Orders", value: 18 },
    { title: "Monthly Earnings", value: "₹24,500" },
  ];

  const recentOrders = [];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {stats.map((s, i) => (
          <DashboardStats
            key={i}
            title={s.title}
            value={s.value}
          />
        ))}
      </div>

      {/* Recent Orders */}
      <h2 className="text-xl font-semibold mb-4">
        Recent Orders
      </h2>
      <OrderTable orders={recentOrders} />
    </div>
  );
};

export default Dashboard;
