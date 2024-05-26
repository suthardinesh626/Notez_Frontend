import Notes from './Notes'
import Sidebar from '../components/Sidebar'
import AllNote from '../components/AllNote'

const Dashboard = () => {
    return (
        <>
            <div className='flex flex-row justify-between my-6 p-4'>
                <div className='w-1/4 border-r-2' >
                    <Sidebar />
                </div>
                <div className='w-3/4 p-1' >
                    <Notes />
                    <AllNote />
                </div>
            </div>
        </>

    )
}

export default Dashboard