// src/components/CarInformation.jsx
import React from "react";
import { FaTachometerAlt, FaGasPump } from "react-icons/fa";
import { GiSteeringWheel } from "react-icons/gi";
import SeatIcon from "../assets/images/seat.png";

const CarInformation = ({
    title,
    imageSrc,
    alt,
    pricePerDay,
    speed,
    fuelCapacity,
    transmission,
    seats,
}) => {
    return (
        <div className="w-[440px] border rounded-xl overflow-hidden shadow-sm bg-white">
            {/* Judul */}
            <p className="text-sm font-medium px-4 pt-4">{title}</p>

            {/* Gambar */}
            <img
                src={imageSrc}
                alt={alt}
                className="w-full h-40 object-cover mt-2"
            />

            {/* Harga per hari */}
            <p className="text-lg font-semibold px-4 py-2">
                Rp {pricePerDay}/day
            </p>

            {/* Spesifikasi */}
            <div className="flex items-center text-xs text-gray-600 px-4 pb-4 space-x-9">
                <div className="flex items-center space-x-1">
                    <FaTachometerAlt className="w-4 h-4" />
                    <span>{speed}</span>
                </div>
                <div className="flex items-center space-x-1">
                    <FaGasPump className="w-4 h-4" />
                    <span>{fuelCapacity}</span>
                </div>
                <div className="flex items-center space-x-1">
                    <GiSteeringWheel className="w-4 h-4" />
                    <span>{transmission}</span>
                </div>
                <div className="flex items-center space-x-1">
                    <img src={SeatIcon} alt="Seat" className="w-4 h-4" />
                    <span>{seats}</span>
                </div>
            </div>
        </div>
    );
};

export default CarInformation;
