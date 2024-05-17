import { useState } from 'react';
import { loginUser } from '../service/User';

const Login = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');

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
        email: email
      };

      const response = await loginUser(userData);

      if (response.success) {
        alert('Login successful');
      } else {
        alert('Invalid username or password');
      }
    } catch (error) {
      console.error('Error logging in user', error);
    }
  };
  return (
    <div className='w-full h-full flex flex-col  justify-center items-center  '>
      <div className=' w-1/4 flex flex-col justify-center items-center p-5 my-14 border-2 border-purple-100  rounded-r-lg' >
        <h1 className='text-xl '>Login</h1>
        <form className='w-full flex flex-col justify-center items-center px-5' onSubmit={handleSubmit} >
          <label className='w-full flex flex-col justify-start items-start '>
            Username:
          </label>
          <input className='w-1/2 p-1 rounded-md bg-gray-200' type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
          <br /><br />

          <label className='w-full flex flex-col justify-start items-start '>
            Email:
          </label>
          <input className='w-1/2 p-1 rounded-md bg-gray-200' type="text" placeholder='Username' value={email} onChange={(e) => setEmail(e.target.value)} />

          <label className='w-full flex flex-col justify-start items-start '>
            Password:
          </label>
          <input className='w-1/2 p-1 rounded-md bg-gray-200' type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} /><br /><br />
          <button className='border-2 border-purple-200 bg-purple-100 rounded-lg w-full p-1 font-semibold my-3 hover:bg-purple-300' type="submit">Sign In</button>
        </form>
      </div>
    </div>
  )
};


export default Login