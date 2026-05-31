import {NavLink } from 'react-router-dom';
import { sidebarLinks } from '../../constants/SidebarLinks';
import logo from "../../../assets/logo.png";



const Sidebar=()=>{

        return (
    <aside className="w-64 min-h-screen bg-green-950 text-white border-r border-green-800">

      {/* Logo */}
      <div className="p-6 border-b border-green-800">
        <h1 className="text-2xl font-bold text-green-400">
          AgroConnect
        </h1>
        <p className="text-sm text-gray-400">
          Admin Panel
        </p>
      </div>

      {/* Links */}
      <nav className="p-4 space-y-2">
        {sidebarLinks.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                ${
                  isActive
                    ? "bg-green-700 text-white"
                    : "hover:bg-green-900"
                }`
              }
            >
              <Icon size={20} />
              <span>{item.title}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;