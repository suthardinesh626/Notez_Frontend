import { useNavigate} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <div className='w-full h-full flex flex-row justify-center items-center '>
            <div className='h-full sm:hidden xl:hidden '>
                {isAuthenticated && user ? (
                    <div className='flex flex-row justify-end items-center mx-10 gap-x-20'>
                        <h1 className='w-10 h-10 font-bold content-center text-gray-700 text-xl ' >{user.fullName}</h1>
                        <img className='w-9 rounded-full' src={user.avatar} alt={user.fullName} />
                    </div>
                ) : (
                    <p></p>
                )}
            </div>

            <div className=''>
                {isAuthenticated ? (
                    <button className=' border-2 border-purple-200 bg-purple-100 rounded-lg w-full p-2 font-semibold my-3 hover:bg-purple-300' onClick={handleLogout}>Logout</button>
                ) : null}
            </div>


        </div>
    );
};

export default Profile;
