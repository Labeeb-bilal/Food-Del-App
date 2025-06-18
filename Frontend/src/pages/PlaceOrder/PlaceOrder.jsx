import React, { useContext, useEffect, useState } from 'react';
import './PlaceOrder.css';
import CartTotal from '../../components/CartTotal/CartTotal';
import { StoreContext } from '../../context/cartcontext';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function PlaceOrder() {
  const { dishes, cartData, CartTotalPrice, url, token } = useContext(StoreContext);

  const [Deliveryinfo, setDeliveryinfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeliveryinfo({ ...Deliveryinfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let orderItems = [];
    dishes.forEach((item) => {
      if (cartData[item._id] > 0) {
        let itemInfo = { ...item, quantity: cartData[item._id] };
        orderItems.push(itemInfo);
      }
    });

    const orderData = {
      address: Deliveryinfo,
      items: orderItems,
      amount: CartTotalPrice(),
    };

    try {
      const response = await axios.post(`${url}/orders/placeorder`, orderData, {
        headers: { token },
      });

      if (response.data.success) {
        toast.success('Redirecting to payment...', { autoClose: 2000 });
          window.location.replace(response.data.session_URL);
      } else {
        toast.error('Error placing order');
      }
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || 'Something went wrong';
      toast.warning(msg);
    }
  };

  return (
    <>
      <form className='container-DelPage' onSubmit={handleSubmit}>
        <div className='details-box'>
          <h1>Delivery information</h1>
          <div className='multi-field'>
            <input type='text' placeholder='First name' name='firstName' required value={Deliveryinfo.firstName} onChange={handleChange} />
            <input type='text' placeholder='Last name' name='lastName' required value={Deliveryinfo.lastName} onChange={handleChange} />
          </div>
          <input type='email' placeholder='Email Address' name='email' required value={Deliveryinfo.email} onChange={handleChange} />
          <input type='text' placeholder='Street' name='street' required value={Deliveryinfo.street} onChange={handleChange} />
          <div className='multi-field'>
            <input type='text' placeholder='City' name='city' required value={Deliveryinfo.city} onChange={handleChange} />
            <input type='text' placeholder='State' name='state' required value={Deliveryinfo.state} onChange={handleChange} />
          </div>
          <div className='multi-field'>
            <input type='text' placeholder='Zip code' name='zipCode' required value={Deliveryinfo.zipCode} onChange={handleChange} />
            <input type='text' placeholder='Country' name='country' required value={Deliveryinfo.country} onChange={handleChange} />
          </div>
          <input type='text' placeholder='Phone' name='phone' required value={Deliveryinfo.phone} onChange={handleChange} />
        </div>

        <CartTotal useSubmit={true} />
      </form>

      <ToastContainer position="top-right" />
    </>
  );
}
