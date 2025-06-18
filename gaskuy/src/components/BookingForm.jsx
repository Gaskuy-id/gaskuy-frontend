import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import penumpang from "../assets/images/penumpang.png";
import tanggal from "../assets/images/tanggal.png";
import jam from "../assets/images/jam.png";
import { Icon } from "@iconify/react";

const BookingForm = ({ onTipeLayananChange, onSearch, branches, loadingBranches, defaultValues = {} }) => {
    const [tipeLayanan, setTipeLayanan] = useState(defaultValues.tipeLayanan || "");
    const [tempatRental, setTempatRental] = useState(defaultValues.tempatRental || "");
    const [jumlahPenumpang, setJumlahPenumpang] = useState(defaultValues.jumlahPenumpang || "");
    const [tanggalMulai, setTanggalMulai] = useState(defaultValues.tanggalMulai || "");
    const [waktuMulai, setWaktuMulai] = useState(defaultValues.waktuMulai || "");
    const [tanggalSelesai, setTanggalSelesai] = useState(defaultValues.tanggalSelesai || "");
    const [waktuSelesai, setWaktuSelesai] = useState(defaultValues.waktuSelesai || "");

    const navigate = useNavigate();

    useEffect(() => {
        const storedForm = localStorage.getItem("bookingForm");
        if (storedForm) {
            const parsedForm = JSON.parse(storedForm);
            setTipeLayanan(parsedForm.tipeLayanan || "");
            setTempatRental(parsedForm.tempatRental || "");
            setJumlahPenumpang(parsedForm.jumlahPenumpang || "");
            setTanggalMulai(parsedForm.tanggalMulai || "");
            setWaktuMulai(parsedForm.waktuMulai || "");
            setTanggalSelesai(parsedForm.tanggalSelesai || "");
            setWaktuSelesai(parsedForm.waktuSelesai || "");
            onTipeLayananChange(parsedForm.tipeLayanan || "");
        }
    }, []);

    const handleTipeLayananChange = (value) => {
        setTipeLayanan(value);
        onTipeLayananChange(value);
    };

    const handleCari = async () => {
        if (!tipeLayanan || !tempatRental || !jumlahPenumpang || !tanggalMulai || !waktuMulai || !tanggalSelesai || !waktuSelesai) {
            alert("Mohon lengkapi semua field sebelum mencari mobil.");
            return;
        }

        const selectedBranch = branches.find(branch => branch.name === tempatRental);
        if (!selectedBranch) {
            alert("Branch tidak ditemukan. Silakan pilih tempat rental yang valid.");
            return;
        }

        const searchParams = {
            branchId: selectedBranch._id,
            jumlahPenumpang: parseInt(jumlahPenumpang),
            tempatRental,
            tanggalMulai,
            waktuMulai,
            tanggalSelesai,
            waktuSelesai,
            tipeLayanan
        };

        localStorage.setItem("bookingForm", JSON.stringify({
            tipeLayanan,
            tempatRental,
            jumlahPenumpang,
            tanggalMulai,
            waktuMulai,
            tanggalSelesai,
            waktuSelesai
        }));

        onSearch(searchParams);
    };

    return (
        <section className="w-full bg-white font-poppins px-4 mt-[-20px] md:mt-[-15px] relative z-10">
            <div className="bg-white rounded-xl shadow-[4px_4px_20px_12px_rgba(0,0,0,0.1)] w-full max-w-[940px] mx-auto px-6 py-6 md:px-8 md:py-7 mb-10">
                <h3 className="text-[20px] mb-4 text-black">Tipe Layanan:</h3>
                <div className="flex gap-8 mb-7">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="tipeLayanan"
                            value="dengan"
                            checked={tipeLayanan === "dengan"}
                            onChange={() => handleTipeLayananChange("dengan")}
                            className="w-7 h-7 appearance-none border border-black rounded-full checked:bg-[#9CE0B6] transition focus:outline-none cursor-pointer"
                        />
                        <span className="text-[16px] text-black">Dengan Sopir</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="tipeLayanan"
                            value="tanpa"
                            checked={tipeLayanan === "tanpa"}
                            onChange={() => handleTipeLayananChange("tanpa")}
                            className="w-7 h-7 appearance-none border border-black rounded-full checked:bg-[#9CE0B6] transition focus:outline-none cursor-pointer"
                        />
                        <span className="text-[16px] text-black">Tanpa Sopir</span>
                    </label>
                </div>

                <div className="text-sm text-black">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
                        <div>
                            <label className="block mb-1 text-[15px]">Tempat rental</label>
                            <div className="flex items-center gap-2 border-b border-gray-400 pb-1">
                                <Icon icon="hugeicons:maps-square-01" width="32" />
                                <select
                                    className="w-full outline-none bg-transparent text-[15px] font-light mb-[-1px] py-1"
                                    value={tempatRental}
                                    onChange={(e) => setTempatRental(e.target.value)}
                                    disabled={loadingBranches}
                                >
                                    <option value="">
                                        {loadingBranches ? "Memuat..." : "Pilih Kota"}
                                    </option>
                                    {branches.map((branch) => (
                                        <option key={branch.id} value={branch.name}>
                                            {branch.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="md:col-span-1">
                            <label className="block mb-1 text-[15px]">Jumlah penumpang</label>
                            <div className="flex items-center gap-2 border-b border-gray-400 pb-1">
                                <img src={penumpang} alt="Penumpang" className="w-6 h-6 mt-1 mb-1" />
                                <input
                                    type="number"
                                    min="1"
                                    placeholder="Berapa Orang?"
                                    className="w-full outline-none bg-transparent text-[15px] font-light mb-[-1px] ml-1"
                                    value={jumlahPenumpang}
                                    onChange={(e) => setJumlahPenumpang(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="hidden md:block"></div>
                        <div className="hidden md:block"></div>
                    </div>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-5 gap-5">
                        <div>
                            <label className="block mb-1 text-[15px]">Tanggal mulai</label>
                            <div className="flex items-center gap-2 border-b border-gray-400 pb-1">
                                <img src={tanggal} alt="tanggal mulai" className="w-6 h-6 mt-1 mb-1" />
                                <input
                                    type="date"
                                    className="w-[80%] outline-none bg-transparent text-[15px] font-light mb-[-1px]"
                                    value={tanggalMulai}
                                    onChange={(e) => setTanggalMulai(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block mb-1 text-[15px]">Waktu mulai</label>
                            <div className="flex items-center gap-2 border-b border-gray-400 pb-1">
                                <img src={jam} alt="waktu mulai" className="w-6 h-6 mt-1 mb-1" />
                                <input
                                    type="time"
                                    className="w-[80%] outline-none bg-transparent text-[15px] font-light mb-[-3px]"
                                    value={waktuMulai}
                                    onChange={(e) => setWaktuMulai(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block mb-1 text-[15px]">Tanggal selesai</label>
                            <div className="flex items-center gap-2 border-b border-gray-400 pb-1">
                                <img src={tanggal} alt="tanggal selesai" className="w-6 h-6 mt-1 mb-1" />
                                <input
                                    type="date"
                                    className="w-[80%] outline-none bg-transparent text-[15px] font-light mb-[-3px]"
                                    value={tanggalSelesai}
                                    onChange={(e) => setTanggalSelesai(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block mb-1 text-[15px]">Waktu selesai</label>
                            <div className="flex items-center gap-2 border-b border-gray-400 pb-1">
                                <img src={jam} alt="waktu selesai" className="w-6 h-6 mt-1 mb-1" />
                                <input
                                    type="time"
                                    className="w-[80%] outline-none bg-transparent text-[15px] font-light mb-[-3px]"
                                    value={waktuSelesai}
                                    onChange={(e) => setWaktuSelesai(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex items-end justify-end">
                            <button
                                onClick={handleCari}
                                className="text-[15px] bg-[#9CE0B6] text-black hover:bg-black hover:text-white transition font-semibold px-6 py-2 rounded-xl cursor-pointer mr-2"
                            >
                                Cari
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BookingForm;