import React from "react";
import logo from "../../assets/images/logo.png";
import { Icon } from "@iconify/react";

const Footer = () => {
  return (
    <div id="footer" className="w-full font-poppins bg-white text-sm">
      {/* Bar Hijau */}
      <div className="bg-[#335540] text-white text-center py-2 text-[13px] px-4 leading-relaxed">
        ayo rental mobil di Gasskuy ● cepat, mudah, terpercaya, harga bersaing ●
        website rental mobil nomor satu di Indonesia ● banyak pilihan mobil dan layanan
      </div>

      {/* Main Content */}
      <div className="w-full max-w-[1024px] mx-auto px-4 md:px-18 py-6 grid grid-cols-1 md:grid-cols-8 gap-4 text-[#101010] text-xs mb-3">
        {/* Logo & Kontak */}
        <div className="md:col-span-2 text-center md:text-left">
          <img src={logo} alt="Gasskuy" className="w-[80px] mb-3 mx-auto md:mx-[-6px]" />
          <p className="mb-0.5">Website rental mobil terpercaya</p>
          <p className="mb-3">No.1 di Indonesia</p>
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-center md:justify-start items-center gap-1.5">
              <Icon icon="mi:call" width="16" />
              <span>+123 456 789</span>
            </div>
            <div className="flex justify-center md:justify-start items-center gap-1.5">
              <Icon icon="tabler:mail" width="16" />
              <span>gasskuy@gmail.com</span>
            </div>
            <div className="flex justify-center md:justify-start items-center gap-1.5">
              <Icon icon="ic:baseline-whatsapp" width="16" />
              <span>WA (+62) 812 345 6789</span>
            </div>
          </div>
        </div>

        {/* Cabang */}
        <div className="md:col-span-1 text-center md:text-left ml-4">
          <h3 className="font-semibold mb-2">Cabang</h3>
          <ul className="space-y-1">
            <li>Surakarta</li>
            <li>Jakarta</li>
            <li>Jogjakarta</li>
            <li>Semarang</li>
            <li>Bandung</li>
          </ul>
        </div>

        {/* Eksplor */}
        <div className="md:col-span-1 text-center md:text-left ml-6">
          <h3 className="font-semibold mb-2">Eksplor</h3>
          <ul className="space-y-1">
            <li>Booking</li>
            <li>Our Service</li>
            <li>Emergency Call</li>
          </ul>
        </div>

        {/* Kontak */}
        <div className="md:col-span-2 text-center md:text-left ml-8">
          <h3 className="font-semibold mb-2">Kontak</h3>
          <ul className="space-y-1">
            <li>+628 112 233 445 (SOC)</li>
            <li>+628 223 455 667 (JKT)</li>
            <li>+628 334 566 778 (JOG)</li>
            <li>+628 445 667 889 (SMG)</li>
            <li>+628 556 778 990 (BDG)</li>
          </ul>
        </div>

        {/* Kantor */}
        <div className="md:col-span-2 text-center md:text-left ml-4">
          <h3 className="font-semibold mb-2">Kantor (pusat)</h3>
          <p className="leading-relaxed">
            Jalan Ir. Sutami 36<br />
            Kentingan, Jebres,<br />
            Surakarta, <br />Jawa Tengah.<br />
            Indonesia 57126.
          </p>
        </div>
      </div>

      {/* Garis */}
      <div className="w-full max-w-[1024px] mx-auto md:pl-18 md:pr-32">
        <hr className="border-t border-black opacity-50" />
      </div>

      {/* Copyright + Sosmed */}
      <div className="w-full max-w-[1024px] mx-auto flex flex-col md:flex-row items-center justify-between px-4 md:px-18 py-3 mt-1 text-[11px] text-[#8A8A8A] md:pl-18 md:pr-32">
        <p className="text-center md:text-left">
          © 2025 Gasskuy.id All Rights Reserved Owned By PT Gasskuy Indonesia
        </p>
        <div className="flex space-x-3 mt-2 md:mt-0">
          <a href="#" className="hover:text-black mt-[-2.8px]">
            <Icon icon="mdi:instagram" width="21" />
          </a>
          <a href="#" className="hover:text-black mt-[-2.8px]">
            <Icon icon="ic:baseline-facebook" width="21" />
          </a>
          <a href="#" className="hover:text-black">
            <Icon icon="prime:twitter" width="17" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
