import { useAuth } from "../../../context/AuthContext";
import { NotificationBell } from "../../../components/NotificationBell";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <header className="h-16 bg-white shadow px-6 flex items-center justify-between">
      <h2 className="font-semibold text-2xl">Admin Dashboard</h2>












      <div className="flex items-center gap-3">
        <NotificationBell />
        <div className="w-10 h-10 rounded-full bg-green-700 flex items-center justify-center text-white">
          {user?.name?.charAt(0)}
        </div>

        <div>
          <p className="font-medium">{user?.name}</p>

          <p className="text-sm text-gray-500">Administrator</p>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
