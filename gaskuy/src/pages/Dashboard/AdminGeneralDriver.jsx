import React, { useState, useEffect, useMemo } from "react";
import { Icon } from "@iconify/react";
import clsx from "clsx";
import API from "../../utils/api";

// Helper function to format date to Indonesian format
const formatToIndonesianDateTime = (dateString) => {
  if (!dateString) return "-";

  try {
    const date = new Date(dateString);

    // Format to Indonesian locale with timezone
    const options = {
      timeZone: "Asia/Jakarta", // Indonesian timezone
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false, // Use 24-hour format
    };

    const formatter = new Intl.DateTimeFormat("id-ID", options);
    const formatted = formatter.format(date);

    // The result will be in format: DD/MM/YYYY, HH:mm:ss
    // We can customize this further if needed
    return formatted.replace(",", ""); // Remove comma between date and time
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateString; // Return original if formatting fails
  }
};

// Alternative helper function for more customized format
const formatToCustomIndonesianDateTime = (dateString) => {
  if (!dateString) return "-";

  try {
    const date = new Date(dateString);

    // Convert to Indonesian timezone
    const jakartaDate = new Date(
      date.toLocaleString("en-US", { timeZone: "Asia/Jakarta" })
    );

    const day = jakartaDate.getDate().toString().padStart(2, "0");
    const month = (jakartaDate.getMonth() + 1).toString().padStart(2, "0");
    const year = jakartaDate.getFullYear();
    const hours = jakartaDate.getHours().toString().padStart(2, "0");
    const minutes = jakartaDate.getMinutes().toString().padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateString;
  }
};

// Styles untuk badge status - Updated to match all possible statuses
const statusStyles = {
  "Konfirmasi Pembayaran":
    "bg-yellow-100 text-yellow-800 border border-yellow-200",
  Dibatalkan: "bg-red-100 text-red-800 border border-red-200",
  "Konfirmasi Pengambilan": "bg-blue-100 text-blue-800 border border-blue-200",
  "Kendaraan Digunakan": "bg-green-100 text-green-800 border border-green-200",
  "Pengecekan Denda": "bg-orange-100 text-orange-800 border border-orange-200",
  "Konfirmasi Pembayaran Denda":
    "bg-purple-100 text-purple-800 border border-purple-200",
  "Konfirmasi Pengembalian":
    "bg-indigo-100 text-indigo-800 border border-indigo-200",
  Selesai: "bg-emerald-100 text-emerald-800 border border-emerald-200",
};

// Dummy summary metrics
const DUMMY_SUMMARY = {
  income: 500000000,
  expense: 100000000,
  totalTransactions: 340,
  completed: 200,
  inProcess: 40,
  penalties: 30,
  cancelled: 50,
  refunds: 20,
};

