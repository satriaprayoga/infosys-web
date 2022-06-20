import axios from 'axios';
import React, { useRef, useState } from 'react'
import { Loading } from 'react-fullscreen-loading';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify';
import { API_URL } from '../const';
import './ForgotPassword.css'

const ForgotPassword = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
      } = useForm()
    const history=useHistory();
    const [loading,setLoading]=useState(false);

    const onSubmit=async(formData)=>{
        try {
            setLoading(true);
            let {data}=await axios.put(`${API_URL}/api/v1/account/forgetPassword`,{email:formData.email});
            if(!data){
                setLoading(false);
                toast.error('Your email are not registered!');
            }
            toast.info('Reset Password has been sent to your email');
            history.push('/');
            setLoading(false)
        } catch (error) {
            toast.error('Your email are not registered!');
            setLoading(false)
        }
    }
    return (
        <>
      <div className="forgot-wrapper">
       
        <div className="forgot-form-wrapper">
          <h2>Forget Password</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
          <div className="email">
              <label htmlFor="email">Restore Email Address</label>
              <input 
                type="email"
                placeholder="Your Account Email"
                {...register("email",{required:{value:true,message:'This Field is Required'}})}
              />
              {errors.email && (
                  <span className="errorMessage">This field is required</span>
                )}
            </div>
            
            

            <div className="createAccount">
              <button type="submit">Send</button>
            </div>
          </form>
          
        </div>
      </div>

    </>
    )
}

export default ForgotPassword
