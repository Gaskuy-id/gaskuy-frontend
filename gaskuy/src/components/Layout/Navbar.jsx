import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/images/logo.png";
import { User } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token")); // ⬅️ inisialisasi dari localStorage
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // For controlling the dropdown menu
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", checkLogin);
    return () => window.removeEventListener("storage", checkLogin);
  }, []);

  const handleNavClick = (to, isContact) => (e) => {
    e.preventDefault();

    if (isContact) {
      if (location.pathname !== "/home") {
        navigate("/home");
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
        const section = document.getElementById("contact");
        if (section) section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      if (location.pathname === to) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        navigate(to);
      }
    }

    if (isOpen) setIsOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("bookingForm")
    setIsLoggedIn(false);
    setIsDropdownOpen(false);
    navigate("/login");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const menuItems = [
    { label: "Home", to: "/home" },
    { label: "Contact Us", to: "#contact", isContact: true },
    { label: "Booking", to: "/booking" },
  ];

  return (
    <div>
      <nav className="bg-white px-6 md:px-10 py-5 flex items-center justify-between fixed top-0 left-0 w-full z-50" style={{ height: "91px", fontFamily: "'Poppins', sans-serif" }}>
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
          <img src={logo} alt="GASSKUY Logo" className="h-12 md:h-14 w-auto object-contain" />
        </Link>

        {/* Hamburger button */}
        <button className="md:hidden z-50 transition-transform duration-300" onClick={() => setIsOpen(!isOpen)}>
          <svg className={`w-8 h-8 text-[#101010] transform transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
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

          {/* 🔁 Login / Logout */}
          {isLoggedIn ? (
            <>
              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  className="bg-transparent text-[#101010] min-w-[60px] rounded-full hover:font-bold transition cursor-pointer flex items-center justify-center"
                  onClick={toggleDropdown}
                >
                  <div className="w-10 h-10 rounded-full border-2 border-[#101010] flex items-center justify-center">
                    <User size={20} />
                  </div>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg">
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
                      Edit Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link to="/login">
              <button className="bg-[#101010] text-white px-6 py-2 rounded-full hover:bg-[#67F49F] hover:text-black transition cursor-pointer">
                Log In
              </button>
            </Link>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
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

              {isLoggedIn ? (
                <>
                  <Link to="/profile" onClick={() => setIsOpen(false)}>
                    <button className="bg-transparent text-[#101010] min-w-[60px] rounded-full hover:font-bold transition cursor-pointer">
                      Profile
                    </button>
                  </Link>
                  <button onClick={() => { setIsOpen(false); handleLogout(); }} className="bg-[#101010] text-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition cursor-pointer">
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <button className="bg-[#101010] text-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition cursor-pointer">
                    Log In
                  </button>
                </Link>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Navbar;
