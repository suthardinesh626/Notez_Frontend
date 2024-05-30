import { useState } from 'react';
import { loginUser } from '../service/userService';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username || !password) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const userData = {
        username: username,
        password: password,
        email: email,
      };

      const response = await loginUser(userData);

      if (response.success) {
        // console.log(response.success);
        setIsLoggedIn(true);
        navigate('/dashboard');
      } else {
        alert('Invalid username or password');
      }
    } catch (error) {
      console.error('Error logging in user', error);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md flex flex-col justify-center items-center p-5 my-14 border-2 border-purple-100 rounded-lg bg-white sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3">
        <h1 className="text-xl mb-4">Login</h1>
        <form className="w-full flex flex-col justify-center items-center px-5" onSubmit={handleSubmit}>
          <label className="w-full flex flex-col justify-start items-start font-semibold mb-2">
            Username:
          </label>
          <input
            className="w-full p-2 mb-4 rounded-md bg-gray-200 font-semibold"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label className="w-full flex flex-col justify-start items-start font-semibold mb-2">
            Email:
          </label>
          <input
            className="w-full p-2 mb-4 rounded-md bg-gray-200 font-semibold"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="w-full flex flex-col justify-start items-start font-semibold mb-2">
            Password:
          </label>
          <input
            className="w-full p-2 mb-4 rounded-md bg-gray-200 font-semibold"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="border-2 border-purple-200 bg-purple-100 rounded-lg w-full p-2 font-bold mb-3 hover:bg-purple-300"
            type="submit"
          >
            Sign In
          </button>
        </form>
        <Link to="/register" className="text-gray-500 hover:text-gray-700 font-bold">
          Don't have an account? Register
        </Link>
      </div>
    </div>
  );
};

export default Login;
