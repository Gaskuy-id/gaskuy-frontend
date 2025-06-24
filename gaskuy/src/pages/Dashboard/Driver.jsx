import React, { useState, useEffect } from 'react';
import { Icon } from "@iconify/react";
import logo from "../../assets/images/logo.png";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";

const CardStat = ({ icon, label, value }) => (
  <div className="bg-white rounded-lg p-4 flex flex-col space-y-2 shadow">
    <div className="text-2xl text-black">
      <Icon icon={icon} width={32} height={32} />
    </div>
    <div>
      <div className="text-sm text-black mb-2">{label}</div>
      <div className="text-xl font-semibold">{value}</div>
    </div>
  </div>
);

const formatTanggal = (tanggal) => {
  const d = new Date(tanggal);
  const tgl = String(d.getDate()).padStart(2, '0');
  const bln = String(d.getMonth() + 1).padStart(2, '0');
  const thn = d.getFullYear();
  const jam = String(d.getHours()).padStart(2, '0');
  const menit = String(d.getMinutes()).padStart(2, '0');
  return `${tgl}/${bln}/${thn} - ${jam}:${menit}`;
};

const getDetailedStatus = (rental) => {
  const c = rental.confirmations;
  if (!c) return "Belum Aktif";
  if (c.vehicleReturned) return "Selesai";
  if (c.vehicleTaken) return "Sedang Berlangsung";
  if (c.paymentPaid) return "Aktif";
  return "Undefined";
};

const Driver = () => {
  const [q, setQ] = useState('');
  const [dataTransaksi, setDataTransaksi] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/cms/driver/rentals`);
        const enriched = res.data.data.map((rental) => ({
          ...rental,
          detailedStatus: getDetailedStatus(rental)
        }));
        setDataTransaksi(enriched);
      } catch (error) {
        console.error("Gagal mengambil data transaksi:", error);
      }
    };
    fetchData();
  }, []);

  const completedCount = dataTransaksi.filter(item => item.detailedStatus === 'Selesai').length;

  const stats = [
    { icon: 'ic:outline-receipt-long', label: 'Pekerjaan selesai', value: completedCount },
  ];

  const filtered = dataTransaksi.filter((v) =>
    Object.values(v).some((val) =>
      String(val).toLowerCase().includes(q.toLowerCase())
    )
  );

  return (
    <div className='flex h-screen relative'>
      <aside className='w-72 bg-[#335540] text-white flex flex-col p-6 space-y-8'>
        <img src={logo} alt='Gasskuy Logo' className='w-20 h-15 ml-12.5' />
        <nav className='flex-1 flex flex-col gap-4 w-44 mt-18'>
          <button className='flex items-center gap-3 px-4 py-2 rounded-lg bg-[#4D7257] text-white'>
            <Icon icon="mage:dashboard" width="18" height="18" />
            <span className='text-white font-medium'>Dashboard</span>
          </button>
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

      <main className='flex-1 bg-gray-100 -ml-16 z-10 rounded-tl-2xl p-6 relative flex flex-col overflow-y-auto'>
        <header className='flex items-center justify-between mb-6'>
          <h1 className='text-2xl font-semibold'>Dashboard</h1>
        </header>

        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <CardStat
                key={index}
                icon={stat.icon}
                label={stat.label}
                value={stat.value}
              />
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow p-4 mt-9">
            <div className="flex justify-end mb-4">
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Pencarian"
                  className="border border-gray-300 rounded-lg pl-10 pr-4 py-2 w-full focus:outline-none focus:ring"
                />
                <Icon
                  icon="ic:outline-search"
                  width="20"
                  height="20"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead className="bg-[#D9D9D9]/20">
                  <tr>
                    {['ID Transaksi', 'Penyewa', 'Kendaraan', 'No. Telp', 'Tanggal Sewa', 'Lokasi Penjemputan', 'Lokasi Pengembalian', 'Status'].map((h) => (
                      <th key={h} className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filtered.map((v, i) => (
                    <tr key={i} className="bg-white">
                      <td className="px-6 py-4 text-sm text-gray-800">{v.transactionId}</td>
                      <td className="px-6 py-4 text-sm text-gray-800">{v.ordererName}</td>
                      <td className="px-6 py-4 text-sm text-gray-800">{v.vehicleId?.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-800">{v.ordererPhone}</td>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-pre-line">
                        {formatTanggal(v.startedAt)} {formatTanggal(v.finishedAt)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800">{v.locationStart}</td>
                      <td className="px-6 py-4 text-sm text-gray-800">{v.locationEnd}</td>
                      <td className="px-6 py-4 text-sm text-gray-800">{v.detailedStatus}</td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={8} className="px-6 py-8 text-center text-gray-400 text-sm">
                        Data tidak ditemukan
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Driver;
