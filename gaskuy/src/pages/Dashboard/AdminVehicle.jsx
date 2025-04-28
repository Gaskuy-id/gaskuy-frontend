import React, { useEffect, useState, useMemo } from "react";
import { Icon } from "@iconify/react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import api from "../../utils/api";

const AdminVehicle = () => {
  const branches = ["Jakarta", "Bandung", "Surakarta", "Jogjakarta", "Semarang"];

  // === CRUD state ===
  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      name: "Burok Gus Faqih",
      price: 200000,
      km: 50000,
      year: 2012,
      seats: 4,
      trunk: "50 Liter",
      engine: "2000 CC",
      status: "tersedia",
    },
    {
      id: 2,
      name: "Burok Gus Aspa",
      price: 300000,
      km: 50000,
      year: 2015,
      seats: 5,
      trunk: "50 Liter",
      engine: "4000 CC",
      status: "tidak tersedia",
    },
    {
      id: 3,
      name: "Burok Gus Asri",
      price: 250000,
      km: 40000,
      year: 2014,
      seats: 4,
      trunk: "45 Liter",
      engine: "1800 CC",
      status: "maintenance",
    },
  ]);

  const [selectedBranch, setSelectedBranch] = useState("Surakarta");

  const [q, setQ] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // "create" | "edit" | "delete"
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({
    name: "",
    price: "",
    km: "",
    year: "",
    seats: "",
    trunk: "",
    engine: "",
    status: "tersedia",
    transmission: "manual",  
    mainImage: null,          
    detailImages: [],         
  });
  // === end CRUD state ===

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get(`/cms/vehicle/city/${selectedBranch}`);
        let newData = [];
        
        console.log(res.data);
        res.data.vehicles.forEach(element=>{
          newData.push({
            id: element._id,
            name: element.name,
            price: element.ratePerHour,
            km: element.kilometer,
            year: element.year,
            seats: element.seat,
            trunk: element.luggage,
            engine: element.engineCapacity,
            status: element.currentStatus
          })
        });

        setVehicles(newData);
        console.log(newData);

      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    }; 

    fetchProfile();
  }, [selectedBranch]);

  // filter berdasarkan q
  const filtered = useMemo(
    () =>
      vehicles.filter((v) => v.name.toLowerCase().includes(q.toLowerCase())),
    [vehicles, q]
  );

  // metrics
  const total = vehicles.length;
  const available = vehicles.filter((v) => v.status === "tersedia").length;
  const inUse = vehicles.filter((v) => v.status === "tidak tersedia").length;
  const inMaintain = vehicles.filter((v) => v.status === "maintenance").length;

  const openModal = (type, v = null) => {
    setModalType(type);
    setSelected(v);
    if (v) {
      setForm({
        name: v.name,
        price: v.price,
        km: v.km,
        year: v.year,
        seats: v.seats,
        trunk: v.trunk,
        engine: v.engine,
        status: v.status,
        transmission: v.transmission || "manual",
        mainImage: null,
        detailImages: [],
      });
    } else {
      setForm({
        name: "",
        price: "",
        km: "",
        year: "",
        seats: "",
        trunk: "",
        engine: "",
        status: "tersedia",
        transmission: "manual",
        mainImage: null,
        detailImages: [],
      });
    }
    setShowModal(true);
  };
  const closeModal = () => setShowModal(false);

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("ratePerHour", Number(form.price));
      formData.append("kilometer", Number(form.km));
      formData.append("year", Number(form.year));
      formData.append("seat", Number(form.seats));
      formData.append("luggage", form.trunk);
      formData.append("engineCapacity", form.engine);
      formData.append("currentStatus", form.status);
      formData.append("branch", selectedBranch);
      formData.append("transmission", form.transmission);
  
      if (form.mainImage) {
        formData.append("mainImage", form.mainImage);
      }
  
      if (form.detailImages.length > 0) {
        form.detailImages.forEach((img) => {
          formData.append("detailImages", img);
        });
      }
  
      console.log("Payload yang dikirim:", formData);
  
      if (modalType === "create") {
        await api.post("/cms/vehicle", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else if (modalType === "edit") {
        await api.put(`/cms/vehicle/${selected.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      closeModal();
  
      // Refresh data
      const res = await api.get(`/cms/vehicle/city/${selectedBranch}`);
      let newData = [];
      res.data.vehicles.forEach(element => {
        newData.push({
          id: element._id,
          name: element.name,
          price: element.ratePerHour,
          km: element.kilometer,
          year: element.year,
          seats: element.seat,
          trunk: element.luggage,
          engine: element.engineCapacity,
          status: element.currentStatus,
          transmission: element.transmission,
          mainImage: element.mainImage, // cek
          detailImage: element.detailImage, // cek
        });
      });
      setVehicles(newData);
    } catch (error) {
      console.error("Error saat menyimpan kendaraan:", error.response?.data || error.message);
    }
  };
  
  
  

const handleDelete = async () => {
  try {
    await api.delete(`/cms/vehicle/${selected.id}`); // Panggil API untuk delete
    closeModal();
    // Refresh data
    const res = await api.get(`/cms/vehicle/city/${selectedBranch}`);
    let newData = [];
    res.data.vehicles.forEach(element => {
      newData.push({
        id: element._id,
        name: element.name,
        price: element.ratePerHour,
        km: element.kilometer,
        year: element.year,
        seats: element.seat,
        trunk: element.luggage,
        engine: element.engineCapacity,
        status: element.currentStatus
      })
    });
    setVehicles(newData);
  } catch (error) {
    console.error("Error saat menghapus kendaraan:", error);
  }
};


  return (
    <div className="flex h-screen relative">
      {/* Sidebar Hijau */}
      <aside className="w-72 bg-[#335540] text-white flex flex-col p-6 space-y-8">
        <img src={logo} alt="GASSKUY Logo" className="w-20 h-15 ml-12.5" />
        <div className="relative">
        
        <select
          className="appearance-none w-45 bg-white text-[#335540] py-2 px-3 pr-10 rounded-md bg-[url('https://api.iconify.design/subway:down-2.svg?color=%23335540&width=20&height=20')] bg-no-repeat bg-[length:0.5rem_0.5rem] bg-[position:calc(100%-0.7rem)_center]"
          value={selectedBranch}
          onChange={(event) => setSelectedBranch(event.target.value)}
        >
          {branches.map((branch) => (
            <option key={branch} value={branch}>
              {branch}
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
            to="/admin-general-no-driver"
          />
          <NavItem icon="lucide:user" label="Pelanggan" to="/admin-customer" />
          <NavItem icon="ri:steering-fill" label="Supir" to="/admin-driver" />
          <NavItem icon="tabler:car" label="Kendaraan" to="/admin-vehicle" />
        </nav>
      </aside>

      {/* Content Putih Overlay */}
      <main className="flex-1 bg-gray-100 -ml-16 z-10 rounded-tl-2xl p-6 relative flex flex-col">
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

        {/* === Metrics === */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total Kendaraan", value: total },
            { label: "Kendaraan Tersedia", value: available },
            { label: "Kendaraan Terpakai", value: inUse },
            { label: "Dalam Maintenance", value: inMaintain },
          ].map((c, i) => (
            <div
              key={i}
              className="bg-white rounded-lg p-4 flex flex-col space-y-2"
            >
              <Icon
                icon="tabler:car"
                width="32"
                height="32"
                className="text-black"
              />
              <div className="text-sm text-black">{c.label}</div>
              <div className="text-xl font-semibold">{c.value}</div>
            </div>
          ))}
        </div>

        {/* === CRUD CONTENT === */}
        <div className="bg-white rounded-2xl shadow p-4 flex flex-col flex-1 mt-3 min-h-0">
          {/* toolbar */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => openModal("create")}
              className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
            >
              <Icon
                icon="ic:round-add"
                width="20"
                height="20"
                className="mr-2"
              />
              Tambah
            </button>
            <div className="relative">
              <input
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Pencarian"
                className="border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring"
              />
              <Icon
                icon="ic:outline-search"
                width="20"
                height="20"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>
          {/* table */}
          <div className="flex-1 overflow-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
              <thead className="bg-white">
                <tr className="bg-[#D9D9D9]/20">
                  {[
                    "Nama",
                    "Harga Sewa",
                    "Kilometer",
                    "Tahun",
                    "Kursi",
                    "Bagasi",
                    "Mesin",
                    "Status",
                    "Aksi",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-6 py-4 text-left text-sm font-medium text-gray-700"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filtered.map((v) => (
                  <tr key={v.id} className="bg-white">
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {v.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      Rp {v.price.toLocaleString()}/jam
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {v.km.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {v.year}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {v.seats}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {v.trunk}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {v.engine}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {v.status}
                    </td>
                    <td className="px-6 py-4 flex space-x-4">
                      <button
                        onClick={() => openModal("edit", v)}
                        className="flex items-center justify-center w-8 h-8 rounded hover:bg-gray-100"
                      >
                        <Icon
                          icon="ic:baseline-edit"
                          width="20"
                          height="20"
                          className="text-green-600"
                        />
                      </button>
                      <button
                        onClick={() => openModal("delete", v)}
                        className="flex items-center justify-center w-8 h-8 rounded hover:bg-gray-100"
                      >
                        <Icon
                          icon="mdi:delete"
                          width="20"
                          height="20"
                          className="text-red-600"
                        />
                      </button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td
                      colSpan={9}
                      className="px-6 py-8 text-center text-gray-400 text-sm"
                    >
                      Data tidak ditemukan
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        {/* === END CRUD CONTENT === */}
      </main>

      {/* === POPUP MODAL === */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-20 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-11/12 max-w-md">
            {modalType === "delete" ? (
              <>
                <h2 className="text-lg font-semibold mb-4">Hapus Kendaraan?</h2>
                <p className="mb-6">
                  Apakah Anda yakin ingin menghapus{" "}
                  <strong>{selected.name}</strong>?
                </p>
                <div className="flex justify-end space-x-4">
                  <button onClick={closeModal} className="px-4 py-2">
                    Batal
                  </button>
                  <button
                    onClick={handleDelete}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg"
                  >
                    Hapus
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-lg font-semibold mb-4">
                  {modalType === "create"
                    ? "Tambah Kendaraan"
                    : "Edit Kendaraan"}
                </h2>
                <div className="space-y-3">
                  {[
                    "name",
                    "transmission",
                    "price",
                    "km",
                    "year",
                    "seats",
                    "trunk",
                    "engine",
                  ].map((field) => (
                    <div key={field}>
                      <label className="block text-sm capitalize">
                        {field}
                      </label>
                      <input
                        type={
                          ["price", "km", "year", "seats"].includes(field)
                            ? "number"
                            : "text"
                        }
                        value={form[field]}
                        onChange={(e) =>
                          setForm({ ...form, [field]: e.target.value })
                        }
                        className="w-full border px-3 py-1 rounded-md"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-sm">Status</label>
                    <select
                      value={form.status}
                      onChange={(e) =>
                        setForm({ ...form, status: e.target.value })
                      }
                      className="w-full border px-3 py-1 rounded-md"
                    >
                      {["tersedia", "tidak tersedia", "maintenance"].map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex justify-end space-x-4 mt-6">
                  <button onClick={closeModal} className="px-4 py-2">
                    Batal
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                  >
                    Simpan
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      {/* === END POPUP === */}
    </div>
  );
};

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
