import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded-lg font-medium transition ${
      isActive
        ? "bg-green-700 text-white"
        : "text-gray-700 hover:bg-green-50"
    }`;

  return (
    <aside className="w-64 bg-white border-r px-4 py-6">
      <h2 className="text-2xl font-bold text-green-700 mb-8">
        Farmer Panel
      </h2>

      <nav className="space-y-2">
        <NavLink to="/farmer/dashboard" className={linkClass}>
          Dashboard
        </NavLink>
        <NavLink to="/farmer/products" className={linkClass}>
          My Products
        </NavLink>
        <NavLink to="/farmer/add-product" className={linkClass}>
          Add Product
        </NavLink>
        <NavLink to="/farmer/orders" className={linkClass}>
          Orders
        </NavLink>
        <NavLink to="/farmer/earnings" className={linkClass}>
          Earnings
        </NavLink>
        <NavLink to="/farmer/profile" className={linkClass}>
          Profile
        </NavLink>
      </nav>

      <button
        onClick={() => {
          logout();
          navigate("/login");
        }}
        className="mt-10 w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
      >
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
