import React from 'react'
import Layout from '../../components/Layout/Layout'

const dataOrderss = [
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
    id: 2,
    imageSrc: '/images/accord.png',
    vehicle: 'Accord',
    startDate: '17 Februari 2025',
    startTime: '12.00',
    endDate: '18 Februari 2025',
    endTime: '11.15',
    code: 'ABC124',
    name: 'Faqih Jahad',
    phone: '082287717877',
    email: 'faqih@gmail.com',
    pickup: 'Kantor Rental Solo',
    return: 'Kantor Rental Solo',
    total: 300000
  }
]

const History = () => {
  const getDuration = (startDate, startTime, endDate, endTime) => {
    // Ubah tanggal dari format "14 Februari 2025" menjadi "2025-02-14"
    const parseDate = (dateStr) => {
      const months = {
        Januari: '01', Februari: '02', Maret: '03', April: '04',
        Mei: '05', Juni: '06', Juli: '07', Agustus: '08',
        September: '09', Oktober: '10', November: '11', Desember: '12',
      };

      const [day, monthName, year] = dateStr.split(' ');
      const month = months[monthName];
      return `${year}-${month}-${day.padStart(2, '0')}`;
    };

    const startISO = `${parseDate(startDate)}T${startTime.replace('.', ':')}`;
    const endISO = `${parseDate(endDate)}T${endTime.replace('.', ':')}`;

    const start = new Date(startISO);
    const end = new Date(endISO);

    if (isNaN(start) || isNaN(end)) return '';

    const diffMs = end - start;
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const days = Math.floor(diffMinutes / (60 * 24));
    const hours = Math.floor((diffMinutes % (60 * 24)) / 60);
    const minutes = diffMinutes % 60;

    return `${days > 0 ? `${days}d ` : ''}${hours}j ${minutes}m`;
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
          <div className="bg-white rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] px-6 py-6 space-y-6 mt-8">
            <h2 className="text-[25px] font-bold mb-4">Daftar Pesanan</h2>

            {/* Grid Card Pesanan */}
            <div className="grid gap-6">
              {dataOrderss.map((order) => {
                const duration = getDuration(order.startDate, order.startTime, order.endDate, order.endTime);

                return (
                  <div key={order.id} className="border rounded-2xl p-4 shadow-md space-y-4">
                    {/* Grid utama */}
                    <div className="grid grid-cols-12 gap-4 items-start">
                      {/* Gambar Mobil */}
                      <div className="col-span-12 md:col-span-3">
                        <img
                          src={order.imageSrc}
                          alt={order.vehicle}
                          className="w-full h-full object-cover rounded-xl"
                        />
                      </div>

                      {/* Info Mobil + Timeline */}
                      <div className="col-span-12 md:col-span-5 space-y-2">
                        <h3 className="text-[18px] font-semibold">{order.vehicle}</h3>

                      {/* Tanggal + Timeline + Durasi di bawah lingkaran tengah */}
                      <div className="relative mb-1">
                        {/* Tanggal */}
                        <div className="flex justify-between text-sm mb-1">
                          <span>{order.startDate}</span>
                          <span>{order.endDate}</span>
                        </div>

                        {/* Timeline dengan titik tengah */}
                        <div className="flex items-center">
                          {/* Titik awal */}
                          <div className="w-4 h-4 border-2 border-gray-400 rounded-full bg-white z-10"></div>
                          
                          {/* Garis putus-putus */}
                          <div className="flex-1 h-[1px] border-t border-dashed border-gray-400 relative">
                            {/* Titik tengah */}
                            <div className="absolute left-1/2 -translate-x-1/2 -top-[6px] w-3 h-3 bg-[#AAEEC5] rounded-full z-10"></div>

                            {/* Durasi di bawah titik tengah */}
                            <div className="absolute left-1/2 -translate-x-1/2 top-4 text-[11px] text-gray-500 whitespace-nowrap">
                              {duration}
                            </div>
                          </div>

                          {/* Titik akhir */}
                          <div className="w-4 h-4 bg-[#AAEEC5] rounded-full z-10"></div>
                        </div>
                      </div>

                      {/* Jam Mulai & Selesai */}
                      <div className="flex justify-between text-sm text-gray-600 mt-1">
                        <span>{order.startTime}</span>
                        <span>{order.endTime}</span>
                      </div>
                      </div>

                      {/* Info Pemesan & Lokasi (dibagi 2 grid) */}
                      <div className="col-span-12 md:col-span-4 border-l pl-4 text-sm space-y-2">
                        <p className="font-semibold text-left">
                          Kode Pemesanan: <span className="font-bold">{order.code}</span>
                        </p>

                        <div className="grid grid-cols-2 gap-4 mt-2">
                          {/* Data Pemesan */}
                          <div>
                            <p className="font-semibold">Data Pemesan</p>
                            <p>{order.name}</p>
                            <p>{order.phone}</p>
                            <p>{order.email}</p>
                          </div>

                          {/* Lokasi */}
                          <div>
                            <p className="font-semibold">Tempat Pengambilan</p>
                            <p>{order.pickup}</p>
                            <p className="font-semibold mt-2">Tempat Pengembalian</p>
                            <p>{order.return}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Total & Tombol */}
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
