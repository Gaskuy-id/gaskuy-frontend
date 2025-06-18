import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../components/Layout/Layout";
import BookingForm from "../../components/BookingForm";
import CarInformation from "../../components/CarInformation";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import API from "../../utils/api";

const Booking = () => {
  const location = useLocation();
  const state = location.state || {};

  const {
    cars: carsFromState,
    tipeLayanan: tipeLayananFromState,
    formValues: formValuesFromState
  } = location.state || {};

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [cars, setCars] = useState([]);
  const [tipeLayanan, setTipeLayanan] = useState("");
  
  // State untuk menyimpan data branch dari API
  const [branches, setBranches] = useState([]);
  const [loadingBranches, setLoadingBranches] = useState(true);

  // Fetch branch data dari API saat komponen dimount
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        setLoadingBranches(true);
        const response = await API.get('/cms/branch');
        console.log("Branch response:", response.data.data);
        setBranches(response.data.data || []);
      } catch (error) {
        console.error("Gagal memuat data branch:", error);
        setBranches([]); // Set empty array sebagai fallback
      } finally {
        setLoadingBranches(false);
      }
    };

    fetchBranches();
  }, []);

  useEffect(() => {
    if (carsFromState) {
      setCars(carsFromState);
    }
    if (tipeLayananFromState) {
      setTipeLayanan(tipeLayananFromState);
    }
  }, [carsFromState, tipeLayananFromState]);

  // State untuk menyimpan form values
  const [formValues, setFormValues] = useState(formValuesFromState || {});

  // Fungsi untuk menangani pencarian dari BookingForm
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

    // Simpan form values ke state
    setFormValues(searchParams);

    try {
      setLoading(true);
      
      console.log("Search params:", searchParams);
      
      // Panggil API dengan branch ID
      const response = await API.get(`/cms/vehicle/branch/${branchId}`);
      const data = response.data || response || {};
      
      // Pastikan vehicles adalah array
      const vehicles = data.vehicles || [];
      
      if (!Array.isArray(vehicles)) {
        console.error("Vehicles is not an array:", vehicles);
        setCars([]);
        setTipeLayanan(tipeLayanan);
        return;
      }
      
      console.log("Total vehicles:", vehicles.length);
      
      // Filter berdasarkan jumlah penumpang dan status
      const filteredCars = vehicles.filter(car => {
        const seatCount = car.seats || car.seat || 0; // Handle both 'seats' and 'seat' properties
        const isAvailable = car.currentStatus === "tersedia";
        const hasEnoughSeats = seatCount >= parseInt(jumlahPenumpang);
        
        return hasEnoughSeats && isAvailable;
      });

      console.log("Filtered cars:", filteredCars);

      const formattedCars = filteredCars.map(car => {
        const formattedCar = {
          id: car._id,
          title: car.name,
          imageSrc: car.mainImage,
          pricePerDay: car.ratePerHour,
          engineCapacity: car.engineCapacity,
          luggage: car.luggage,
          transmission: car.transmission,
          seats: car.seats || car.seat, // Handle both properties
          city: car.city || tempatRental || "N/A"
        };
        
        return formattedCar;
      });

      setCars(formattedCars);
      setTipeLayanan(tipeLayanan);
      setCurrentPage(1); // Reset ke halaman pertama setelah pencarian baru

      // Update state untuk navigasi jika diperlukan
      const updatedState = {
        cars: formattedCars,
        tanggalMulai,
        waktuMulai,
        tanggalSelesai,
        waktuSelesai,
        tipeLayanan,
        tempatRental
      };

      // Update URL state tanpa navigasi
      window.history.replaceState(
        { ...location.state, ...updatedState },
        '',
        location.pathname
      );

    } catch (error) {
      console.error("Error details:", error);
      console.error("Error response:", error.response);
      alert("Terjadi kesalahan saat mencari kendaraan: " + (error.message || "Unknown error"));
      setCars([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const carsPerPage = 8; // jumlah mobil per halaman

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
      <BookingForm
        onTipeLayananChange={setTipeLayanan}
        onSearch={handleSearch}
        branches={branches}
        loadingBranches={loadingBranches}
        defaultValues={formValues}
      />
    
      {/* Pilihan yang tersedia Section*/}
      <section className="w-full bg-white text-black font-poppins py-2 px-4 md:px-0">
        <div className="mx-auto text-left max-w-[940px] mt-2 mb-10">
          <p className="text-xs md:text-sm text-black max-w-[940px] font-normal mx-auto leading-relaxed">
            Pilihan yang tersedia: {cars.length} mobil ditemukan
          </p>

          {/* Grid dan pengecekan data */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12 mt-4">
            {currentCars.length > 0 ? (
              currentCars.map(car => (
                <Link
                  key={car.id}
                  to="/detail"
                  state={{ car, tipeLayanan }}
                  className="block"
                >
                  <CarInformation
                    title={car.title}
                    imageSrc={car.imageSrc}
                    alt={car.title}
                    pricePerDay={car.pricePerDay}
                    engineCapacity={car.engineCapacity}
                    luggage={car.luggage}
                    transmission={car.transmission}
                    seats={car.seats}
                  />
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center text-sm text-gray-500 py-8">
                {loading ? "Memuat data..." : "Belum ada mobil tersedia untuk kriteria pencarian Anda."}
              </div>
            )}
          </div>

          {/* Pagination Section */}
          {totalPages > 1 && (
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
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Booking;