export default function AdminGeneralDriver({ selectedBranchId }) {
  // === State ===
  const [summary, setSummary] = useState({
    income: 0,
    expense: 0,
    totalTransactions: 0,
    completed: 0,
    inProcess: 0,
    penalties: 0,
    cancelled: 0,
    refunds: 0,
  });
  const [transactions, setTransactions] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);

  // State untuk menyimpan jawaban dan konfirmasi untuk setiap transaksi
  const [transactionAnswers, setTransactionAnswers] = useState({});
  const [transactionConfirmed, setTransactionConfirmed] = useState({});

  // === Fetch data on mount ===
  useEffect(() => {
    const fetchTransactions = async () => {
      console.log("Selected Branch ID:", selectedBranchId);
      if (!selectedBranchId) return;

      try {
        setLoading(true);
        const res = await API.get(`/cms/rentals?branchId=${selectedBranchId}`);
        console.log("API Response:", res.data.data);

        let newData = [];
        let summaryData = {
          income: 0,
          expense: 0,
          totalTransactions: 0,
          completed: 0,
          inProcess: 0,
          penalties: 0,
          cancelled: 0,
          refunds: 0,
        };

        // Initialize state objects for answers and confirmations
        const initialAnswers = {};
        const initialConfirmed = {};

        res.data.data.forEach((element) => {
          // Calculate summary metrics
          summaryData.totalTransactions++;

          // Hanya tambahkan ke income jika pembayaran sudah dikonfirmasi dengan jawaban 'yes'
          if (element.confirmations?.paymentPaid === true) {
            summaryData.income += element.amount || 0;
          }

          if (element.penalty > 0) {
            summaryData.penalties++;
          }

          newData.push({
            id: element._id,
            customer: element.ordererName,
            vehicle: element.vehicleId?.name || "N/A",
            transactionId: element.transactionId,
            startDate: element.startedAt,
            endDate: element.finishedAt,
            amount: element.amount || 0,
            penalty: element.penalty || 0,
            phone: element.ordererPhone,
            email: element.ordererEmail,
            pickupLocation: element.locationStart,
            driverName: element.driverId?.fullName || "-",
            driverPhone: element.driverId?.phoneNumber || "-",
            lastMaintenance: element.lastMaintenance || "-",
            confirmations: element.confirmations || {}, // Store original confirmations
          });

          // Initialize answers based on current confirmations
          initialAnswers[element._id] = {};
          initialConfirmed[element._id] = {};

          // Set initial answers based on confirmations
          if (element.confirmations) {
            if (element.confirmations.paymentPaid !== undefined) {
              initialAnswers[element._id][0] = element.confirmations.paymentPaid
                ? "yes"
                : "no";
              initialConfirmed[element._id][0] = true;
            }
            if (element.confirmations.vehicleTaken !== undefined) {
              initialConfirmed[element._id][1] =
                element.confirmations.vehicleTaken;
            }
            if (element.confirmations.finePaid !== undefined) {
              initialConfirmed[element._id][2] = element.confirmations.finePaid;
            }
            if (element.confirmations.vehicleReturned !== undefined) {
              initialConfirmed[element._id][3] =
                element.confirmations.vehicleReturned;
            }
          }
        });

        setTransactions(newData);
        setTransactionAnswers(initialAnswers);
        setTransactionConfirmed(initialConfirmed);
        setSummary(summaryData);

        console.log("Initial Answers:", initialAnswers);
        console.log("Initial Confirmed:", initialConfirmed);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        // Use dummy data as fallback
        setSummary(DUMMY_SUMMARY);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [selectedBranchId]);

  // Configure metrics
  const metrics = [
    {
      icon: "mdi:currency-usd",
      size: 32,
      label: "Total Pendapatan",
      value: summary.income,
      isCurrency: true,
    },
    {
      icon: "mdi:swap-horizontal",
      size: 28,
      label: "Total Transaksi",
      value: summary.totalTransactions,
    },
    {
      icon: "mdi:check-circle-outline",
      size: 28,
      label: "Total Selesai",
      value: summary.completed,
    },
    {
      icon: "mdi:autorenew",
      size: 28,
      label: "Dalam Proses",
      value: summary.inProcess,
    },
    {
      icon: "mdi:cash-refund",
      size: 28,
      label: "Total Bayar Denda",
      value: summary.penalties,
    },
    {
      icon: "mdi:bank-transfer-out",
      size: 28,
      label: "Total Pengembalian Dana",
      value: summary.refunds,
    },
  ];

  const formatValue = (v, cur) =>
    cur ? `Rp${v.toLocaleString("id-ID")}` : v.toLocaleString();

  // Filter transaksi
  const filtered = useMemo(
    () =>
      transactions.filter((t) =>
        [t.customer, t.vehicle, t.transactionId].some((str) =>
          str?.toLowerCase().includes(q.toLowerCase())
        )
      ),
    [transactions, q]
  );

  const toggleRow = (i) => setExpandedRow(expandedRow === i ? null : i);

  // Helper functions untuk mengelola state answers dan confirmed
  const getTransactionAnswers = (transactionId) => {
    return transactionAnswers[transactionId] || {};
  };

  const getTransactionConfirmed = (transactionId) => {
    return transactionConfirmed[transactionId] || {};
  };

  const setAnswerForTransaction = (transactionId, questionIndex, answer) => {
    setTransactionAnswers((prev) => ({
      ...prev,
      [transactionId]: {
        ...prev[transactionId],
        [questionIndex]: answer,
      },
    }));
  };

  const setConfirmedForTransaction = async (
    transactionId,
    questionIndex,
    status
  ) => {
    try {
      const confirmationTypes = [
        "paymentPaid",
        "vehicleTaken",
        "finePaid",
        "vehicleReturned",
      ];
      const confirmationType = confirmationTypes[questionIndex];

      console.log("Sending API request:", {
        transactionId,
        confirmationType,
        confirmationValue: status,
      });

      const result = await API.put(`/cms/rentals/${transactionId}`, {
        confirmationType,
        confirmationValue: status,
      });

      console.log("API Confirmation Result:", result.data);

      // Update local state only after successful API call
      setTransactionConfirmed((prev) => ({
        ...prev,
        [transactionId]: {
          ...prev[transactionId],
          [questionIndex]: status,
        },
      }));

      // Update the transaction's confirmations in the transactions array
      setTransactions((prev) =>
        prev.map((transaction) => {
          if (transaction.id === transactionId) {
            return {
              ...transaction,
              confirmations: {
                ...transaction.confirmations,
                [confirmationType]: status,
              },
            };
          }
          return transaction;
        })
      );

      console.log("State updated successfully");
    if (questionIndex === 0 && status === true) {
      const transaction = transactions.find(t => t.id === transactionId);
      if (transaction && transactionAnswers[transactionId]?.[0] === 'yes') {
        setSummary(prev => ({
          ...prev,
          income: prev.income + (transaction.amount || 0)
        }));
      }
    }
    
    // Update summary income jika konfirmasi pembayaran denda
    if (questionIndex === 2 && status === true) {
      const transaction = transactions.find(t => t.id === transactionId);
      if (transaction && transaction.penalty > 0) {
        setSummary(prev => ({
          ...prev,
          income: prev.income + (transaction.penalty || 0)
        }));
      }
    }
    } catch (error) {
      console.error("Error updating confirmation:", error);
      // Optionally show error message to user
      alert("Gagal menyimpan konfirmasi. Silakan coba lagi.");
    }
  };

  // Function to calculate dynamic status based on answers and confirmations
  const calculateDynamicStatus = (transaction) => {
    const answers = getTransactionAnswers(transaction.id);
    const confirmed = getTransactionConfirmed(transaction.id);

    console.log("Calculating status for transaction:", transaction.id);
    console.log("Answers:", answers);
    console.log("Confirmed:", confirmed);

    // Status awal
    if (!answers[0] || !confirmed[0]) {
      return "Konfirmasi Pembayaran";
    }

    // Jika customer belum bayar (jawaban "no" pada pertanyaan pertama)
    if (answers[0] === "no" && confirmed[0]) {
      return "Dibatalkan";
    }

    // Jika customer sudah bayar (jawaban "yes" pada pertanyaan pertama)
    if (answers[0] === "yes" && confirmed[0]) {
      // Jika mobil belum diberikan
      if (!confirmed[1]) {
        return "Konfirmasi Pengambilan";
      }

      // Jika mobil sudah diberikan
      if (confirmed[1]) {
        // Jika ada denda
        if (transaction.penalty > 0) {
          // Jika denda belum dikonfirmasi
          if (!confirmed[2]) {
            return "Konfirmasi Pembayaran Denda";
          }
          // Jika denda sudah dikonfirmasi, cek pengembalian mobil
          if (confirmed[2]) {
            if (!confirmed[3]) {
              return "Konfirmasi Pengembalian";
            }
            // Jika mobil sudah dikembalikan
            if (confirmed[3]) {
              return "Selesai";
            }
          }
        } else {
          // Jika tidak ada denda, langsung cek pengembalian mobil
          if (!confirmed[3]) {
            return "Konfirmasi Pengembalian";
          }
          // Jika mobil sudah dikembalikan
          if (confirmed[3]) {
            return "Selesai";
          }
        }

        // Default status ketika mobil sudah diberikan tapi belum ada konfirmasi selanjutnya
        return "Kendaraan Digunakan";
      }
    }

    return "Konfirmasi Pembayaran";
  };

  // Komponen detail transaction
  const TransactionDetail = ({ t }) => {
    // Ambil state dari parent component berdasarkan transaction ID
    const answers = getTransactionAnswers(t.id);
    const confirmed = getTransactionConfirmed(t.id);

    const fieldsLeft = [
      { label: "Total Bayar", value: `Rp ${t.amount.toLocaleString("id-ID")}` },
      { label: "Denda", value: `Rp ${t.penalty.toLocaleString("id-ID")}` },
      { label: "No Telp Customer", value: t.phone },
      { label: "Email Customer", value: t.email },
      { label: "Lokasi Pengambilan dan Pengembalian", value: t.pickupLocation },
      { label: "Nama Driver", value: t.driverName || "-" },
      { label: "No Telp Driver", value: t.driverPhone || "-" },
      { label: "Terakhir maintenance mobil", value: t.lastMaintenance || "-" },
    ];

    const baseQuestions = [
      { id: 0, text: "Apakah Customer Sudah Bayar?", type: "yesNo" },
      { id: 1, text: "Apakah Mobil Sudah Diberikan?", type: "confirmOnly" },
      { id: 3, text: "Apakah Mobil Sudah Dikembalikan?", type: "confirmOnly" },
    ];

    // Pertanyaan dinamis berdasarkan kondisi
    const getQuestions = () => {
      let questions = [...baseQuestions];

      // Jika penalty > 0, tambahkan pertanyaan pembayaran denda sebelum pertanyaan terakhir
      if (t.penalty > 0) {
        questions.splice(2, 0, {
          id: 2,
          text: "Apakah Customer Sudah membayar denda?",
          type: "confirmOnly",
        });
      }

      return questions;
    };

    // Fungsi untuk mengecek apakah pertanyaan pengembalian sudah bisa diakses
    const canAccessReturnQuestion = () => {
      // Jika tidak ada denda, bisa akses setelah mobil diberikan
      if (t.penalty === 0) {
        return confirmed[1]; // Setelah mobil diberikan
      }
      // Jika ada denda, bisa akses setelah denda dikonfirmasi
      return confirmed[1] && confirmed[2]; // Setelah mobil diberikan dan denda dikonfirmasi
    };

    // Fungsi untuk mengecek apakah pertanyaan bisa diakses (tidak disabled)
    const isQuestionAccessible = (questionIndex) => {
      // Jika transaksi dibatalkan, hanya pertanyaan pertama yang bisa diakses
      if (isTransactionCancelled() && questionIndex !== 0) {
        return false;
      }

      // Pertanyaan pertama selalu bisa diakses
      if (questionIndex === 0) return true;

      // Pertanyaan kedua (mobil diberikan) bisa diakses setelah pembayaran dikonfirmasi
      if (questionIndex === 1) {
        return answers[0] === "yes" && confirmed[0];
      }

      // Pertanyaan ketiga (pembayaran denda) bisa diakses setelah mobil diberikan
      if (questionIndex === 2) {
        return confirmed[1];
      }

      // Pertanyaan keempat (pengembalian mobil) bisa diakses berdasarkan kondisi denda
      if (questionIndex === 3) {
        return canAccessReturnQuestion();
      }

      return false;
    };

    const handleAnswerChange = (questionIndex, answer) => {
      setAnswerForTransaction(t.id, questionIndex, answer);
    };

    const handleConfirm = async (questionIndex) => {
      const question = getQuestions().find((q) => q.id === questionIndex);

      if (question.type === "confirmOnly") {
        // Untuk pertanyaan confirm only, langsung konfirmasi
        await setConfirmedForTransaction(t.id, questionIndex, true);
      } else {
        // Untuk pertanyaan yes/no, hanya bisa konfirmasi jika sudah ada jawaban
        if (answers[questionIndex]) {
          const confirmationValue = answers[questionIndex] === "yes";
          await setConfirmedForTransaction(
            t.id,
            questionIndex,
            confirmationValue
          );

          // Jika pertanyaan pertama dijawab "no" dan dikonfirmasi, batalkan semua pertanyaan lainnya
          if (questionIndex === 0 && answers[questionIndex] === "no") {
            const allQuestions = getQuestions();
            const cancelledConfirmations = {};

            // Set semua pertanyaan lain sebagai "dibatalkan"
            allQuestions.forEach((q) => {
              if (q.id !== 0) {
                cancelledConfirmations[q.id] = "cancelled";
              }
            });

            // Update state confirmed untuk transaction ini
            setTransactionConfirmed((prev) => ({
              ...prev,
              [t.id]: {
                ...prev[t.id],
                ...cancelledConfirmations,
              },
            }));
          }
        }
      }
    };

    // Fungsi untuk mengecek apakah transaksi dibatalkan
    const isTransactionCancelled = () => {
      return answers[0] === "no" && confirmed[0];
    };

    const AnswerButton = ({ questionIndex, type, isSelected, isDisabled }) => {
      const isNo = type === "no";
      const isQuestionDisabled = !isQuestionAccessible(questionIndex);
      const finalDisabled = isDisabled || isQuestionDisabled;

      const baseClasses =
        "w-6 h-6 border-2 rounded cursor-pointer flex items-center justify-center transition-all duration-200";
      const selectedClasses = isNo
        ? "border-red-500 bg-red-500"
        : "border-green-500 bg-green-500";
      const unselectedClasses = finalDisabled
        ? "border-gray-300 bg-gray-100 cursor-not-allowed"
        : "border-gray-300 bg-white hover:border-gray-400";

      return (
        <button
          onClick={() =>
            !finalDisabled && handleAnswerChange(questionIndex, type)
          }
          disabled={finalDisabled}
          className={clsx(
            baseClasses,
            isSelected ? selectedClasses : unselectedClasses
          )}
        >
          {isSelected && (
            <Icon
              icon={isNo ? "mdi:close" : "mdi:check"}
              width={16}
              height={16}
              className="text-white"
            />
          )}
        </button>
      );
    };

    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left side - Transaction details */}
          <div className="space-y-3">
            {fieldsLeft.map(({ label, value }) => (
              <div
                key={label}
                className="flex justify-between items-center py-1"
              >
                <span className="text-sm text-gray-700">{label}</span>
                <span className="text-sm font-medium text-gray-900">
                  {value}
                </span>
              </div>
            ))}
          </div>

          {/* Right side - Questions */}
          <div className="space-y-4">
            {getQuestions().map((question) => {
              const isConfirmed = confirmed[question.id];
              const isCancelled = confirmed[question.id] === "cancelled";
              const hasAnswer = answers[question.id];
              const isConfirmOnly = question.type === "confirmOnly";
              const isAccessible = isQuestionAccessible(question.id);
              const isTransCancelled = isTransactionCancelled();

              return (
                <div
                  key={question.id}
                  className={clsx(
                    "flex items-center justify-between gap-4 p-3 rounded-md transition-all duration-300",
                    isConfirmed || isCancelled
                      ? "bg-gray-100"
                      : "bg-transparent",
                    (!isAccessible || isTransCancelled) && question.id !== 0
                      ? "opacity-50"
                      : "opacity-100"
                  )}
                >
                  <span
                    className={clsx(
                      "text-sm flex-1",
                      isConfirmed || isCancelled
                        ? "text-gray-500"
                        : isAccessible && !isTransCancelled
                        ? "text-gray-700"
                        : "text-gray-400"
                    )}
                  >
                    {question.text}
                  </span>
                  <div className="flex items-center gap-3">
                    {!isConfirmOnly && (
                      <div className="flex items-center gap-2">
                        <AnswerButton
                          questionIndex={question.id}
                          type="no"
                          isSelected={answers[question.id] === "no"}
                          isDisabled={isConfirmed || isCancelled}
                        />
                        <AnswerButton
                          questionIndex={question.id}
                          type="yes"
                          isSelected={answers[question.id] === "yes"}
                          isDisabled={isConfirmed || isCancelled}
                        />
                      </div>
                    )}
                    {isConfirmed && !isCancelled ? (
                      <div className="px-4 py-1.5 text-sm text-gray-500 border border-gray-300 rounded-md bg-gray-50">
                        Terkonfirmasi
                      </div>
                    ) : isCancelled ? (
                      <div className="px-4 py-1.5 text-sm text-gray-500 border border-gray-300 rounded-md bg-gray-50">
                        Dibatalkan
                      </div>
                    ) : (
                      <button
                        onClick={() => handleConfirm(question.id)}
                        disabled={
                          (!isConfirmOnly && !hasAnswer) ||
                          !isAccessible ||
                          (isTransCancelled && question.id !== 0)
                        }
                        className={clsx(
                          "px-4 py-1.5 text-sm border rounded-md transition-colors whitespace-nowrap",
                          (isConfirmOnly || hasAnswer) &&
                            isAccessible &&
                            (!isTransCancelled || question.id === 0)
                            ? "text-teal-600 border-teal-600 hover:bg-teal-50 cursor-pointer"
                            : "text-gray-400 border-gray-300 cursor-not-allowed"
                        )}
                      >
                        Konfirmasi
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Icon
            icon="eos-icons:loading"
            width={40}
            height={40}
            className="animate-spin mx-auto mb-2"
          />
          <p className="text-gray-500">Memuat data...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {metrics.map((m, i) => (
          <div
            key={i}
            className="bg-white rounded-lg p-4 flex flex-col space-y-2"
          >
            <Icon
              icon={m.icon}
              width={m.size}
              height={m.size}
              className="text-black"
            />
            <div className="text-sm text-black">{m.label}</div>
            <div className="text-xl font-semibold">
              {formatValue(m.value, m.isCurrency)}
            </div>
          </div>
        ))}
      </div>

      {/* Tabel Riwayat Transaksi */}
      <div className="bg-white rounded-2xl shadow flex flex-col flex-1 p-6 min-h-0">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Riwayat Transaksi</h2>
          <div className="relative">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Cari transaksi..."
              className="w-64 border rounded-lg pl-10 pr-4 py-2 focus:ring focus:ring-blue-200 focus:border-green-500 outline-none"
            />
            <Icon
              icon="ic:outline-search"
              width={20}
              height={20}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>

        <div className="flex-1 overflow-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                {[
                  "Penyewa",
                  "Kendaraan",
                  "ID Transaksi",
                  "Tanggal Sewa",
                  "Status",
                  "Lainnya",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filtered.map((t, i) => (
                <React.Fragment key={t.id}>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-sm text-gray-800">
                      {t.customer}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-800">
                      {t.vehicle}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-800">
                      {t.transactionId}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-800">
                      <div className="space-y-1">
                        <div className="text-xs text-gray-600">
                          Mulai: {formatToCustomIndonesianDateTime(t.startDate)}
                        </div>
                        <div className="text-xs text-gray-600">
                          Selesai: {formatToCustomIndonesianDateTime(t.endDate)}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={clsx(
                          "px-3 py-1 text-xs rounded-full font-medium",
                          statusStyles[calculateDynamicStatus(t)] ||
                            "bg-gray-100 text-gray-800 border border-gray-200"
                        )}
                      >
                        {calculateDynamicStatus(t)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => toggleRow(i)}
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                      >
                        <Icon
                          icon={
                            expandedRow === i
                              ? "tabler:chevron-up"
                              : "tabler:chevron-down"
                          }
                          width={20}
                          height={20}
                          className="text-gray-600"
                        />
                      </button>
                    </td>
                  </tr>
                  {expandedRow === i && (
                    <tr>
                      <td colSpan={6} className="px-4 py-4 bg-gray-50">
                        <TransactionDetail t={t} />
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-8 text-center text-gray-400"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Icon
                        icon="tabler:inbox"
                        width={48}
                        height={48}
                        className="text-gray-300"
                      />
                      <span>Data tidak ditemukan</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
