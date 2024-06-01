import axios from 'axios';

const API_URL = 'http://13.126.254.217:8001/api/v1/users';

const registerUser = async (userData: {
    username: string;
    password: string;
    fullName: string;
    avatar: File;
    email: string;
}) => {
    try {
        const formData = new FormData();
        formData.append('username', userData.username);
        formData.append('password', userData.password);
        formData.append('fullName', userData.fullName);
        formData.append('avatar', userData.avatar);
        formData.append('email', userData.email);

        const response = await axios.post(`${API_URL}/register`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error registering user', error);
        throw error;
    }
};

//this is login function , is serice file 
const loginUser = async (userData: {
    username: string;
    password: string;
    email: string;

}) => {
    try {
        const response = await axios.post(`${API_URL}/login`, userData);
        console.log(response);

        const { accessToken, refreshToken, user } = response.data.data;

        // Store tokens and user data
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user', JSON.stringify(user)); // Save user data

        return { success: true, user }; // Return user data along with success status
    } catch (error) {
        console.error('Error logging in user', error);
        throw error;
    }
};

const logoutUser = async (): Promise<any> => {
    try {
        const response = await axios.post(`${API_URL}/logout`, {}, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        });

        // Remove the tokens from localStorage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        return response.data;
    } catch (error) {
        console.error('Error while logging out user', error);
        throw error;
    }
};

const isAuthenticated = () => {
    return !!localStorage.getItem('accessToken');
};



export { registerUser, loginUser, logoutUser, isAuthenticated };