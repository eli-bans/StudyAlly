import React, { useState } from 'react';
import api from '../api';

function CreateModal({ isOpen, toggleModal }) {
  const [formData, setFormData] = useState({
    name: '',
    major: '',
    whatsAppLink: '',
    // phone_number: ''
    
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!localStorage.getItem('access_token')) {
      console.error('Access token is missing!');
      return;
    }
  
    try {
      const accessToken = localStorage.getItem('access_token');
  
      const response = await api.post('/api/groups/create/', formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
  
      if (response.status === 201) {
        // Group created successfully
        console.log('Group created successfully!');

      //   // Fetch updated groups data from the server
      // const updatedGroupsResponse = await api.get('/api/groups/list/', {
      //   headers: {
      //     Authorization: `Bearer ${accessToken}`
      //   }
      // });

      // const updatedGroupsData = await updatedGroupsResponse.data;

      // setGroupsData(updatedGroupsData);


        // Close the modal
      toggleModal();
      } else {
        // Handle other status codes
        console.error('Failed to create group:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating group:', error.message);
    }
  };
  

  return (
    <div className={`modal ${isOpen ? 'block' : 'hidden'}`}>
      <div className="modal-overlay" onClick={toggleModal}></div>
      <div className="modal-content">
        <h2>Create a Group</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="major">Major:</label>
            <input type="text" id="major" name="major" value={formData.major} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="whatsAppLink">WhatsApp Link:</label>
            <input type="url" id="whatsAppLink" name="whatsAppLink" value={formData.whatsAppLink} onChange={handleChange} required />
          </div>
          <button type="submit">Create Group</button>
        </form>
      </div>
    </div>
  );
}

export default CreateModal;
