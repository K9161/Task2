import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './component/Layout/Layout'
import Home from './component/Home/Home'
import Tv from './component/Tv/Tv'
import Register from './component/Register/Register'
import People from './component/People/People'
import Movie from './component/Movie/Movie'
import Login from './component/Login/Login'
import Notfound from './component/Notfound/Notfound'
import About from './component/About/About'
import { useState } from 'react'
import { jwtDecode } from 'jwt-decode'

export default function App() {

const [userData,setUserData]=useState(null)

function saveUserData()
{
  let encodedToken=localStorage.getItem('userToken');
  let decodedToken= jwtDecode(encodedToken);
  console.log(decodedToken)
  setUserData(decodedToken)
}

let x = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children: [
      {path:'/home', element:<Home/>},

      {path:'/login', element:<Login saveUserData={saveUserData}/>},

      {path:'/Movie', element:<Movie/>},

      {path:'/People', element:<People/>},

      {index:true, element:<Register/>},

      {path:'/about', element:<About/>},

      {path:'/Tv', element:<Tv/>},

      {path:'*', element:<Notfound/>}
    ]
  }
])

  return <RouterProvider router={x}/>
}