import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../context/cartcontext';
import './MyOrder.css';
import Orderbag from '../../assets/order-bag.jpg';

export default function MyOrders() {
  const [orders, setOrders] = useState();
  const { url, token } = useContext(StoreContext);

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${url}/orders/fetchOrders`, {
        headers: { token },
      });

      if (response.data.success) {
        setOrders(response.data.orders);
        console.log(response.data.orders);
      } else {
        console.error('Failed to fetch orders');
      }
    } catch (error) {
      console.error('Error while fetching orders:', error);
    }
  };

  return (
    <div className='my-orders'>
      <h1>🧾 My Orders</h1>
      <div className='containrr'>
        {orders && orders.map((order) => (
          <div key={order._id} className='my-order-item'>
            <img id='Orderbag' src={Orderbag} alt='Order Icon' />
            <div className='order-details'>
              <div className='order-items'>
                {order.items.map((item, idx) => (
                  <div key={idx} className='item'>
                    🍽️ {item.name} x {item.quantity}
                  </div>
                ))}
              </div>
              <p>📦 <strong>Items:</strong> {order.items.length}</p>
              <p>⏳ <strong>Status:</strong> {order.status === 'Food Preparing' ? 'Preparing 🔥' : order.status}</p>
              <p>💸 <strong>Amount:</strong> ₹{order.amount}</p>
              {order.status === 'Food Preparing' || 'Out for Delivery'?  <button className='track-btn' onClick={()=>fetchOrders()}>📍 Track Order</button>: ''}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 
