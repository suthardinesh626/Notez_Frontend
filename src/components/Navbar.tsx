
import Profile from './Profile'
import Logo from '../image/logo.svg';


const Navbar = () => {
  return (
    <div className='flex flex-row justify-between border-y-2 items-center h-16 px-6'>

      <div className='flex flex-row items-center '>
        <img className='h-8' src={Logo} alt="logo" />
        <h2 className=' text-4xl font-bold text-gray-600' >Notez</h2>
      </div>
      
      <div className='flex flex-row items-center w-1/4'>
        <input type='text' placeholder='Search Notes' className='w-full h-10 px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-500' />
      </div>
      <div>
        <Profile />
      </div>
    </div>
  )
}

export default Navbar