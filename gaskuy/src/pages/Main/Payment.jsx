import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LayoutBooking from "../../components/Layout/LayoutBooking";
import jalanan from "../../assets/images/jalanan.png";
import qr from "../../assets/images/qr.png";
import { Icon } from "@iconify/react";
import API from "../../utils/api";
import Layout from "../../components/Layout/Layout";

const PaymentPage = () => {
  const [paymentStatus, setPaymentStatus] = useState();
  const [paymentAmount, setPaymentAmount] = useState();
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const rentalId = location.state?.rentalId;
  const amount = location.state?.amount;
  const transactionId = location.state?.transactionId;
//   console.log(paymentAmount);

//   useEffect(() => {

//     {/* Fetch Transactions Amount */}
//     const fetchTransactions = async () => {
//       console.log(rentalId)
//       const res = await API.get(`/vehicles/${rentalId}/checkout`)
//       console.log(res)
//     };

//     fetchTransactions();
//   });

  {/* Check Confirmation */}
  const handleConfirmation = async () => {
    try {
      const res = await API.post('/rental/checkConfirmation', {rentalId: `${rentalId}`});
      
      const status = res.data.data;
      setPaymentStatus(status);

      if (status === true) {
        navigate('/book-success', {
          state: {
            transactionId: transactionId
          }
        });
      } else {
        setShowPopup(true); // munculkan popup
      }
    } catch (error) {
      console.error("Gagal verifikasi:", error);
      setShowPopup(true); // fallback jika gagal
    }
  };

  const handleCancel = async (rentalId) => {
    const confirmCancel = window.confirm('Apakah kamu yakin ingin membatalkan pesanan ini?');
    if (!confirmCancel) return;

    try {
      await API.post(`/rental/${rentalId}/cancel`);
      alert('Pesanan berhasil dibatalkan.');
      navigate('/')
    } catch (error) {
      console.error('Gagal membatalkan pesanan:', error);
      alert('Gagal membatalkan pesanan. Silakan coba lagi.');
    }
  };

  return (
    <Layout>
      <LayoutBooking>
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
          <div className="w-full max-w-6xl px-4 mb-12"> 
            <h2 className="text-center text-3xl font-bold mb-8 md:text-[30px] leading-tight">
              <span>Pembayaran </span>
              <span className="bg-[linear-gradient(to_bottom,transparent_50%,#AAEEC4_50%)] px-1">
                Pesanan
              </span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Step 1 */}
              <div className="border border-gray-300 rounded-2xl p-6 relative bg-white shadow-sm">
                <div className="absolute top-4 right-4 bg-[#C7F6D1] text-black font-semibold px-4 py-1 rounded-lg">
                  Step 1
                </div>
                <p className="text-[22px] font-bold text-black mb-4 mt-[-6px]">
                  No. Rekening
                </p>
                <p className="text-[18.3px] font-semibold text-black mb-3">
                  127–812–8383 (BCA) – Muhammad Faqih Khawarizmi
                </p>
                <hr className="my-[16px] border-black" />
                <div className="flex justify-between items-center">
                  <p className="text-[20px] font-bold mt-1">Jumlah Pembayaran</p>
                  <p className="text-lg font-bold text-[#00B496]">Rp{amount.toLocaleString("id-ID")}</p>
                </div>
                <p className="text-[8px] font-bold text-[#7D7878] mt-[-2px]">
                  *Sudah termasuk pajak
                </p>
                <div className="bg-[#E6F7F4] rounded-2xl flex items-center px-4 py-2 mt-5">
                  <Icon
                    icon="fluent:payment-16-regular"
                    className="text-xl mr-2 text-[#0ACF83]"
                  />
                  <span className="text-[12px] text-gray-700">
                    Step 1: Lakukan pembayaran pada No. Rekening berikut.
                  </span>
                </div>
              </div>

              {/* Step 2 */}
              <div className="border border-gray-300 rounded-2xl p-6 relative bg-white shadow-sm">
                <div className="absolute top-4 right-4 bg-[#C7F6D1] text-black font-semibold px-4 py-1 rounded-lg">
                  Step 2
                </div>
                <p className="text-[22px] font-bold text-black mb-4 mt-[-6px]">
                  Konfirmasi Pembayaran
                </p>
                <p className="text-[17.4px] text-black font-semibold">
                  Konfirmasi Pembayaran Dengan Menekan
                </p>
                <p className="text-[15.5px] text-black font-light mb-4">
                  Tombol Dibawah atau Scan QR Code Disamping
                </p>
                
                {/* QR Code and Button Container */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex-1">
                    <button
                      className="bg-[#AAEEC4] hover:bg-black hover:text-white transition text-black font-bold py-2 px-6 rounded-2xl w-full mb-1 text-[12px]"
                      onClick={() =>
                        window.open(
                          "https://web.whatsapp.com/send?phone=6281392610510&text=*%5BKONFIRMASI%20PEMBAYARAN%5D*%20%F0%9F%92%B8%E2%9C%85%0A%0AHalo%20Min%20Gaskuyy!%20%F0%9F%91%8B%F0%9F%98%84%0ASaya%20sudah%20melakukan%20pembayaran%20atas%20nama%20%5BNama%20Pelanggan%5D%20%F0%9F%A7%BE%0Adari%20Bank%20%5BNama%20Bank%20%E2%80%93%20No.%20Rek%5D%20%F0%9F%8F%A6%0AMohon%20bantuannya%20untuk%20konfirmasi%20ya%20%F0%9F%99%8F%0ATerima%20kasih%20banyak!%20%F0%9F%98%8A%E2%9C%A8",
                          "_blank"
                        )
                      }
                    >
                      Konfirmasi via Whatsapp
                    </button>
                  </div>
                  
                  {/* QR Code */}
                  <div className="ml-4 mt-[-68px] flex justify-center items-center">
                    <img
                      src={qr}
                      alt="QR Code Whatsapp"
                      className="w-[100px] h-[100px] object-contain"
                    />
                  </div>
                </div>
                
                <div className="bg-[#E6F7F4] rounded-2xl flex items-center px-4 py-2 mt-5">
                  <Icon
                    icon="mdi:whatsapp"
                    className="text-xl mr-2 ml-1 mt-[-1px] text-[#0ACF83]"
                  />
                  <span className="text-[12px] text-gray-700">
                    Step 2: Lakukan konfirmasi pada admin Gasskuy.id
                  </span>
                </div>
              </div>
            </div>

            {/* Status Verifikasi dan Batalkan */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              {/* Tombol Verifikasi */}
              <button
                onClick={handleConfirmation}
                className="bg-[#C7F6D1] hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer rounded-full py-2.5 px-6 font-semibold text-black w-full sm:w-[80%]"
              >
                Verifikasi Status Konfirmasi
              </button>

              {/* Tombol Batalkan */}
              <button
                onClick={() => handleCancel(rentalId)}
                className="bg-red-200 hover:bg-red-600 hover:text-white transition-colors duration-200 cursor-pointer rounded-full py-2.5 px-6 font-semibold text-red-700 w-full sm:w-auto"
              >
                Batalkan Pesanan
              </button>
            </div>

            {showPopup && (
              <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
                <div className="bg-white p-6 rounded-2xl shadow-xl text-center max-w-sm w-full">
                  <h3 className="text-lg font-semibold mb-4 text-black">
                    Konfirmasi Belum Tersedia
                  </h3>
                  <p className="text-sm text-gray-700 mb-6">
                    Pembayaran kamu belum dikonfirmasi. Silakan coba lagi nanti atau hubungi admin.
                  </p>
                  <button
                    onClick={() => setShowPopup(false)}
                    className="px-4 py-2 bg-[#AAEEC4] text-black font-semibold rounded-full hover:bg-black hover:text-white transition"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Background Illustration */}
          <div className="flex justify-center mt-[-60px]">
            <img
              src={jalanan}
              alt="Payment Illustration"
              className="w-full max-w-[1920px] h-auto"
            />
          </div>
        </div>
      </LayoutBooking>
    </Layout>
  );
};

export default PaymentPage;