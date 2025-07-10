import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {setCurrentUser,updateUserFailure,updateUserStart,updateUserSuccess} from '../redux/user/userSlice.js'
export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [fileUploadError , setFileUploadError] = useState(null);
  const [updateSuccess,setUpdateSuccess] = useState(false);
  const [formData, setFormData] = useState({
    username: currentUser?.username || "",
    email: currentUser?.email || "",
    password: "",
    avatar: currentUser?.avatar || "",
  });
  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const uploadFile = async () => {
    if (!file) return null;

    const fd = new FormData();
    fd.append("file", file);
    fd.append("upload_preset", "unsigned_preset");

    setUploading(true);

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/dbwz8kuoj/image/upload`,
        fd
      );
      setFormData((prev) => ({
        ...prev,
        avatar: res.data.secure_url,
      }));
    } catch (err) {
      setFileUploadError(err);
      console.error("Upload error:", err);
      return null;
    } finally {
      setUploading(false);
    }
  };


    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };



  const handleUpdate = async (e) => {
    e.preventDefault();
    dispatch(updateUserStart());

    try {
      uploadFile();
      const res = await axios.put(`/api/user/${currentUser._id}/update`, formData);

     if (res.data) {
         dispatch(setCurrentUser(res.data));
         
      }
      setFile(null);
      setUpdateSuccess(true);
      dispatch(updateUserSuccess(res.data));
      
    } catch (err) {
      setFileUploadError(err);
      dispatch(updateUserFailure(err));
      console.error("Failed to update profile", err);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>

      <form onSubmit={handleUpdate} className="flex gap-4 flex-col">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={handleFileChange}
        />
        <img
          onClick={() => fileRef.current.click()}
          src={
            previewUrl ||
            currentUser?.avatar ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ_Op4Qn7cM-RkGM2MFM0EmODTGSEBCG7ehA6K7AB0Ak6-SmgpMFhQYpQuHjhOddSQlJw&usqp=CAU.png"
          }
          alt="profile"
          className="self-center mt-2 rounded-full h-24 w-24 object-cover cursor-pointer"
        />

        {uploading && (
          <p className="text-center text-sm text-gray-500">Uploading...</p>
        )}

        <input
          id="username"
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg"
          value={currentUser.username}
          onChange={handleChange}
        />
        <input
          id="email"
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          value={currentUser.email}
          onChange={handleChange}
        />
        <input
          id="password"
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          value={currentUser.password}
          onChange={handleChange}
        />

        <button
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
          disabled={uploading}
          type="submit"
        >
          {uploading ? "Updating..." : "Update"}
        </button>
        
        <p>
          {fileUploadError ?
          <span className="bg-red-700">
            {fileUploadError}
          </span>:updateSuccess?(
            <span className="bg-green-700">
            Upload Successful
          </span>

          ): null
        }
        </p>
      </form>

      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
}
