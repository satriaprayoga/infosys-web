import React, { useContext, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import Footer from '../Footer'
import Navbar from '../Navbar'
import './SignIn.css'

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const validation = (values) => {
  let errors = {};
  if (!values.email || values.email.length === 0) {
    errors.email = "Email is Required"
  } else if (!emailRegex.test(values.email)) {
    errors.email = "Email is not valid"
  }

  if (!values.password || values.password.length === 0) {
    errors.password = "Password is required"
  }

  return errors;
}

const SignIn = () => {
  const authContext=useContext(AuthContext);
  const [values, setValues] = useState({
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState({ email: '', password: '' })

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    let formErrors = validation(values);
    if (Object.keys(formErrors).length === 0) {
      const userToken="abcdefghaijklmn1234567890";
      authContext.login(userToken);
      history.push('/');
      console.log('No error')
    } else {
      console.log('Error')
      setErrors(formErrors);
    }
    console.log(formErrors);

  }

  const handleChange = (e) => {
    // e.preventDefault();
    setValues({ ...values, [e.target.name]: [e.target.value] })
    console.log(values)
  }

  const handleSignUp = () => {
    history.push('/signUp');
  }

  return (
    <>
      <div className="signin-wrapper">
        <div className="form-wrapper">
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit} noValidate>

            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                placeholder="Email"
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                noValidate

              />
              {errors.email && (
                <span className="errorMessage">{errors.email}</span>
              )}
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input

                placeholder="Password"
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                noValidate

              />
              {errors.password && (
                <span className="errorMessage">{errors.password}</span>
              )}
            </div>

            <div className="signAccount">
              <button type="submit">Sign In</button>
              <Link to="/">
                <small>Forget Password?</small>
              </Link>
            </div>
          </form>
          <div className="createAccount">
            <button type="button" onClick={handleSignUp}>Not a member? Sign Up</button>
          </div>
        </div>
      </div>

    </>
  )
}

export default SignIn
