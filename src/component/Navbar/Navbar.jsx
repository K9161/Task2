import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return <>
  
  <nav className='p-2 d-flex justify-content-between'>
<div className="left-nav d-flex align-items-center">
<h1 className="mg-0 p2-3">Noxe</h1>
<ul className="list-unstyled d-flex m-0 align-items-center">
  < li className='p-2' >
    <Link to="/home">Home</Link>
  </ li>
   < li className='p-2'>
    <Link to="/about">About</Link>
  </ li >
   < li >
    <Link to="/Movies">Movies</Link>
  </ li>
   < li className='p-2'>
    <Link to="/Tv">Tv</Link>
  </ li>
   < li className='p-2'>
    <Link to="/People">People</Link>
  </ li>
   
</ul>
</div>

<div className="right-nav  d-flex align-items-center">
<div className="social-media">
  <i className='fab mx-1 fa-facebook'></i>
    <i className='fab mx-1 fa-instagram'></i>
  <i className='fab mx-1 fa-twitter'></i>
  <i className='fab mx-1 fa-spotify'></i>
  <i className='fab mx-1 fa-youtube'></i>

</div>
<ul className="list-unstyled d-flex m-0 align-items-center">
  <li  className='p-2' >
    <Link to="/Login">Login</Link>
  </li>
   <li className='p-2'>
    <Link to="/">Register</Link>
  </li>
   <li>
    <span>Logout</span>
  </li>
</ul>
</div>

  </nav>
  </>
}
