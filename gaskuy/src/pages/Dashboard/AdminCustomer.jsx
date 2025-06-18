import React, { useState, useEffect } from 'react';
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

const formatTanggal = (tanggal) => {
  const d = new Date(tanggal);
  const tgl = String(d.getDate()).padStart(2, '0');
  const bln = String(d.getMonth() + 1).padStart(2, '0');
  const thn = d.getFullYear();
  const jam = String(d.getHours()).padStart(2, '0');
  const menit = String(d.getMinutes()).padStart(2, '0');
  return `${tgl}/${bln}/${thn} - ${jam}:${menit}`;
};

const AdminCustomer = () => {
  const [q, setQ] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const [data, setData] = useState([]);
  const [errorDetails, setErrorDetails] = useState(null);

  const [stats, setStats] = useState([
    { icon: 'ic:outline-people-alt', label: 'Total Customer', value: 0 },
    { icon: 'ic:outline-receipt-long', label: 'Total Transaksi', value: 0 },
    { icon: 'ic:round-person-pin', label: 'Customer Aktif', value: 0 },
  ]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await api.get('/cms/users/role/customer');
        const users = res.data.data;

        const withDetails = await Promise.all(
          users.map(async (user) => {
            try {
              const rentalRes = await api.get(`/cms/rentals?customerId=${user._id}`);
              const rentals = rentalRes.data.data.map((r) => ({
                id: r.transactionId,
                vehicle: r.vehicleId?.name || 'Tidak tersedia',
                driver: r.driverId?.fullName || 'Tidak tersedia',
                start: formatTanggal(r.startedAt),
                end: formatTanggal(r.finishedAt),
                price: `Rp${r.amount.toLocaleString('id-ID')}`,
              }));
              return {
                ...user,
                details: rentals,
                transactions: rentals.length,
              };
            } catch (err) {
              console.error(`Gagal memuat transaksi untuk customer ${user._id}`, err);
              return {
                ...user,
                details: [],
                transactions: 0,
              };
            }
          })
        );

        const totalCustomer = withDetails.length;
        const totalTransaksi = withDetails.reduce((sum, user) => sum + user.transactions, 0);
        const customerAktif = withDetails.filter((user) => user.transactions > 0).length;

        setStats([
          { icon: 'ic:outline-people-alt', label: 'Total Customer', value: totalCustomer },
          { icon: 'ic:outline-receipt-long', label: 'Total Transaksi', value: totalTransaksi },
          { icon: 'ic:round-person-pin', label: 'Customer Aktif', value: customerAktif },
        ]);

        setData(withDetails);
      } catch (err) {
        console.error('Gagal memuat data customer:', err);
      }
    };

    fetchCustomers();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Yakin ingin menghapus customer ini?');
    if (!confirmDelete) return;

    try {
      await api.delete(`/cms/users/${id}`);
      const updated = data.filter((user) => String(user.id) !== String(id));
      const totalCustomer = updated.length;
      const totalTransaksi = updated.reduce((sum, user) => sum + (user.transactions || 0), 0);
      const customerAktif = updated.filter((user) => (user.transactions || 0) > 0).length;

      setStats([
        { icon: 'ic:outline-people-alt', label: 'Total Customer', value: totalCustomer },
        { icon: 'ic:outline-receipt-long', label: 'Total Transaksi', value: totalTransaksi },
        { icon: 'ic:round-person-pin', label: 'Customer Aktif', value: customerAktif },
      ]);

      setData(updated);
    } catch (error) {
      console.error('Gagal menghapus customer:', error);
    }
  };

  const toggleDetail = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const filtered = data.filter((v) =>
    Object.values(v).some((val) =>
      String(val).toLowerCase().includes(q.toLowerCase())
    )
  );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <CardStat key={index} icon={stat.icon} label={stat.label} value={stat.value} />
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
            <Icon icon="ic:outline-search" width="20" height="20" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <div className="flex-1 overflow-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
            <thead className="bg-white">
              <tr className="bg-[#D9D9D9]/20">
                {['Nama', 'Email', 'No Telp', 'Alamat', 'Transaksi', 'Aksi'].map((h) => (
                  <th key={h} className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filtered.map((v) => (
                <React.Fragment key={v._id}>
                  <tr className="bg-white">
                    <td className="px-6 py-4 text-sm text-gray-800">{v.fullName}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{v.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{v.phoneNumber}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{v.address}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{v.transactions}</td>
                    <td className="px-6 py-4 flex space-x-4">
                      <button
                        onClick={() => toggleDetail(v._id)}
                        className="flex items-center justify-center w-8 h-8 rounded hover:bg-gray-100"
                      >
                        <Icon
                          icon={String(expandedId) === String(v._id) ? 'mdi:chevron-up' : 'mdi:chevron-down'}
                          width="20"
                          height="20"
                          className="text-blue-600"
                        />
                      </button>
                      <button
                        onClick={() => handleDelete(v._id)}
                        className="flex items-center justify-center w-8 h-8 rounded hover:bg-gray-100"
                      >
                        <Icon icon="mdi:delete" width="20" height="20" className="text-red-600" />
                      </button>
                    </td>
                  </tr>

                  {String(expandedId) === String(v._id) && (
                    <tr>
                      <td colSpan={7} className="px-6 py-4 bg-gray-50">
                        <div className="rounded-lg p-4">
                          {errorDetails ? (
                            <div className="text-red-500 text-sm">{errorDetails}</div>
                          ) : v.details.length > 0 ? (
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
