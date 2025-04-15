import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import headerHero from "../../assets/images/mobil.jpg";
import smallCar from "../../assets/images/smallCar.png";
import penumpang from "../../assets/images/penumpang.png";
import tanggal from "../../assets/images/tanggal.png";
import jam from "../../assets/images/jam.png";
import { Icon } from "@iconify/react";

const Home = () => {
  // State untuk field pemesanan
  const [tipeLayanan, setTipeLayanan] = useState(""); // "dengan" / "tanpa"
  const [tempatRental, setTempatRental] = useState("");
  const [jumlahPenumpang, setJumlahPenumpang] = useState("");
  const [tanggalMulai, setTanggalMulai] = useState("");
  const [waktuMulai, setWaktuMulai] = useState("");
  const [tanggalSelesai, setTanggalSelesai] = useState("");
  const [waktuSelesai, setWaktuSelesai] = useState("");

  const handleCari = () => {
    console.log("Cari Mobil!", {
      tipeLayanan,
      tempatRental,
      jumlahPenumpang,
      tanggalMulai,
      waktuMulai,
      tanggalSelesai,
      waktuSelesai,
    });
    // ini belum diimplementasiin backendnya
  };

  return (
    <Layout>
      {/* Header Home Section */}
      <section className="w-full bg-white text-[#000000] font-poppins py-8 md:py-8 px-4 md:px-0 ">
        {/* Bagian teks (judul, subjudul, icon-info) */}
        <div className="mx-auto text-center max-w-[700px]">
          <h1 className="md:text-[39px] font-semibold">Rent Our Cars Here</h1>
          <p className="text-sm md:text-[21px] text-black font-normal mb-3 mt-[-5px]">
            cepat, mudah, terpercaya, gasskuy
          </p>

          {/* Bagian ringkasan info: 100+ Mobil, 5 Cabang, 20K Users */}
          <div className="flex flex-col gap-4 md:flex-row justify-center items-center mb-2.5">
            {/* 100+ Mobil */}
            <div className="flex items-center">
              <img
                src={smallCar}
                width="30"
                height="30"
                className="mr-1"
                alt="Small Car"
              />
              <p className="text-xs md:text-sm font-medium">100+ Mobil</p>
            </div>

            {/* 5 Cabang */}
            <div className="flex items-center">
              <Icon
                icon="ri:home-office-line"
                width="24"
                height="24"
                className="text-black mr-2"
              />
              <p className="text-xs md:text-sm font-medium">5 Cabang</p>
            </div>

            {/* 20K Users */}
            <div className="flex items-center">
              <Icon
                icon="lucide:user-round"
                width="24"
                height="24"
                className="text-black mr-2"
              />
              <p className="text-xs md:text-sm font-medium">20K Users</p>
            </div>
          </div>

          {/* Deskripsi */}
          <p className="text-xs md:text-sm text-black max-w-[700px] mx-auto leading-relaxed">
            Sewa mobil dengan harga termurah, pilihan kendaraan lengkap, anti
            ribet, nyaman, dan siap jalan kapan saja untuk kebutuhan
            perjalananmu!
          </p>
        </div>

        <div className="w-full h-[300px] md:h-[310px] overflow-hidden mt-6">
          <img
            src={headerHero}
            alt="Header Hero"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </section>

      {/* Field Pemesanan Section */}
      <section className="w-full bg-white font-poppins px-4 mt-[-20px] md:mt-[-15px] relative z-10">
        <div className="bg-white rounded-xl shadow-[4px_4px_20px_12px_rgba(0,0,0,0.1)] w-full max-w-[940px] mx-auto px-6 py-6 md:px-8 md:py-7 mb-10">
          <h3 className="text-[20px] mb-4 text-black">Tipe Layanan:</h3>
          {/* Radio Button Tipe Layanan */}
          <div className="flex gap-8 mb-7 ">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="tipeLayanan"
                value="dengan"
                checked={tipeLayanan === "dengan"}
                onChange={() => setTipeLayanan("dengan")}
                className="w-7 h-7 appearance-none border border-black rounded-full checked:bg-[#9CE0B6] transition focus:outline-none cursor-pointer"
              />
              <span className="text-[16px] text-black">Dengan Sopir</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="tipeLayanan"
                value="tanpa"
                checked={tipeLayanan === "tanpa"}
                onChange={() => setTipeLayanan("tanpa")}
                className="w-7 h-7 appearance-none border border-black rounded-full checked:bg-[#9CE0B6] transition focus:outline-none cursor-pointer"
              />
              <span className="text-[16px] text-black">Tanpa Sopir</span>
            </label>
          </div>

          {/* Grid Form */}
          <div className="text-sm text-black">
            {/* Baris 1: Tempat Rental & Jumlah Penumpang */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
              {/* Tempat Rental */}
              <div>
                <label className="block mb-1 text-[15px]">Tempat rental</label>
                <div className="flex items-center gap-2 border-b border-gray-400 pb-1">
                  <Icon icon="hugeicons:maps-square-01" width="32" />
                  <input
                    type="text"
                    placeholder="Rental Dimana?"
                    className="w-full outline-none bg-transparent text-[15px] font-light mb-[-1px]"
                    value={tempatRental}
                    onChange={(e) => setTempatRental(e.target.value)}
                  />
                </div>
              </div>

              {/* Jumlah Penumpang */}
              <div className="md:col-span-2 max-w-[163px]">
                <label className="block mb-1 text-[15px]">
                  Jumlah penumpang
                </label>
                <div className="flex items-center gap-2 border-b border-gray-400 pb-1">
                  <img
                    src={penumpang}
                    alt="Penumpang"
                    className="w-6 h-6 mt-1 mb-1"
                  />
                  <input
                    type="number"
                    placeholder="Berapa Orang?"
                    className="w-full outline-none bg-transparent text-[15px] font-light mb-[-1px] ml-1 "
                    value={jumlahPenumpang}
                    onChange={(e) => setJumlahPenumpang(e.target.value)}
                  />
                </div>
              </div>

              {/* Kolom 3 - 5 dibiarkan kosong */}
              <div className="hidden md:block"></div>
              <div className="hidden md:block"></div>
            </div>

            {/* Baris 2: Tanggal & Waktu serta Tombol Cari */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-5 gap-5">
              {/* Tanggal Mulai */}
              <div>
                <label className="block mb-1 text-[15px]">Tanggal mulai</label>
                <div className="flex items-center gap-2 border-b border-gray-400 pb-1">
                  <img
                    src={tanggal}
                    alt="tanggal mulai"
                    className="w-6 h-6 mt-1 mb-1"
                  />
                  <input
                    type="date"
                    className="w-[80%] outline-none bg-transparent text-[15px] font-light mb-[-1px]"
                    value={tanggalMulai}
                    onChange={(e) => setTanggalMulai(e.target.value)}
                  />
                </div>
              </div>

              {/* Waktu Mulai */}
              <div>
                <label className="block mb-1 text-[15px]">Waktu mulai</label>
                <div className="flex items-center gap-2 border-b border-gray-400 pb-1">
                  <img
                    src={jam}
                    alt="waktu mulai"
                    className="w-6 h-6 mt-1 mb-1"
                  />
                  <input
                    type="time"
                    className="w-[80%] outline-none bg-transparent text-[15px] font-light mb-[-3px]"
                    value={waktuMulai}
                    onChange={(e) => setWaktuMulai(e.target.value)}
                  />
                </div>
              </div>

              {/* Tanggal Selesai */}
              <div>
                <label className="block mb-1 text-[15px]">
                  Tanggal selesai
                </label>
                <div className="flex items-center gap-2 border-b border-gray-400 pb-1">
                  <img
                    src={tanggal}
                    alt="tanggal selesai"
                    className="w-6 h-6 mt-1 mb-1"
                  />
                  <input
                    type="date"
                    className="w-[80%] outline-none bg-transparent text-[15px] font-light mb-[-3px]"
                    value={tanggalSelesai}
                    onChange={(e) => setTanggalSelesai(e.target.value)}
                  />
                </div>
              </div>

              {/* Waktu Selesai */}
              <div>
                <label className="block mb-1 text-[15px]">Waktu selesai</label>
                <div className="flex items-center gap-2 border-b border-gray-400 pb-1">
                  <img
                    src={jam}
                    alt="waktu selesai"
                    className="w-6 h-6 mt-1 mb-1"
                  />
                  <input
                    type="time"
                    className="w-[80%] outline-none bg-transparent text-[15px] font-light mb-[-3px]"
                    value={waktuSelesai}
                    onChange={(e) => setWaktuSelesai(e.target.value)}
                  />
                </div>
              </div>

              {/* Tombol Cari */}
              <div className="flex items-end justify-end">
                <button
                  onClick={handleCari}
                  className="text-[15px] bg-[#9CE0B6] text-black hover:bg-black hover:text-white transition font-semibold px-6 py-2 rounded-xl cursor-pointer mr-2"
                >
                  Cari
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
