import React, { useEffect, useState } from 'react'
import { Button } from '../../Button';
import './ConfirmBooking.css'
const ConfirmBooking = () => {

    const [booking,setBooking]=useState({});

    useEffect(() => {
        let userData=JSON.parse(localStorage.getItem('book'));
        if(userData){
            setBooking({...booking, ...userData});
        }
    }, [])

    return (
        <>
        <div className="confirm-container">
            <h1>Booking Confirmation</h1>
            <div className="confirm-wrapper">
                <h2>Adventure - Paket A</h2>
                <div className="confirm-details">
                    <table>
                        <tr>
                            <td className="group">Booking Summary</td>
                        </tr>
                        <tr>
                            <td>Check In: {booking.checkin}</td>
                        </tr>
                        <tr>
                        <td>Visitor(s): {booking.visitor} persons</td>
                        </tr>
                        <tr>
                            <td>Pickup: {booking.pickup===true?"Yes":"No"}, {booking.meetingPoint}, {booking.estTime}</td>
                        </tr>
                        <tr>
                            <td className="group">Contact Details</td>
                        </tr>
                        <tr>
                            <td>{booking.contactName}</td>
                        </tr>
                        <tr>
                            <td>{booking.contactEmail}</td>
                        </tr>
                        <tr>
                            <td>{booking.contactPhone}</td>
                        </tr>
                        <tr>
                            <td className="group">Visitor Details</td>
                        </tr>
                        <tr>
                            <td>{booking.visitorName}</td>
                        </tr>
                        <tr>
                            <td>{booking.visitorEmail}</td>
                        </tr>
                        <tr>
                            <td>{booking.visitorPhone}</td>
                        </tr>
                        <tr>
                            <td className="group">Additional Request</td>
                        </tr>
                        <tr>
                            <td>{booking.request}</td>
                        </tr>
                        <tr>
                            <td className="group">Total Amount: IDR {(2000000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</td>
                        </tr>
                        <tr>
                            
                        </tr>
                    </table>
                </div>
                <div style={{margin:2}}>
                    <Button buttonStyle='btn--primary' link='/bookTour/baluran'>Cancel</Button>
                    <Button buttonStyle='btn--blue' link='/successBooking'>Confirm</Button>
                </div>
            </div>
        </div>
        </>
    )
}

export default ConfirmBooking
