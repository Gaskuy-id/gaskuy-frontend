import React, { useState } from 'react';

const AdminVehicle = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('Jakarta');
  
  // Sample data adjusted to match reference
  const vehicles = [
    { id: 1, name: 'Buruk Quiz Faqih', rentPrice: 'Rp200.000/jam', kilometers: '50.000', year: '2012', seats: '4', luggage: '50 Liter', engine: '2000 CC', status: 'Tersedia' },
    { id: 2, name: 'Buruk Quiz Aspa', rentPrice: 'Rp300.000/jam', kilometers: '50.000', year: '2015', seats: '5', luggage: '50 Liter', engine: '4000 CC', status: 'Tidak Tersedia' },
    { id: 3, name: 'Buruk Quiz Aspa', rentPrice: 'Rp300.000/jam', kilometers: '50.000', year: '2015', seats: '5', luggage: '50 Liter', engine: '4000 CC', status: 'Tidak Tersedia' },
  ];

  // Filter vehicles based on search term
  const filteredVehicles = vehicles.filter(vehicle => 
    vehicle.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Vehicle stats
  const stats = {
    total: 20,
    available: 10,
    inUse: 5,
    maintenance: 5
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar remains unchanged */}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header remains unchanged */}
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-100 p-4">
          {/* Stats Cards - Updated titles */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded shadow">
              {/* Icon and content */}
              <p className="text-sm text-gray-600">Teknik Kendaraan</p>
              <p className="text-xl font-bold">{stats.total}</p>
              <div className="mt-2 space-y-1">
                <p className="text-sm">Kendaraan Tersedia {stats.available}</p>
                <p className="text-sm">Kendaraan Terpakai {stats.inUse}</p>
                <p className="text-sm">Dalam Perawatan {stats.maintenance}</p>
              </div>
            </div>
            
            {/* Removed redundant stats cards */}

            {/* Year Filter Section */}
            <div className="bg-white p-4 rounded shadow col-span-3">
              <h3 className="text-lg font-semibold mb-4">Yılında Kendaraan</h3>
              {/* Year filter content */}
            </div>
          </div>

          {/* Table Section - Adjusted headers */}
          <div className="bg-white rounded shadow">
            <div className="p-4 flex justify-between items-center border-b">
              <div></div>
              <div className="flex items-center gap-4">
                {/* Add vehicle button and search remain unchanged */}
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Nama</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Harga Sawa</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Kilometer</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Tahun</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Kursi</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Bagasi</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Mesin</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredVehicles.map((vehicle) => (
                    <tr key={vehicle.id}>
                      <td className="px-4 py-3 text-sm">{vehicle.name}</td>
                      <td className="px-4 py-3 text-sm">{vehicle.rentPrice}</td>
                      <td className="px-4 py-3 text-sm">{vehicle.kilometers}</td>
                      <td className="px-4 py-3 text-sm">{vehicle.year}</td>
                      <td className="px-4 py-3 text-sm">{vehicle.seats}</td>
                      <td className="px-4 py-3 text-sm">{vehicle.luggage}</td>
                      <td className="px-4 py-3 text-sm">{vehicle.engine}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`px-2 py-1 rounded text-xs ${vehicle.status === 'Tersedia' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {vehicle.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {/* Action buttons remain unchanged */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminVehicle;