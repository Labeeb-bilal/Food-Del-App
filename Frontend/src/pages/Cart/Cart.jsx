import React, { useContext, useState } from 'react'
import { StoreContext } from '../../context/cartcontext'
import './Cart.css'
import { useNavigate } from 'react-router-dom'
import CartTotal from '../../components/CartTotal/CartTotal'
import panLogo from '../../assets/Cooking-img.png'

export default function Cart() {
  const { handleRemoveItem, handleDecrement, handleIncrement, dishes, url, cartData } = useContext(StoreContext);
  const [Page, setPage] = useState('cart');
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(Page === 'cart' ? '/order' : '/');
  };

  const hasCartItems = Object.values(cartData).some(count => count > 0);

  if (!hasCartItems) {
    return (
      <div className='container'>
        <div className='cont'>
          <img src={panLogo} alt="Empty Cart" />
          <div className='cart-Text'>Your cart is empty</div>
          <button className='btn-Food' onClick={() => navigate('/')}>Search Food</button>
        </div>
      </div>
    );
  }

  return (
    <div className='container'>
      <table className='table'>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {dishes && dishes.map((item) => {
            if (cartData[item._id] > 0) {
              return (
                <tr key={item._id}>
                  <td><img className='Cart-img' src={`${url}${item.image}`} alt={item.name} /></td>
                  <td>{item.name}</td>
                  <td>₹{item.price}</td>
                  <td className='cart-btn'>
                    <i className="fa-solid fa-minus" onClick={() => handleDecrement(item._id)}></i>
                    <span className='quantity'>{cartData[item._id]}</span>
                    <i className="fa-solid fa-plus" onClick={() => handleIncrement(item._id)}></i>
                  </td>
                  <td>{item.price * cartData[item._id]}</td>
                  <td><span className='cross-btn' onClick={() => handleRemoveItem(item._id)}>X</span></td>
                </tr>
              );
            }
            return null;
          })}
        </tbody>
      </table>

      <div className='Billing-section'>
        <CartTotal handleSubmit={handleSubmit} useSubmit={false} />
        <div className='promo-code-section'>
          <p>If you have a promo code, enter it here</p>
          <input type='text' placeholder='Promo Code' />
          <button >Submit</button>
        </div>
      </div>
    </div>
  );
}
