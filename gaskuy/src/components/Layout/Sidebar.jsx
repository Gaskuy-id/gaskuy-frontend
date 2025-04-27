// components/Sidebar.jsx

import { useState } from "react";
import { FaCarSide, FaTachometerAlt, FaUser, FaUserTie } from "react-icons/fa";

const Sidebar = ({ city, onCityChange }) => {
  const [selectedMenu, setSelectedMenu] = useState("Dashboard");

  const menus = [
    { name: "Dashboard", icon: <FaTachometerAlt /> },
    { name: "Pelanggan", icon: <FaUser /> },
    { name: "Supir", icon: <FaUserTie /> },
    { name: "Kendaraan", icon: <FaCarSide /> },
  ];

  return (
    <div className="h-screen w-64 bg-green-900 text-white flex flex-col p-4">
      {/* Logo */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold">GASSKUY</h1>
      </div>

      {/* City Selector */}
      <div className="mb-6">
        <select
          value={city}
          onChange={(e) => onCityChange(e.target.value)}
          className="w-full p-2 rounded bg-green-700 text-white"
        >
          <option value="Jakarta">Jakarta</option>
          <option value="Bandung">Bandung</option>
          <option value="Surabaya">Surabaya</option>
        </select>
      </div>

      {/* Menu Items */}
      <nav className="flex flex-col gap-4">
        {menus.map((menu) => (
          <button
            key={menu.name}
            onClick={() => setSelectedMenu(menu.name)}
            className={`flex items-center gap-3 p-2 rounded ${
              selectedMenu === menu.name
                ? "bg-green-700"
                : "hover:bg-green-800"
            }`}
          >
            {menu.icon}
            <span>{menu.name}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
