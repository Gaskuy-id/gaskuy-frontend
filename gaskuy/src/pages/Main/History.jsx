import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import api from '../../utils/api'; // Pastikan path-nya sesuai

const History = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get('/customer/history');
        console.log(res)
        const result = res.data.data.map((order) => {
          const startDate = new Date(order.startedAt);
          const endDate = new Date(order.finishedAt);

          // Format tanggal & jam
          const formatDate = (date) =>
            date.toLocaleDateString('id-ID', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            });

          const formatTime = (date) =>
            date.toLocaleTimeString('id-ID', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            });

          // Durasi dalam hari, jam, menit
          const getDuration = (start, end) => {
            const diffMs = end - start;
            const diffMinutes = Math.floor(diffMs / (1000 * 60));
            const days = Math.floor(diffMinutes / (60 * 24));
            const hours = Math.floor((diffMinutes % (60 * 24)) / 60);
            const minutes = diffMinutes % 60;

            return `${days > 0 ? `${days}d ` : ''}${hours}h ${minutes}m`;
          };

          return {
            id: order._id,
            vehicle: order.vehicleId?.name || 'Nama kendaraan tidak ditemukan',
            imageSrc: order.vehicleId?.mainImage || '/images/default.png',
            startDate: formatDate(startDate),
            startTime: formatTime(startDate),
            endDate: formatDate(endDate),
            endTime: formatTime(endDate),
            code: order.transactionId,
            name: order.ordererName,
            phone: order.ordererPhone,
            email: order.ordererEmail,
            pickup: order.locationStart,
            return: order.locationEnd,
            duration: getDuration(startDate, endDate),
            total: order.amount || 0,
          };
        });

        setOrders(result);
      } catch (error) {
        console.error('Gagal memuat riwayat:', error);
      }
    };

    fetchHistory();
  }, []);

  return (
    <Layout>
      <section className="w-full bg-white text-black font-poppins py-10 px-4 md:px-0">
        <div className="mx-auto max-w-[1080px] space-y-6">
          <div className="text-center">
            <h1 className="text-3xl md:text-[39px] font-semibold">Riwayat Transaksi</h1>
          </div>

          <div className="bg-white rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] px-6 py-6 space-y-6 mt-8">
            <h2 className="text-[25px] font-bold mb-4">Daftar Pesanan</h2>

            <div className="grid gap-6">
              {orders.length === 0 ? (
                <p className="text-center text-gray-500">Belum ada riwayat transaksi.</p>
              ) : (
                orders.map((order) => (
                  <div key={order.id} className="border rounded-2xl p-4 shadow-md space-y-4">
                    <div className="grid grid-cols-12 gap-4 items-start">
                      <div className="col-span-12 md:col-span-3">
                        <img
                          src={order.imageSrc}
                          alt={order.vehicle}
                          className="w-full h-full object-cover rounded-xl"
                        />
                      </div>

                      <div className="col-span-12 md:col-span-3 space-y-2">
                        <h3 className="text-[18px] font-semibold">{order.vehicle}</h3>

                        <div className="relative mb-1">
                          <div className="flex justify-between text-sm mb-1">
                            <span>{order.startDate}</span>
                            <span>{order.endDate}</span>
                          </div>

                          <div className="flex items-center">
                            <div className="w-4 h-4 border-2 border-gray-400 rounded-full bg-white z-10"></div>
                            <div className="flex-1 h-[1px] border-t border-dashed border-gray-400 relative">
                              <div className="absolute left-1/2 -translate-x-1/2 -top-[6px] w-3 h-3 bg-[#AAEEC5] rounded-full z-10"></div>
                              <div className="absolute left-1/2 -translate-x-1/2 top-4 text-[11px] text-gray-500 whitespace-nowrap">
                                {order.duration}
                              </div>
                            </div>
                            <div className="w-4 h-4 bg-[#AAEEC5] rounded-full z-10"></div>
                          </div>
                        </div>

                        <div className="flex justify-between text-sm text-gray-600 mt-1">
                          <span>{order.startTime}</span>
                          <span>{order.endTime}</span>
                        </div>
                      </div>

                      <div className="col-span-12 md:col-span-5 border-l pl-4 text-sm space-y-2">
                        <p className="font-semibold text-left">
                          Kode Pemesanan: <span className="font-bold">{order.code}</span>
                        </p>

                        <div className="grid grid-cols-2 gap-25 mt-2">
                          <div>
                            <p className="font-semibold">Data Pemesan</p>
                            <p>{order.name}</p>
                            <p>{order.phone}</p>
                            <p>{order.email}</p>
                          </div>
                          <div>
                            <p className="font-semibold whitespace-nowrap">Tempat Pengambilan</p>
                            <p>{order.pickup}</p>
                            <p className="font-semibold mt-2 whitespace-nowrap">Tempat Pengembalian</p>
                            <p>{order.return}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center border-t pt-4 gap-3">
                      <div className="text-sm font-semibold bg-[#AAEEC5] px-4 py-2 rounded-full">
                        Total Pembayaran: <span className="font-bold">Rp. {order.total.toLocaleString('id-ID')}</span>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-4 py-1 border rounded-full text-sm hover:bg-gray-100">Batalkan</button>
                        <button className="px-4 py-1 bg-[#67F49F] text-black rounded-full text-sm hover:bg-green-600">Review</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default History;
