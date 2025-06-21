import React, { useEffect, useState } from "react";
import API from "../../utils/api";
import imagePlaceholder from "../../assets/images/userImagePlaceholder.webp"
import { Popup } from "../../components/Popup"
import CompactInput from "../../components/inputs/CompactInput";
import { ImCross } from "react-icons/im";
import FileUpload from "../../components/inputs/FileUpload";
import Layout from "../../components/Layout/Layout";

const Profile = () => {
  const [user, setUser] = useState({
    fullName: 'User Full Name',
    email: 'User Email',
    phoneNumber: 'User Phone Number',
    address: 'User Address',
    image: imagePlaceholder 
  });
  const [ isEditing, setIsEditing ] = useState(false)
  const [ editUser, setEditUser ] = useState({...user, image: []})

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/customer/profile");
        const { data } = res.data;
        const imageUrl = data.image;
        
        setUser({ ...data, image: imageUrl });
        setEditUser({ ...data, image: data.image ? [imageUrl] : [] });
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const editProfile = async () => {
    try {
      const formData = new FormData();
      formData.append("fullName", editUser.fullName);
      formData.append("email", editUser.email);
      formData.append("phoneNumber", editUser.phoneNumber);
      formData.append("address", editUser.address);
      formData.append("image", editUser.image.length > 0 ? editUser.image[0] : null);
      const res = await API.post("/customer/edit", formData, {headers: {"Content-Type" : "multipart/form-data"}});
      console.log(res.data.data)
      const newData = res.data.data
      const newImage = newData.image ? newData.image : imagePlaceholder
      setUser({...newData, image: newImage})
      setIsEditing(false)
    } catch (error) {
      console.log("Error updating profile:", error)
    }
  }

  return (
    <Layout>
      <div className="bg-white flex justify-center items-center min-h-screen">
        <Popup isOpen={isEditing} onClose={() => setIsEditing(false)}>
          <div className="w-xl rounded-xl p-2 bg-white">
            <div className="flex flex-row">
              <h1 className="mx-4 my-6 grow text-2xl font-sans font-bold">Edit data profil</h1>
              <ImCross className="mx-4 my-6 cursor-pointer" onClick={() => setIsEditing(false)} />
            </div>
            <form>
              <div className="flex flex-col mx-4 my-2 px-3 py-1 rounded-md border-solid border-2 border-gray-300 bg-gray-100 gap-0">
                <label className='text-sm text-gray-500'>Foto profil</label>
                <FileUpload
                  files={editUser.image}
                  setFiles={ (newFile) =>
                  setEditUser((prev) => ({...prev, image: newFile}))
                  }
                  isMultiple={false}
                />
              </div>
              
              <CompactInput 
                value={editUser.fullName} 
                onChange={ ({target}) =>
                  setEditUser((prev) => ({...prev, fullName: target.value}))
                } 
                placeholder = "Nama Lengkap"
                label = "Nama Lengkap"
              />
              <CompactInput 
                value={editUser.email} 
                onChange={ ({target}) =>
                  setEditUser((prev) => ({...prev, email: target.value}))
                } 
                placeholder = "Email"
                label = "Email"
              />
              <CompactInput 
                value={editUser.phoneNumber} 
                onChange={ ({target}) =>
                  setEditUser((prev) => ({...prev, phoneNumber: target.value}))
                } 
                placeholder = "No. Telepon"
                label = "No. Telepon"
              />
              <CompactInput 
                value={editUser.address} 
                onChange={ ({target}) =>
                  setEditUser((prev) => ({...prev, address: target.value}))
                } 
                placeholder = "Alamat"
                label = "Alamat"
              />
            </form>
            <div className="flex justify-end mx-4 my-6">
              <button className="bg-green-800 text-white px-10 py-2 rounded-sm hover:bg-green-900 cursor-pointer" onClick={editProfile}>
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
            src={user.image}
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
          <button className="bg-green-800 text-white px-4 py-2 rounded hover:bg-green-900 cursor-pointer" onClick={() => setIsEditing(true)}>
            Edit Profile
          </button>
        </div>
      </div>
    </Layout>
  );
};
export default Profile;

