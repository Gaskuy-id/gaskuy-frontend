import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { FaTachometerAlt, FaGasPump, FaCogs, FaUsers } from 'react-icons/fa';
import { GiSteeringWheel } from "react-icons/gi";
import SeatIcon from "../../assets/images/seat.png";
import Layout from "../../components/Layout/Layout";

const Detail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const car = location.state?.car;
  const [mainImage, setMainImage] = useState('');

  useEffect(() => {
    if (!car) {
      navigate('/booking');
    } else {
      setMainImage(car.imageSrc);
    }
  }, [car, navigate]);

  if (!car) {
    return null;
  }

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
            <div className="flex gap-4 mt-6">
              {car.thumbnails?.map((thumb, idx) => (
                <img
                  key={idx}
                  src={thumb}
                  alt={`Thumbnail ${idx}`}
                  className="w-40 h-auto object-cover rounded-md cursor-pointer border hover:ring-2 hover:ring-green-700"
                  onClick={() => setMainImage(thumb)}
                />
              ))}
            </div>
          </div>

          {/* Kolom Kanan: Info Mobil */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-3">{car.title}</h1>
              <p className="text-lg font-semibold text-green-700 mb-6">${car.pricePerDay} /hours</p>

              <h2 className="text-base font-semibold mb-2">Spesifikasi:</h2>
              <ul className="space-y-3 mb-8 text-gray-700 text-sm">
                <li className="flex items-center gap-2">
                  <FaTachometerAlt className="w-4 h-4" /> {car.speed} CC
                </li>
                <li className="flex items-center gap-2">
                  <GiSteeringWheel className="w-4 h-4" /> {car.transmission}
                </li>
                <li className="flex items-center gap-2">
                  <img src={SeatIcon} alt="Seat" className="w-4 h-4" /> {car.seats} Kursi
                </li>
                <li className="flex items-center gap-2">
                  <FaGasPump className="w-4 h-4" /> Capacity {car.fuelCapacity} L
                </li>
              </ul>
            </div>

            {/* Tombol Pesan Sekarang */}
            <button className="bg-[#335540] hover:bg-green-800 text-white py-2 px-3 rounded-full text-sm font-semibold w-80 h-10">
              PESAN SEKARANG
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Detail;
