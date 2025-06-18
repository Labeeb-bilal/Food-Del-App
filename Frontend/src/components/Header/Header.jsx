import React from 'react'
import './Header.css'
import foodPic from '../../assets/foodPic.jpg'
import foodPic2 from '../../assets/FastFood.jpg'


export default function Header() {

  return (
      <div className="banner-container">
        <img src={foodPic2} className="banner-image" />
        <div className='banner-content'>
          <h2 className="banner-headline">Order your Favourite <br /><span>Food here</span></h2>
          <p className="banner-text">Welcome to Foodfista, where every dish is crafted with passion, every ingredient is handpicked for freshness, and every meal tells a story. Join us for a dining experience that celebrates flavor, tradition, and warmth. Whether it’s a casual lunch or a special evening, your perfect table awaits.</p>
          <button className='banner-btn'>view menu</button>
        </div>
      </div>
  )
}
