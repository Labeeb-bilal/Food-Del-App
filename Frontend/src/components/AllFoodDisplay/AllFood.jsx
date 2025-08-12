import React, { useContext } from 'react'
import AllFoodList from '../../../public/AllProducts.json'
import { StoreContext } from '../../context/cartcontext'
import './AllFood.css'

export default function AllFood() {

  const {cartData,handleDecrement,handleIncrement,dishes,url} = useContext(StoreContext)
  return (
    <div className='wrapper'>
       <h1>This is All Food Page</h1>
       <div className='food-List'> 
       {
        dishes.map((item,index)=>(
          item.TagLine == 'All Dishes'? (
        <div className='food-card-list' key={item.id || index}>
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
          </div> ) : ''
        ))
       }
       </div>
    </div>
  )
}
