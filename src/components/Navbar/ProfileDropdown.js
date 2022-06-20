import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './ProfileDropdown.css'


export const MenuItems=[
    {
        title: 'Profile',
        path: '/profile',
        cName: 'dropdown-link'
      },
      {
        title: 'History',
        path: '/bookingHistory',
        cName: 'dropdown-link'
      },
      {
        title: 'Sign Out',
        path: '/signOut',
        cName: 'dropdown-link'
      }
];

const ProfileDropdown = () => {
    const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  return (
    <>
      <ul
        onClick={handleClick}
        className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}
      >
        {MenuItems.map((item, index) => {
          return (
            <li key={index}>
              <Link
                className={item.cName}
                to={item.path}
                onClick={() => setClick(false)}
              >
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default ProfileDropdown
