import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import api from '../../utils/api';
import { useNavigate } from 'react-router-dom';

const History = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [showReviewPopup, setShowReviewPopup] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get('/customer/history');
        const ordersRaw = res.data.data;

    const ordersWithPaymentStatus = await Promise.all(
      ordersRaw.map(async (order) => {
        const startDate = new Date(order.startedAt);
        const endDate = new Date(order.finishedAt);

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

        const getDuration = (start, end) => {
          const diffMs = end - start;
          const diffMinutes = Math.floor(diffMs / (1000 * 60));
          const days = Math.floor(diffMinutes / (60 * 24));
          const hours = Math.floor((diffMinutes % (60 * 24)) / 60);
          const minutes = diffMinutes % 60;
          return `${days > 0 ? `${days}d ` : ''}${hours}h ${minutes}m`;
        };

        // Cek apakah sudah dibayar
        let isPaid = false;
        try {
          const paymentRes = await api.post('/rental/checkConfirmation', {
            rentalId: order._id,
          });
          isPaid = paymentRes.data?.data === true;
        } catch (err) {
          console.warn(`Gagal cek pembayaran untuk order ${order._id}`);
        }

        // Cek apakah sudah direview (per vehicle ID)
        let isReviewed = false;
        try {
          const reviewRes = await api.get(`/vehicle/${order.vehicleId?._id || ''}/review`);
          const reviews = reviewRes.data?.data || [];

          // Jika customerId dari review ada dan cocok dengan email pemesan, anggap sudah review
          isReviewed = reviews.some(
            (r) => r.customerId?.fullName?.toLowerCase() === order.name?.toLowerCase()
          );
        } catch (err) {
          console.warn(`Gagal cek ulasan untuk vehicle ${order.vehicleId?._id}`);
        }

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
          cancel: order.cancelledAt,
          paid: isPaid,
          reviewed: isReviewed, // hasil pengecekan dari GET /vehicle/:id/review
        };
      })
    );

        setOrders(ordersWithPaymentStatus);
      } catch (error) {
        console.error('Gagal memuat riwayat:', error);
      }
    };

    fetchHistory();
  }, []);

  const handleCancel = async (id) => {
    const confirmCancel = window.confirm('Apakah kamu yakin ingin membatalkan pesanan ini?');
    if (!confirmCancel) return;

    try {
      await api.post(`/rental/${id}/cancel`);
      setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
      alert('Pesanan berhasil dibatalkan.');
    } catch (error) {
      console.error('Gagal membatalkan pesanan:', error);
      alert('Gagal membatalkan pesanan. Silakan coba lagi.');
    }
  };

  const openReviewPopup = (id) => {
    setSelectedOrderId(id);
    setShowReviewPopup(true);
    setRating(0);
    setReview('');
  };

  const closeReviewPopup = () => {
    setShowReviewPopup(false);
  };

  const submitReview = async () => {
    if (rating === 0 || review.trim() === '') {
      alert('Mohon isi rating dan ulasan sebelum submit.');
      return;
    }

    try {
      await api.post(`/rental/${selectedOrderId}/review`, { rating, review });
      alert('Ulasan berhasil dikirim!');

      // tandai order sebagai sudah di-review
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === selectedOrderId ? { ...order, reviewed: true } : order
        )
      );

      closeReviewPopup();
    } catch (error) {
      console.error('Gagal mengirim ulasan:', error);
      alert('Gagal mengirim ulasan. Coba lagi.');
    }
  };

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
                  <div
                    key={order.id}
                    className={`border rounded-2xl p-4 shadow-md space-y-4 relative ${
                      order.cancel ? 'opacity-50' : ''
                    }`}
                  >
                    {order.cancel && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-3 py-1 rounded-full z-10">
                        Dibatalkan
                      </div>
                    )}

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

                        <div className="flex flex-col md:flex-row justify-between gap-8 mt-2">
                          <div className="flex-1">
                            <p className="font-semibold">Data Pemesan</p>
                            <p>{order.name}</p>
                            <p>{order.phone}</p>
                            <p>{order.email}</p>
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold whitespace-nowrap">Tempat Pengambilan</p>
                            <p className="whitespace-nowrap">{order.pickup}</p>
                            <p className="font-semibold mt-2 whitespace-nowrap">Tempat Pengembalian</p>
                            <p className="whitespace-nowrap overflow-auto">{order.return}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center border-t pt-4 gap-3">
                      <div className="text-sm font-semibold bg-[#AAEEC5] px-4 py-2 rounded-full">
                        Total Pembayaran: <span className="font-bold">Rp. {order.total.toLocaleString('id-ID')}</span>
                      </div>
                        <div className="flex gap-2">
                          {!order.paid ? (
                            <>
                              <button
                                onClick={() => handleCancel(order.id)}
                                className={`px-4 py-1 border border-green-500 rounded-full text-sm ${
                                  order.cancel ? 'cursor-not-allowed bg-gray-200 text-gray-500' : 'hover:bg-gray-200'
                                }`}
                                disabled={!!order.cancel}
                              >
                                Batalkan
                              </button>

                              <button
                                onClick={() =>
                                  !order.cancel &&
                                  navigate('/payment', {
                                    state: {
                                      rentalId: order.id,
                                      amount: order.total,
                                      transactionId: order.code,
                                    },
                                  })
                                }
                                className={`px-4 py-1 rounded-full text-sm ${
                                  order.cancel
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'bg-[#67F49F] text-black hover:bg-green-600'
                                }`}
                                disabled={!!order.cancel}
                              >
                                Bayar
                              </button>
                            </>
                          ) : !order.reviewed ? (
                            <button
                              onClick={() => openReviewPopup(order.id)}
                              className="px-4 py-1 bg-[#67F49F] text-black rounded-full text-sm hover:bg-green-600"
                            >
                              Review
                            </button>
                          ) : (
                            <button
                              className="px-4 py-1 bg-gray-300 text-gray-600 rounded-full text-sm cursor-not-allowed"
                              disabled
                            >
                              Sudah Diulas
                            </button>
                          )}
                        </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {showReviewPopup && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg relative">
            <button
              onClick={closeReviewPopup}
              className="absolute top-2 right-4 text-xl font-medium"
            >
              ×
            </button>
            <h2 className="text-xl font-bold text-center mb-1">Beri Ulasan</h2>
            <p className="text-sm text-center text-gray-600 mb-4">review dari anda sangat berharga bagi kami</p>

            <div className="flex justify-center mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => setRating(star)}
                  className={`text-3xl cursor-pointer ${star <= rating ? 'text-yellow-400' : 'text-gray-400'}`}
                >
                  ★
                </span>
              ))}
            </div>

            <textarea
              className="w-full p-4 rounded-md border border-gray-400 bg-[#ECFFE8] text-black"
              rows={5}
              placeholder="Tulis ulasanmu di sini..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
            ></textarea>

            <div className="flex justify-center mt-4">
              <button
                onClick={submitReview}
                className={`px-6 py-2 rounded-xl text-white ${
                  rating > 0 && review.trim() !== ''
                    ? 'bg-[#2A7041] hover:bg-green-600'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
                disabled={rating === 0 || review.trim() === ''}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default History;
