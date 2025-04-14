import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/images/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <nav
        className="bg-white px-6 md:px-10 py-5 flex items-center justify-between fixed top-0 left-0 w-full z-50"
        style={{
          height: "91px",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="GASSKUY Logo"
            className="h-12 md:h-14 w-auto object-contain"
          />
        </Link>

        {/* Hamburger button */}
        <button
          className="md:hidden z-50 transition-transform duration-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className={`w-8 h-8 text-[#101010] transform transition-transform duration-300 ${
              isOpen ? "rotate-90" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        {/* Menu (Always rendered) */}
        <div
          className={`
            hidden md:flex md:items-center md:gap-4 text-[#101010] font-medium
          `}
        >
          {["Home", "Contact Us", "Booking"].map((item, idx) => (
            <Link
              key={idx}
              to={`/${item.toLowerCase().replace(/\s/g, "-")}`}
              className="min-w-[90px] text-center transition duration-200 hover:font-bold"
            >
              {item}
            </Link>
          ))}

          <Link to="/login">
            <button className="bg-[#101010] text-white px-6 py-2 rounded-full hover:bg-[#67F49F] hover:text-black transition cursor-pointer">
              Log In
            </button>
          </Link>
        </div>
      </nav>

      <div className="pt-[91px]">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className={`
          w-full bg-[#67F49F] flex flex-col items-center
          gap-3 px-6 py-4 text-[#101010] font-medium md:hidden overflow-hidden
        `}
            >
              {["Home", "Contact Us", "Booking"].map((item, idx) => (
                <Link
                  key={idx}
                  to={`/${item.toLowerCase().replace(/\s/g, "-")}`}
                  className="min-w-[110px] text-center transition duration-300 hover:font-bold"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </Link>
              ))}

              <Link to="/login" onClick={() => setIsOpen(false)}>
                <button className="bg-[#101010] text-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition cursor-pointer">
                  Log In
                </button>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Navbar;
