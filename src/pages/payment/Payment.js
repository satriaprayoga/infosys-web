import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { Button } from '../../components/Button';
import { API_URL } from '../../const';
import "./Payment.css"

const Payment = () => {

    const [book,setBook]=useState({});
    const [loading,setLoading]=useState(false);
    const [midtrans,setMidtrans]=useState({})
    const {id}=useParams();

    const fetchData=async()=>{
        try {
            setLoading(true)
            let {data}=await axios.get(`${API_URL}/api/v1/booking/customer/${id}`);
            if(!data){
                setLoading(false);
                return;
            }
            console.log(data);
            setBook(data);
            loadTransactionToken(id);
        } catch (error) {
            
        }
    }

    const loadTransactionToken=async(id)=>{
        try {
            let {data}=await axios.get(`${API_URL}/api/v1/payment/token/${id}`);
            if(!data){
                
                return;
            }
            setMidtrans(data);
            console.log(data);
            setupScript(data.clientKey);
        } catch (error) {
            
        }
    }

    const setupScript=(clientKey)=>{
        const midtransScriptUrl = 'https://app.sandbox.midtrans.com/snap/snap.js'; 
        //change this according to your client-key
        const myMidtransClientKey = clientKey; 
       
        let scriptTag = document.createElement('script');
        scriptTag.src = midtransScriptUrl;
        // optional if you want to set script attribute
        // for example snap.js have data-client-key attribute
        scriptTag.setAttribute('data-client-key', myMidtransClientKey);
       
        document.body.appendChild(scriptTag);
        return () => {
          document.body.removeChild(scriptTag);
        }
    }

    const handlePay=()=>{
        window.snap.pay(midtrans.token, {
            onSuccess: function(result){
              /* You may add your own implementation here */
              
            },
            onPending: function(result){
              /* You may add your own implementation here */
              
            },
            onError: function(result){
              /* You may add your own implementation here */
              
            },
            onClose: function(){
              /* You may add your own implementation here */
              
            }
          })
    }

    useEffect(() => {
        fetchData();
       
    }, [])

    return (
       <>
        <div className="payment-container">
            <h1>{'Check Out - Booking '+book.code}</h1>
            <div className="payment-wrapper">
                <h2>Summary</h2>
                <h2>{'IDR '+book.grossAmount}</h2>
               
            </div>
            <Button buttonStyle='btn--blue' onClick={handlePay}>Pay</Button>
        </div>
        </>
    )
}

export default Payment
