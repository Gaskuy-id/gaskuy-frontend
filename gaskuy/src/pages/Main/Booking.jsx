import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../components/Layout/Layout";
import BookingForm from "../../components/BookingForm";
import CarInformation from "../../components/CarInformation";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

// import images from "../../utils/imageLoader";

const Booking = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [tipeLayanan, setTipeLayanan] = useState("");  // Ini perlu ada di sini

  const carsPerPage = 8; // jumlah mobil per halaman

  // useEffect(() => {
  //   // Panggil API untuk ambil data mobil
  //   axios.get("/api/cars")
  //     .then(response => {
  //       setCars(response.data);
  //     })
  //     .catch(err => {
  //       console.error("Gagal fetch data:", err);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }, []);

  // useEffect(() => {
  //   fetch("/cars.json")
  //     .then(res => res.json())
  //     .then(data => setCars(data))
  //     .catch(err => console.error(err))
  //     .finally(() => setLoading(false));
  // }, []);

  // Hitung jumlah halaman
  const totalPages = Math.ceil(cars.length / carsPerPage);

  // Data mobil yang ditampilkan di halaman sekarang
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = cars.slice(indexOfFirstCar, indexOfLastCar);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="p-8 text-center">Loading...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Header Booking Section */}
      <section className="w-full bg-white text-[#000000] font-poppins py-8 md:py-8 px-4 md:px-0 ">
        {/* Bagian teks (judul, subjudul, icon-info) */}
        <div className="mx-auto text-left max-w-[940px]">
          <h1 className="md:text-[39px] font-semibold">Pemesanan</h1>

          {/* Deskripsi */}
          <p className="text-xs md:text-sm text-black max-w-[940px] font-extralight mx-auto leading-relaxed">
            Silahkan isi field dibawah ini sesuai keinginan untuk menampilkan layanan yang tersedia
          </p>
        </div>
      </section>

      {/* Field Pemesanan Section */}
      <BookingForm onTipeLayananChange={setTipeLayanan} setCars={setCars} />

      {/* Pilihan yang tersedia Section*/}
      <section className="w-full bg-white text-black font-poppins py-2 px-4 md:px-0">
        <div className="mx-auto text-left max-w-[940px] mt-2 mb-10">
          <p className="text-xs md:text-sm text-black max-w-[940px] font-normal mx-auto leading-relaxed">
            Pilihan yang tersedia:
          </p>

          {/* Grid dan pengecekan data */}
          <div className="grid grid-cols-2 gap-12 mt-4">
            {currentCars.length > 0 ? (
              currentCars.map(car => (
                <Link
                  key={car.id}
                  to="/detail"
                  state={{ car, tipeLayanan }} // kirim ke tipe layanan
                  className="block"
                >
                  <CarInformation
                    title={car.title}
                    imageSrc={car.imageSrc}
                    alt={car.title}
                    pricePerDay={car.pricePerDay}
                    speed={car.speed}
                    fuelCapacity={car.fuelCapacity}
                    transmission={car.transmission}
                    seats={car.seats}
                  />
                </Link>
              ))
            ) : (
              <div className="col-span-2 text-center text-sm text-gray-500">
                Belum ada mobil tersedia.
              </div>
            )}
          </div>

          {/* Pagination Section */}
          <div className="flex items-center justify-center mt-8 space-x-2 text-sm">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="flex items-center gap-1 w-auto h-8 px-3 rounded-lg border text-gray-700 hover:bg-[#5D8B68] hover:text-white disabled:opacity-50 transition-all duration-200"
            >
              <FaArrowLeft />
              Previous
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`w-9 h-8 flex items-center justify-center transition-all duration-200 
                  ${currentPage === index + 1
                    ? "bg-[#5D8B68] text-white rounded-lg"
                    : "text-gray-700 hover:bg-[#5D8B68] hover:text-white hover:rounded-lg hover:border"
                  }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 w-auto h-8 px-3 rounded-lg border text-gray-700 hover:bg-[#5D8B68] hover:text-white disabled:opacity-50 transition-all duration-200"
            >
              Next
              <FaArrowRight />
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Booking;
