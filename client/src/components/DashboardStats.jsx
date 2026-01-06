
const DashboardStats = ({ title, value }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-green-700 mt-2">
        {value}
      </p>
    </div>
  );
};

export default DashboardStats;
