
import React, { useState } from 'react';
import { DarkMode, LightMode, Notifications } from '@mui/icons-material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CreateModal from './CreateModal';
import api from '../api';


const NavBar = ({ toggleModal, darkMode, setDarkMode }) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // State to control modal visibility
  const access_token = localStorage.getItem('access_token');
  console.log(access_token);
  

  const toggleCreateModal = () => {
    setIsCreateModalOpen(!isCreateModalOpen);
  };
  // const logout = async () => {
  //   try {
  //
  //     // Make a request to logout with the access token included in the headers
  //     await api.post('/api/account/logout/',{
  //       headers: {
  //         Authorization: `Bearer ${access_token}`
  //       }
  //
  //     });
  //
  //       // Redirect the user to the login page
  //       window.location.href = '/login';
  //
  //
  //   } catch (error) {
  //     console.error('Error logging out:', error);
  //   }
  // };

  const logout = async () => {
    try {
      // Make a request to logout with the access token included in the headers
      await api.post('/api/account/logout/', null, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });

      // Redirect the user to the login page
      window.location.href = '/login';
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };





  return (
    <div className='sticky top-0 bg-white'>
      <nav className="px-24 w-full">
        <div className='flex justify-between p-3'>
          <div>
            <h1 className="font-bold text-3xl bg-gradient-to-r from-purple-600 to-purple-800 inline-block text-transparent bg-clip-text px-4"> StudyAlly</h1>
          </div>  

          <ul className="flex items-center space-x-4">
            <AddCircleOutlineIcon onClick={toggleCreateModal} style={{ cursor: 'pointer' }} />
            {darkMode === true ? (
              <DarkMode sx={{ fontSize: '25px' }} style={{ color: 'white' }} onClick={() => { setDarkMode(!darkMode); }} />
            ) : (
              <LightMode sx={{ fontSize: '25px' }} onClick={() => { setDarkMode(!darkMode); }} />
            )}
            <Notifications sx={{ fontSize: '25px', color: darkMode ? 'white' : 'black' }} />
            <li style={{ color: darkMode ? 'white' : 'black', cursor: 'pointer' }} onClick={logout}>Logout</li>
          </ul>

        </div>
      </nav>
      <CreateModal isOpen={isCreateModalOpen} toggleModal={toggleCreateModal} />
    </div>
  );
};

export default NavBar;
