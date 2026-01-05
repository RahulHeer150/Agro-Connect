import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const linkClasses = ({ isActive }) =>
    `block px-4 py-2 rounded-lg font-medium transition ${
      isActive
        ? "bg-green-700 text-white"
        : "text-gray-700 hover:bg-green-50"
    }`;

  return (
    <aside className="w-64 min-h-screen bg-white border-r px-4 py-6">
      {/* Logo / Title */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-green-700">
          Farmer Panel
        </h2>
        <p className="text-sm text-gray-500">
          AgroConnect
        </p>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        <NavLink to="/farmer/dashboard" className={linkClasses}>
          Dashboard
        </NavLink>

        <NavLink to="/farmer/products" className={linkClasses}>
          My Products
        </NavLink>

        <NavLink to="/farmer/add-product" className={linkClasses}>
          Add Product
        </NavLink>

        <NavLink to="/farmer/orders" className={linkClasses}>
          Orders
        </NavLink>

        <NavLink to="/farmer/earnings" className={linkClasses}>
          Earnings
        </NavLink>

        <NavLink to="/farmer/profile" className={linkClasses}>
          Profile
        </NavLink>
      </nav>

      {/* Logout */}
      <div className="mt-10">
        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="w-full text-left px-4 py-2 rounded-lg
                     text-red-600 hover:bg-red-50 transition"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
