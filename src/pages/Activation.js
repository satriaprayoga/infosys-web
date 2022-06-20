import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { Button } from '../components/Button';
import { API_URL } from '../const';
import './Activation.css';

const Activation = () => {

    const [loading,setLoading]=useState(false);
    const [errorMsg,setErrorMsg]=useState();
    const history=useHistory();

    const {token}=useParams();

    const confirmToken=async()=>{
        if(!token){
           
            return;
        }
        setLoading(true);
        try {
            let {data}=await axios.get(`${API_URL}/api/v1/registration/confirm?token=${token}`);
            if(data){
                setLoading(false);
            }else{
                return;
            }
        } catch (error) {
            setLoading(false);
            setErrorMsg("Activation failed! Your Account is already registered or Expired");
        }
    }

    useEffect(() => {
        confirmToken();
    }, [])

    return (
       <>
       
       <div className="activation-container">
           {errorMsg?<h3>{errorMsg}</h3>:
            <>
            <h1>Welcome to Infosys!</h1>
            <h3>Your Account has been active!</h3>
            <Button buttonStyle='btn--outline' link='/signIn'>SIGN IN</Button>
            </>
           }
          
       </div>
       </>
    )
}

export default Activation
