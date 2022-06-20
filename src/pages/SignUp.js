import axios from 'axios';
import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify';
import { API_URL } from '../const';
import './SignUp.css'


const SignUp = () => {
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    watch,
    formState: { errors }
  } = useForm();

  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const onSubmit = async formData => {
    console.log(formData);
    if(getValues('confirmPassword')!==getValues('password')){
      setError("confirmPassword",{types:"manual",message:'Password do not macth'})
      return;
    }
    try {
      let request = {
        firstName:formData.firstName,
        lastName:formData.lastName,
        username:formData.firstName,
        email:formData.email,
        password:formData.password,
        repassword:formData.confirmPassword
      }
      setLoading(true);
      let { data } = await axios.post(`${API_URL}/api/v1/registration/`, request);
      if (!data) {
        setLoading(false);
        toast.error('Sign up failed, please contact our admin');
        return;
      }
      console.log(data);
      setLoading(false);
      toast.info('Sign up succeed, Your activation email has been sent');
      history.push('/signIn');
    } catch (error) {
      setLoading(false);
      toast.error('Sign up failed, please contact our admin');
    }
  }
  return (
    <>
      <div className="signup-wrapper">
        <div className="signup-form-wrapper">
          <h1>Sign Up</h1>
          <form onSubmit={e => e.preventDefault()}>
            <div className="firstName">
              <label htmlFor="firstName">First Name</label>
              <input
                placeholder="First Name"
                type="text"
                {...register("firstName", {
                  required: "This field is required"
                })}


              />
              {errors.firstName && (
                <span className="errorMessage">{errors.firstName.message}</span>
              )}

            </div>
            <div className="lastName">
              <label htmlFor="lastName">Last Name</label>
              <input
                placeholder="Last Name"
                type="text"
                {...register("lastName", {
                  required: "This field is required"
                })}


              />
              {errors.lastName && (
                <span className="errorMessage">{errors.lastName.message}</span>
              )}

            </div>

            <div className="email">
              <label htmlFor="email">Email</label>
              <input placeholder="Email" type="email" {...register("email", { required: "This field is required", pattern: /^\S+@\S+$/i })}></input>
              {errors.email && (
                <span className="errorMessage">{errors.email.message}</span>
              )}

            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input
               
                type="password"
                {...register("password",{
                  required: "You must specify a password",
                  minLength: {
                    value: 8,
                    message: "Password must have at least 8 characters"
                  }
                })}
              />
              {errors.password && (
                <span className="errorMessage">{errors.password.message}</span>
              )}

            </div>
            <div className="password">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input placeholder="Confirm Password" type="password"
                {...register("confirmPassword", {required:true
                })}></input>
              {errors.confirmPassword && (
                <span className="errorMessage">{errors.confirmPassword.message}</span>
              )}

            </div>

            <div className="createAccount">
              <button type="submit" onClick={handleSubmit(onSubmit)}>Sign Up</button>
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
