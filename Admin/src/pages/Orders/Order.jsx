import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import './Order.css';
import 'react-toastify/dist/ReactToastify.css';

export default function Order() {
  const [orders, setOrders] = useState([]);
  const [token, setToken] = useState(null);
  const API_URL = 'http://localhost:8000';

  const statusOptions = ['Food Processing', 'Out for Delivery', 'Delivered'];

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (token) fetchOrders();
  }, [token]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${API_URL}/orders/getAllOrders`, {
        headers: { token },
      });
      if (response.data?.orders) {
        setOrders(response.data.orders);
        console.log(response.data.orders)
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      toast.error('Failed to fetch orders. Please try again.');
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await axios.put(`${API_URL}/orders/updateStatus`, {
        orderId,
        newStatus,
      }, {
        headers: { token },
      });


      toast.success('Status updated');
      fetchOrders(); // Refresh after update
    } catch (error) {
      console.error('Failed to update status:', error);
      toast.error('Failed to update status.');
    }
  };

  return (
    <div className="order-wrapper">
      <h2 className="order-title">All Orders</h2>
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order._id} className="order-card">
            <div className="order-header">
              <div>
                <p><strong>Order ID:</strong> #{order._id.slice(-6).toUpperCase()}</p>
                <p><strong>Total Items:</strong> {order.items.length}</p>
                <p><strong>Total Amount:</strong> ₹{order.amount}</p>
              </div>
              <div className="order-status">
                <span className={`badge ${order.payment ? 'paid' : 'pending'}`}>
                  {order.payment ? 'Paid' : 'Pending'}
                </span>
                <select
                  className="status-dropdown"
                  value={order.status}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="order-body">
              <h4><i className="fa-solid fa-location-dot" style={{color:'red'}}></i> Shipping Address</h4>
              <p>{order.address.firstName} {order.address.lastName}</p>
              <p>{order.address.street}</p>
              <p>{order.address.city}, {order.address.state}, {order.address.country} - {order.address.zipcode}</p>
              <p>📞 {order.address.phone}</p>
            </div>

            <div className="order-items">
              <h4><i className="fa-solid fa-cart-shopping"></i> Items</h4>
              {order.items.map((item, index) => (
                <div key={index} className="item-row">
                  <span>{item.name}</span>
                  <span>× {item.quantity}</span>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p className="no-orders">No orders found.</p>
      )}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}
