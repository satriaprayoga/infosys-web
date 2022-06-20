import React from 'react';
import { Button } from '../../components/Button';
import Loading from "react-fullscreen-loading";
import './BookingSuccess.css';

const BookingSuccess = () => {
    return (
        <div className="success-container">
            
            <h1>Thank You For Booking With Us!</h1>
            <h3>Invoice has been sent to your email!</h3>
            <div style={{margin:2, display:'flex', flexDirection:'column', alignItems:'center'}}>
                    <Button buttonStyle='btn--outline' link='/'>Home</Button>
                    <Button buttonStyle='btn--blue' link='/payment'>Go To Payment</Button>
                </div>
        </div>
    )
}

export default BookingSuccess
