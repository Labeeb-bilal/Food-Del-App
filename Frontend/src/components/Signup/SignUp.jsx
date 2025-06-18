import React from 'react';
import './SignUp.css'; // Importing external CSS
import { useContext, useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { StoreContext } from '../../context/cartcontext';


export default function SignUp({ setShowSigup, setShowLogin }) {
  const handleLoginnSignup = () => {
    setShowSigup(false);
    setShowLogin(true);
  };
      const {url} = useContext(StoreContext);
      const [Data,setData] = useState({
        name: '',
        email : '',
        password : '',
      })

      const resetData = () => {
        setData({
          name: '',
          email : '',
          password : '',
       })
      }

      useEffect(()=> {
        console.log(Data)
      },[Data])

      const handleChange = (e) => {
         const {name,value} = e.target;
         setData(prev => ({...prev, [name]: value}));
      }

      const handleSubmit = async (e) => {
         e.preventDefault();
         try {
          const response = await axios.post(`${url}/user/signup`,Data,{
            headers: { 'Content-Type': 'application/json' }
          });
          console.log(response.data.message);
          if (response.data.success) {
            toast.success(response.data.message);
            resetData()
          }

         } catch (error) {
          if (error.response?.status === 400) {
            toast.error(error.response.data.message); // e.g., 'User already exists'
          } else {
            toast.error('Something went wrong. Please try again.');
          }
        }
        
      }

  return (
    <div className="signup-container">
      <div className="signup-card">
        <button className='close-button' onClick={()=>setShowSigup(false)}>×</button>
        <h3 className="signup-title">Create an Account</h3>
        <form className="signup-form" onSubmit={handleSubmit}>
          <input type="text" placeholder="Full Name" name='name' value={Data.name} onChange={handleChange} className="signup-input" />
          <input type="email" placeholder="Email" name='email' value={Data.email} onChange={handleChange} className="signup-input" />
          <input type="password" placeholder="Password" name='password' value={Data.password} onChange={handleChange} className="signup-input" />
          <button type="submit" className="signup-button">Sign Up</button>
        </form>
        <p className="signup-login-link" onClick={handleLoginnSignup}>
          Already have an account? <span>Login Here</span>
        </p>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
