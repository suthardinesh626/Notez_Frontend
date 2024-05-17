import { useState } from 'react';
import { registerUser } from '../service/User';

const Registration = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username || !fullName || !avatar || !confirmPassword || !password || !email) {
      alert('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      await registerUser({ username, fullName, avatar, email, password });
    } catch (error) {
      console.error(error);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setAvatar(file);

      // Create a URL representing the file
      const url = URL.createObjectURL(file);
      setAvatarPreviewUrl(url);
    }
  };

  return (
    <div className='w-full h-full flex flex-col  justify-center items-center  '>
      <div className=' w-1/4 flex flex-col justify-center items-center p-5 my-14 border-2 border-purple-100  rounded-r-lg' >
        <h1 className='text-xl '>Register</h1>
        <form className='w-full flex flex-col justify-center items-center px-5' onSubmit={handleSubmit}>
          <label className='w-full flex flex-col justify-start items-start '>
            Username:
          </label>
          <input className='w-1/2 p-1 rounded-md bg-gray-200' type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
          <label className='w-full flex flex-col justify-start items-start '>
            Email:
          </label>
          <input className='w-1/2 p-1 rounded-md bg-gray-200' type="text" placeholder='Username' value={email} onChange={(e) => setEmail(e.target.value)} />
          <label className='w-full flex flex-col justify-start items-start '>
            Name:
          </label>
          <input className='w-1/2 p-1 rounded-md bg-gray-200' type="text" placeholder='Password' value={fullName} onChange={(e) => setFullName(e.target.value)} />
          <label className='w-full flex flex-col justify-start items-start '>
            Password:
          </label>
          <input className='w-1/2 p-1 rounded-md bg-gray-200' type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
          <label className='w-full flex flex-col justify-start items-start '>
            Confirm Password:
          </label>
          <input className='w-1/2 p-1 rounded-md bg-gray-200' type="password" placeholder='Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          <label className='w-full flex flex-col justify-start items-start '>
            Avatar:
          </label>
          <input className='w-1/2 p-1 rounded-md bg-gray-200' type="file" accept="image/*" onChange={handleAvatarChange} />
          {avatarPreviewUrl && (
            <div>
              <img src={avatarPreviewUrl} alt="Avatar Preview" className="mt-2" style={{ maxWidth: '100px', maxHeight: '100px' }} />
            </div>
          )}
          <button className='border-2 border-purple-200 bg-purple-100 rounded-lg w-full p-1 font-semibold my-3 hover:bg-purple-300' type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Registration;