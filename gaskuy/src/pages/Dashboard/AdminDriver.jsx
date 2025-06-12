import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import api from '../../utils/api';



const CardStat = ({ icon, label, value }) => (
  <div className="bg-white rounded-lg p-4 flex flex-col space-y-2">
    <div className="text-2xl text-black">
      <Icon icon={icon} width={32} height={32} />
    </div>
    <div>
      <div className="text-sm text-black mb-2">{label}</div>
      <div className="text-xl font-semibold">{value}</div>
    </div>
  </div>
);

const AdminDriver = ({ selectedBranchId }) => {
  const [q, setQ] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const [statusFilter, setStatusFilter] = useState('Semua');
  const [showModal, setShowModal] = useState(false);
  const [editDriver, setEditDriver] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [driverToDelete, setDriverToDelete] = useState(null);


  const [drivers, setDrivers] = useState([
    {
      id: 1,
      name: 'Alamojek',
      email: 'alamojek@gmail.com',
      password: 'admin123',
      phone: '0811222233334444',
      birthDate: '1995-05-15',
      address: "Surakarta",
      status: "Tidak Tersedia",
      details: [
        {
          renter: 'Dhiya Ulhaq',
          vehicle: 'Burak Gus Faqih',
          customerPhone: '081234567890',
          start: '2025-05-15',
          end: '2025-05-16',
          pickUp: 'Jalan Slamet Riyadi',
          detailedStatus: 'Dalam Penjemputan',
        },
        {
          renter: 'Dhiya Ulhaq',
          vehicle: 'Burak Gus Faqih',
          customerPhone: '081234567890',
          start: '2025-05-15',
          end: '2025-05-16',
          pickUp: 'Jalan Slamet Riyadi',
          detailedStatus: 'Sudah Selesai',
        },
      ],
    },
    {
      id: 2,
      name: 'Wira Kusuma',
      email: 'wirakusuma@gmail.com',
      password: 'admin123',
      phone: "0822333344445555",
      birthDate: "1991-01-11",
      address: "Semarang",
      status: "Tersedia",
      details: [
        {
          renter: 'Bima Sakti',
          vehicle: 'Honda Mobilio',
          customerPhone: '081234567890',
          start: '2025-04-01',
          end: '2025-04-02',
          pickUp: 'Paragon Semarang',
          detailedStatus: 'Sudah Selesai',
        },
      ],
    },
    {
      id: 3,
      name: "Rendi Fauzan",
      email: "rendifauzan@gmail.com",
      password: 'admin123',
      phone: "0833444455556666",
      birthDate: "1994-06-17",
      address: "Semarang",
      status: "Tersedia",
      details: [
        {
          renter: 'Bima Sakti',
          vehicle: 'Suzuki Ertiga',
          customerPhone: '081234567890',
          start: '2025-04-10',
          end: '2025-04-11',
          pickUp: 'Paragon Semarang',
          detailedStatus: 'Sudah Selesai',
        },
      ],
    },
  ]);

    useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get(`/cms/users/role/driver`);
        let newData = [];
        
        console.log(res.data.data);
        res.data.data.forEach(element=>{
          newData.push({
            id: element._id,
            name: element.name,
            email: element.email,
            password: element.password,
            phone: element.phone,
            birthDate: element.birthDate,
            address: element.address,
            status: element.status,
          });
        });

        setDrivers(newData);
        console.log(newData);

      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    }; 

    fetchProfile();
  }, [selectedBranchId]);

  const totalDriver = drivers.length;
  const driverTersedia = drivers.filter(d => d.status === 'Tersedia').length;
  const driverTerpakai = drivers.filter(d => d.status === 'Tidak Tersedia').length;

  const stats = [
    { icon: 'mdi:account-multiple-outline', label: 'Total Driver', value: totalDriver },
    { icon: 'mdi:account-check-outline', label: 'Driver Tersedia', value: driverTersedia },
    { icon: 'mdi:account-clock-outline', label: 'Driver Terpakai', value: driverTerpakai },
  ];

  const filtered = drivers
    .filter((v) => statusFilter === 'Semua' || v.status === statusFilter)
    .filter((v) => {
      if (!q) return true;
      const flatValues = [
        v.name, v.email, v.phone, v.birthDate, v.address, v.status,
        ...v.details.flatMap(d => [
          d.renter, d.vehicle, d.customerPhone, d.start, d.end, d.pickUp, d.detailedStatus
        ])
      ];
      return flatValues.some(val =>
        String(val).toLowerCase().includes(q.toLowerCase())
      );
    });

  const resetModal = () => {
    setEditDriver(null);
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const newDriver = {
      id: editDriver ? editDriver.id : Date.now(),
      name: form.name.value,
      email: form.email.value,
      password: form.password.value,
      phone: form.phone.value,
      birthDate: form.birthDate.value,
      address: form.address.value,
      status: form.status.value,
      details: editDriver?.details || [],
    };
    await api.post("cms/users", newDriver, {headers: { "Content-Type": "application/json"} })
    if (editDriver) {
      setDrivers(prev => prev.map(d => (d.id === editDriver.id ? newDriver : d)));
    } else {
      setDrivers(prev => [...prev, newDriver]);
    }

    resetModal();
  };

  const toggleDetail = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleEdit = (id) => {
    const d = drivers.find(d => d.id === id);
    setEditDriver(d);
    setShowModal(true);
  };

  const handleView = (id) => {
    // Contoh aksi lihat detail, bisa toggle detail atau buka modal detail
    toggleDetail(id);
  };

  // Fungsi ini hanya memicu modal konfirmasi
  const confirmDeleteDriver = (driver) => {
    setDriverToDelete(driver);
    setShowDeleteModal(true);
  };

  // Fungsi ini dijalankan dari dalam modal saat user menekan "Ya, Hapus"
  const deleteDriver = () => {
    setDrivers((prev) => prev.filter((d) => d.id !== driverToDelete.id));
    setShowDeleteModal(false);
    setDriverToDelete(null);
  };

  return (
    <div className="space-y-4">
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
            <h2 className="text-lg font-semibold mb-4 text-center">
              {editDriver ? 'Edit Supir' : 'Tambah Supir'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Nama Supir</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={editDriver?.name || ''}
                  required
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  defaultValue={editDriver?.email || ''}
                  required
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  defaultValue={editDriver?.password || ''}
                  required
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">No Telepon</label>
                <input
                  type="text"
                  name="phone"
                  defaultValue={editDriver?.phone || ''}
                  required
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Tanggal Lahir</label>
                <input
                  type="date"
                  name="birthDate"
                  defaultValue={editDriver?.birthDate || ''}
                  required
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Alamat</label>
                <input
                  type="text"
                  name="address"
                  defaultValue={editDriver?.address || ''}
                  required
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Status</label>
                <select
                  name="status"
                  defaultValue={editDriver?.status || ''}
                  required
                  className="w-full border rounded-lg px-3 py-2"
                >
                  <option value="">Pilih status</option>
                  <option value="Tersedia">Tersedia</option>
                  <option value="Tidak Tersedia">Tidak Tersedia</option>
                </select>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={resetModal}
                  className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 text-sm"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm"
                >
                  Simpan
                </button>
              </div>
            </form>
            <button
              onClick={resetModal}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              <Icon icon="mdi:close" width="24" height="24" />
            </button>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full relative shadow-2xl">
            <h2 className="text-xl font-bold text-center mb-4 text-gray-900">Hapus Supir</h2>
            <p className="text-sm text-gray-700 text-center mb-4">Apakah anda yakin untuk menghapus supir?</p>

            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded mb-6 text-sm">
              <div className="font-semibold flex items-center gap-2">
                <Icon icon="mdi:alert-circle" className="text-red-600" width={20} />
                Peringatan
              </div>
              <p className="mt-1 ml-6">Dengan menghapus supir, Anda tidak dapat mengakses supir ini dalam sistem.</p>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition"
              >
                Batalkan
              </button>
              <button
                onClick={deleteDriver}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition"
              >
                Ya, hapus
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <CardStat key={i} {...stat} />
        ))}
      </div>

      {/* Filter dan Search */}
      <div className="bg-white rounded-2xl shadow p-4 flex flex-col mt-9">
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2"
          >
            <option value="Semua">Semua Status</option>
            <option value="Tersedia">Tersedia</option>
            <option value="Tidak Tersedia">Tidak Tersedia</option>
          </select>

          <div className="flex flex-1 justify-end items-center gap-2">
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center justify-center border border-[#00A34A] bg-[#B0F4CA] text-[#00A34A] w-10 aspect-square rounded-lg"
            >
              <Icon icon="mdi:plus" width={24} />
            </button>

            <div className="relative w-full sm:w-64">
              <input
                type="text"
                value={q}
                onChange={e => setQ(e.target.value)}
                placeholder="Pencarian"
                className="border border-gray-300 rounded-lg pl-10 pr-4 py-2 w-full"
              />
              <Icon
                icon="ic:outline-search"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                width={20}
              />
            </div>
          </div>
        </div>

        {/* Tabel */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-[#D9D9D9]/20 text-left">
              <tr>
                {['Nama', 'Email', 'No Telp', 'Tanggal Lahir', 'Alamat', 'Status', 'Aksi'].map(h => (
                  <th key={h} className="px-6 py-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filtered.map((driver) => (
                <React.Fragment key={driver.id}>
                  <tr className="bg-white">
                    <td className="px-6 py-4">{driver.name}</td>
                    <td className="px-6 py-4">{driver.email}</td>
                    <td className="px-6 py-4">{driver.phone}</td>
                    <td className="px-6 py-4">{driver.birthDate}</td>
                    <td className="px-6 py-4">{driver.address}</td>
                    <td className="px-6 py-4">{driver.status}</td>
                    <td className="px-6 py-4 flex space-x-4">
                      <button onClick={() => handleEdit(driver.id)} 
                        className="p-1 rounded hover:bg-green-100 transition"
                        title="Edit">
                        <Icon icon="mdi:pencil" className="text-green-600 cursor-pointer" width={22} />
                      </button>
                      
                      <button onClick={() => handleView(driver.id)}
                        className="p-1 rounded hover:bg-blue-100 transition"
                        title="Lihat Detail">
                        <Icon icon="mdi:eye" className="text-blue-600 cursor-pointer" width={22} />
                      </button>
                      
                      <button onClick={() => confirmDeleteDriver(driver)} 
                        className="p-1 rounded hover:bg-red-100 transition"
                        title="Hapus">
                        <Icon icon="mdi:delete" className="text-red-600 cursor-pointer" width={22} />
                      </button>
                    </td>
                  </tr>

                  {expandedId === driver.id && (
                    <tr>
                      <td colSpan={7} className="px-6 py-4 bg-gray-50">
                        <div className="rounded-lg p-4">
                          {driver.details.length > 0 ? (
                            <table className="min-w-full text-sm">
                              <thead>
                                <tr className="bg-gray-100 text-left">
                                  <th className="px-4 py-2 font-normal">Penyewa</th>
                                  <th className="px-4 py-2 font-normal">kendaraan</th>
                                  <th className="px-4 py-2 font-normal">No Telp Penyewa</th>
                                  <th className="px-4 py-2 font-normal">Tanggal Sewa</th>
                                  <th className="px-4 py-2 font-normal">Tanggal Kembali</th>
                                  <th className="px-4 py-2 font-normal">Lokasi Penjemputan</th>
                                  <th className="px-4 py-2 font-normal">Status</th>
                                </tr>
                              </thead>
                              <tbody>
                                {driver.details.map((d, i) => (
                                  <tr key={i} className="border-t">
                                    <td className="px-4 py-2">{d.renter}</td>
                                    <td className="px-4 py-2">{d.vehicle}</td>
                                    <td className="px-4 py-2">{d.customerPhone}</td>
                                    <td className="px-4 py-2">{d.start}</td>
                                    <td className="px-4 py-2">{d.end}</td>
                                    <td className="px-4 py-2">{d.pickUp}</td>
                                    <td className="px-4 py-2">{d.detailedStatus}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          ) : (
                            <div className="text-gray-500 text-sm">Tidak ada detail transaksi.</div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-400 text-sm">
                    Data tidak ditemukan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDriver;
