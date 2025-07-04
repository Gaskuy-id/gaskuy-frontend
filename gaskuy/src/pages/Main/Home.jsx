import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import headerHero from "../../assets/images/mobil.jpg";
import smallCar from "../../assets/images/smallCar.png";
import iconMoney from "../../assets/images/iconMoney.png";
import iconCS from "../../assets/images/iconCS.png";
import iconTrust from "../../assets/images/iconTrust.png";
import iconShield from "../../assets/images/iconShield.png";
import iconCert from "../../assets/images/iconCert.png";
import tourGuideImg from "../../assets/images/tourGuide.png";
import snackMinumanImg from "../../assets/images/snackMinuman.png";
import asuransiImg from "../../assets/images/asuransiPerjalanan.png";
import daruratImg from "../../assets/images/darurat24Jam.png";
import avatarImg from "../../assets/images/avatarImg.png";
import mitsubishiLogo from "../../assets/images/mitsubishi.png";
import hyundaiLogo from "../../assets/images/hyundai.png";
import hondaLogo from "../../assets/images/honda.png";
import kiaLogo from "../../assets/images/kia.png";
import toyotaLogo from "../../assets/images/toyota.png";
import whatsappImg from "../../assets/images/whatsapp.png";
import circleVector from "../../assets/images/circleVector.svg";

