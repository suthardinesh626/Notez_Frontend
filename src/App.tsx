import './App.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Notes from './pages/Notes';
import Registration from './pages/Registration';

const App = () => {
  return (
    <>
      <Navbar />
      <div className=''>
        {/* <Sidebar /> */}
        <Notes />
        <Login/>
        <Registration/>
      </div>

    </>
  )
}

export default App;
