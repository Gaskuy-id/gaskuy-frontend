import React from "react";
import { Icon } from "@iconify/react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.png";

const AdminVehicle = () => {
  const branches = ['Jakarta','Bandung','Surabaya','Jogjakarta','Semarang'];
  return (
    <div className="flex h-screen relative">
      {/* Sidebar Hijau */}
      <aside className="w-72 bg-[#335540] text-white flex flex-col p-6 space-y-8">
        {/* Logo */}
        <img
          src={logo}
          alt="GASSKUY Logo"
          className="w-20 h-15 ml-12.5"
        />

        {/* Lokasi dengan custom dropdown */}
        <div className="relative">
          <select
            className="appearance-none w-45 bg-white text-[#335540] py-2 px-3 pr-10 rounded-md bg-[url('https://api.iconify.design/subway:down-2.svg?color=%23335540&width=20&height=20')] bg-no-repeat bg-[length:0.5rem_0.5rem] bg-[position:calc(100%-0.7rem)_center]"
            defaultValue="Jakarta"
          >
            {branches.map((branch) => (
              <option key={branch} value={branch}>{branch}</option>
            ))}
          </select>
          <Icon
            icon="subway:down-2"
            width="20"
            height="20"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#335540]"
          />
        </div>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col gap-4 w-44">
          <NavItem
            icon="mage:dashboard"
            label="Dashboard"
            to="/admin-general-no-driver"
          />
          <NavItem icon="lucide:user" label="Pelanggan" to="/admin-customer" />
          <NavItem icon="ri:steering-fill" label="Supir" to="/admin-driver" />
          <NavItem icon="tabler:car" label="Kendaraan" to="/admin-vehicle" />
        </nav>
      </aside>

      {/* Content Putih Overlay */}
      <main className="flex-1 bg-white -ml-16 z-10 rounded-tl-2xl shadow-lg p-6 relative flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Kendaraan</h1>
          <div className="flex items-center space-x-4 text-black">
            <Icon
              icon="basil:notification-outline"
              width="20"
              height="20"
              className="cursor-pointer hover:text-gray-800"
            />
            <Icon
              icon="weui:setting-filled"
              width="20"
              height="20"
              className="cursor-pointer hover:text-gray-800"
            />
            <Icon
              icon="gg:profile"
              width="24"
              height="24"
              className="cursor-pointer hover:text-gray-800"
            />
          </div>
        </header>

        {/* Konten manajemen kendaraan */}
        <div className="flex-1 bg-gray-100 rounded-lg p-4">
          <p className="text-gray-500">Konten manajemen kendaraan di sini…</p>
        </div>
      </main>
    </div>
  );
};

// NavItem kini pakai NavLink untuk routing & active state otomatis
const NavItem = ({ icon, label, to }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center py-2 px-4 rounded-lg transition-colors ${
        isActive
          ? "bg-[#4D7257] font-medium text-white"
          : "hover:bg-[#2C4436] text-white/80"
      }`
    }
  >
    <Icon icon={icon} width="18" height="18" className="mr-3" />
    <span>{label}</span>
  </NavLink>
);

export default AdminVehicle;
