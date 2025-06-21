import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { FaTachometerAlt } from 'react-icons/fa';
import { GiSteeringWheel } from "react-icons/gi";
import SeatIcon from "../../assets/images/seat.png";
import Layout from "../../components/Layout/Layout";
import { LucideLuggage } from 'lucide-react';

const Detail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const car = location.state?.car;
  const tipeLayanan = location.state?.tipeLayanan;
  const [mainImage, setMainImage] = useState('');
  const [thumbnails, setThumbnails] = useState([]);


  const handlePesanSekarang = () => {
    if (!tipeLayanan) {
      alert("Silahkan pilih tipe layanan terlebih dahulu.");
      return;
    }

    const typeParam = tipeLayanan === "dengan" ? "driver" : "no-driver";
    navigate(`/book/${typeParam}`, { state: { car, tipeLayanan } });
  };

  useEffect(() => {
    if (!car) {
      navigate('/booking');
    } else {
      setMainImage(car.imageSrc);
      
      const detailImages = car.detailImage || [];
      const uniqueThumbnails = [car.imageSrc, ...detailImages.filter(img => img !== car.imageSrc)];
      setThumbnails(uniqueThumbnails);
    }
  }, [car, navigate]);

  return (
    <Layout>
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        {/* Tombol kembali */}
        <Link to="/booking" className="flex items-center gap-2 mb-6 group">
          <div className="w-8 h-8 flex items-center justify-center bg-[#5D8B68] rounded-lg transition-colors duration-300 group-hover:bg-green-800">
            <Icon icon="weui:back-filled" className="text-white text-lg" />
          </div>
          <span className="text-green-700 font-medium text-sm group-hover:text-green-800">
            Kembali
          </span>
        </Link>

        <div className="flex flex-col md:flex-row gap-10">
          {/* Kolom Kiri: Gambar Mobil */}
          <div className="flex-1">
            <img
              src={mainImage}
              alt={car.title}
              className="w-full h-auto rounded-lg shadow-md border object-cover"
            />

            {/* Thumbnails */}
            <div className="flex gap-5 mt-6 justify-center">
              {thumbnails.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Detail Image ${idx + 1}`}
                  className={`w-24 h-24 object-cover rounded-md cursor-pointer border transition duration-200 ${
                    mainImage === img ? 'ring-2 ring-green-700' : 'hover:ring-2 hover:ring-green-700'
                  }`}
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>
          </div>

          {/* Kolom Kanan: Info Mobil */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-3">{car.title}</h1>
              <p className="text-xl font-semibold text-green-700 mb-6">Rp {car.pricePerHour}/jam</p>

              <h2 className="text-lg font-semibold mb-2">Spesifikasi:</h2>
              <ul className="space-y-3 mb-8 text-gray-700 text-lg">
                <li className="flex items-center gap-2">
                  <FaTachometerAlt className="w-4 h-4" /> {car.engineCapacity} CC
                </li>
                <li className="flex items-center gap-2">
                  <GiSteeringWheel className="w-4 h-4" /> {car.transmission}
                </li>
                <li className="flex items-center gap-2">
                  <img src={SeatIcon} alt="Seat" className="w-4 h-4" /> {car.seats} orang
                </li>
                <li className="flex items-center gap-2">
                  <LucideLuggage className="w-4 h-4" /> {car.luggage} liter
                </li>
              </ul>
              {/* Tombol Pesan Sekarang */}
              <button 
                onClick={handlePesanSekarang}
                className="bg-[#335540] hover:bg-green-800 text-white py-2 px-3 rounded-full text-sm font-semibold w-80 h-10 mt-15">
                PESAN SEKARANG
              </button>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Detail;
