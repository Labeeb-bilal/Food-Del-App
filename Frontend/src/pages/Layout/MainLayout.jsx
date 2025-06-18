import { Outlet } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer.jsx/Footer';
import SignUp from '../../components/Signup/SignUp';
import { useState } from 'react';
import Login from '../../components/Login/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MainLayout = () => {
  const [ShowSigup, setShowSigup] = useState(false);
  const [ShowLogin, setShowLogin] = useState(false);

  return (
    <>
      {/* Full-page layout with flex column */}
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Main content area centered with 80% width */}
        <div style={{ width: '80%', margin: 'auto', flexGrow: 1 }}>
          {ShowSigup && (
            <SignUp setShowSigup={setShowSigup} setShowLogin={setShowLogin} />
          )}
          {ShowLogin && (
            <Login setShowSigup={setShowSigup} setShowLogin={setShowLogin} />
          )}

          <Navbar setShowSigup={setShowSigup} />
          <div style={{minHeight:'85vh'}}>
            <Outlet />
          </div>
        </div>

        {/* Footer also inside the 80% width container */}
        <div style={{ width: '100%', margin: 'auto' }}>
          <Footer />
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default MainLayout;
