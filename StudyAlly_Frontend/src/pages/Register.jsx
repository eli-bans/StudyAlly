import { useState } from "react";
import api  from "../api";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function Register() {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        mobile_number: '',
        password: '',
        confirm_password: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('api/account/register/', formData);
            if (response.status === 201) {
                const data = await response.json();
                console.log(data);
            } else if (response.status === 400) {
                const data = await response.json();
                console.log(data);
            }
        } catch (error) {
            // Access error.response.data instead of error.response.json()
            const data = error.response.data;
            console.log(data);

            // Haven't implemented error handling yet
            // if (error.response) {
            //     const data = error.response.data;
            //     setError(data.error); // Assuming the error message is provided in the response JSON
            // } else {
            //     setError('An unexpected error occurred.'); // Fallback error message
            // }
           
        }
    }    

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }



    return (
        <>
      <div className='min-h-screen flex items-center justify-center'>
        <div className='rounded-2xl shadow-lg px-4 md:px-0 sm:w-8/12'>
    
          <div className='flex-1 p-12'>
            <h2 className='text-2xl font-medium pb-1 mt-5'>Don't have an account?</h2>
            <h2 className='text-3xl font-bold'>Create one now!</h2>
            
            {/* form */}
            <form className='space-y-4 md:space-y-6 mt-8 hidden lg:block' onSubmit={handleSubmit}>
                <div className='flex'>
                    {/* Right side */}
                <div className='flex-1 space-y-2 mr-10'>
                    <label className='block mb-0 text-sm font-medium leading-6 text-gray-900 text-left'>Firstname</label>
                    <input className='bg-gray-50 border border-gray-300 text-gray-900 w-full p-2.5 rounded-lg focus:ring-2 focus:ring-purple-600'
                    type="text" 
                    placeholder='Elikem'
                    name='firstname'
                    value = {formData.firstname}
                    onChange= {handleChange} />
                
                
                    <label className='block mb-0 text-sm font-medium leading-6 text-gray-900 text-left'>Lastname</label>
                    <input className='bg-gray-50 border border-gray-300 text-gray-900 w-full p-2.5 rounded-lg focus:ring-2 focus:ring-purple-600' 
                    type="text" 
                    placeholder='Bansah'
                    name='lastname'
                    value={formData.lastname}
                    onChange= {handleChange} />
                
                
                    <label className='block mb-0 text-sm font-medium leading-6 text-gray-900 text-left'>Phone number</label>
                    <input className='bg-gray-50 border border-gray-300 text-gray-900 w-full p-2.5 rounded-lg focus:ring-2 focus:ring-purple-600' 
                    type="tel" 
                    placeholder='0244758002'
                    name='mobile_number'
                    value={formData.mobile_number} 
                    onChange={handleChange}/>
                </div>
                {/* Left side */}
                <div className='flex-1 space-y-2'>
                    <label className='block mb-0 text-sm font-medium leading-6 text-gray-900 text-left'>Your Email</label>
                    <input className='bg-gray-50 border border-gray-300 text-gray-900 w-full p-2.5 rounded-lg focus:ring-2 focus:ring-purple-600' 
                    type="email" 
                    placeholder='someone@ashesi.edu.gh'
                    name = 'email'
                    value={formData.email}
                    onChange={handleChange} />
                
            
                    <label className='block mb-0 text-sm font-medium leading-6 text-gray-900 text-left'>Password</label>
                    <input className='bg-gray-50 border border-gray-300 text-gray-900 w-full p-2.5 rounded-lg focus:ring-2 focus:ring-purple-600' 
                    type="password" 
                    placeholder='Password'
                    name="password"
                    value={formData.password}
                    onChange={handleChange} />
                
                
                    <label className='block mb-0 text-sm font-medium leading-6 text-gray-900 text-left'>Confirm Password</label>
                    <input className='bg-gray-50 border border-gray-300 text-gray-900 w-full p-2.5 rounded-lg focus:ring-2 focus:ring-purple-600' 
                    type="password" 
                    placeholder='Confirm Password'
                    name="confirm_password"
                    value={formData.confirm_password}
                    onChange={handleChange} />
                </div>
                
                </div>
                <div>
                    <button className='bg-purple-600 hover:bg-purple-800 text-white font-semibold text-center w-full p-2.5 rounded-lg focus:ring-2 focus:ring-purple-600' type='submit'>Sign In</button>
                </div>
            </form>

            {/* Form for smaller screens */}
            <form className='space-y-4 md:space-y-6 mt-8 lg:hidden' onSubmit={handleSubmit}>
                <div className="space-y-2">
                    {/* Right side */}
                    <div>
                    <label className='block mb-1 text-sm font-medium leading-6 text-gray-900 text-left'>Firstname</label>
                    <input className='bg-gray-50 border border-gray-300 text-gray-900 w-full p-2.5 rounded-lg focus:ring-2 focus:ring-purple-600'
                    type="text" 
                    placeholder='Elikem'
                    name='firstname'
                    value = {formData.firstname}
                    onChange= {handleChange} />
                    </div>
                    
                
                   <div>
                   <label className='block mb-1 text-sm font-medium leading-6 text-gray-900 text-left'>Lastname</label>
                    <input className='bg-gray-50 border border-gray-300 text-gray-900 w-full p-2.5 rounded-lg focus:ring-2 focus:ring-purple-600' 
                    type="text" 
                    placeholder='Bansah'
                    name='lastname'
                    value={formData.lastname}
                    onChange= {handleChange} />
                   </div>
                
                
                    <div>
                    <label className='block mb-1 text-sm font-medium leading-6 text-gray-900 text-left'>Phone number</label>
                    <input className='bg-gray-50 border border-gray-300 text-gray-900 w-full p-2.5 rounded-lg focus:ring-2 focus:ring-purple-600' 
                    type="tel" 
                    placeholder='0244758002'
                    name='mobile_number'
                    value={formData.mobile_number} 
                    onChange={handleChange}/>
                    </div>
                
                
                   <div>
                   <label className='block mb-1 text-sm font-medium leading-6 text-gray-900 text-left'>Your Email</label>
                    <input className='bg-gray-50 border border-gray-300 text-gray-900 w-full p-2.5 rounded-lg focus:ring-2 focus:ring-purple-600' 
                    type="email" 
                    placeholder='someone@ashesi.edu.gh'
                    name = 'email'
                    value={formData.email}
                    onChange={handleChange} />
                   </div>
                
            
                   <div>
                   <label className='block mb-1 text-sm font-medium leading-6 text-gray-900 text-left'>Password</label>
                    <input className='bg-gray-50 border border-gray-300 text-gray-900 w-full p-2.5 rounded-lg focus:ring-2 focus:ring-purple-600' 
                    type="password" 
                    placeholder='Password'
                    name="password"
                    value={formData.password}
                    onChange={handleChange} />
                   </div>
                
                
                   <div>
                   <label className='block mb-1 text-sm font-medium leading-6 text-gray-900 text-left'>Confirm Password</label>
                    <input className='bg-gray-50 border border-gray-300 text-gray-900 w-full p-2.5 rounded-lg focus:ring-2 focus:ring-purple-600' 
                    type="password" 
                    placeholder='Confirm Password'
                    name="confirm_password"
                    value={formData.confirm_password}
                    onChange={handleChange} />
                   </div>
                
                
                </div>
                <div>
                    <button className='bg-purple-600 hover:bg-purple-800 text-white font-semibold text-center w-full p-2.5 rounded-lg focus:ring-2 focus:ring-purple-600' type='submit'>Sign In</button>
                </div>
            </form>



          </div>

        </div>
      </div>

    </>
    );
}

export default Register;