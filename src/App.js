import React from 'react'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from './pages/Home';
import Popular from './pages/Popular';
import Toprated from './pages/Toprated';
import Upcoming from './pages/Upcoming';
import Rootlayout from './Rootlayout';
import Singlepageview from './pages/Singlepageview';
const App = () => {
  const router = createBrowserRouter([
    {
      path : "/",
      element: <Rootlayout />,
      children: [
        {
          path: "/",
          element: <Home/>
        },
        {
          path: "/popular",
          element: <Popular/>
        },
        {
          path: "/toprated",
          element: <Toprated/>
        },
        {
          path: "/upcoming",
          element: <Upcoming/>
        },
        {
          path: "/singlepage/:movieId",
          element: <Singlepageview/>
        },
      ]
    },
    
  ])
  return  <RouterProvider router={router} />
};
export default App
