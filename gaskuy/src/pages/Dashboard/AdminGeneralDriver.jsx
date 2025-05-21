import React, { useState, useEffect, useMemo } from "react";
import { Icon } from "@iconify/react";
import clsx from "clsx";

// Styles untuk badge status
const statusStyles = {
  "Proses Pengambilan": "bg-gray-300 text-black",
  "Dalam Penjemputan": "bg-pink-300 text-black",
  "Dalam Proses": "bg-blue-300 text-black",
  "Sudah Selesai": "bg-green-300 text-black",
  "Bayar Denda": "bg-red-300 text-black",
  "Dibatalkan": "bg-yellow-300 text-black",
  "Pengembalian Mobil": "bg-purple-300 text-black",
  "Pengembalian Dana": "bg-amber-300 text-black",
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

// Dummy transaksi
const DUMMY_TRANSACTIONS = [
  {
    id: "tx001",
    customer: "Akira Nagai",
    vehicle: "Burok Gus Faqih",
    transactionId: "ABC123",
    startDate: "14/03/2025, 23:37",
    endDate: "15/03/2025, 02:30",
    status: "Proses Pengambilan",
    amount: 600000,
    phone: "089281231273",
    email: "akiranagai@gmail.com",
    pickupLocation: "Kantor Rental",
    driverName: "-",
    driverPhone: "-",
    lastMaintenance: "14/01/2025",
  },
  {
    id: "tx002",
    customer: "Maria Dewi",
    vehicle: "Burok Gus Aspa",
    transactionId: "DEF456",
    startDate: "01/04/2025, 10:00",
    endDate: "01/04/2025, 14:00",
    status: "Dalam Proses",
    amount: 800000,
    phone: "081234567890",
    email: "maria.dewi@example.com",
    pickupLocation: "Bandung Office",
    driverName: "Budi Santoso",
    driverPhone: "082112345678",
    lastMaintenance: "20/02/2025",
  },
  {
    id: "tx003",
    customer: "Joko Widodo",
    vehicle: "Burok Gus Asri",
    transactionId: "GHI789",
    startDate: "05/04/2025, 08:30",
    endDate: "05/04/2025, 12:45",
    status: "Sudah Selesai",
    amount: 700000,
    phone: "081998877665",
    email: "jokowi@example.com",
    pickupLocation: "Semarang HQ",
    driverName: "Siti Aminah",
    driverPhone: "085556677889",
    lastMaintenance: "10/03/2025",
  },
];

export default function AdminGeneralDriver() {
  // === state ===
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

  // === mimic fetching data on mount ===
  useEffect(() => {
    // simulate API response
    setSummary(DUMMY_SUMMARY);
    setTransactions(DUMMY_TRANSACTIONS);
  }, []);

  // configure metrics
  const metrics = [
    {
      icon: "mdi:currency-usd",
      size: 32,
      label: "Total Pendapatan",
      value: summary.income,
      isCurrency: true,
    },
    {
      icon: "mdi:currency-usd-off",
      size: 32,
      label: "Total Pengeluaran",
      value: summary.expense,
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
      icon: "mdi:cancel",
      size: 28,
      label: "Total Dibatalkan",
      value: summary.cancelled,
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

  // filter transaksi
  const filtered = useMemo(
    () =>
      transactions.filter((t) =>
        [t.customer, t.vehicle, t.transactionId]
          .some((str) => str.toLowerCase().includes(q.toLowerCase()))
      ),
    [transactions, q]
  );

  const toggleRow = (i) =>
    setExpandedRow(expandedRow === i ? null : i);

  // Komponen detail
  const TransactionDetail = ({ t }) => {
    const fieldsLeft = [
      { label: "Total Bayar", value: `Rp${t.amount.toLocaleString("id-ID")}` },
      { label: "No Telp Customer", value: t.phone },
      { label: "Email Customer", value: t.email },
      { label: "Lokasi Pengambilan dan Pengembalian", value: t.pickupLocation },
      { label: "Nama Driver", value: t.driverName || "-" },
      { label: "No Telp Driver", value: t.driverPhone || "-" },
      { label: "Terakhir maintenance mobil", value: t.lastMaintenance || "-" },
    ];
    const questions = [
      "Apakah Customer Meminta Pengembalian Dana?",
      "Apakah Mobil Sudah Diberikan?",
      "Apakah Mobil Sudah Dikembalikan?",
      "Apakah Customer Membayar Denda?",
    ];

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2 text-sm">
          {fieldsLeft.map(({ label, value }) => (
            <div key={label} className="flex justify-between">
              <span>{label}</span>
              <span className="font-medium">{value}</span>
            </div>
          ))}
        </div>
        <div className="border border-green-200 rounded-lg p-4 space-y-4">
          {questions.map((q) => (
            <div key={q} className="flex items-center justify-between">
              <span className="text-sm">{q}</span>
              <div className="flex items-center space-x-2">
                <span className="w-4 h-4 border border-gray-300 rounded-full" />
                <span className="w-4 h-4 border border-gray-300 rounded-full" />
              </div>
              <button className="text-green-600 border border-green-600 rounded px-3 py-1 text-sm hover:bg-green-50">
                Konfirmasi
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {metrics.map((m, i) => (
          <div key={i} className="bg-white rounded-lg p-4 flex flex-col space-y-2">
            <Icon icon={m.icon} width={m.size} height={m.size} className="text-black" />
            <div className="text-sm text-black">{m.label}</div>
            <div className="text-xl font-semibold">{formatValue(m.value, m.isCurrency)}</div>
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
              className="w-64 border rounded-lg pl-10 pr-4 py-2 focus:ring"
            />
            <Icon icon="ic:outline-search" width={20} height={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <div className="flex-1 overflow-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                {["Penyewa", "Kendaraan", "ID Transaksi", "Tanggal Sewa", "Status", "Lainnya"].map((h) => (
                  <th key={h} className="px-4 py-2 text-left text-sm font-medium text-gray-700">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map((t, i) => (
                <React.Fragment key={t.id}>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-800">{t.customer}</td>
                    <td className="px-4 py-3 text-sm text-gray-800">{t.vehicle}</td>
                    <td className="px-4 py-3 text-sm text-gray-800">{t.transactionId}</td>
                    <td className="px-4 py-3 text-sm text-gray-800">
                      <div>{t.startDate}</div>
                      <div>{t.endDate}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={clsx("px-3 py-1 text-xs rounded-full", statusStyles[t.status])}>{t.status}</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button onClick={() => toggleRow(i)}>
                        <Icon icon={expandedRow === i ? "tabler:chevron-up" : "tabler:chevron-down"} width={20} />
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
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-400">Data tidak ditemukan</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
