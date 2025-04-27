import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import jalananMobil from "../../assets/images/jalananMobil.png";
import keycar from "../../assets/images/keycar.png";
import { Icon } from "@iconify/react";
import { code } from "framer-motion/client";

const BookSuccess = () => {
  const [codeConformation, setcodeConformation] = useState("ABC123");

  return (
    <Layout>
      <div className="min-h-screen flex flex-col items-center">
        {/* Progress */}
        <div className="mt-10 text-center">
          <h1 className="text-[52px] font-semibold mb-3">Detail Pemesanan</h1>
          <p className="text-[28px] font-normal mb-8">
            Segera isikan datamu agar sat-set langsung berangkat!
          </p>

          <div className="flex items-center justify-center mb-10">
            <div className="flex items-center space-x-2">
              <div className="w-[69px] h-[69px] rounded-full border-4 border-[#59A618] text-[32px] font-semibold flex items-center justify-center">
                1
              </div>
              <span className="text-[32px] font-semibold ml-4">Book</span>
            </div>
            <div className="w-[265px] h-1 bg-[#59A618] mx-2" />
            <div className="flex items-center space-x-2">
              <div className="w-[69px] h-[69px] rounded-full border-4 border-[#59A618] text-[32px] font-semibold flex items-center justify-center">
                2
              </div>
              <span className="text-[32px] font-semibold ml-4">Payment</span>
            </div>
            <div className="w-[265px] h-1 bg-[#59A618] mx-2" />
            <div className="flex items-center space-x-2">
              <div className="w-[69px] h-[69px] rounded-full bg-[#59A618] text-[32px] font-semibold flex items-center justify-center">
                3
              </div>
              <span className="text-[32px] font-semibold ml-4">Done</span>
            </div>
          </div>
        </div>

        {/* Bagian Kode */}
        <div className=" flex flex-col items-center">
          <h2 className="text-[36px] text-black mb-6 font-bold mt-5">
            Pemesanan{" "}
            <span className="bg-[linear-gradient(to_bottom,transparent_50%,#AAEEC4_50%)] px-1">
              Sukses!
            </span>
          </h2>

          <p className="text-[16px] text-black font-bold mt-2.5">
            Kode Konfirmasi
          </p>
          <p className="text-[90px] text-black mb-2 font-bold">
            {codeConformation}
          </p>
        </div>

        {/* Bagian Pemberitahuan */}
        <div className="w-full flex justify-center px-4 max-w-[739px] ml-1">
          <div className="flex items-center bg-[#E8F7F5] rounded-3xl p-4 max-w w-full">
            <img
              src= {keycar}
              alt="KeyCar Logo"
              width="33"
              height="33"
            />
            <p className="text-[#6F585A] font-normal text-[13px] ml-2">
              Tunjukan kode konfirmasi kepada driver atau staff admin gaskuy
              saat anda dijemput atau hendak mengambil kendaraan
            </p>
          </div>
        </div>

        {/* Bagian Pemberitahuan */}
        <div className="w-full flex justify-center px-4 max-w-[739px] ml-1">
          <button className="w-full h-10 bg-[#AAEEC4] text-black py-3 rounded-full font-semibold hover:bg-black hover:text-white transition flex items-center justify-center mt-5">
              Done
          </button>
        </div>

        <div className="flex justify-center">
          <img
            src={jalananMobil}
            alt="Login Illustration"
            className="w-full max-w-[1920px] h-auto"
          />
        </div>
      </div>
    </Layout>
  );
};

export default BookSuccess;
