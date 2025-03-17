import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/inputs/input';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Handle login form submit
  const handleLogin = async (e) => {}
  return (
    <div>
      <div className='h-3/4 mt-[100px] md:h-full flex flex-col justify-center text-center'>
        <h3 className='text-[45px] font-semibold text-black'>Ayo Login!</h3>
        <p className='text-[24px] text-black mb-6 font-light'>
          <span className='bg-[linear-gradient(to_bottom,transparent_50%,#AAEEC4_50%)] px-1'>Selamat datang</span> di Gasskuy, login untuk melanjutkan!
        </p>

        <div className='lg:w-[30%] h-3/4 md:h-full flex flex-col justify-center text-left'>
          <form onSubmit={handleLogin}>
            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email"
              placeholder="gasskuy@gmail.com"
              text="text"
            />

            <Input
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              label="Password"
              placeholder="Minimal 8 Karakter"
              text="password"
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
            
            <button type='submit' className='btn-auth'>
              LOGIN
            </button>

            <p className='text-[16px] text-center text-black mt-3'>
              Belum punya akun? {" "}
            <Link className='font-medium text-[#3932FF]' to='/register'>
            daftar disini
            </Link>
            </p>
          </form>
        </div>


      </div>
    </div>
  );
};

export default Login
