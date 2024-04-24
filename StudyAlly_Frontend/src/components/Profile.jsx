import React, { useState } from 'react';
import api from '../api';

const Profile = ({ profileData }) => {
  const [isEditing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstname: profileData.firstname,
    lastname: profileData.lastname,
    email: profileData.email,
    major: profileData.major,
    mobile_number: profileData.mobile_number
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        console.error('Access token is missing!');
        return;
      }

      // Make another PATCH request to update the user's account 
      const response_account = await api.patch('api/account/update/', formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      // Make a PATCH request to update the user's profile
      const response_user = await api.patch('/api/account/profile/update/', formData, {
        headers: {
          Authorization: `Bearer ${accessToken}` 
        }
      });

      if (response_user.status === 200 || response_account.status === 200) {
        // Profile updated successfully
        console.log('Profile updated successfully!');
        // After successful submission, toggle back to view mode
        setEditing(false);
      } else {
        // Handle other status codes if needed
        console.error('Failed to update profile:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating profile:', error.message);
    }
  };

  return (
    <div className='row-span-1 bg-gray-500 rounded-xl p-4 overflow-y-auto'>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstname">First Name:</label>
            <input type="text" id="firstname" name="firstname" value={formData.firstname} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label htmlFor="lastname">Last Name:</label>
            <input type="text" id="lastname" name="lastname" value={formData.lastname} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label htmlFor="major">Major:</label>
            <input type="text" id="major" name="major" value={formData.major} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label htmlFor="mobile_number">Mobile Number:</label>
            <input type="text" id="mobile_number" name="mobile_number" value={formData.mobile_number} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label htmlFor="profile_picture">Profile Picture:</label>
            <input type="file" id="profile_picture" name="profile_picture" onChange={handleImageChange} />
          </div>
          <button type="submit">Save</button>
          <button type="button" onClick={() => setEditing(false)}>Cancel</button>
        </form>
      ) : (
        <div>
          {/* Profile information */}
          <div className="profile-info">
            <div>
              {profileData.profile_picture ? (
                <img src={profileData.profile_picture} alt="Profile" className="h-12 w-12 rounded-full" />
              ) : (
                <div className="h-12 w-12 bg-gray-300 rounded-full"></div>
              )}
            </div>
            <div> 
              <p>First Name: {profileData.firstname}</p>
              <p>Last Name: {profileData.lastname}</p>
              <p>Email: {profileData.email}</p>
              <p>Major: {profileData.major}</p>
              <p>Mobile Number: {profileData.mobile_number}</p>
              <button type="button" onClick={() => setEditing(true)}>Edit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
