import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar({ userData, logOut }) {

  let navigate = useNavigate()

  function handleLogout() {
    logOut()
    navigate('/login')
  }

  return (
    <>
      <nav className='p-2 d-flex justify-content-between align-items-center'>

        {/* Left Side */}
        <div className="left-nav d-flex align-items-center">

          <h1 className="m-0 p-2">
            Noxe
          </h1>

          <ul className="list-unstyled d-flex m-0 align-items-center">

            <li className='p-2'>
              <Link
                className='nav-link text-white'
                to="/home"
              >
                Home
              </Link>
            </li>

            <li className='p-2'>
              <Link
                className='nav-link text-white'
                to="/about"
              >
                About
              </Link>
            </li>

            <li className='p-2'>
              <Link
                className='nav-link text-white'
                to="/Movie"
              >
                Movies
              </Link>
            </li>

            <li className='p-2'>
              <Link
                className='nav-link text-white'
                to="/Tv"
              >
                Tv
              </Link>
            </li>

            <li className='p-2'>
              <Link
                className='nav-link text-white'
                to="/People"
              >
                People
              </Link>
            </li>

          </ul>

        </div>


        {/* Right Side */}
        <div className="right-nav d-flex align-items-center">

          {/* Social Media */}
          <div className="social-media d-flex align-items-center">

            <a
              className='nav-link text-white px-2'
              href="#"
            >
              <i className='fab fa-facebook'></i>
            </a>

            <a
              className='nav-link text-white px-2'
              href="#"
            >
              <i className='fab fa-instagram'></i>
            </a>

            <a
              className='nav-link text-white px-2'
              href="#"
            >
              <i className='fab fa-twitter'></i>
            </a>

            <a
              className='nav-link text-white px-2'
              href="#"
            >
              <i className='fab fa-spotify'></i>
            </a>

            <a
              className='nav-link text-white px-2'
              href="#"
            >
              <i className='fab fa-youtube'></i>
            </a>

          </div>


          {/* Login / Register / Logout */}
          <ul className="list-unstyled d-flex align-items-center m-0">

            {!userData && (
              <>
                <li className='nav-item px-2'>
                  <Link
                    className='nav-link text-white'
                    to="/login"
                  >
                    Login
                  </Link>
                </li>

                <li className='nav-item px-2'>
                  <Link
                    className='nav-link text-white'
                    to="/"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}


            {userData && (
              <>
                <li className='nav-item px-2'>
                  <span
                    className='nav-link text-white'
                    onClick={handleLogout}
                   
                  >
                    Logout
                  </span>
                </li>

                <li className='nav-item px-2'>
                  <span className='nav-link text-white'>
                    Welcome {userData.name}
                  </span>
                </li>
              </>
            )}

          </ul>

        </div>

      </nav>
    </>
  )
}
