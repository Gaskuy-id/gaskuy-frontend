import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/inputs/Input';
import { validateEmail } from '../../utils/helper';
import loginMobil from '../../assets/images/mobil.jpg';
import API from "../../utils/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Jika sudah login, redirect ke halaman home/profile
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home"); // Ganti ke "/home" jika itu halaman utama
    }
  }, [navigate]);

  // Handle login form submit
  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      setError("Silahkan masukkan alamat email");
      return;
    }

    if (!password) {
      setError("Silahkan masukkan password");
      return;
    }

    setError("");

    // Login API Call
    try {
      const res = await API.post("/customer/auth/signin", {
        email: email,
        password: password
      });

      const token = res.data.data;
      console.log(token)
      localStorage.setItem("token", token);

      // Redirect ke halaman utama setelah login
      // navigate("/home"); // Atau "/home" sesuai kebutuhan
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div>
      <div className='h-3/4 mt-[100px] md:h-full flex flex-col justify-center text-center'>
        <h3 className='text-[45px] font-semibold text-black'>Ayo Login!</h3>
        <p className='text-[24px] text-black mb-6 font-light'>
          <span className='bg-[linear-gradient(to_bottom,transparent_50%,#AAEEC4_50%)] px-1'>Selamat datang</span> di Gasskuy, login untuk melanjutkan!
        </p>
        <div className='flex justify-center items-center'>
          <div className='lg:w-[30%] md:w-[50%] w-[80%] flex flex-col justify-center text-left'>
            <form onSubmit={handleLogin}>
              <Input
                value={email}
                onChange={({ target }) => setEmail(target.value)}
                label="Email"
                placeholder="gasskuy@gmail.com"
                type="text"
              />

              <Input
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label="Password"
                placeholder="Minimal 8 Karakter"
                type="password"
              />

              {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

              <div className='flex justify-between items-center text-[16px] text-black mt-3 mb-10'>
                <label className='flex items-center'>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    className="mr-2"
                  />
                  Ingat saya
                </label>
                <Link className='font-normal text-[#3932FF]' to='/forgot-password'>
                  Lupa password?
                </Link>
              </div>
              
              <button type='submit' className='btn-auth w-full'>
                LOGIN
              </button>

              <p className='text-[16px] text-center text-black mt-3'>
                Belum punya akun?{" "}
                <Link className='font-medium text-[#3932FF]' to='/register'>
                  daftar disini
                </Link>
              </p>
            </form>
          </div>
        </div>
        <div className='flex justify-center mt-8'>
          <img src={loginMobil} alt="Login Illustration" className='w-full max-w-[1920px] h-auto' />
        </div>
      </div>
    </div>
  );
};

export default Login;
