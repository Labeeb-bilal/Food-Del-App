import React, { useState } from 'react'
import './Sidebar.css'
import {Link} from 'react-router-dom'
// import Logo from '../../assets/food-logo.png'

export default function Sidebar() {
  const [selectedPage,setselectedPage] = useState('Add-item');
  return (
    <div className='Sidebar-container'>
      <div className='side-options'>

      <Link to='/'>
        <div className={selectedPage=='Add-item'? 'sidebar-option Active': 'sidebar-option'} onClick={()=> setselectedPage('Add-item')}>
           <i className="fa-solid fa-plus"></i>
            <p>Add Item</p>
        </div>
        </Link>

        <Link to='/itemList'>
          <div className={selectedPage=='itemList'? 'sidebar-option Active': 'sidebar-option'} onClick={()=> setselectedPage('itemList')}>
             <i className="fa-solid fa-list"></i>
             <p>List Item</p>
          </div>
        </Link>

        <Link to='/orders'>
          <div className={selectedPage=='Orders'? 'sidebar-option Active': 'sidebar-option'} onClick={()=> setselectedPage('Orders')}>
             <i className="fa-solid fa-bowl-food"></i>
             <p>Orders</p>
          </div>
        </Link>
       
      </div>
    </div>
  )
}
