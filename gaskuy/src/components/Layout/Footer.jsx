import React from "react";
import logo from "../../assets/images/logo.png";
import { Icon } from "@iconify/react";

const Footer = () => {
  return (
    <div id="footer" className="w-full font-poppins bg-white text-base">
      {/* Bar Hijau */}
      <div className="bg-[#335540] text-white text-center py-3 text-sm mb-2 px-4">
        Ayo rental mobil di Gasskuy ● Cepat, mudah, terpercaya, harga bersaing ●
        Website rental mobil nomor satu di Indonesia ● Banyak pilihan mobil dan
        layanan
      </div>

      {/* Main Content */}
      <div className="px-6 md:px-20 py-10 max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-8 gap-6 text-[#101010] text-base">
        {/* Logo & Kontak */}
        <div className="md:col-span-2 text-center md:text-left">
          <img src={logo} alt="Gasskuy" className="w-[100px] mb-4 mx-auto md:mx-0" />
          <p className="mb-1">Website rental mobil terpercaya</p>
          <p className="mb-4">No.1 di Indonesia</p>
          <div className="space-y-2">
            <div className="flex justify-center md:justify-start items-center gap-2">
              <Icon icon="mi:call" />
              <span>+123 456 789</span>
            </div>
            <div className="flex justify-center md:justify-start items-center gap-2">
              <Icon icon="tabler:mail" />
              <span>gasskuy@gmail.com</span>
            </div>
            <div className="flex justify-center md:justify-start items-center gap-2">
              <Icon icon="ic:baseline-whatsapp" />
              <span>WA (+62) 812 345 6789</span>
            </div>
          </div>
        </div>

        {/* Cabang */}
        <div className="md:col-span-1 text-center md:text-left">
          <h3 className="font-semibold mb-3">Cabang</h3>
          <ul className="space-y-2">
            <li>Surabaya</li>
            <li>Jakarta</li>
            <li>Jogjakarta</li>
            <li>Semarang</li>
            <li>Bandung</li>
          </ul>
        </div>

        {/* Eksplor */}
        <div className="md:col-span-1 text-center md:text-left ml-4">
          <h3 className="font-semibold mb-3">Eksplor</h3>
          <ul className="space-y-2">
            <li>Booking</li>
            <li>Our Service</li>
            <li>Emergency Call</li>
          </ul>
        </div>

        {/* Kontak */}
        <div className="md:col-span-2 text-center md:text-left ml-6">
          <h3 className="font-semibold mb-3">Kontak</h3>
          <ul className="space-y-2">
            <li>+628 112 233 445 (SOC)</li>
            <li>+628 223 455 667 (JKT)</li>
            <li>+628 334 566 778 (JOG)</li>
            <li>+628 445 667 889 (SMG)</li>
            <li>+628 556 778 990 (BDG)</li>
          </ul>
        </div>

        {/* Kantor */}
        <div className="md:col-span-2 text-center md:text-left">
          <h3 className="font-semibold mb-3">Kantor (pusat)</h3>
          <p>
            Jalan Ir. Sutami 36
            <br />
            Kentingan, Jebres,
            <br />
            Surakarta, Jawa Tengah.
            <br />
            Indonesia 57126.
          </p>
        </div>
      </div>

      {/* Garis */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-20">
        <hr className="border-t border-gray-300" />
      </div>

      {/* Copyright + Sosmed */}
      <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-4 mt-2 text-sm text-[#8A8A8A] max-w-screen-xl mx-auto">
        <p className="text-center md:text-left">
          © 2025 Gasskuy.id All Rights Reserved Owned By PT Gasskuy Indonesia
        </p>
        <div className="flex space-x-4 mt-3 md:mt-0 text-xl">
          <a href="#" className="hover:text-black mt-[-3.5px]">
            <Icon icon="mdi:instagram" width="26" height="26" />
          </a>
          <a href="#" className="hover:text-black mt-[-3.5px]">
            <Icon icon="ic:baseline-facebook" width="26" height="26" />
          </a>
          <a href="#" className="hover:text-black">
            <Icon icon="prime:twitter" width="20" height="20" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
