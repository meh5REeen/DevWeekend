import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setAvatar } from "../redux/user/userSlice.js";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [fileUploadError , setFileUploadError] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  // initialize form fields from currentUser
  useEffect(() => {
    if (currentUser) {
      setUsername(currentUser.username || "");
      setEmail(currentUser.email || "");
    }
  }, [currentUser]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const uploadFile = async () => {
    if (!file) return null;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "unsigned_preset");
    setUploading(true);

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/dbwz8kuoj/image/upload`,
        formData
      );
      console.log("Cloudinary response:", res.data);
      return res.data.secure_url;
    } catch (err) {
      setFileUploadError(err);
      console.error("Upload error:", err);
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    let uploadedUrl = currentUser.avatar;

    if (file) {
      const cloudUrl = await uploadFile();
      if (!cloudUrl) return;
      uploadedUrl = cloudUrl;
    }

    try {
      const updatedData = {
        username,
        email,
        ...(password && { password }), // only include password if filled
        avatar: uploadedUrl,
      };

      await axios.put(`/api/user/${currentUser._id}/avatar`, updatedData);

      dispatch(setAvatar(uploadedUrl));
      setPreviewUrl(""); // clear preview
      setFile(null);
    } catch (err) {
      setFileUploadError(err);
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
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          id="email"
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          id="password"
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
          </span>:(
            <span className="bg-green-700">
            Upload Successful
          </span>

          )}
        </p>
      </form>

      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
}
