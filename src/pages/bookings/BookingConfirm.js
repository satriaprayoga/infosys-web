import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Loading } from 'react-fullscreen-loading';
import { useHistory } from 'react-router';
import {Button} from '../../components/Button';
import { API_URL } from '../../const';
import { confirmBook, useAuthState, useBookDispatch, useBookState } from '../../context';
import './BookingConfirm.css'

const BookingConfirm = () => {

    const [loading,setLoading]=useState(false);
    const [amount,setAmount]=useState(0);

    const {book,tourDetails,accomDetails}=useBookState();
    const userDetails=useAuthState();
    const dispatch=useBookDispatch();
    const history=useHistory();

    const calculateDay=(d1,d2)=>{
        let checkin=moment(d1,'DD/MM/YYYY');
        let checkout=moment(d2,'DD/MM/YYYY');
        return checkout.diff(checkin,'days');
    }

    const handleConfirm=async()=>{
        try {
            let bookRequest={
              ...book

            }
            let bookingItems=[];
            if(accomDetails){
                bookingItems.push({...accomDetails});
            }
            if(tourDetails){
                bookingItems.push({...tourDetails});
            }
            bookRequest.items=bookingItems;
            bookRequest.grossAmount=amount;
            let {data}=await axios.post(`${API_URL}/api/v1/booking`,bookRequest,{ headers: { Authorization: `Bearer ${userDetails.token}` }});
            if(data){
                console.log(data);
              
                history.push('/successBooking');
                confirmBook(dispatch);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const backLink=()=>{
        if(book.type==='ACCOMODATION'){
            return `/bookAccom/${accomDetails.packageId}`
        }else{
            return `/bookTour/${tourDetails.packageId}`
        }
    }

    useEffect(() => {
        let checkin=moment(book.checkin,'DD/MM/YYYY');
        let checkout=moment(book.checkout,'DD/MM/YYYY');
        const day=calculateDay(checkin,checkout);
        let total=0;
        if(accomDetails){
            total=accomDetails.price * accomDetails.guest*day;
        }
      
       if(tourDetails){
        total+=tourDetails.guest*tourDetails.price;
       }
       setAmount(total);
       
    }, [])

    return (
        <>
        <div className="confirm-container">
           
            {loading&&<h1>Loading</h1>}
            <div className="confirm-wrapper">
                <h2>Invoice</h2>
                <div className="confirm-details">
                    <table>
                        <thead>
                            <td className="group">Booking Summary</td>
                            <td className="group">Contact Details</td>
                            <td className="group">Visitor Details</td>
                        </thead>
                        <td>
                            <p>Check In: {book.checkin}</p>
                            <p>Check Out: {book.checkout}</p>
                            <p>Pickup: {book.pickup?"Yes":"No"}, {book.meetingPoint}, {book.estArrival}</p>
                        </td>
                        <td>
                            <p>{book.contactName}</p>
                            <p>{book.contactEmail}</p>
                            <p>{book.contactPhone}</p>
                        </td>
                        <td>
                            <p>{book.visitorName}</p>
                            <p>{book.visitorEmail}</p>
                            <p>{book.visitorPhone}</p>
                        </td>
                        
                        
                        <tr>
                            <td className="group">Invoice email</td>
                        </tr>
                        <tr>
                            <td>{book.email}</td>
                        </tr>
                       

                    </table>
                </div>
                <div className="confirm-details">
                    <h2>Booking Details</h2>
                    <table>
                        <thead>
                            <td className="group">Package</td>
                            <td className="group">Guest(s)</td>
                            <td className="group">Price</td>
                            <td className="group">Amount</td>
                        </thead>
                        <tbody>
                        {accomDetails && (
                            <tr>
                            <td>{accomDetails.packageName}</td>
                            <td>{accomDetails.guest+' for '+calculateDay(book.checkin,book.checkout)+' day(s)'}</td>
                            <td>{accomDetails.price.toString().replace(/(.)(?=(\d{3})+$)/g, '$1.')}</td>
                            <td>{(accomDetails.guest*accomDetails.price).toString().replace(/(.)(?=(\d{3})+$)/g, '$1.')}</td>
                            </tr>
                        )}
                        {tourDetails && (
                            <tr>
                            <td>{tourDetails.packageName}</td>
                            <td>{tourDetails.guest}</td>
                            <td>{tourDetails.price.toString().replace(/(.)(?=(\d{3})+$)/g, '$1.')}</td>
                            <td>{(tourDetails.guest*tourDetails.price).toString().replace(/(.)(?=(\d{3})+$)/g, '$1.')}</td>
                            </tr>
                        )}
                        
                        <tr>
                            <td className="group">Additional Request</td>
                        </tr>
                        <tr>
                            <td>{book.request}</td>
                        </tr>
                        <tr>
                            <td className="group">Total</td>
                        </tr>
                        <tr>
                            <td><strong>{'IDR '+amount.toString().replace(/(.)(?=(\d{3})+$)/g, '$1.')}</strong></td>
                        </tr>
                        </tbody>
                       

                    </table>
                </div>
                <div style={{margin:2}}>
                    <Button buttonStyle='btn--primary' link={backLink}>Back</Button>
                    <Button buttonStyle='btn--blue' onClick={handleConfirm}>Confirm</Button>
                </div>
            </div>
            
        </div>
        </>
    )
}

export default BookingConfirm
