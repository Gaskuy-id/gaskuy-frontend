import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from "@iconify/react";
import forgotMobil from '../../assets/images/lupapass.png';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const navigate = useNavigate();

  // Dummy email database
  const validEmails = [
    'gasskuy@gmail.com',
    'user@test.com',
    'admin@example.com',
    'testuser@gmail.com'
  ];

  // Dummy user database for password reset
  const userDatabase = {
    'gasskuy@gmail.com': { name: 'Gus Gaskuy', currentPassword: 'oldpassword123' },
    'user@test.com': { name: 'Test User', currentPassword: 'testpass123' },
    'admin@example.com': { name: 'Admin', currentPassword: 'adminpass123' },
    'testuser@gmail.com': { name: 'Test User', currentPassword: 'password123' }
  };

  // Simple email validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle email verification
  const handleVerifyEmail = async () => {
    if (!validateEmail(email)) {
      setError("Silahkan masukkan alamat email yang valid");
      setEmailVerified(false);
      return;
    }

    setIsVerifying(true);
    setError('');

    // Simulate API call delay
    setTimeout(() => {
      if (validEmails.includes(email.toLowerCase())) {
        setEmailVerified(true);
        setEmailInvalid(false);
        setError('');
      } else {
        setEmailVerified(false);
        setEmailInvalid(true);
        setError("Email tidak ditemukan dalam database.");
      }
      setIsVerifying(false);
    }, 1000);
  };

  // Handle forgot password form submit with dummy data
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!emailVerified) {
      setError("Silahkan verifikasi email terlebih dahulu");
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

    // Update dummy database and redirect immediately
    if (userDatabase[email.toLowerCase()]) {
      userDatabase[email.toLowerCase()].currentPassword = password;
      navigate("/login");
    } else {
      setError("Terjadi kesalahan saat mereset password");
    }
  };

  // Reset verification when email changes
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailVerified(false);
    setEmailInvalid(false);
    setError('');
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
              
              {/* Email Field with Verify Button */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-black mb-2">
                  Email
                </label>
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <input
                      value={email}
                      onChange={handleEmailChange}
                      placeholder="gasskuy@gmail.com"
                      type="email"
                      className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 outline-none text-gray-700 ${
                        emailVerified 
                          ? 'border-green-500 bg-green-50 focus:ring-green-500 focus:border-green-500' 
                          : emailInvalid 
                            ? 'border-red-500 bg-red-50 focus:ring-red-500 focus:border-red-500'
                            : 'border-gray-300 focus:ring-gray-500'
                      }`}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleVerifyEmail}
                    disabled={isVerifying || !email}
                    className={`px-4 py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center min-w-[100px] ${
                      emailVerified 
                        ? 'bg-green-500 text-white cursor-default' 
                        : emailInvalid
                          ? 'bg-red-500 text-white cursor-pointer hover:bg-red-600'
                          : 'bg-gray-500 hover:bg-gray-700 text-white disabled:bg-gray-300 disabled:cursor-not-allowed'
                    }`}
                  >
                    {isVerifying ? (
                      <Icon icon="eos-icons:loading" className="w-5 h-5 animate-spin" />
                    ) : emailVerified ? (
                      <Icon icon="mdi:check" className="w-5 h-5" />
                    ) : emailInvalid ? (
                      <Icon icon="mdi:close" className="w-5 h-5" />
                    ) : (
                      'Verify'
                    )}
                  </button>
                </div>
              </div>

              {/* Password Field */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-black mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimal 8 Karakter"
                    type={showPassword ? "text" : "password"}
                    disabled={!emailVerified}
                    className={`w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-700 pr-12 ${
                      !emailVerified ? 'bg-gray-100 cursor-not-allowed' : ''
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={!emailVerified}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:cursor-not-allowed"
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
                    disabled={!emailVerified}
                    className={`w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-700 pr-12 ${
                      !emailVerified ? 'bg-gray-100 cursor-not-allowed' : ''
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={!emailVerified}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:cursor-not-allowed"
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
                disabled={!emailVerified}
                className={`btn-auth w-full  ${
                  !emailVerified ? 'opacity-50 cursor-not-allowed' : ''
                } `}
              >
                CREATE A NEW PASSWORD
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