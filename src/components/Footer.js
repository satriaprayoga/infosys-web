import React, { useEffect, useState } from 'react';
import './Footer.css';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {API_URL} from '../const';

function Footer(props) {

  // const [socials,setSocials]=useState([]);
  // const [siteInfo,setSetInfo]=useState({});

  // const fetchSocials=async()=>{
  //   try {
  //     let {data}=await axios.get(`${API_URL}/api/v1/site/socials`);
  //     if(!data){
  //       return;
  //     }
  //     setSocials(data);
  //   } catch (error) {
      
  //   }
  // }

  // const fetchSiteInfo=async ()=>{
  //   try {
  //     let {data}=await axios.get(`${API_URL}/api/v1/site`);
  //     if(!data){
  //       return;
  //     }
  //     setSetInfo(data);
  //   } catch (error) {
      
  //   }
  // }

  // useEffect(() => {
  //   fetchSocials();
  //   fetchSiteInfo();
  // }, [])

  return (
    <div className='footer-container'>
      
      <div className='footer-links'>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <h2>Quick Page</h2>
            <Link to='/exploreAccomodations'>Accomodations</Link>
            <Link to='/exploreDestinations'>Tour and Travel</Link>
            <Link to='/'>Investment</Link>
          </div>
          <div className='footer-link-items'>
            <h2>Useful Links</h2>
            <Link to='/signIn'>Sign In</Link>
            <Link to='/'>About Us</Link>
            <Link to='/'>FAQ</Link>
            <Link to='/'>Terms & Conditions</Link>
          </div>
          <div className='footer-link-items'>
            <h2>Contact Us</h2>
            <p>{props.siteInfo.phone}</p>
            <p>{props.siteInfo.mobile}</p>
            <p>{props.siteInfo.email}</p>
            <p>{props.siteInfo.address}</p>
          </div>
        </div>
        
       
      </div>
      <section className='social-media'>
        <div className='social-media-wrap'>
          <div className='footer-logo'>
            <Link to='/' className='social-logo'>
            <img src='/images/logobig-white2.png'/>
             
            </Link>
          </div>
          <small className='website-rights'>InfoSys © 2020</small>
          <div className='social-icons'>
            {
              props.socials.map((item,index)=>{
                return(
                  <a key={index}
                  className={`social-icon-link ${item.provider}`}
                  href={ `${item.link}`}
                  target='_blank'
                  aria-label={`${item.provider}`}
                >
                  <i className={`fab fa-${item.provider}`} />
                </a>
                )
              })
            }
            
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;