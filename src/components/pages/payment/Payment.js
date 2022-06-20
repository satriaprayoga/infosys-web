import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Midtrans} from '../../../service/PaymentService';
import { Button } from '../../Button';
import "./Payment.css"

const Payment = () => {

    const [booking,setBooking]=useState({});
    const [transactionToken,setTransactionToken]=useState('');

    const loadTransactionToken=()=>{
        axios.request(
            {
                url:Midtrans.transactionSandboxUrl,
                method:"post",
                headers:{
                    'Content-Type': "application/json",
                    Accept: "application/json",
                    Authorization: 'Basic '+Buffer.from(Midtrans.server_key).toString('base64')
                },
                data:
                {
                        transaction_details: {
                          order_id: "order-csb-12",
                          gross_amount: 10000
                        },
                        credit_card: {
                          secure: true
                        },
                        customer_details: {
                          first_name: "Johny",
                          last_name: "Kane",
                          email: "testmidtrans@mailnesia.com",
                          phone: "08111222333"
                        }
                 }
                
            }

        ).then((resp)=>{
            console.log(resp.data.token);
        },(err)=>{
            console.log(err);
        })
    }

   
    useEffect(() => {
        let userData=JSON.parse(localStorage.getItem('book'));
        if(userData){
            setBooking({...booking, ...userData});
          
        }

        let scriptTag=document.createElement('script');
        scriptTag.src=`${Midtrans.scriptSandboxUrl}`;
        scriptTag.setAttribute('data-client-key',`${Midtrans.client_key}`);

        document.body.appendChild(scriptTag);

        loadTransactionToken();

        return () => {
            document.body.removeChild(scriptTag);
          }
    }, [])
    return (
        <>
        <div className="payment-container">
            <h1>Check Out - Booking No #1</h1>
            <div className="payment-wrapper">
                <h2>Summary</h2>
                <div className="payment-details">
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
                    <Button buttonStyle='btn--blue' link='/successBooking'>Pay</Button>
                </div>
            </div>
        </div>
        </>
    )
}

export default Payment
