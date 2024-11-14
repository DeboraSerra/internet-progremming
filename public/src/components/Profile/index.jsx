"use client";

import constants from "@/script/constants";
import { useState, useEffect } from "react";
import Input from "../Input";
import "./profile.css";

const getUserUrl = constants.USER_URL + `?email=jfsnow00@gmail.com`; 
const updateUserUrl = constants.USER_URL + `?id=673544e9acc052f5aa69184d`; 

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "",
    birthday: "",
    phone: "",
    instagram: "",
    email: "",
    password: "",
    profilePicture: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(getUserUrl);
        if (!response.ok) {
          throw new Error("Error fetching profile data");
        }
        const data = await response.json();
        setProfile(data.user);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveProfile = async () => {
    const response = await fetch(updateUserUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profile),
    });

    if (response.ok) {
      alert("Profile updated successfully!");
      setEditMode(false);
    } else {
      alert("Error updating profile!");
    }
  };

  const handleSavePassword = () => {
    if (
      !passwordData.oldPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      alert("Please fill in all password fields!");
      return;
    }

    if (passwordData.oldPassword !== profile.password) {
      alert("The old password is incorrect!");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("The new password and confirmation do not match!");
      return;
    }

    if (passwordData.newPassword.length < 8) {
      alert("The new password must be at least 8 characters long!");
      return;
    }
    setProfile((prevProfile) => ({
      ...prevProfile,
      password: passwordData.newPassword,
    }));

    setIsChangingPassword(false);
    setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
    alert("Password changed successfully!");
  };

  const handleEditClick = () => setEditMode(true);

  const handleCancelEdit = () => setEditMode(false);

  const handleChangePasswordClick = () => {
    setIsChangingPassword(true);
    setEditMode(false);
  };

  const handleCancelPasswordChange = () => {
    setIsChangingPassword(false);
    setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
  };

  return (
    <div className='profile-container'>
      <div className='profile-header'>
        <img
          src={profile.profilePicture || 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg'}
          alt='Profile'
          className='profile-picture'
        />
        <h2>{profile.name}</h2>
      </div>

      {!isChangingPassword && (
        <>
          <div className='profile-info'>
            <div className='profile-field'>
              {editMode ? (
                <Input
                  id='name'
                  label='User Name'
                  value={profile.name}
                  onChange={handleChange}
                  name='name'
                />
              ) : (
                <>
                  <span className='label'>User Name:</span>
                  <span className='profile-text'>{profile.name}</span>
                </>
              )}
            </div>

            <div className='profile-field'>
              {editMode ? (
                <Input
                  id='phone'
                  label='Phone'
                  value={profile.phone}
                  onChange={handleChange}
                  name='phone'
                />
              ) : (
                <>
                  <span className='label'>Phone:</span>
                  <span className='profile-text'>{profile.phone}</span>
                </>
              )}
            </div>

            <div className='profile-field'>
              <span className='label'>Email:</span>
              <p className='profile-text'>{profile.email}</p>
            </div>

            <div className='profile-field'>
              <span className='label'>Password:</span>
              <div className='password-display'>
                <p className='profile-text'>********</p>
              </div>
            </div>
          </div>

          {!editMode && !isChangingPassword && (
            <button
              onClick={handleChangePasswordClick}
              className='mt-6 shadow-lg bg-slate-400 w-full py-3 rounded hover:bg-slate-500 active:bg-slate-600 active:shadow-none'
            >
              Edit Password
            </button>
          )}

          {editMode ? (
            <>
              <button
                onClick={handleSaveProfile}
                className='mt-3 shadow-lg bg-slate-400 w-full py-3 rounded hover:bg-slate-500 active:bg-slate-600 active:shadow-none'
              >
                Save Changes
              </button>
              <button
                onClick={handleCancelEdit}
                className='mt-3 shadow-lg bg-red-600 w-full py-3 rounded hover:bg-red-700 active:bg-red-800 active:shadow-none'
              >
                Cancel Edit
              </button>
            </>
          ) : (
            <button
              onClick={handleEditClick}
              className='mt-3 shadow-lg bg-slate-400 w-full py-3 rounded hover:bg-slate-500 active:bg-slate-600 active:shadow-none'
            >
              Edit Profile
            </button>
          )}
        </>
      )}

      {isChangingPassword && (
        <div className='change-password-form'>
          <Input
            id='oldPassword'
            label='Old Password'
            type='password'
            value={passwordData.oldPassword}
            onChange={handlePasswordChange}
            name='oldPassword'
          />
          <Input
            id='newPassword'
            label='New Password'
            type='password'
            value={passwordData.newPassword}
            onChange={handlePasswordChange}
            name='newPassword'
          />
          <Input
            id='confirmPassword'
            label='Confirm Password'
            type='password'
            value={passwordData.confirmPassword}
            onChange={handlePasswordChange}
            name='confirmPassword'
          />

          <button
            onClick={handleSavePassword}
            className='mt-6 shadow-lg bg-slate-400 w-full py-3 rounded hover:bg-slate-500 active:bg-slate-600 active:shadow-none'
          >
            Save Password
          </button>
          <button
            onClick={handleCancelPasswordChange}
            className='w-full py-3 bg-red-600 rounded shadow-lg hover:bg-red-700 active:bg-red-800 active:shadow-none'
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
