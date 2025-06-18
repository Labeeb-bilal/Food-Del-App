import React, { useContext, useEffect, useState } from 'react';
import './verify.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../context/cartcontext';
import axios from 'axios';

export default function Verify() {
  const [searchParams] = useSearchParams();
  const success = searchParams.get('success');
  const orderId = searchParams.get('orderId');
  const { url, token } = useContext(StoreContext);
  const [confettiArray, setConfettiArray] = useState([]);
  const [status, setStatus] = useState('loading'); // 'success' | 'failure' | 'loading'
  const navigate = useNavigate();

  // Prevent direct access without session
  useEffect(() => {
    if (!success || !orderId) {
      navigate('/myorders');
    }
  }, []);

  // Handle success/failure status
  useEffect(() => {
    if (token && orderId) {
      if (success === 'true') {
        verifyPayment(orderId);
      } else {
        setStatus('failure');
        setTimeout(() => navigate('/'), 4000);
      }
    }
  }, [token]);


  const verifyPayment = async (orderId) => {
    try {
      const response = await axios.post(`${url}/orders/verify`,{ success, orderId },
        { 
          headers: { token },
        });
        debugger

      if (response.data.success) {
        setStatus('success'); 
        generateConfetti();
        setTimeout(() => navigate('/myorders'), 6000);
      } else {
        setStatus('failure');
        setTimeout(() => navigate('/'), 4000);
      }
    } catch (error) {
      console.error("Verification failed", error);
      setStatus('failure');
      setTimeout(() => navigate('/'), 4000);
    }
  };

  const generateConfetti = () => {
    const temp = [];
    for (let i = 0; i < 40; i++) {
      temp.push({
        left: Math.random() * 100,
        animationDuration: 2 + Math.random() * 2,
        delay: Math.random() * 2,
        background: `hsl(${Math.random() * 360}, 70%, 60%)`,
        rotate: Math.random() * 360,
      });
    }
    setConfettiArray(temp);
  };

  return (
    <div className="payment-success">
      <div className={`tick-wrapper ${status === 'failure' ? 'failure' : ''}`}>
        {status === 'success' && (
          <svg className="checkmark" viewBox="0 0 52 52">
            <path className="checkmark-check" d="M14 27l8 8 16-16" />
          </svg>
        )}
        {status === 'failure' && (
          <svg className="crossmark" viewBox="0 0 52 52">
            <line x1="16" y1="16" x2="36" y2="36" className="cross-line" />
            <line x1="36" y1="16" x2="16" y2="36" className="cross-line" />
          </svg>
        )}
      </div>

      {status === 'success' && (
        <>
          <h2>Payment Successful!</h2>
          <p className="subtext">Thank you for your purchase.</p>
        </>
      )}

      {status === 'failure' && (
        <>
          <h2>Payment Failed</h2>
          <p className="subtext">Something went wrong. Redirecting...</p>
        </>
      )}

      {status === 'success' && (
        <div className="confetti-container">
          {confettiArray.map((c, i) => (
            <div
              key={i}
              className="confetti-piece"
              style={{
                left: `${c.left}%`,
                backgroundColor: c.background,
                animationDuration: `${c.animationDuration}s`,
                animationDelay: `${c.delay}s`,
                transform: `rotate(${c.rotate}deg)`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
