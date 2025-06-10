import React from 'react'
import Layout from '../../components/Layout/Layout'

const dummyOrders = [
  {
    id: 1,
    imageSrc: '/images/civic.png',
    vehicle: 'Honda Civic Type R 6 M/T',
    startDate: '14 Februari 2025',
    startTime: '10.00',
    endDate: '15 Februari 2025',
    endTime: '11.15',
    code: 'ABC123',
    name: 'Dhiya Ulhaq',
    phone: '082287717877',
    email: 'ulhaqq@gmail.com',
    pickup: 'Kantor Rental Solo',
    return: 'Kantor Rental Solo',
    total: 300000
  },
    {
    id: 1,
    imageSrc: '/images/accord.png',
    vehicle: 'Accord',
    startDate: '17 Februari 2025',
    startTime: '12.00',
    endDate: '18 Februari 2025',
    endTime: '11.15',
    code: 'ABC123',
    name: 'Faqih jahad',
    phone: '082287717877',
    email: 'faqih@gmail.com',
    pickup: 'Kantor Rental Solo',
    return: 'Kantor Rental Solo',
    total: 300000
  }
]

const History = () => {
  const getDuration = (startDate, startTime, endDate, endTime) => {
    const start = new Date(`${startDate} ${startTime}`);
    const end = new Date(`${endDate} ${endTime}`);
    const diffMs = end - start;

    if (isNaN(diffMs)) return '';
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const days = Math.floor(diffHours / 24);
    const hours = diffHours % 24;
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    return `${days > 0 ? `${days}j ` : ''}${hours}j ${minutes}m`;
  };

  return (
    <Layout>
      <section className="w-full bg-white text-black font-poppins py-10 px-4 md:px-0">
        <div className="mx-auto max-w-[1080px] space-y-6">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl md:text-[39px] font-semibold">Riwayat Transaksi</h1>
          </div>

          {/* Container Daftar Pesanan */}
          <div className="bg-white rounded-3xl shadow-xl px-6 py-6 space-y-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-[25px] font-bold">Daftar Pesanan</h2>
              <button className="flex items-center gap-2 border px-3 py-1 rounded-full text-sm hover:bg-gray-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h18M4 10h16M4 16h10" />
                </svg>
                Filter Riwayat Transaksi
              </button>
            </div>

            {/* Grid Card Pesanan */}
            <div className="grid gap-6">
              {dummyOrders.map((order) => {
                const duration = getDuration(order.startDate, order.startTime, order.endDate, order.endTime);

                return (
                  <div key={order.id} className="border rounded-2xl p-4 flex flex-col md:flex-row gap-4 shadow-sm">
                    {/* Gambar Mobil */}
                    <img
                      src={order.imageSrc}
                      alt={order.title}
                      className="w-full md:w-[240px] md:h-[150px] object-cover rounded-xl"
                    />

                    {/* Info Mobil + Timeline */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="text-[18px] font-semibold">{order.title}</h3>
                        <div className="text-right">
                          <p className="text-sm font-semibold">Kode Pemesanan: {order.code}</p>
                        </div>
                      </div>

                      {/* Timeline */}
                      <div className="my-2">
                        <div className="flex justify-between text-sm">
                          <p>{order.startDate}</p>
                          <p>{order.endDate}</p>
                        </div>
                        <div className="relative flex items-center my-1">
                          <div className="w-[16px] h-[16px] border border-gray-400 rounded-full bg-white z-10"></div>
                          <div className="flex-1 h-[1px] border-t border-dashed border-gray-400 mx-1 relative">
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[8px] h-[8px] bg-[#AAEEC5] rounded-full"></div>
                          </div>
                          <div className="w-[16px] h-[16px] bg-[#AAEEC5] rounded-full z-10"></div>
                        </div>
                        <div className="flex justify-between text-xs">
                          <p>{order.startTime}</p>
                          <p className="text-gray-500 text-[10px]">{duration}</p>
                          <p>{order.endTime}</p>
                        </div>
                      </div>

                      {/* Info Pemesan */}
                      <div className="grid grid-cols-2 gap-2 text-sm mt-4">
                        <div>
                          <p className="font-semibold">Data Pemesan</p>
                          <p>{order.name}</p>
                          <p>{order.phone}</p>
                          <p>{order.email}</p>
                        </div>
                        <div>
                          <p className="font-semibold">Tempat Pengambilan</p>
                          <p>{order.pickup}</p>
                          <p className="font-semibold mt-2">Tempat Pengembalian</p>
                          <p>{order.return}</p>
                        </div>
                      </div>
                    </div>

                    {/* Total + Aksi */}
                    <div className="flex flex-col justify-between items-end">
                      <div className="bg-[#AAEEC5] text-sm font-bold py-1 px-4 rounded-full">
                        Rp {order.total.toLocaleString('id-ID')}
                      </div>
                      <div className="mt-3 flex gap-2">
                        <button className="px-4 py-1 border rounded-full text-sm hover:bg-gray-100">Batalkan</button>
                        <button className="px-4 py-1 bg-[#67F49F] text-black rounded-full text-sm hover:bg-green-600">
                          Review
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default History