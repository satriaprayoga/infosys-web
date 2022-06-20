import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { API_URL } from '../../const';
import { useAuthState } from '../../context';

import './AuthNav.css'
import ProfileDropdown from './ProfileDropdown';

const AuthNav = () => {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const userDetails=useAuthState();

  const showButton = () => {
    if (window.innerWidth <= 960) {
        setButton(false);
        setDropdown(true);
    } else {
        setButton(true);
        setDropdown(false);
    }
};

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

  useEffect(() => {
  
}, []);

window.addEventListener('resize', showButton);
  return (
    <>
      <nav className='authnavbar'>
        <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src='/images/Logo_blck.png' />
        </Link>
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'authnav-menu active' : 'authnav-menu'}>

          <li
            className='authnav-item'
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <div
             
              className='authnav-links'
              onClick={closeMobileMenu}
            >
              <div className="profile-dropdown">
              <img src={`${API_URL}/api/v1/images/account?email=${userDetails.user}`} />
              </div>
            </div>
            {dropdown && <ProfileDropdown />}
            
          </li>

        </ul>
        </div>

      </nav>
    </>
  )
}

export default AuthNav
