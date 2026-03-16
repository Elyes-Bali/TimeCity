// frontend/src/components/Sidebar.jsx
import React from "react";
import { LayoutDashboard, LogOut } from "lucide-react";
import { useAuthStore } from "../store/authStore";

const SideBarAdmin = ({ activeTab, setActiveTab }) => {
   const { isAuthenticated, user, logout } = useAuthStore();
    
      const handleLogout = () => {
        logout();
      };
   const menuItems = [
    { id: 'equations', label: 'Equations', icon: LayoutDashboard },
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-zinc-950 border-r border-white/5 flex flex-col p-6 z-50">
      <div className="flex items-center gap-3 mb-12 px-2">
        <div className="bg-orange-600 p-2 rounded-xl">
          <LayoutDashboard className="text-white w-6 h-6" />
        </div>
        <span className="text-xl font-black tracking-tighter text-white uppercase">AdminPanel</span>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold transition-all duration-300 ${
              activeTab === item.id 
                ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/20' 
                : 'text-zinc-500 hover:text-white hover:bg-white/5'
            }`}
          >
            <item.icon size={20} />
            {item.label}
          </button>
        ))}
      </nav>

      {isAuthenticated && (
        <button
          onClick={handleLogout}
          className="flex items-center gap-4 px-4 py-3.5 text-zinc-500 hover:text-red-500 font-bold transition-colors mt-auto border-t border-white/5 pt-6"
        >
          <LogOut size={20} />
          Logout
        </button>
      )}
    </div>
  );
};

export default SideBarAdmin
