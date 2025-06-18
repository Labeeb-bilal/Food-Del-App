import React from 'react'
import './Navbar.css'
import Logo from '../../assets/food-logo.png'
import User from '../../assets/user.png'

export default function Navbar() {
  return (
    <div className='Navbar-container'>
            <img className='logo' src={Logo}/>
            <img className='user-logo' src={User}/>
    </div>
  )
}
