import React from "react";
import { FaTachometerAlt } from "react-icons/fa";
import { GiSteeringWheel } from "react-icons/gi";
import SeatIcon from "../assets/images/seat.png";
import { LucideLuggage } from "lucide-react";

const CarInformation = ({
    title,
    imageSrc,
    alt,
    pricePerHour,
    engineCapacity,
    luggage,
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
                className="w-full h-40 object-cover mt-2 object-fit: cover"
            />

            {/* Harga per jam */}
            <p className="text-lg font-semibold px-4 py-2">
                Rp {pricePerHour}/jam
            </p>

            {/* Spesifikasi */}
            <div className="flex items-center text-xs text-gray-600 px-4 pb-4 space-x-7">
                <div className="flex items-center space-x-1">
                    <FaTachometerAlt className="w-4 h-4" />
                    <span>{engineCapacity} CC</span>
                </div>
                <div className="flex items-center space-x-1">
                    <LucideLuggage className="w-4 h-4" />
                    <span>{luggage} liter</span>
                </div>
                <div className="flex items-center space-x-1">
                    <GiSteeringWheel className="w-4 h-4" />
                    <span>{transmission}</span>
                </div>
                <div className="flex items-center space-x-1">
                    <img src={SeatIcon} alt="Seat" className="w-4 h-4" />
                    <span>{seats} orang</span>
                </div>
            </div>
        </div>
    );
};

export default CarInformation;
