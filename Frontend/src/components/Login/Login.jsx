import React, { useContext, useEffect, useState } from 'react';
import './Login.css';
import { StoreContext } from '../../context/cartcontext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';



export default function Login({ setShowLogin,setShowSigup }) {
   
    const {url} = useContext(StoreContext);
    const {settoken} = useContext(StoreContext)
    const [Data,setData] = useState({
      email : '',
      password : '',
    })
        const resetData = () => {
          setData({
            email : '',
            password : '',
        })
        setShowLogin(false)

        }
      const handleSignupRedirect = () => {
          setShowSigup(true);
          setShowLogin(false);
        };

      const handleChange = (e) => {
         const {name,value} = e.target;
         setData(prev => ({...prev, [name]: value}));
      }
      const handleSubmit = async (e) => {
         e.preventDefault();
         try {
          const response = await axios.post(`${url}/user/login`,Data);
          console.log(response.data.token);
          
          if (response.data.success) {
            resetData();  //clear the form
            localStorage.setItem('token',response.data.token);
            settoken(response.data.token);
          }

       } catch (error) {
           toast.error(error?.response?.data?.message);
         }

      }

  return ( 
    <>
    <div className="login-container">
      <div className="login-card">
        <button className="close-button" onClick={() => setShowLogin(false)}>×</button>
        <h2 className="login-title">Login to Your Account</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" className="login-input" name='email' value={Data.email} onChange={handleChange} />
          <input type="password" placeholder="Password" className="login-input" name='password' value={Data.password}  onChange={handleChange}/>
          <button type="submit" className="login-button">Login</button>
        </form>
        <p className="signup-login-link" onClick={handleSignupRedirect}>
          Dont have an account? <span>Signup Here</span>
        </p>
      </div>
    </div>
    <ToastContainer/>
    </>
  );
}
