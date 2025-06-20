import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LayoutBooking from "../../components/Layout/LayoutBooking";
import jalanan from "../../assets/images/jalanan.png";
import { Icon } from "@iconify/react";

const BookDriver = () => {
  const navigate = useNavigate(); 

  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [returnLocation, setReturnLocation] = useState("");

  const [startDate, setStartDate] = useState("14 Februari 2025");
  const [endDate, setEndDate] = useState("15 Februari 2025");
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("11:15");
  const [duration, setDuration] = useState("25j 15m");
  const [paymentAmount, setPaymentAmount] = useState("Rp. 300.000");

  return (
    <LayoutBooking>
      <div className="min-h-screen flex flex-col items-center">
        {/* Progress */}
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

        <div className="max-w-[1200px] mx-auto p-5 bg-white"> {/* ml-27 hilangkan */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-14">
            {/* Bagian Detail Pemesanan */}
            <div className="col-span-2 border rounded-3xl p-4 border-[#ACACAC]">
              <h2 className="text-[25px] font-bold mb-2">
                Detail <span className="bg-[linear-gradient(to_bottom,transparent_50%,#AAEEC4_50%)]">Pemesanan</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Data Pemesan */}
                <div>
                  <h3 className="text-[20px] font-semibold mb-1">Data Pemesan</h3>
                  <div className="mb-2">
                    <label className="block text-[15px] font-light">
                      Nama Lengkap<span className="text-[#FF0000]">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full border-b border-gray-400 focus:outline-none py-1"
                      placeholder="Uchihawarizz-me"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block text-[15px] font-light">
                      Nomor Handphone<span className="text-[#FF0000]">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full border-b border-gray-400 focus:outline-none py-1"
                      placeholder="088287777875"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block text-[15px] font-light">
                      E-mail<span className="text-[#FF0000]">*</span>
                    </label>
                    <input
                      type="email"
                      className="w-full border-b border-gray-400 focus:outline-none py-1"
                      placeholder="rizz-me@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                {/* Lokasi Pemesanan */}
                <div>
                  <h3 className="text-[20px] font-semibold mb-1">Lokasi Pemesanan</h3>
                  <div className="mb-[1px]">
                    <label className="block text-[15px] font-light">
                      Lokasi Penjemputan<span className="text-[#FF0000]">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full border-b border-gray-400 focus:outline-none py-1"
                      placeholder="Lokasi Anda untuk dijemput"
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                    />
                    <p className="text-[7px] mt-[2px] text-[#7D7878] font-bold">
                      *Penyewaan kendaraan non-driver wajib mengambil kendaraan di kantor rental
                    </p>
                  </div>
                  <div className="mb-2">
                    <label className="block text-[15px] font-light">
                      Lokasi Pengantaran Pulang<span className="text-[#FF0000]">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full border-b border-gray-400 focus:outline-none py-1"
                      placeholder="Lokasi Anda untuk pulang"
                      value={returnLocation}
                      onChange={(e) => setReturnLocation(e.target.value)}
                    />
                    <p className="text-[7px] mt-[2px] text-[#7D7878] font-bold">
                      *Penyewaan kendaraan non-driver wajib mengambil kendaraan di kantor rental
                    </p>
                  </div>
                  <div className="mb-2">
                    <label className="block text-[15px] font-light">Catatan</label>
                    <textarea
                      className="w-full border border-[#ACACAC] rounded-lg p-2 text-sm"
                      rows="2"
                      placeholder="Kemungkinan saya telat 10 menit yaa"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            {/* Bagian Ringkasan Pemesanan */}
            <div className="w-[460px] border border-[#ACACAC] rounded-3xl p-6">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-[22px] font-bold">Toyota Kijang Innova</h2>
                <p className="text-[18px] font-extralight">Dengan Supir</p>
              </div>

              {/* Tanggal, Bulatan, Jam dan Durasi */}
              <div className="flex flex-col mb-6">
                
                {/* Baris 1 - Tanggal */}
                <div className="flex justify-between items-center mb-2">
                  <p className="text-[15px] font-normal">{startDate}</p>
                  <p className="text-[15px] font-normal">{endDate}</p>
                </div>

                {/* Baris 2 - Bulatan dan Garis */}
                <div className="relative flex items-center justify-between mb-2">
                  {/* Bulatan Kiri */}
                  <div className="w-[19px] h-[19px] border-2 border-[#ACACAC] rounded-full bg-white"></div>

                  {/* Garis dan Titik Tengah */}
                  <div className="relative flex-1 mx-2 h-[1px] border-t border-dashed border-[#ACACAC]">
                    {/* Titik Tengah */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[10px] h-[10px] bg-[#AAEEC5] rounded-full"></div>
                  </div>

                  {/* Bulatan Kanan */}
                  <div className="w-[19px] h-[19px] bg-[#AAEEC5] rounded-full"></div>
                </div>

                {/* Baris 3 - Jam dan Durasi */}
                <div className="flex justify-between items-center">
                  <p className="text-[14px] font-normal">{startTime}</p>
                  <p className="text-[10px] text-[#ACACAC] text-center">{duration}</p>
                  <p className="text-[14px] font-normal text-right">{endTime}</p>
                </div>

              </div>

              {/* Jumlah Pembayaran */}
              <div className="flex justify-between items-center mb-10">
                <div>
                  <p className="text-[20px] font-bold">Jumlah Pembayaran</p>
                  <p className="text-[8px] font-bold text-[#7D7878]">*Sudah termasuk pajak</p>
                </div>
                <p className="text-[20px] font-bold text-[#00B496]">{paymentAmount}</p>
              </div>

              {/* Tombol Bayar */}
              <button onClick={() => navigate('/payment')} className="w-full bg-[#AAEEC4] text-black py-3 rounded-full font-semibold hover:bg-black hover:text-white transition">
                Bayar
              </button>
            </div>
          </div>
        </div>

            {/* Bagian Pemberitahuan */}
            <div className="w-full flex justify-center py-6 px-4 max-w-[1300px] ml-1">
              <div className="flex items-center bg-[#E8F7F5] rounded-3xl p-4 max-w w-full">
                <Icon
                  icon="game-icons:city-car"
                  width="47"
                  height="47"
                  className="text-[#00B496] mr-2 scale-x-[-1]"
                />
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
  )
}

export default BookDriver
