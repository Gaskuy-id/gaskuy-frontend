import React, { useState, useEffect } from 'react';
import { Icon } from "@iconify/react";
import logo from "../../assets/images/logo.png";

const Driver = () => {
  return (
    <div className='flex h-screen relative'>
      {/* Sidebar */}
      <aside className='w-72 bg-[#335540] text-white flex flex-col p-6 space-y-8'>
        <img src={logo} alt='Gasskuy Logo' className='w-20 h-15 ml-12.5' />
        {/* Side menu */}
        <nav className='flex-1 flex flex-col gap-4 w-44 mt-18'>
          {/* Dashboard Menu Button */}
          <button className='flex items-center gap-3 px-4 py-2 rounded-lg bg-[#4D7257] text-white'>
            <Icon icon="mage:dashboard" width="18" height="18" />
            <span className='text-white font-medium'>Dashboard</span>
          </button>
        </nav>
      </aside>

      <main className='flex-1 bg-gray-100 -ml-16 z-10 rounded-tl-2xl p-6 relative flex flex-col'>
        {/* Header */}
        <header className='flex item-center justify-between mb-6'>
          <h1 className='text-2xl font-semibold'>Dashboard</h1>
          <div className="flex items-center space-x-4 text-black">
            {/* Setting Menu */}
            <Icon icon="basil:notification-outline" width="20" height="20" className="cursor-pointer hover:text-gray-800" />
            <Icon icon="weui:setting-filled" width="20" height="20" className="cursor-pointer hover:text-gray-800" />
            <Icon icon="gg:profile" width="24" height="24" className="cursor-pointer hover:text-gray-800" />
          </div>
        </header>
        {/* Detail Content */}
        <div className='bg-white border border-gray-200 rounded-lg p-6'>
          {/* Card Content */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
            <div className='space-y-3'>
              <Icon icon="mdi:check-circle-outline" width={28} height={28}/>
              <div className='flex justify-between items-center py-1'>Pekerjaan Selesai</div>
            </div>
          </div>

          {/* Table Content */}
        </div>
      </main>
    </div>
  )
}

export default Driver