import { Icon } from "@iconify/react";
import BookingForm from "../../components/BookingForm";
import API from "../../utils/api";

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state || {};
  const {
    cars: carsFromState,
    tipeLayanan: tipeLayananFromState,
    formValues: formValuesFromState,
  } = state;

  const [cars, setCars] = useState([]);
  const [tipeLayanan, setTipeLayanan] = useState("");
  const [branches, setBranches] = useState([]);
  const [loadingBranches, setLoadingBranches] = useState(true);
  const [formValues, setFormValues] = useState(formValuesFromState || []);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        setLoadingBranches(true);
        const response = await API.get('/cms/branch');
        setBranches(response.data.data || []);
      } catch (error) {
        console.error("Gagal memuat data branch:", error);
        setBranches([]);
      } finally {
        setLoadingBranches(false);
      }
    };
    fetchBranches();
  }, []);

  useEffect(() => {
    if (carsFromState) setCars(carsFromState);
    if (tipeLayananFromState) setTipeLayanan(tipeLayananFromState);
  }, [carsFromState, tipeLayananFromState]);

  const handleSearch = async (searchParams) => {
    const {
      branchId,
      jumlahPenumpang,
      tempatRental,
      tanggalMulai,
      waktuMulai,
      tanggalSelesai,
      waktuSelesai,
      tipeLayanan
    } = searchParams;

    setFormValues(searchParams);

    try {
      setLoading(true);
      const response = await API.get(`/cms/vehicle/branch/${branchId}`);
      const data = response.data || {};
      const vehicles = data.vehicles || [];

      const filteredCars = vehicles.filter(car => {
        const seatCount = car.seats || car.seat || 0;
        const isAvailable = car.currentStatus === "tersedia";
        const hasEnoughSeats = seatCount >= parseInt(jumlahPenumpang);
        return isAvailable && hasEnoughSeats;
      });

      const formattedCars = filteredCars.map(car => ({
        id: car._id,
        title: car.name,
        imageSrc: car.mainImage,
        pricePerDay: car.ratePerHour,
        engineCapacity: car.engineCapacity,
        fuelCapacity: car.fuelCapacity || "N/A",
        transmission: car.transmission,
        seats: car.seats || car.seat,
        city: car.city || tempatRental || "N/A"
      }));

      setCars(formattedCars);
      setTipeLayanan(tipeLayanan);

      navigate("/booking", {
        state: {
          cars: formattedCars,
          tanggalMulai,
          waktuMulai,
          tanggalSelesai,
          waktuSelesai,
          tipeLayanan,
          tempatRental,
          formValues: searchParams
        }
      });

    } catch (error) {
      console.error("Gagal memproses pencarian:", error);
      setCars([]);
    } finally {
      setLoading(false);
    }
  };

  // Whatsapp
  const WHATSAPP_PHONE = "6281392610510";

  const MESSAGE_LINES = [
    "Halo Min Gasskuy! 👋",
    "Saya [Nama Anda]. Mau tanya nih tentang [hal yang ingin ditanyakan].",
    "Kalau bisa, tolong [hal yang ingin dibantu].",
    "Terima kasih banyak! 😊",
  ];

  const encodedMessage = encodeURIComponent(MESSAGE_LINES.join("\n"));

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

        <div className="hidden md:block w-full h-[310px] overflow-hidden mt-6">
          <img
            src={headerHero}
            alt="Header Hero"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </section>

      {/* Field Pemesanan Section */}
      <BookingForm
        onTipeLayananChange={setTipeLayanan}
        onSearch={handleSearch}
        branches={branches}
        loadingBranches={loadingBranches}
        defaultValues={formValues}
      />

      {/* Section Alasan Kenapa Harus Sewa di Gaskuy */}
      <section className="w-full bg-white text-black font-poppins py-6 px-4 md:px-0">
        <div className="max-w-[940px] mx-auto text-center">
          {/* Judul dengan highlight */}
          <h2 className="text-[30px] md:text-[30px] font-semibold leading-tight">
            <span className="bg-[linear-gradient(to_bottom,transparent_50%,#AAEEC4_50%)] px-1">
              Alasan
            </span>{" "}
            Kenapa{" "}
            <span className="bg-[linear-gradient(to_bottom,transparent_50%,#AAEEC4_50%)] px-1">
              Harus Sewa
            </span>{" "}
            di GassKuy
          </h2>

          {/* Grid / Flex items */}
          <div className="flex flex-wrap justify-center gap-x-20 gap-y-11 mt-12">
            {/* iconMoney */}
            <div className="w-[200px] flex flex-col items-center text-center">
              <img
                src={iconMoney}
                alt="Harga Terjangkau"
                className="w-30 h-30 mb-4.5"
              />
              <p className="font-normal font-size:xl">
                Harga lebih terjangkau dibanding yang lain
              </p>
            </div>

            {/* iconCS */}
            <div className="w-[220px] flex flex-col items-center text-center">
              <img
                src={iconCS}
                alt="Customer Service"
                className="w-30 h-30 mb-4.5 ml-8"
              />
              <p className="font-normal font-size:xl ml-2">
                Customer service 24 jam penuh
              </p>
            </div>

            {/* iconTrust */}
            <div className="w-[240px] flex flex-col items-center text-center mt-1">
              <img
                src={iconTrust}
                alt="Terpercaya"
                className="w-28 h-28 mb-5.5"
              />
              <p className="font-normal font-size:xl">
                Sudah dipercaya oleh 20 ribu lebih orang dari 15 negara
              </p>
            </div>

            {/* iconShield */}
            <div className="w-[260px] flex flex-col items-center text-center">
              <img
                src={iconShield}
                alt="Mobil Prima"
                className="w-23 h-29 mb-4 ml-8"
              />
              <p className="font-normal font-size:xl ml-6">
                Mobil selalu dalam keadaan prima dan rutin perawatan
              </p>
            </div>

            {/* iconCert */}
            <div className="w-[290px] flex flex-col items-center text-center">
              <img
                src={iconCert}
                alt="Driver Bersertifikat"
                className="w-29 h-23 mb-4 mr-15 mt-4"
              />
              <p className="font-normal font-size:xl mr-14 mt-2.5">
                Driver bersertifikat resmi dan professional
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Layanan dan Fasilitas di Gaskuy */}
      <section className="w-full bg-white text-black font-poppins py-14 px-4 md:px-0">
        <div className="max-w-[740px] mx-auto">
          {/* Judul dengan highlight */}
          <h2 className="text-[30px] md:text-[30px] font-semibold leading-tight text-center">
            <span className="bg-[linear-gradient(to_bottom,transparent_50%,#AAEEC4_50%)] px-1">
              Layanan
            </span>{" "}
            dan Fasilitas Kami
          </h2>

          {/* Daftar kartu layanan */}
          <div className="flex flex-col gap-6 mt-8">
            {/* Kartu 1 */}
            <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-[0px_0px_40px_0px_rgba(0,0,0,0.1)] overflow-hidden h-68">
              <div className="w-full md:w-1/2 flex items-center justify-center">
                <img
                  src={tourGuideImg}
                  alt="Tour Guide"
                  className="w-[94%] h-[85%] object-cover rounded-xl ml-6"
                />
              </div>
              <div className="w-full md:w-2/3 p-6">
                <h3 className="text-[22px] font-semibold mb-2 ml-4">
                  Layanan <span className="text-[#3BB280]">Tour Guide</span>{" "}
                  Gratis
                </h3>
                <p className="text-[17px] text-black leading-relaxed font-light ml-4 text-justify">
                  Biar perjalanan makin seru, kami sediakan tour guide gratis
                  yang siap ngajak keliling tempat-tempat terbaik dan kasih info
                  menarik seputar destinasi yang kamu kunjungi.
                </p>
              </div>
            </div>

            {/* Kartu 2 */}
            <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-[0px_0px_40px_0px_rgba(0,0,0,0.1)] overflow-hidden h-68">
              <div className="w-full md:w-1/2 flex items-center justify-center">
                <img
                  src={snackMinumanImg}
                  alt="Snack dan Minuman"
                  className="w-[94%] h-[85%] object-cover rounded-xl ml-6"
                />
              </div>
              <div className="w-full md:w-2/3 p-6">
                <h3 className="text-[22px] font-semibold mb-2 ml-4">
                  Gratis{" "}
                  <span className="text-[#3BB280]">Snack dan Minuman</span>
                </h3>
                <p className="text-[17px] text-black leading-relaxed font-light ml-4 text-justify">
                  Biar perjalanan tetap nyaman, kami kasih snack dan minuman
                  gratis buat nemenin kamu di jalan. Jadi, gak perlu khawatir
                  kalau tiba-tiba kamu lapar atau haus tapi jauh dari
                  supermarket.
                </p>
              </div>
            </div>

            {/* Kartu 3 */}
            <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-[0px_0px_40px_0px_rgba(0,0,0,0.1)] overflow-hidden h-68">
              <div className="w-full md:w-1/2 flex items-center justify-center">
                <img
                  src={asuransiImg}
                  alt="Asuransi Perjalanan"
                  className="w-[94%] h-[85%] object-cover rounded-xl ml-6"
                />
              </div>
              <div className="w-full md:w-2/3 p-6">
                <h3 className="text-[22px] font-semibold mb-2 ml-4">
                  Asuransi Perjalanan{" "}
                  <span className="text-[#3BB280]">Penuh</span>
                </h3>
                <p className="text-[17px] text-black leading-relaxed font-light ml-4 text-justify">
                  Jalan-jalan jadi lebih tenang dengan asuransi perjalanan yang
                  siap melindungi dari hal-hal tak terduga. Nikmati pengalaman
                  rental mobil tanpa ribet dan tanpa khawatir!
                </p>
              </div>
            </div>

            {/* Kartu 4 */}
            <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-[0px_0px_40px_0px_rgba(0,0,0,0.1)] overflow-hidden h-68">
              <div className="w-full md:w-1/2 flex items-center justify-center">
                <img
                  src={daruratImg}
                  alt="Layanan Darurat 24 Jam"
                  className="w-[94%] h-[85%] object-cover rounded-xl ml-6"
                />
              </div>
              <div className="w-full md:w-2/3 p-6">
                <h3 className="text-[22px] font-semibold mb-2 ml-4">
                  Layanan Darurat{" "}
                  <span className="text-[#3BB280]">24 Jam Penuh</span>
                </h3>
                <p className="text-[17px] text-black leading-relaxed font-light ml-4 text-justify">
                  Kalau ada kendala di jalan, kami selalu siap bantu! Dengan
                  layanan bantuan darurat 24/7, kamu bisa tenang karena ada tim
                  yang siap menolong kapan pun dan di mana pun.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Testimoni */}
      <section className="w-full bg-white text-black font-poppins py-6 px-4 md:px-0">
        <div className="max-w-[940px] mx-auto">
          {/* Judul dengan highlight */}
          <h2 className="text-[30px] md:text-[30px] font-semibold text-center leading-tight">
            <span>Apa </span>
            <span className="bg-[linear-gradient(to_bottom,transparent_50%,#AAEEC4_50%)] px-1">
              Kata
            </span>
            <span> Mereka</span>
          </h2>

          {/* Grid Testimoni */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {/* Testimonial Card */}
            <div className="bg-white rounded-xl shadow-[0px_0px_40px_0px_rgba(0,0,0,0.1)] p-6">
              <p className="text-[15px] text-black leading-relaxed text-justify">
                Ada tour guide gratis bikin perjalanan makin mudah, seru dan
                informatif. Recommended!
              </p>
              <div className="flex items-center gap-4 mt-6">
                <img
                  src={avatarImg}
                  alt="Avatar Pelanggan"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="text-[16px] font-semibold">Ambarawa</p>
                  <p className="text-[14px] text-[#818181]">CEO Jombang</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-[0px_0px_40px_0px_rgba(0,0,0,0.1)] p-6">
              <p className="text-[15px] text-black leading-relaxed text-justify">
                Pelayanannya luar biasa! Mobil bersih, nyaman, dan adminnya
                sangat responsif. Mantap!
              </p>
              <div className="flex items-center gap-4 mt-6">
                <img
                  src={avatarImg}
                  alt="Avatar Pelanggan"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="text-[16px] font-semibold">Gus Akira Nakai</p>
                  <p className="text-[14px] text-[#818181]">
                    CEO RAUH-Welt BEGRIFF
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-[0px_0px_40px_0px_rgba(0,0,0,0.1)] p-6">
              <p className="text-[15px] text-black leading-relaxed text-justify">
                Mobil siap pakai, bensin full, dan ada fasilitas supir
                profesional juga. Next trip bakal kesini lagi!
              </p>
              <div className="flex items-center gap-4 mt-6">
                <img
                  src={avatarImg}
                  alt="Avatar Pelanggan"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="text-[16px] font-semibold">Asep Teripang</p>
                  <p className="text-[14px] text-[#818181]">
                    GAM Special Forces
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Partner */}
      <section className="w-full bg-white font-poppins py-16 px-4 md:px-0">
        <div id="contact" className="max-w-[980px] mx-auto text-center">
          {/* Judul dengan highlight */}
          <h2 className="text-[30px] md:text-[30px] font-semibold leading-tight">
            <span className="bg-[linear-gradient(to_bottom,transparent_50%,#AAEEC4_50%)] px-1">
              Partner
            </span>{" "}
            Kami
          </h2>

          {/* Logo Partner */}
          <div className="flex flex-wrap justify-center items-center gap-16 mt-5.5">
            <img
              src={mitsubishiLogo}
              alt="Mitsubishi"
              className="h-21 md:h-21 ml-1"
            />
            <img
              src={hyundaiLogo}
              alt="Hyundai"
              className="h-25 md:h-25 ml-4"
            />
            <img src={hondaLogo} alt="Honda" className="h-36 md:h-36 ml-5" />
            <img src={kiaLogo} alt="kia" className="h-30 md:h-30" />
            <img src={toyotaLogo} alt="Toyota" className="h-9 md:h-9" />
          </div>
        </div>
      </section>

      {/* Section Kontak Kami */}
      <section className="w-full bg-white font-poppins py-2 px-4 md:px-0">
        <div className="max-w-[965px] mx-auto">
          <div className="bg-[#171717] rounded-3xl shadow-[4px_4px_20px_12px_rgba(0,0,0,0.1)] p-8 flex flex-col md:flex-row items-center">
            {/* Kiri: teks + vector */}
            <div className="md:w-2/3 text-white h-68">
              <h2 className=" text-[38px] font-bold text-[#A9ECC2]">
                Kontak Kami
              </h2>
              <p className="text-[28px]">
                Mempunyai Masalah Dalam{" "}
                <span className="text-[#AAEEC4]">Pemesanan?</span>
              </p>
              <p className="text-[28px] text-[#AAEEC4]">Hubungi kami disini</p>

              {/* SVG circles */}
              <div className="mt-5">
                <img
                  src={circleVector}
                  alt="Vector circles"
                  className="w-[34.5rem] h-auto"
                />
              </div>
            </div>

            {/* Kanan: WhatsApp */}
            <div className="mt-8 md:mt-0 md:w-1/3 flex flex-col items-center">
              <img
                src={whatsappImg}
                alt="WhatsApp"
                className="w-51 h-52 ml-14 opacity-[96%]"
              />
              <a
                href={`https://web.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodedMessage}`}
                target="WhatsApp"
                rel="noopener noreferrer"
                className="ml-14 mt-4 inline-block bg-[#0CC333] text-white text-[15px] font-semibold px-5.5 py-2 rounded-full hover:bg-white hover:text-black transition"
              >
                Kirim via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Section Punchline */}
      <section className="w-full bg-white font-poppins mt-14 mb-10 px-4 md:px-0">
        <div className="max-w-[980px] mx-auto text-center">
          <h2 className="text-[25px] md:text-[25px] font-medium italic leading-tight">
          ~ Cepat, Mudah, Terpercaya, 
            <span className="bg-[linear-gradient(to_bottom,transparent_50%,#AAEEC4_50%)] px-1">
              Gasskuy
            </span>{" "}
             ~
          </h2>
        </div>
      </section>
    </Layout>
  );
};

export default Home;