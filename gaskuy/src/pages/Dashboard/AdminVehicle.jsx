import React, { useEffect, useState, useMemo } from "react";
import { Icon } from "@iconify/react";
import api from "../../utils/api";

const AdminVehicle = ({ selectedBranchId }) => {
  // === CRUD state ===
  const [vehicles, setVehicles] = useState([]);


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
    transmission: "manual",
    status: "tersedia",
    mainImage: null,
    detailImages: [],
  });
  // === end CRUD state ===

  useEffect(() => {
    const fetchVehicles = async () => {
      console.log(selectedBranchId)
      if (!selectedBranchId) return;
      try {
        const res = await api.get(`/cms/vehicle/branch/${selectedBranchId}`);
        console.log(res)
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
            transmission: element.transmission || "manual",
            mainImage: element.mainImage,
            detailImage: element.detailImage,
          });
        });

        setVehicles(newData);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };

    fetchVehicles();
  }, [selectedBranchId]); // <- Ganti ke selectedBranchId

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
        transmission: v.transmission || "manual",
        status: v.status,
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
        transmission: "manual",
        status: "tersedia",
        mainImage: null,
        detailImages: [],
      });
    }
    setShowModal(true);
  };
  const closeModal = () => setShowModal(false);

  // Handle main image upload
  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, mainImage: file });
    }
  };

  // Handle detail images upload
  const handleDetailImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setForm({ ...form, detailImages: [...form.detailImages, ...files] });
  };

  // Remove detail image
  const removeDetailImage = (index) => {
    const newDetailImages = form.detailImages.filter((_, i) => i !== index);
    setForm({ ...form, detailImages: newDetailImages });
  };

  // Remove main image
  const removeMainImage = () => {
    setForm({ ...form, mainImage: null });
  };

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
      formData.append("branchId", selectedBranchId);
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
        console.log(selected)
        let result = await api.put(`/cms/vehicle/${selected.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        await console.log(result)
      }
      closeModal();
  
      // Refresh data
      const res = await api.get(`/cms/vehicle/branch/${selectedBranchId}`);
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
          transmission: element.transmission || "manual",
          status: element.currentStatus,
          mainImage: element.mainImage,
          detailImage: element.detailImage,
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
      const res = await api.get(`/cms/vehicle/branch/${selectedBranchId}`);
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
        transmission: element.transmission || "manual",
        mainImage: element.mainImage,
        detailImage: element.detailImage,
        });
      });
      setVehicles(newData);
    } catch (error) {
      console.error("Error saat menghapus kendaraan:", error);
    }
  };

  return (
    <>
{/* === Metrics === */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
  {[
    { icon: "tabler:car",         label: "Total Kendaraan",        value: total },
    { icon: "mdi:car-location",   label: "Kendaraan tersedia",     value: available },
    { icon: "mdi:car-off",  label: "Kendaraan Terpakai",     value: inUse },
    { icon: "mdi:car-cog",          label: "Dalam maintenance",      value: inMaintain },
  ].map((c, i) => (
    <div
      key={i}
      className="bg-white rounded-lg p-4 flex flex-col space-y-2"
    >
      <Icon
        icon={c.icon}
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
                  "Transmisi",
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
                    {v.trunk} Liter
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {v.engine} CC
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {v.transmission}
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
                    colSpan={10}
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

      {/* === POPUP MODAL === */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-20 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-11/12 max-w-2xl max-h-[90vh] overflow-y-auto">
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
                <div className="space-y-4">
                  {/* Basic form fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { field: "name", label: "Nama", type: "text" },
                      { field: "price", label: "Harga", type: "number" },
                      { field: "km", label: "Kilometer", type: "number" },
                      { field: "year", label: "Tahun", type: "number" },
                      { field: "seats", label: "Kursi", type: "number" },
                      { field: "trunk", label: "Bagasi", type: "text" },
                      { field: "engine", label: "Mesin", type: "text" },
                    ].map(({ field, label, type }) => (
                      <div key={field}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {label}
                        </label>
                        <input
                          type={type}
                          value={form[field]}
                          onChange={(e) =>
                            setForm({ ...form, [field]: e.target.value })
                          }
                          className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Select fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Transmisi
                      </label>
                      <select
                        value={form.transmission}
                        onChange={(e) =>
                          setForm({ ...form, transmission: e.target.value })
                        }
                        className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {["manual", "automatic"].map((t) => (
                          <option key={t} value={t}>
                            {t.charAt(0).toUpperCase() + t.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                      </label>
                      <select
                        value={form.status}
                        onChange={(e) =>
                          setForm({ ...form, status: e.target.value })
                        }
                        className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {["tersedia", "tidak tersedia", "maintenance"].map((s) => (
                          <option key={s} value={s}>
                            {s.charAt(0).toUpperCase() + s.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Main Image Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gambar Utama
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                      {form.mainImage ? (
                        <div className="relative">
                          <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                            <div className="flex items-center space-x-3">
                              <Icon 
                                icon="mdi:image" 
                                width="24" 
                                height="24" 
                                className="text-blue-500" 
                              />
                              <span className="text-sm text-gray-700">
                                {form.mainImage.name}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={removeMainImage}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Icon icon="mdi:close" width="20" height="20" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center">
                          <Icon 
                            icon="mdi:cloud-upload" 
                            width="48" 
                            height="48" 
                            className="mx-auto text-gray-400 mb-2" 
                          />
                          <p className="text-sm text-gray-600 mb-2">
                            Klik untuk upload gambar utama
                          </p>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleMainImageChange}
                            className="hidden"
                            id="mainImageInput"
                          />
                          <label
                            htmlFor="mainImageInput"
                            className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                          >
                            <Icon icon="mdi:upload" width="16" height="16" className="mr-2" />
                            Pilih File
                          </label>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Detail Images Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gambar Detail
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                      <div className="text-center mb-4">
                        <Icon 
                          icon="mdi:cloud-upload" 
                          width="48" 
                          height="48" 
                          className="mx-auto text-gray-400 mb-2" 
                        />
                        <p className="text-sm text-gray-600 mb-2">
                          Klik untuk upload gambar detail (multiple)
                        </p>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleDetailImagesChange}
                          className="hidden"
                          id="detailImagesInput"
                        />
                        <label
                          htmlFor="detailImagesInput"
                          className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                        >
                          <Icon icon="mdi:upload" width="16" height="16" className="mr-2" />
                          Pilih File
                        </label>
                      </div>
                      
                      {/* Display selected detail images */}
                      {form.detailImages.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-gray-700">
                            File terpilih ({form.detailImages.length}):
                          </h4>
                          <div className="max-h-32 overflow-y-auto space-y-2">
                            {form.detailImages.map((file, index) => (
                              <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                                <div className="flex items-center space-x-2">
                                  <Icon 
                                    icon="mdi:image" 
                                    width="20" 
                                    height="20" 
                                    className="text-blue-500" 
                                  />
                                  <span className="text-sm text-gray-700">
                                    {file.name}
                                  </span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeDetailImage(index)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <Icon icon="mdi:close" width="16" height="16" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-4 mt-6">
                  <button 
                    onClick={closeModal} 
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Simpan
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AdminVehicle;