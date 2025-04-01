import React, { useEffect, useState } from "react";
import { createPortal } from 'react-dom';
import API from "../../utils/api";
import imagePlaceholder from "../../assets/images/userImagePlaceholder.webp"
import { Popup } from "../../components/Popup"
import Input from "../../components/inputs/Input";
import CompactInput from "../../components/inputs/CompactInput";
import XSymbol from "../../assets/images/x-symbol.png"

const Profile = () => {
  const [user, setUser] = useState({
    fullName: 'Uchihawarizmi',
    email: 'Uchihawarizmi',
    phoneNumber: '08123456789',
    address: 'Earth'
  });
  const [ imageSrc, setImageSrc ] = useState(imagePlaceholder);
  const [ isEditing, setIsEditing ] = useState(false)
  const [ editUser, setEditUser ] = useState(user)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/users/profile");
        console.log(res.data)
        setUser(res.data);
        setEditUser(res.data)
        if(res.data.image){
          setImageSrc(`http://localhost:5000${res.data.image}`)
        }
        } catch (error) {
        console.error("Error fetching profile:", error);
      }
    }; 

    fetchProfile();
  }, []);

  return (
    <div className="bg-white flex justify-center items-center min-h-screen">
      <Popup isOpen={isEditing} onClose={() => setIsEditing(false)}>
        <div className="w-xl rounded-xl p-2 bg-white">
          <div className="flex flex-row">
            <h1 className="mx-4 my-6 grow text-2xl font-sans font-bold">Edit data profil</h1>
            <button className="cursor-pointer mx-4 my-6" onClick={() => setIsEditing(false)}><img src={XSymbol}/></button>
          </div>
          <form>
            <CompactInput 
              value={editUser.fullName} 
              onChange={ ({target}) =>
                setEditUser(({prev}) => ({...prev, fullName: target.value}))
              } 
              placeholder = "Nama Lengkap"
              label = "Nama Lengkap"
            />
            <CompactInput 
              value={editUser.email} 
              onChange={ ({target}) =>
                setEditUser(({prev}) => ({...prev, email: target.value}))
              } 
              placeholder = "Email"
              label = "Email"
            />
            <CompactInput 
              value={editUser.phoneNumber} 
              onChange={ ({target}) =>
                setEditUser(({prev}) => ({...prev, phoneNumber: target.value}))
              } 
              placeholder = "No. Telepon"
              label = "No. Telepon"
            />
            <CompactInput 
              value={editUser.address} 
              onChange={ ({target}) =>
                setEditUser(({prev}) => ({...prev, address: target.value}))
              } 
              placeholder = "Alamat"
              label = "Alamat"
            />
          </form>
          <div className="flex justify-end mx-4 my-6">
            <button className="bg-green-800 text-white px-10 py-2">
              Edit
            </button>
          </div>
        </div>
      </Popup>
      <div className="flex">
        <div className="w-32 h-screen bg-green-900"></div>
        <div className="w-32 h-screen bg-green-700"></div>
        <div className="w-32 h-screen bg-green-300"></div>
        <div className="w-32 h-screen bg-green-200"></div>
      </div>
      <div className="flex flex-col items-start justify-items-start w-full max-w-md mx-auto p-8 bg-white">
        <h1 className="text-2xl font-bold mb-2">Personal Info</h1>
        <p className="text-gray-500 mb-6">
          You can update your profile photo and personal details here
        </p>
        <img
          alt="Profile picture of a person"
          className="rounded-full h-36 w-36 object-cover mb-6"
          src={imageSrc}
        />
        <div className="text-left w-full">
          <div className="mb-4">
            <p className="text-gray-500">Nama lengkap</p>
            <p className="font-semibold">{user.fullName}</p>
          </div>
          <div className="mb-4">
            <p className="text-gray-500">Email address</p>
            <p className="font-semibold">{user.email}</p>
          </div>
          <div className="mb-4">
            <p className="text-gray-500">No. Telepon</p>
            <p className="font-semibold">{user.phoneNumber}</p>
          </div>
          <div className="mb-6">
            <p className="text-gray-500">Alamat lengkap</p>
            <p className="font-semibold">{user.address}</p>
          </div>
        </div>
        <button className="bg-green-900 text-white px-4 py-2 rounded" onClick={() => setIsEditing(true)}>
          edit data
        </button>
      </div>
    </div>
  );
};
export default Profile;

