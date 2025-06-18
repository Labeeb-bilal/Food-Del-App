import React, { useState, useEffect } from 'react'
import './Menu.css'
import menuData from '../../assets/menu.json'

export default function Menu() {

  const [menu, setMenu] = useState([]);

  useEffect(() => {
    setMenu(menuData.menu); // Set the menu data when the component mounts
  }, []);

  return (
    <div className='menu-container'>
      <h1>Explore our menu</h1>
      <p className='menu-text'>
        Explore a world of flavors with our thoughtfully crafted menu, featuring classNameic favorites and exciting new creations, each prepared with premium ingredients to deliver an unforgettable dining experience every time you visit.
      </p>
      <div className='menu-list'>
        {menu && menu.map((item, index) => (
            <div className='menu-item' key={index}>
            <img className='menu-img' src={item.image} alt={item.name} />
            <span className="menu-name">{item.name}</span>
            </div>
        ))}
      </div>
      <hr/>
    </div>

  )
}
