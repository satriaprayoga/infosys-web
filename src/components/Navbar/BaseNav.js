import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { Button } from '../Button';

import './BaseNav.css';

const BaseNav = () => {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const [navbar,setNavbar]=useState(false)
    const history=useHistory();

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    const changeBackground=()=>{
        if(window.scrollY>=80){
            setNavbar(true);
        }else{
            setNavbar(false);
        }
    }

    const handleButton=()=>{
        history.push('/signIn')
    }

    useEffect(() => {
        showButton();
    }, []);

    window.addEventListener('resize', showButton);
    window.addEventListener('scroll',changeBackground);

    return (
        <>
            <nav className={navbar?"navbar active":"navbar"}>
                <div className="navbar-container">
                    <Link to="/" className="navbar-logo">
                        <img src='/images/Logo_blck.png'/>
                    </Link>
                    <div className="menu-icon" onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        
                        <li>
              <Link
                to='/signIn'
                className='nav-links-mobile'
                onClick={closeMobileMenu}
              >
                Sign In
              </Link>
            </li>

                    </ul>
                    {button && <Button buttonStyle='btn--outline' link='/signIn'>SIGN IN</Button>}
                </div>
            </nav>
        </>
    )
}

export default BaseNav
