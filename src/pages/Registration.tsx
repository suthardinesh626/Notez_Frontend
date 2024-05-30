import { useState } from 'react';
import { registerUser } from '../service/userService';
import { Link, useNavigate } from 'react-router-dom';

const Registration = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState<string>('');
  const navigate = useNavigate();

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
      navigate('/');
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
    <div className="w-full h-full flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md flex flex-col justify-center items-center p-5 my-14 border-2 border-purple-100 rounded-lg bg-white sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3">
        <h1 className="text-xl mb-4">Register</h1>
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
            Name:
          </label>
          <input
            className="w-full p-2 mb-4 rounded-md bg-gray-200 font-semibold"
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
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

          <label className="w-full flex flex-col justify-start items-start font-semibold mb-2">
            Confirm Password:
          </label>
          <input
            className="w-full p-2 mb-4 rounded-md bg-gray-200 font-semibold"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <label className="w-full flex flex-col justify-start items-start font-semibold mb-2">
            Avatar:
          </label>
          <input
            className="w-full p-2 mb-4 rounded-md bg-gray-200 font-bold"
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
          />
          {avatarPreviewUrl && (
            <div>
              <img src={avatarPreviewUrl} alt="Avatar Preview" className="mt-2" style={{ maxWidth: '100px', maxHeight: '100px' }} />
            </div>
          )}
          <button
            className="border-2 border-purple-200 bg-purple-100 rounded-lg w-full p-2 font-bold mb-3 hover:bg-purple-300"
            type="submit"
          >
            Sign Up
          </button>
          <Link to="/" className="text-black font-bold hover:text-gray-700">
            Already have an account? Login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Registration;
