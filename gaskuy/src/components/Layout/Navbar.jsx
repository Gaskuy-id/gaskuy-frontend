import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/images/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (to, isContact) => (e) => {
    e.preventDefault();
  
    if (isContact) {
      if (location.pathname !== "/home") {
        // 1) pindah dulu
        navigate("/home");
        // 2) polling tiap 100ms, maksimal 50 kali (5 detik)
        let attempts = 0;
        const maxAttempts = 50;
        const pollScroll = setInterval(() => {
          const section = document.getElementById("contact");
          if (section) {
            section.scrollIntoView({ behavior: "smooth" });
            clearInterval(pollScroll);
          } else if (++attempts >= maxAttempts) {
            clearInterval(pollScroll);
          }
        }, 100);
      } else {
        // sudah di /home → langsung scroll
        const section = document.getElementById("contact");
        if (section) section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // normal nav untuk Home/Booking
      if (location.pathname === to) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        navigate(to);
      }
    }
  
    // tutup mobile menu kalau perlu
    if (isOpen) setIsOpen(false);
  };
  

  const menuItems = [
    { label: "Home", to: "/home" },
    { label: "Contact Us", to: "#contact", isContact: true },
    { label: "Booking", to: "/booking" }
  ];

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
        <Link
          to="/home"
          className="flex items-center"
          onClick={(e) => {
            e.preventDefault();
            if (location.pathname === "/home") {
              window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
              navigate("/home");
            }
          }}
        >
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
              d={
                isOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex md:items-center md:gap-4 text-[#101010] font-medium">
          {menuItems.map((item, idx) => (
            <Link
              key={idx}
              to={item.isContact ? "#contact" : item.to}
              onClick={handleNavClick(item.to, item.isContact)}
              className="min-w-[90px] text-center transition duration-200 hover:font-bold"
            >
              {item.label}
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
              className="w-full bg-[#67F49F] flex flex-col items-center gap-3 px-6 py-4 text-[#101010] font-medium md:hidden overflow-hidden"
            >
              {menuItems.map((item, idx) => (
                <Link
                  key={idx}
                  to={item.isContact ? "#contact" : item.to}
                  onClick={handleNavClick(item.to, item.isContact)}
                  className="min-w-[90px] text-center transition duration-200 hover:font-bold"
                >
                  {item.label}
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