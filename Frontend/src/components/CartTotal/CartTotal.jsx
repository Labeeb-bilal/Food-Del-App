import React, { useContext, useEffect, useMemo, useState } from 'react'
import './CartTotal.css'
import { useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/cartcontext'

export default function CartTotal({useSubmit, handleSubmit}) {
    const {cartData, count,dishes} = useContext(StoreContext)
    const [Subtotal,setSubtotal] = useState(0)
    const deliverCharges = count>2? 40 : count<=2 && count>0 ? 'Free' : 0;
    useEffect(()=>{
        getSubTotal();
    },[cartData]);

        const getSubTotal = () => {
            var subt = 0;
            dishes.length>0 && dishes.map((item)=>{
                if (cartData[item._id]>0) {
                    subt+= cartData[item._id] * item.price;
                }
            })
            setSubtotal(subt);
        }

  return (
    <div className='cart-details'>
    <h3>Cart Total</h3>
    <div className='cart-total-details'>
        <p>Subtotal</p>
        <p>₹{Subtotal}</p>
    </div>
    <div className='cart-total-details'>
        <p>Delivery Fee</p>
        <p>{deliverCharges}</p>
    </div>
    <div className='cart-total-details'>
        <p>Total</p>
        <p> { count>2? '₹'+(Subtotal + deliverCharges).toLocaleString('en-IN') : count<=2 && count>0 ? Subtotal : 0}</p>
    </div>
    <div>
      {useSubmit ? (
        <button className='Proceed-btn' type="submit">Proceed To Checkout</button>
      ) : (
        <button type="button" className='Proceed-btn' onClick={handleSubmit}>Proceed To Checkout</button>
      )}
    </div>
    </div>
  )
}
