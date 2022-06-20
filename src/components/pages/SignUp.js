import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../Footer'
import Navbar from '../Navbar'
import './SignUp.css'


const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );

const SignUp = () => {
    return (
        <>
        <div className="signup-wrapper">
        <div className="signup-form-wrapper">
          <h1>Sign Up</h1>
          <form noValidate>
          <div className="firstName">
              <label htmlFor="firstName">First Name</label>
              <input
                placeholder="First Name"
                type="text"
                name="firstName"
                noValidate
               
              />
              
            </div>
            <div className="lastName">
              <label htmlFor="lastName">Last Name</label>
              <input
                placeholder="Last Name"
                type="text"
                name="lastName"
                noValidate
               
              />
            </div>
            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                placeholder="Email"
                type="email"
                name="email"
                noValidate
               
              />
             
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input
                
                placeholder="Password"
                type="password"
                name="password"
                noValidate
               
              />
             
            </div>
            <div className="password">
              <label htmlFor="password">Confirm Password</label>
              <input
                
                placeholder="Confirm Password"
                type="password"
                name="password"
                noValidate
               
              />
             
            </div>
            
            <div className="createAccount">
              <button type="submit">Sign Up</button>
            </div>
          </form>
          <div className="signAccount">
              <button type="submit">Already a member? Sign In</button>
            </div>
        </div>
      </div>
        
        </>
    )
}

export default SignUp
