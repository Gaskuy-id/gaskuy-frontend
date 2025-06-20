import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import LayoutBooking from "../../components/Layout/LayoutBooking";
import jalanan from "../../assets/images/jalanan.png";
import { Icon } from "@iconify/react";
import API from "../../utils/api";

const BookPage = () => {
  const navigate = useNavigate();
  const { type } = useParams();
  const location = useLocation();
  const car = location.state?.car;

  const bookingForm = JSON.parse(localStorage.getItem("bookingForm")) || {};
  const withDriver = (bookingForm?.tipeLayanan || type) === "dengan";

  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  const [startDate, setStartDate] = useState(bookingForm?.tanggalMulai || "Tanggal Mulai");
  const [endDate, setEndDate] = useState(bookingForm?.tanggalSelesai || "Tanggal Selesai");
  const [startTime, setStartTime] = useState(bookingForm?.waktuMulai || "Waktu Mulai");
  const [endTime, setEndTime] = useState(bookingForm?.waktuSelesai || "Waktu Selesai");
  const [durationFullText, setDurationFullText] = useState("");


  const calculateDuration = (start, end) => {
    const [sh, sm] = start.split(':').map(Number);
    const [eh, em] = end.split(':').map(Number);
    let totalMinutes = (eh * 60 + em) - (sh * 60 + sm);
    if (totalMinutes < 0) totalMinutes += 1440;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}j ${minutes}m`;
  };

  const calculateDurationText = (startDate, startTime, endDate, endTime) => {
  const start = new Date(`${startDate}T${startTime}`);
  const end = new Date(`${endDate}T${endTime}`);
  const diffMs = end - start;

  const totalMinutes = Math.floor(diffMs / 60000);
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;

  return `${days > 0 ? `${days}h ` : ''}${hours}j ${minutes}m`;
};

  const formatTanggal = (tanggalString) => {
    if (!tanggalString || tanggalString === "Tanggal Mulai" || tanggalString === "Tanggal Selesai") return tanggalString;

    const bulanIndo = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    const [tahun, bulan, hari] = tanggalString.split("-");
    return `${parseInt(hari)} ${bulanIndo[parseInt(bulan) - 1]} ${tahun}`;
  };

  // Fungsi untuk menghitung selisih waktu dalam jam (dari tanggal & waktu)
  const calculateTotalHours = () => {
    const start = new Date(`${startDate}T${startTime}`);
    const end = new Date(`${endDate}T${endTime}`);
    const diffInMs = end - start;
    const diffInHours = diffInMs / (1000 * 60 * 60);
    return Math.max(diffInHours, 0); // menghindari hasil negatif
  };

  const calculateTotalPayment = () => {
    const totalHours = calculateTotalHours();
    return car?.pricePerHour ? car.pricePerHour * totalHours : 0;
  };

  const [duration, setDuration] = useState(calculateDuration(startTime, endTime));
  const [paymentAmount, setPaymentAmount] = useState("");

  const [pickupLocation, setPickupLocation] = useState(
    withDriver ? "" : "Kantor Rental Solo"
  );
  const [returnLocation, setReturnLocation] = useState(
    withDriver ? "" : "Kantor Rental Solo"
  );

  useEffect(() => {
  if (startDate && startTime && endDate && endTime) {
    setDuration(calculateDuration(startTime, endTime));
    setDurationFullText(calculateDurationText(startDate, startTime, endDate, endTime));
    const total = calculateTotalPayment();
    setPaymentAmount(`Rp. ${total.toLocaleString("id-ID")}`);
  }
    }, [startDate, startTime, endDate, endTime, car]);

    const handleBookingSubmit = async () => {
      if (!car?.id) {
        alert("ID kendaraan tidak ditemukan.");
        return;
      }

      const payload = {
        withDriver,
        ordererName: fullName,
        ordererPhone: phoneNumber,
        ordererEmail: email,
        startedAt: `${startDate}, ${startTime}`,
        locationStart: pickupLocation,
        finishedAt: `${endDate}, ${endTime}`,
        locationEnd: returnLocation,
        note: notes
      };

      try {
        const response = await API.post(`/vehicles/${car.id}/checkout`, payload);

        console.log("Booking berhasil:", response.data);
        navigate('/payment');
      } catch (error) {
        console.error("Gagal memesan:", error);
        alert("Booking gagal. Pastikan data sudah benar dan coba lagi.");
      }
    };

  return (
    <LayoutBooking>
      <div className="min-h-screen flex flex-col items-center">
        <div className="mt-10 text-center">
          <h1 className="text-[52px] font-semibold mb-3">Detail Pemesanan</h1>
          <p className="text-[28px] font-normal mb-8">Segera isikan datamu agar sat-set langsung berangkat!</p>
          <div className="flex items-center justify-center mb-10">
            <div className="flex items-center space-x-2">
              <div className="w-[69px] h-[69px] rounded-full border-4 border-[#59A618] text-[32px] font-semibold flex items-center justify-center">1</div>
              <span className="text-[32px] font-semibold ml-4">Book</span>
            </div>
            <div className="w-[265px] h-1 bg-gray-300 mx-2" />
            <div className="flex items-center space-x-2">
              <div className="w-[69px] h-[69px] rounded-full border-4 border-gray-300 text-[32px] font-semibold flex items-center justify-center text-gray-300">2</div>
              <span className="text-[32px] font-semibold ml-4 text-gray-300">Payment</span>
            </div>
            <div className="w-[265px] h-1 bg-gray-300 mx-2" />
            <div className="flex items-center space-x-2">
              <div className="w-[69px] h-[69px] rounded-full border-4 border-gray-300 text-[32px] font-semibold flex items-center justify-center text-gray-300">3</div>
              <span className="text-[32px] font-semibold ml-4 text-gray-300 ">Done</span>
            </div>
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto p-5 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-14">
            <div className="col-span-2 border rounded-3xl p-4 border-[#ACACAC]">
              <h2 className="text-[25px] font-bold mb-2">Detail <span className="bg-[linear-gradient(to_bottom,transparent_50%,#AAEEC4_50%)]">Pemesanan</span></h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <h3 className="text-[20px] font-semibold mb-1">Data Pemesan</h3>
                  <div className="mb-2">
                    <label className="block text-[15px] font-light">Nama Lengkap<span className="text-[#FF0000]">*</span></label>
                    <input type="text" className="w-full border-b border-gray-400 focus:outline-none py-1" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                  </div>
                  <div className="mb-2">
                    <label className="block text-[15px] font-light">Nomor Handphone<span className="text-[#FF0000]">*</span></label>
                    <input type="text" className="w-full border-b border-gray-400 focus:outline-none py-1" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                  </div>
                  <div className="mb-2">
                    <label className="block text-[15px] font-light">E-mail<span className="text-[#FF0000]">*</span></label>
                    <input type="email" className="w-full border-b border-gray-400 focus:outline-none py-1" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                </div>

                <div>
                  <h3 className="text-[20px] font-semibold mb-1">Lokasi Pemesanan</h3>
                  <div className="mb-2">
                    <label className="block text-[15px] font-light">{withDriver ? "Lokasi Penjemputan" : "Lokasi Pengambilan"}<span className="text-[#FF0000]">*</span></label>
                    {withDriver ? (
                      <input type="text" className="w-full border-b border-gray-400 focus:outline-none py-1" value={pickupLocation} onChange={(e) => setPickupLocation(e.target.value)} />
                    ) : (
                      <p className="text-[15px] border-b border-gray-400 py-1">📍 {pickupLocation}</p>
                    )}
                    <p className="text-[7px] mt-[2px] text-[#7D7878] font-bold">
                      *Penyewaan kendaraan non-driver wajib mengambil kendaraan di kantor rental
                    </p>
                  </div>

                  <div className="mb-2">
                    <label className="block text-[15px] font-light">{withDriver ? "Lokasi Pengantaran Pulang" : "Lokasi Pengembalian"}<span className="text-[#FF0000]">*</span></label>
                    {withDriver ? (
                      <input type="text" className="w-full border-b border-gray-400 focus:outline-none py-1" value={returnLocation} onChange={(e) => setReturnLocation(e.target.value)} />
                    ) : (
                      <p className="text-[15px] border-b border-gray-400 py-1">📍 {returnLocation}</p>
                    )}
                    <p className="text-[7px] mt-[2px] text-[#7D7878] font-bold">
                      *Penyewaan kendaraan non-driver wajib mengambil kendaraan di kantor rental
                    </p>
                  </div>

                  <div className="mb-2">
                    <label className="block text-[15px] font-light">Catatan</label>
                    <textarea className="w-full border border-[#ACACAC] rounded-lg p-2 text-sm" rows="2" value={notes} onChange={(e) => setNotes(e.target.value)}></textarea>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-[460px] border border-[#ACACAC] rounded-3xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-[22px] font-bold">{car?.title}</h2>
                <p className="text-[18px] font-extralight">{withDriver ? "Dengan Supir" : "Tanpa Supir"}</p>
              </div>

              <div className="flex flex-col mb-6">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-[15px] font-normal">{formatTanggal(startDate)}</p>
                  <p className="text-[15px] font-normal">{formatTanggal(endDate)}</p>
                </div>
                <div className="relative flex items-center justify-between mb-2">
                  <div className="w-[19px] h-[19px] border-2 border-[#ACACAC] rounded-full bg-white"></div>
                  <div className="relative flex-1 mx-2 h-[1px] border-t border-dashed border-[#ACACAC]">
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[10px] h-[10px] bg-[#AAEEC5] rounded-full"></div>
                  </div>
                  <div className="w-[19px] h-[19px] bg-[#AAEEC5] rounded-full"></div>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-[14px] font-normal">{startTime}</p>
                  <p className="text-[10px] text-[#ACACAC] text-center">{durationFullText}</p>
                  <p className="text-[14px] font-normal">{endTime}</p>
                </div>
              </div>

              <div className="flex justify-between items-center mb-10">
                <div>
                  <p className="text-[20px] font-bold">Jumlah Pembayaran</p>
                  <p className="text-[8px] font-bold text-[#7D7878]">*Sudah termasuk pajak</p>
                </div>
                <p className="text-[20px] font-bold text-[#00B496]">{paymentAmount}</p>
              </div>
              <button
                onClick={handleBookingSubmit}
                className="w-full bg-[#AAEEC4] text-black py-3 rounded-full font-semibold hover:bg-black hover:text-white transition"
              >
                Bayar
              </button>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-center py-6 px-4 max-w-[1300px] ml-1">
          <div className="flex items-center bg-[#E8F7F5] rounded-3xl p-4 max-w w-full">
            <Icon icon="game-icons:city-car" width="47" height="47" className="text-[#00B496] mr-2 scale-x-[-1]" />
            <p className="text-[#6F585A] font-normal text-[15px] ml-2">
              Perjalanan makin asik bareng Gaskuy! Tanpa ribet, tanpa drama—langsung gas ke tujuan dengan nyaman. 
              Kemana pun, kapan pun, tinggal booking. Yuk, buat setiap perjalanan jadi pengalaman seru bareng Gaskuy! 
              <span className="mx-1">🚗💨</span> <span className="text-[#6F585A] font-bold text-[15px]">#LangsungGas</span>
            </p>
          </div>
        </div>

        <div className='flex justify-center'>
          <img src={jalanan} alt="Login Illustration" className='w-full max-w-[1920px] h-auto' />
        </div>
      </div>
    </LayoutBooking>
  );
};

export default BookPage;
