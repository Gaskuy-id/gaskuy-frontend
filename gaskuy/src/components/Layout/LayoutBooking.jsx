import React from 'react';
import Footer from './Footer';

const LayoutBooking = ({ children }) => {
  return (
    <div>
      <main className="bg-white">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default LayoutBooking;