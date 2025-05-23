import React, { useState } from 'react';
import { Icon } from '@iconify/react';

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

const AdminCustomer = () => {
  const [q, setQ] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  const stats = [
    { icon: 'ic:outline-receipt-long', label: 'Total Transaksi', value: 0 },
    { icon: 'ic:outline-people-alt', label: 'Total Customer', value: 0 },
    { icon: 'ic:baseline-sync', label: 'Transaksi Proses', value: 0 },
    { icon: 'ic:round-person-pin', label: 'Customer Aktif', value: 0 },
  ];

  const data = [
    {
      id: 1,
      name: 'Dhiya Ulhaq',
      email: 'dhiya@example.com',
      phone: '081234567890',
      birthDate: '2000-01-01',
      address: 'Surakarta',
      transactions: 12,
      details: [
        {
          id: 'ABC123',
          vehicle: 'Burak Gus Faqih',
          driver: 'Alamojek',
          start: '15/03/2025 - 15:40',
          end: '16/03/2025 - 15:00',
          price: 'Rp500.000',
        },
        {
          id: 'XYZ456',
          vehicle: 'Burak Gus Faqih',
          driver: 'Alamojek',
          start: '18/03/2025 - 09:00',
          end: '19/03/2025 - 09:00',
          price: 'Rp500.000',
        },
      ],
    },
    {
      id: 2,
      name: 'Aspa Hitam',
      email: 'aspahitam@example.com',
      phone: '089876543210',
      birthDate: '1999-05-20',
      address: 'Yogyakarta',
      transactions: 5,
      details: [],
    },
    {
      id: 3,
      name:  'Lort Ryan',
      email: 'Lort Ryan@example.com',
      phone: '082198765432',
      birthDate: '1998-10-10',
      address: 'Bandung',
      transactions: 8,
      details: [
        {
          id: 'DEF789',
          vehicle: 'Toyota Avanza',
          driver: 'Asep Driver',
          start: '20/03/2025 - 10:00',
          end: '21/03/2025 - 10:00',
          price: 'Rp400.000',
        },
      ],
    },
    {
      id: 4,
      name: 'Bima Sakti',
      email: 'bima.sakti@example.com',
      phone: '081122334455',
      birthDate: '2001-07-15',
      address: 'Semarang',
      transactions: 3,
      details: [
        {
          id: 'GHI101',
          vehicle: 'Honda Mobilio',
          driver: 'Wira Kusuma',
          start: '01/04/2025 - 08:30',
          end: '02/04/2025 - 08:30',
          price: 'Rp350.000',
        },
        {
          id: 'JKL202',
          vehicle: 'Suzuki Ertiga',
          driver: 'Rendi Fauzan',
          start: '10/04/2025 - 13:00',
          end: '11/04/2025 - 13:00',
          price: 'Rp370.000',
        },
      ],
    },
  ];

  const filtered = data.filter((v) =>
    Object.values(v).some((val) =>
      String(val).toLowerCase().includes(q.toLowerCase())
    )
  );

  const toggleDetail = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const openModal = (type, item) => {
    console.log(`Modal ${type}`, item);
  };

  return (
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

      <div className="bg-white rounded-2xl shadow p-4 flex flex-col mt-9">
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

        <div className="flex-1 overflow-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
            <thead className="bg-white">
              <tr className="bg-[#D9D9D9]/20">
                {['Nama', 'Email', 'No Telp', 'Tanggal Lahir', 'Alamat', 'Transaksi', 'Aksi'].map((h) => (
                  <th key={h} className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filtered.map((v) => (
                <React.Fragment key={v.id}>
                  <tr className="bg-white">
                    <td className="px-6 py-4 text-sm text-gray-800">{v.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{v.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{v.phone}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{v.birthDate}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{v.address}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{v.transactions}</td>
                    <td className="px-6 py-4 flex space-x-4">
                      <button
                        onClick={() => toggleDetail(v.id)}
                        className="flex items-center justify-center w-8 h-8 rounded hover:bg-gray-100"
                      >
                        <Icon
                          icon={expandedId === v.id ? 'mdi:chevron-up' : 'mdi:chevron-down'}
                          width="20"
                          height="20"
                          className="text-blue-600"
                        />
                      </button>
                      <button
                        onClick={() => openModal('delete', v)}
                        className="flex items-center justify-center w-8 h-8 rounded hover:bg-gray-100"
                      >
                        <Icon icon="mdi:delete" width="20" height="20" className="text-red-600" />
                      </button>
                    </td>
                  </tr>

                  {expandedId === v.id && (
                    <tr>
                      <td colSpan={7} className="px-6 py-4 bg-gray-50">
                        <div className="rounded-lg p-4">
                          {v.details.length > 0 ? (
                            <table className="min-w-full text-sm">
                              <thead>
                                <tr className="bg-gray-100 text-left">
                                  <th className="px-4 py-2 font-normal">ID Transaksi</th>
                                  <th className="px-4 py-2 font-normal">Kendaraan</th>
                                  <th className="px-4 py-2 font-normal">Nama Driver</th>
                                  <th className="px-4 py-2 font-normal">Tanggal Sewa</th>
                                  <th className="px-4 py-2 font-normal">Tanggal Kembali</th>
                                  <th className="px-4 py-2 font-normal">Harga</th>
                                </tr>
                              </thead>
                              <tbody>
                                {v.details.map((d, i) => (
                                  <tr key={i} className="border-t">
                                    <td className="px-4 py-2">{d.id}</td>
                                    <td className="px-4 py-2">{d.vehicle}</td>
                                    <td className="px-4 py-2">{d.driver}</td>
                                    <td className="px-4 py-2">{d.start}</td>
                                    <td className="px-4 py-2">{d.end}</td>
                                    <td className="px-4 py-2">{d.price}</td>
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

export default AdminCustomer;
