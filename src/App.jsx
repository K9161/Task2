
import React, { useEffect, useState } from 'react'
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

import { jwtDecode } from 'jwt-decode'

export default function App() {
  
function logOut() {
  localStorage.removeItem('userToken')
  setUserData(null)
}



  const [userData, setUserData] = useState(null)

  useEffect(() => {

    if (localStorage.getItem('userToken') !== null) {
      saveUserData()
    }

  }, [])


  function saveUserData() {

    let encodedToken = localStorage.getItem('userToken')

    if (encodedToken) {

      try {

        let decodedToken = jwtDecode(encodedToken)

        console.log(decodedToken)

        setUserData(decodedToken)

      } catch (error) {

        console.log("Invalid Token")

        localStorage.removeItem('userToken')

        setUserData(null)

      }

    }
  }


  function logOut() {

    localStorage.removeItem('userToken')

    setUserData(null)

    window.location.href = '/login'
  }


  let x = createBrowserRouter([
    {
      path: '/',
      element: (
        <Layout
          userData={userData}
          logOut={logOut}
        />
      ),

      children: [

        {
          path: '/home',
          element: <Home />
        },

        {
          path: '/login',
          element: (
            <Login
              saveUserData={saveUserData}
            />
          )
        },

        {
          path: '/Movie',
          element: <Movie />
        },

        {
          path: '/People',
          element: <People />
        },

        {
          index: true,
          element: <Register />
        },

        {
          path: '/about',
          element: <About />
        },

        {
          path: '/Tv',
          element: <Tv />
        },

        {
          path: '*',
          element: <Notfound />
        }

      ]
    }
  ])


  return <RouterProvider router={x} />
}