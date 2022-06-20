import React, { useState } from 'react'
import { useParams } from 'react-router-dom';

const MobilePayment = () => {
    
    const [book,setBook]=useState({});
    const [customer,setCustomer]=useState({});
    const {bookId,customerId}=useParams();

    const fetchBookingData=async()=>{
        
    }
    
    return (
       <>
       </>
    )
}

export default MobilePayment
