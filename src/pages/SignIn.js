import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import Loading from "react-fullscreen-loading";
import {useAuthDispatch,signIn} from '../context';
import "./SignIn.css";
import { toast } from 'react-toastify';


const SignIn = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
      } = useForm();

    const [loading,setLoading]=useState(false);

    const history=useHistory();
    const dispatch=useAuthDispatch();

    const onSubmit=async formData=>{
        
        try {
          setLoading(true);
          let data={
            email:formData.email,
            password:formData.password,
            rememberMe:false
          }
          let response=await signIn(dispatch,data);
          if(!response){
            toast.error("Your email and password aren't registered");
            setLoading(false);
            return;
          }
          history.push('/');
          toast.info('Welcome back to InfoSys');
        } catch (error) {
          toast.error("Your email and password aren't registered");
          setLoading(false);
        }
        setLoading(false);
    }

    const handleSignUp = () => {
        history.push('/signUp');
      }

   
    return (
        <>
        {loading && <Loading loading={true} background="#453222" loaderColor="#3498db" />}
        <div className="signin-wrapper">
          <div className="form-wrapper">
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
  
              <div className="email">
                <label htmlFor="email">Email</label>
                <input placeholder="Email" type="email" {...register("email",{required:true, pattern:/^\S+@\S+$/i})}></input>
                {errors.email && (
                  <span className="errorMessage">This field is required</span>
                )}
              </div>
              <div className="password">
                <label htmlFor="password">Password</label>
                <input placeholder="Password" type="password" {...register("password",{required:true})}></input>
                {errors.password && (
                  <span className="errorMessage">this field is required</span>
                )}
              </div>
  
              <div className="signAccount">
                <button type="submit">Sign In</button>
                <Link to="/forgetPassword">
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
