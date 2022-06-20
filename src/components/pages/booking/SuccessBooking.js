import React from 'react'
import { Button } from '../../Button'
import './SuccessBooking.css'

const SuccessBooking = () => {
    return (
        <div className="success-container">
            <h1>Thank You For Booking With Us!</h1>
            <h3>Invoice has been sent to your email!</h3>
            <div style={{margin:2, display:'flex', flexDirection:'column', alignItems:'center'}}>
                    <Button buttonStyle='btn--outline' link='/bookTour/baluran'>Home</Button>
                    <Button buttonStyle='btn--blue' link='/payment'>Go To Payment</Button>
                </div>
        </div>
    )
}

export default SuccessBooking
