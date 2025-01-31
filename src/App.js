import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './components/dashboard';
import Login from './components/Login';
import Useradmin from './components/useradmin';
import Signup from './components/signup';

const router = createBrowserRouter([
 
  {
    path: '/',
    element: <Dashboard />, // Correctly capitalized
  },
  {
    path: '/login',
    element: <Login/>, // Correctly capitalized
  },
  {
    path: '/useradmin',
    element: <Useradmin/>, // Correctly capitalized
  },
  {
    path: '/signup',
    element: <Signup/>, // Correctly capitalized
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
