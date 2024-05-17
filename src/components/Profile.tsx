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
            <div className=' w-1/4 flex flex-col justify-center items-center p-5 my-14 border-2 border-purple-100  rounded-r-lg' >
                <h1 className='text-xl '>Logout</h1>
                <button className='border-2 border-purple-200 bg-purple-100 rounded-lg w-full p-1 font-semibold my-3 hover:bg-purple-300' type="submit" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    )
}

export default Profile