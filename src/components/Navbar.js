import React, { useContext } from 'react'
import { useAuthState } from '../context';
import AuthNav from './Navbar/AuthNav';
import BaseNav from './Navbar/BaseNav';

const Navbar = () => {

    const userDetails=useAuthState();

    return (
        <>
            {userDetails.token?<AuthNav/>:<BaseNav/>}
          
        </>
        
    )
}

export default Navbar
