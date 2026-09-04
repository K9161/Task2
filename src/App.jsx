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
import Profile from './component/profile/Profile'

import { jwtDecode } from 'jwt-decode'
import axios from 'axios'
import MovieDetails from './component/MovieDetails/MovieDetails'
import ProtectedRoute from './component/ProtectedRoute/ProtectedRoute'

export default function App() {

  const [userData, setUserData] = useState(null)

  useEffect(() => {

    if (localStorage.getItem('userToken') !== null) {
      saveUserData()
    }

  }, [])


  async function saveUserData() {

    let encodedToken = localStorage.getItem('userToken')

    if (encodedToken) {

      try {

        let decodedToken = jwtDecode(encodedToken)

        console.log("TOKEN DATA:", decodedToken)

        let { data } = await axios.get(
          'https://route-posts.routemisr.com/users/profile-data',
          {
            headers: {
              Authorization: `Bearer ${encodedToken}`
            }
          }
        )

        console.log("USER DATA:", data)

        setUserData(data.data)

      } catch (error) {

        console.log("ERROR:", error.response?.data)

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

        // Home
        {
          path: '/home',
          element: (
            <ProtectedRoute userData={userData}>
              <Home />
            </ProtectedRoute>
          )
        },

        // Movies
        {
          path: '/Movie',
          element: (
            <ProtectedRoute userData={userData}>
              <Movie />
            </ProtectedRoute>
          )
        },

        // People
        {
          path: '/People',
          element: (
            <ProtectedRoute userData={userData}>
              <People />
            </ProtectedRoute>
          )
        },

       
        // About
        {
  path: '/about/:z',
  element: (
    <ProtectedRoute userData={userData}>
      <About />
    </ProtectedRoute>
  )
}
        ,

        // Profile
        {
          path: '/profile',
          element: (
            <ProtectedRoute userData={userData}>
              <Profile userData={userData} />
            </ProtectedRoute>
          )
        },

        // TV
        {
          path: '/Tv',
          element: (
            <ProtectedRoute userData={userData}>
              <Tv />
            </ProtectedRoute>
          )
        },

        // Movie Details
        {
          path: '/MovieDetails/:x/:y',
          element: (
            <ProtectedRoute userData={userData}>
              <MovieDetails />
            </ProtectedRoute>
          )
        },

        // Not Found
        {
          path: '*',
          element: (
            <ProtectedRoute userData={userData}>
              <Notfound />
            </ProtectedRoute>
          )
        },

        // Login
        {
          path: '/login',
          element: (
            <Login saveUserData={saveUserData} />
          )
        },

        // Register
        {
          index: true,
          element: (
            <Register />
          )
        }

      ]
    }
  ])


  return <RouterProvider router={x} />
}