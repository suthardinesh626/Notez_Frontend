import React from 'react'
import { logoutUser } from '../service/User'


const Profile = () => {

    const handleLogout = async () => {
        try {
            const response = await logoutUser();

            if (response.success) {
                alert('Logout successful');
            } else {
                alert('Failed to logout');
            }
        } catch (error) {
            console.error('Error logging out user', error);
        }
    };

    return (
        <div className='w-full h-full flex flex-col  justify-center items-center  '>
            <img src="" alt="" />
            <button className='border-2 border-purple-200 bg-purple-100 rounded-lg w-full p-2 font-semibold my-3 hover:bg-purple-300 ' type="submit" onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Profile