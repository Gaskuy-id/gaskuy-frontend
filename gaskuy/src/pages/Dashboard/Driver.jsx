import React, { useState } from 'react';
import { Icon } from "@iconify/react";
import logo from "../../assets/images/logo.png";

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

const Driver = () => {
  const [q, setQ] = useState('');

  const dataTransaksi = [
    {
      id: 'ABC123',
      renter: 'Akira Nagai',
      vehicle: 'Avanza',
      phone: '0851426369827',
      rentDate: '15/03/2025 - 15:40\n16/03/2025 - 15:00',
      pickUp: 'Solo Paragon\nJl.Slamet Riyadi',
      status: 'Dalam Penjemputan',
    },
    {
      id: 'ABC123',
      renter: 'Ulhaqq',
      vehicle: 'Mobilio',
      phone: '0851426369827',
      rentDate: '15/03/2025 - 15:40\n16/03/2025 - 15:00',
      pickUp: 'Perumahan Ngringo\nRt03 Rw04, Planet Mars,\nBima Sakti',
      status: 'Sudah Selesai',
    },
    {
      id: 'ABC123',
      renter: 'Asepp',
      vehicle: 'Brio',
      phone: '0851426369827',
      rentDate: '15/03/2025 - 15:40\n16/03/2025 - 15:00',
      pickUp: 'Kost Putra Aspa\nRt03 Rw04, Planet Mars,\nBima Sakti',
      status: 'Sudah Selesai',
    },
  ];

  const completedCount = dataTransaksi.filter(item => item.status === 'Sudah Selesai').length;

  const stats = [
    { icon: 'ic:outline-receipt-long', label: 'Pekerjaan selesai', value: completedCount },
  ];

  const filtered = dataTransaksi.filter((v) =>
    Object.values(v).some((val) =>
      String(val).toLowerCase().includes(q.toLowerCase())
    )
  );

  const getStatusStyle = (status) => {
    if (status === 'Dalam Penjemputan') {
      return 'bg-fuchsia-100 text-fuchsia-700';
    }
    if (status === 'Sudah Selesai') {
      return 'bg-emerald-100 text-emerald-700';
    }
    return 'bg-gray-100 text-gray-700';
  };

  return (
    <div className='flex h-screen relative'>
      {/* Sidebar */}
      <aside className='w-72 bg-[#335540] text-white flex flex-col p-6 space-y-8'>
        <img src={logo} alt='Gasskuy Logo' className='w-20 h-15 ml-12.5' />
        <nav className='flex-1 flex flex-col gap-4 w-44 mt-18'>
          <button className='flex items-center gap-3 px-4 py-2 rounded-lg bg-[#4D7257] text-white'>
            <Icon icon="mage:dashboard" width="18" height="18" />
            <span className='text-white font-medium'>Dashboard</span>
          </button>
        </nav>
      </aside>

      <main className='flex-1 bg-gray-100 -ml-16 z-10 rounded-tl-2xl p-6 relative flex flex-col overflow-y-auto'>
        {/* Header */}
        <header className='flex items-center justify-between mb-6'>
          <h1 className='text-2xl font-semibold'>Dashboard</h1>
          <div className="flex items-center space-x-4 text-black">
            <Icon icon="basil:notification-outline" width="20" height="20" className="cursor-pointer hover:text-gray-800" />
            <Icon icon="weui:setting-filled" width="20" height="20" className="cursor-pointer hover:text-gray-800" />
            <Icon icon="gg:profile" width="24" height="24" className="cursor-pointer hover:text-gray-800" />
          </div>
        </header>

        {/* Konten utama */}
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
                    {['ID Transaksi', 'Penyewa', 'Kendaraan', 'No. Telp', 'Tanggal Sewa', 'Lokasi Penjemputan', 'Status'].map((h) => (
                      <th key={h} className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filtered.map((v, i) => (
                    <tr key={i} className="bg-white">
                      <td className="px-6 py-4 text-sm text-gray-800">{v.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-800">{v.renter}</td>
                      <td className="px-6 py-4 text-sm text-gray-800">{v.vehicle}</td>
                      <td className="px-6 py-4 text-sm text-gray-800">{v.phone}</td>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-pre-line">{v.rentDate}</td>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-pre-line">{v.pickUp}</td>
                      <td className="px-6 py-4 text-sm">
                      <span
                        className={`inline-block max-w-[110px] px-3 py-1 rounded-md text-xs font-semibold break-words text-center ${getStatusStyle(v.status)}`}
                      >
                        {v.status}
                      </span>

                      </td>
                    </tr>
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
      </main>
    </div>
  );
};

export default Driver;
