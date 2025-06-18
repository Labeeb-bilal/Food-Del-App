import React, { useContext, useEffect, useState } from 'react';
import './Food.css';
import { StoreContext } from '../../context/cartcontext';
import axios from 'axios'

export default function Food() {
  const { handleDecrement, handleIncrement, cartData, dishes,count,url } = useContext(StoreContext);
  

  return (
    <div className='food-container'>
      <h1 className='food-title'>Top dishes near you</h1>

      <h3>Cart Items: {count} </h3>

      <div className='food-list'>
        {dishes.map((item, index) => (
          <div className='food-card' key={item.id || index}>
            <div className='food-image-container'>
              <img src={`${url}${item.image}`} alt={item.name} className='food-image' />
              <div className='AddToCart'>
                <i className="fa-solid fa-minus" onClick={() => handleDecrement(item._id)}></i>
                <span className='quantity'>{cartData[item._id]? cartData[item._id] : 0}</span>
                <i className="fa-solid fa-plus" onClick={() => handleIncrement(item._id)}></i>
              </div>
            </div>
            <div className='food-info'>
              <div className='food-name-rating'>
                <h3 className='food-name'>{item.name}</h3>
                <div className='food-rating'>
                  ⭐⭐⭐⭐☆
                </div>
              </div>
              <p className='food-description'>
                Food provides essential nutrients for overall health and well-being
              </p>
              <p className='food-price'>₹{item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
