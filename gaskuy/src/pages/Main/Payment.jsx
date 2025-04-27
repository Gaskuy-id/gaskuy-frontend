import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import jalanan from "../../assets/images/jalanan.png";
import keycar from "../../assets/images/keycar.png";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

const PaymentPage = () => {
  const [paymentStatus, setPaymentStatus] = useState("pending");
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="min-h-screen flex flex-col items-center">
        {/* Progress */}
        <div className="mt-10 text-center">
          <h1 className="text-[52px] font-semibold mb-3">Pembayaran</h1>
          <p className="text-[28px] font-normal mb-8">
            Lengkapi pembayaranmu untuk melanjutkan!
          </p>

          <div className="flex items-center justify-center mb-10">
            {/* Step 1 */}
            <div className="flex items-center space-x-2">
              <div className="w-[69px] h-[69px] rounded-full bg-[#59A618] text-[32px] font-semibold flex items-center justify-center">
                1
              </div>
              <span className="text-[32px] font-semibold ml-4">Book</span>
            </div>
            {/* Line 1-2 */}
            <div className="w-[265px] h-1 bg-[#59A618] mx-2" />
            {/* Step 2 */}
            <div className="flex items-center space-x-2">
              <div
                className={`w-[69px] h-[69px] rounded-full flex items-center justify-center text-[32px] font-semibold ${
                  paymentStatus === "paid"
                    ? "bg-[#59A618] text-black"
                    : "border-4 border-[#59A618] text-black"
                }`}
              >
                2
              </div>
              <span
                className={`text-[32px] font-semibold ml-4 ${
                  paymentStatus === "paid" ? "text-black" : "text-black"
                }`}
              >
                Payment
              </span>
            </div>
            {/* Line 2-3 */}
            <div
              className={`w-[265px] h-1 mx-2 ${
                paymentStatus === "paid" ? "bg-[#59A618]" : "bg-gray-300"
              }`}
            />
            {/* Step 3 */}
            <div className="flex items-center space-x-2">
              <div className="w-[69px] h-[69px] rounded-full border-4 border-gray-300 text-[32px] font-semibold flex items-center justify-center text-gray-300">
                3
              </div>
              <span className="text-[32px] font-semibold ml-4 text-gray-300">
                Done
              </span>
            </div>
          </div>
        </div>

        {/* Payment Section */}
        <motion.div
          className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-[500px] flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            animate={{ rotate: paymentStatus === "paid" ? 360 : 0 }}
            transition={{ duration: 0.8 }}
            className="mb-4"
          >
            <Icon
              icon={
                paymentStatus === "paid"
                  ? "ic:round-check-circle"
                  : "mdi:clock-outline"
              }
              width={64}
              height={64}
              className={
                paymentStatus === "paid"
                  ? "text-green-500"
                  : "text-yellow-500 animate-pulse"
              }
            />
          </motion.div>

          <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
            {paymentStatus === "paid"
              ? "Pembayaran Berhasil!"
              : "Menunggu Pembayaran"}
          </h2>
          <p className="text-gray-600 mb-6 text-center">
            {paymentStatus === "paid"
              ? "Terima kasih! Pembayaran Anda sudah kami terima."
              : "Silakan klik tombol di bawah untuk melakukan pembayaran."}
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-3 rounded-full font-semibold shadow-md focus:outline-none transition-colors
              ${
                paymentStatus === "paid"
                  ? "bg-gray-800 text-white hover:bg-gray-700"
                  : "bg-gradient-to-r from-green-400 to-teal-500 text-white hover:from-green-500 hover:to-teal-600"
              }`}
            onClick={() =>
              paymentStatus === "paid"
                ? navigate("/book-success")
                : setPaymentStatus("paid")
            }
          >
            {paymentStatus === "paid" ? "Lanjutkan" : "Bayar Sekarang"}
          </motion.button>
        </motion.div>

        {/* Reminder */}
        <div className="w-full flex justify-center px-4 max-w-[739px] mt-8">
          <div className="flex items-center bg-[#E8F7F5] rounded-3xl p-4 w-full">
            <img src={keycar} alt="KeyCar Logo" width="33" height="33" />
            <p className="text-[#6F585A] font-normal text-[13px] ml-2">
              Pastikan kamu menyelesaikan pembayaran sebelum batas waktu agar
              pesanan tidak hangus.
            </p>
          </div>
        </div>

        {/* Background Illustration */}
        <div className="flex justify-center mt-3">
          <img
            src={jalanan}
            alt="Payment Illustration"
            className="w-full max-w-[1920px] h-auto"
          />
        </div>
      </div>
    </Layout>
  );
};

export default PaymentPage;
