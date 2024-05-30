import Notes from './Notes';
import Sidebar from '../components/Sidebar';
import AllNote from '../components/AllNote';

const Dashboard = () => {
    return (
        <div className='flex flex-col md:flex-row justify-between my-6 p-4'>
            <div className='hidden md:block w-full md:w-1/4 border-r-2 mb-6 md:mb-0'>
                <Sidebar />
            </div>
            <div className='w-full md:w-3/4 p-1'>
                <Notes />
                <AllNote />
            </div>
        </div>
    );
};

export default Dashboard;
