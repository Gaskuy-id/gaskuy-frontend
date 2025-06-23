import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from "@iconify/react";
import forgotMobil from '../../assets/images/lupapass.png';
import API from "../../utils/api";

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // Simple email validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle forgot password form submit with API call
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError("Silahkan masukkan alamat email");
      return;
    }

    if (!validateEmail(email)) {
      setError("Silahkan masukkan alamat email yang valid");
      return;
    }

    if (!password) {
      setError("Silahkan masukkan password baru");
      return;
    }

    if (password.length < 8) {
      setError("Password minimal 8 karakter");
      return;
    }

    if (!confirmPassword) {
      setError("Silahkan masukkan konfirmasi password");
      return;
    }

    if (password !== confirmPassword) {
      setError("Password dan Konfirmasi Password tidak cocok");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      // API call to change password - sesuai endpoint yang diberikan
      const res = await API.post("/auth/change-password", {
        email: email,
        newPassword: password
      });

      // Success response structure: { message: "...", data: { email: "..." } }
      if (res.data && res.data.message) {
        navigate("/");
      }
    } catch (error) {
      // Handle error response
      setError(error.response?.data?.message || "Email belum terdaftar");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex h-screen overflow-hidden'>
      {/* Left Side - Car Image */}
      <div className='w-[875px] h-full hidden lg:flex items-center justify-start bg-gray-200'>
        <img src={forgotMobil} alt='Forgot Password' className='w-[886px] h-full object-cover' />
      </div>

      {/* Right Side - Form */}
      <div className='w-full lg:w-3/4 h-full flex flex-col justify-center text-center p-6 lg:-ml-10 bg-white shadow-lg rounded-[30px]'>
        <h3 className='text-3xl font-semibold text-black mb-3'>Lupa Password</h3>
        <p className='text-lg text-black mb-4 font-light'>
          Lupa password? Tenang, kami bantu untuk <span className='bg-[linear-gradient(to_bottom,transparent_50%,#AAEEC4_50%)] px-1'>meresetnya</span>.
        </p>
        
        <div className='flex justify-center items-center'>
          <div className='lg:w-[50%] md:w-[50%] w-[80%] flex flex-col justify-center text-left'>
            <form onSubmit={handleForgotPassword}>
              
              {/* Email Field */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-black mb-2">
                  Email
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="gasskuy@gmail.com"
                  type="email"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-700"
                />
              </div>

              {/* Password Field */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-black mb-2">
                  Password Baru
                </label>
                <div className="relative">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimal 8 Karakter"
                    type={showPassword ? "text" : "password"}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-700 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <Icon 
                      icon={showPassword ? "mdi:eye-off" : "mdi:eye"} 
                      className="w-5 h-5" 
                    />
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-black mb-2">
                  Konfirmasi Password
                </label>
                <div className="relative">
                  <input
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Ulangi password anda"
                    type={showConfirmPassword ? "text" : "password"}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-700 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <Icon 
                      icon={showConfirmPassword ? "mdi:eye-off" : "mdi:eye"} 
                      className="w-5 h-5" 
                    />
                  </button>
                </div>
              </div>

              {error && <p className='text-red-500 text-xs pb-2'>{error}</p>}

              {/* Submit Button */}
              <button 
                type='submit' 
                disabled={isLoading}
                className={`btn-auth w-full flex items-center justify-center ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <>
                    <Icon icon="eos-icons:loading" className="w-5 h-5 animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  'CREATE A NEW PASSWORD'
                )}
              </button>

              <p className='text-[16px] text-center text-black mt-3'>
                Sudah ingat password? {" "}
                <Link className='font-medium text-[#3932FF]' to='/login'>
                  Masuk
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;