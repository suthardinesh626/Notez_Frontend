import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Dashboard from './pages/Dashboard';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


import Error from './components/Error';

const router = createBrowserRouter(
  [
    {
      path: "/register",
      element: <Registration />,
      errorElement: <Error />
    },
    {
      path: "/",
      element: <Login />,
      errorElement: <Error />
    },
    {
      path: "/dashboard",
      element: <Dashboard />
    }
  ]
);

const App = () => {
  return (
    <>
      <Navbar />
      <RouterProvider router={router} />
    </>
  )
}

export default App;
