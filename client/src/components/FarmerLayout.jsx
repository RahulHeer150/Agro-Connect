import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const FarmerLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default FarmerLayout;
