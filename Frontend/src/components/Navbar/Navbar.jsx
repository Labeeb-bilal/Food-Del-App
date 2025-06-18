import { useContext, useEffect, useState } from 'react';
import logo from '../../assets/food-logo.png';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { StoreContext } from '../../context/cartcontext';
import userLogo from '../../assets/user.png'

function Navbar({setShowSigup}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('Home');

  const menuItems = ['Home', 'About', 'Menu', 'Contact',];
  const {settoken,token} = useContext(StoreContext)
  const navigate = useNavigate();

  const handleClick = (item) => {
    setActiveItem(item);
    setMenuOpen(false); // Close menu on small screens
  };


  const handleLogout = () => {
    localStorage.removeItem('token');
    settoken('');
    navigate('/');
  }



  return (
    <div className="navbar">
      <img src={logo} alt="Logo" id="logo" />

      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <i className="fas fa-bars"></i>
      </div>

      <ul className={`ul-items ${menuOpen ? 'open' : ''}`}>
        {menuItems.map((item,index) => (
          <Link to='/' key={index}>
          <li
            key={item}
            className={activeItem === item ? 'active' : ''}
            onClick={() => handleClick(item)}
          >
            {item}
          </li>
          </Link>
        ))}
      </ul>

      <div className="right-nav">
      <i className="fas fa-search"></i>
      <Link to='/cart' onClick={() => setActiveItem('Cart')}>
        <i className={`fas fa-shopping-cart cart-icon ${activeItem === 'Cart' ? 'active' : ''}`}></i>
      </Link>
     
      {token && token.length > 0 ? (
          <div className="nav-profile">
          <img src={userLogo} alt='img'/>
          <ul className='nav-profile-dropdown'>
            <li onClick={(()=> navigate('/myorders'))}><i className="fa-solid fa-bag-shopping"></i><p>Orders</p></li>
            <hr/>
            <li onClick={handleLogout}><i className="fa-solid fa-right-from-bracket"></i><p>Logout</p></li>
          </ul>
        </div>
        ) : (
          <button className="signin-btn" onClick={() => setShowSigup(true)}>Sign In</button>
          
        )}
    </div>

    </div>
  );
}

export default Navbar;
