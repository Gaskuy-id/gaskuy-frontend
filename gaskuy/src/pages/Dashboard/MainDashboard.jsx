import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import logo from "../../assets/images/logo.png";
import AdminVehicle from "./AdminVehicle";
import AdminCustomer from "./AdminCustomer";
import AdminDriver from "./AdminDriver";
import AdminGeneralDriver from "./AdminGeneralDriver";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";

const MainDashboard = () => {
  const navigate = useNavigate();
  // Ambil branch dari query parameter URL
  const getBranchFromURL = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get("branch") || "Surakarta";
  };

  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(getBranchFromURL);
  const [selectedBranchId, setSelectedBranchId] = useState(null); // Akan diatur di useEffect pertama
  const [activeContent, setActiveContent] = useState(() => {
    return localStorage.getItem("activeContent") || "dashboard";
  });

  // Fetch daftar branch dari API
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await api.get("/cms/branch");
        const data = response.data.data;
        setBranches(data);

        const branchFromURL = getBranchFromURL();
        const found = data.find((b) => b.name === branchFromURL);

        if (found) {
          setSelectedBranch(found.name);
          setSelectedBranchId(found._id); // Menggunakan _id dari backend response
        } else if (data.length > 0) { // Pastikan ada setidaknya satu cabang
          setSelectedBranch(data[0].name);
          setSelectedBranchId(data[0]._id); // Menggunakan _id dari backend response
        }
      } catch (error) {
        console.error("Gagal mengambil data cabang:", error);
        // Anda bisa menambahkan feedback UI di sini jika gagal mengambil cabang
      }
    };
    fetchBranches();
  }, []); // Efek ini hanya berjalan sekali saat komponen mount

  // Simpan selectedBranch di localStorage dan URL
  useEffect(() => {
    localStorage.setItem("selectedBranch", selectedBranch);
    const url = new URL(window.location);
    url.searchParams.set("branch", selectedBranch);
    window.history.replaceState({}, "", url);
  }, [selectedBranch]);

  useEffect(() => {
    localStorage.setItem("activeContent", activeContent);
  }, [activeContent]);

  const renderContent = () => {
    const sharedProps = {
      selectedBranchId, // Prop ini diteruskan dan ada di dependency array useEffect komponen anak
    };

    // Opsional: Tampilkan loading state jika selectedBranchId belum disetel
    // ini penting jika pengambilan data cabang butuh waktu dan komponen anak tergantung pada selectedBranchId
    if (!selectedBranchId && branches.length > 0) {
        return <div className="text-center text-gray-500 mt-10">Memuat data cabang...</div>;
    }


    switch (activeContent) {
      case "dashboard":
        return <AdminGeneralDriver {...sharedProps} />;
      case "vehicle":
        return <AdminVehicle {...sharedProps} />;
      case "customer":
        return <AdminCustomer {...sharedProps} />;
      case "driver":
        return <AdminDriver {...sharedProps} />;
      default:
        return <AdminGeneralDriver {...sharedProps} />;
    }
  };

  return (
    <div className="flex h-screen relative">
      {/* Sidebar */}
      <aside className="w-72 bg-[#335540] text-white flex flex-col p-6 space-y-8">
        <img src={logo} alt="GASSKUY Logo" className="w-20 h-15 ml-12.5" />
        <div className="relative">
          <select
            className="appearance-none w-45 bg-white text-[#335540] py-2 px-3 pr-10 rounded-md bg-[url('https://api.iconify.design/subway:down-2.svg?color=%23335540&width=20&height=20')] bg-no-repeat bg-[length:0.5rem_0.5rem] bg-[position:calc(100%-0.7rem)_center]"
            value={selectedBranch}
            onChange={(e) => {
              const name = e.target.value;
              const found = branches.find((b) => b.name === name);
              setSelectedBranch(name);
              // *** PERBAIKAN PENTING DI SINI ***
              // Gunakan found?._id karena backend kemungkinan mengembalikan _id
              setSelectedBranchId(found?._id || null);
            }}
          >
            {branches.map((branch) => (
              // Gunakan branch._id sebagai key untuk konsistensi
              <option key={branch._id} value={branch.name}>
                {branch.name}
              </option>
            ))}
          </select>
          <Icon
            icon="subway:down-2"
            width="20"
            height="20"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#335540]"
          />
        </div>
        <nav className="flex-1 flex flex-col gap-4 w-44">
          <NavItem
            icon="mage:dashboard"
            label="Dashboard"
            active={activeContent === "dashboard"}
            onClick={() => setActiveContent("dashboard")}
          />
          <NavItem
            icon="lucide:user"
            label="Pelanggan"
            active={activeContent === "customer"}
            onClick={() => setActiveContent("customer")}
          />
          <NavItem
            icon="ri:steering-fill"
            label="Supir"
            active={activeContent === "driver"}
            onClick={() => setActiveContent("driver")}
          />
          <NavItem
            icon="tabler:car"
            label="Kendaraan"
            active={activeContent === "vehicle"}
            onClick={() => setActiveContent("vehicle")}
          />

          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("role");
              navigate("/login");
            }}
            className="mt-auto flex items-center py-2 px-4 rounded-lg transition-colors cursor-pointer hover:bg-red-700 text-white font-medium"
          >
            <Icon icon="solar:logout-2-bold" width="18" height="18" className="mr-3" />
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 -ml-16 z-10 rounded-tl-2xl p-6 relative flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">
            {activeContent === "dashboard" && "Dashboard"}
            {activeContent === "customer" && "Pelanggan"}
            {activeContent === "driver" && "Supir"}
            {activeContent === "vehicle" && "Kendaraan"}
          </h1>
          <div className="flex items-center space-x-4 text-black">
            <Icon icon="basil:notification-outline" width="20" height="20" className="cursor-pointer hover:text-gray-800" />
            <Icon icon="weui:setting-filled" width="20" height="20" className="cursor-pointer hover:text-gray-800" />
            <Icon icon="gg:profile" width="24" height="24" className="cursor-pointer hover:text-gray-800" />
          </div>
        </header>

        {/* Dynamic Content */}
        {renderContent()}
      </main>
    </div>
  );
};

const NavItem = ({ icon, label, active, onClick }) => (
  <div
    onClick={onClick}
    className={`flex items-center py-2 px-4 rounded-lg transition-colors cursor-pointer ${
      active
        ? "bg-[#4D7257] font-medium text-white"
        : "hover:bg-[#2C4436] text-white/80"
    }`}
  >
    <Icon icon={icon} width="18" height="18" className="mr-3" />
    <span>{label}</span>
  </div>
);

export default MainDashboard;