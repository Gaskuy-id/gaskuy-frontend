import React from "react";
import Layout from "../../components/Layout/Layout";
import headerHero from "../../assets/images/mobil.jpg";
import smallCar from "../../assets/images/smallCar.png";
import { Icon } from "@iconify/react";

const Home = () => {
  return (
    <Layout>
      {/* Header Home Section */}
      <section className="w-full bg-white text-[#000000] font-poppins py-8 md:py-8 px-4 md:px-0">
        {/* Bagian teks (judul, subjudul, icon-info) */}
        <div className="mx-auto text-center max-w-[700px]">
          <h1 className="md:text-[39px] font-semibold">
            Rent Our Cars Here
          </h1>
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
              />
              <p className="text-xs md:text-sm font-medium">
                100+ Mobil
              </p>
            </div>

            {/* 5 Cabang */}
            <div className="flex items-center">
              <Icon
                icon="ri:home-office-line"
                width="24"
                height="24"
                className="text-black mr-2"
              />
              <p className="text-xs md:text-sm font-medium">
                5 Cabang
              </p>
            </div>

            {/* 20K Users */}
            <div className="flex items-center">
              <Icon
                icon="lucide:user-round"
                width="24"
                height="24"
                className="text-black mr-2"
              />
              <p className="text-xs md:text-sm font-medium">
                20K Users
              </p>
            </div>
          </div>

          {/* Deskripsi */}
          <p className="text-xs md:text-sm text-black max-w-[700px] mx-auto leading-relaxed">
            Sewa mobil dengan harga termurah, pilihan kendaraan lengkap, anti ribet, 
            nyaman, dan siap jalan kapan saja untuk kebutuhan perjalananmu!
          </p>
        </div>

        <div className="w-full h-[300px] md:h-[310px] overflow-hidden">
          <img
            src={headerHero}
            alt="Header Hero"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </section>
    </Layout>
  );
};

export default Home;
