import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/inputs/Input';
import { validateEmail } from '../../utils/helper';
import API from '../../utils/api';
import registerMobil from '../../assets/images/registermobil.png';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Tambahan
  const [checkPolicy, setCheckPolicy] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  // Handle register form submit
  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!fullName) {
      setError("Silahkan masukkan nama lengkap");
      return;
    }

    if (!validateEmail(email)) {
      setError("Silahkan masukkan alamat email");
      return;
    }

    if (!address) {
      setError("Silahkan masukkan alamat lengkap");
      return;
    }

    if (!phoneNumber) {
      setError("Silahkan masukkan nomor telepon");
      return;
    }

    if (!password) {
      setError("Silahkan masukkan password");
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

    if (checkPolicy === false) {
      setError("Silahkan mencentang persetujuan kebijakan privasi");
      return;
    }

    setError("");

    // Register API Call
    try {
      const res = await API.post("/users/register", {
        fullName: fullName,
        email: email,
        password: password,
        phoneNumber: phoneNumber,
        address: address
      });
      setError(res.data.message);
      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className='flex min-h-screen'>
      <div className='w-[875px] h-auto hidden lg:flex items-center justify-start bg-gray-200'>
        <img src={registerMobil} alt='Register' className='w-[886px] h-[909px]' />
      </div>

      <div className='w-full lg:w-3/4 flex flex-col justify-center text-center p-10 lg:-ml-10 bg-white shadow-lg rounded-[30px]'>
        <h3 className='text-4xl font-semibold text-black'>Register</h3>
        <p className='text-xl text-black mb-6 font-light'>
          Ayo jadi <span className='bg-[linear-gradient(to_bottom,transparent_50%,#AAEEC4_50%)] px-1'>pengguna baru</span> di website kami
        </p>
        <div className='flex justify-center items-center'>
          <div className='lg:w-[50%] md:w-[50%] w-[80%] flex flex-col justify-center text-left'>
            <form onSubmit={handleRegister}>
              <Input
                value={fullName}
                onChange={({ target }) => setFullName(target.value)}
                label="Nama Lengkap"
                placeholder="Gus Gaskuy"
                type="text"
              />

              <Input
                value={email}
                onChange={({ target }) => setEmail(target.value)}
                label="Email"
                placeholder="gasskuy@gmail.com"
                type="text"
              />

              <Input
                value={address}
                onChange={({ target }) => setAddress(target.value)}
                label="Alamat Lengkap"
                placeholder="skibidisigma, surakarta, jawa tenggara"
                type="text"
              />

              <Input
                value={phoneNumber}
                onChange={({ target }) => setPhoneNumber(target.value)}
                label="Nomor Telepon"
                placeholder="0812345678910"
                type="text"
              />

              <Input
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label="Password"
                placeholder="Minimal 8 Karakter"
                type="password"
              />

              <Input
                value={confirmPassword}
                onChange={({ target }) => setConfirmPassword(target.value)}
                label="Konfirmasi Password"
                placeholder="Ulangi password anda"
                type="password"
              />

              {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

              <div className='flex justify-between items-center text-[16px] text-black mt-3 mb-10'>
                <label className='flex items-center'>
                  <input
                    type="checkbox"
                    checked={checkPolicy}
                    onChange={() => setCheckPolicy(!checkPolicy)}
                    className="mr-2"
                  />
                  Saya menyetujui kebijakan privasi
                </label>
              </div>
              
              <button type='submit' className='btn-auth w-full'>
                REGISTER
              </button>

              <p className='text-[16px] text-center text-black mt-3'>
                Sudah punya akun? {" "}
                <Link className='font-medium text-[#3932FF]' to='/login'>
                  masuk
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
