import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Button } from '../../components/Button';
import { API_URL } from '../../const';
import './BookingDetails.css';

const BookingDetails = () => {

    const {id}=useParams();

    const[book,setBook]=useState({});
    const [items,setItems]=useState([])
    const [loading,setLoading]=useState(false);

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
           
            let items=data.items;
            let dataItems=[];
            items.forEach(e=> {
                dataItems.push({
                    packageName:e.packageName,
                    guest:e.guest,
                    price:e.price.toString().replace(/(.)(?=(\d{3})+$)/g, '$1.'),
                    total:()=>{
                        if(e.type==='ACCOMODATION'){
                            let day=calculateDay(data.checkin,data.checkout);
                            return (e.guest*e.price*day).toString().replace(/(.)(?=(\d{3})+$)/g, '$1.')
                        }else{
                            return (e.guest*e.price).toString().replace(/(.)(?=(\d{3})+$)/g, '$1.');
                        }
                    }
                })
            });
            console.log(dataItems);
            setItems(dataItems);
            setLoading(false);
        } catch (error) {
            setLoading(false)
        }
    }

    const calculateDay=(d1,d2)=>{
        let checkin=moment(d1,'DD/MM/YYYY');
        let checkout=moment(d2,'DD/MM/YYYY');
        return checkout.diff(checkin,'days');
    }

    const currency=amount=>{
        return amount.toString().replace(/(.)(?=(\d{3})+$)/g, '$1.')
    }

    useEffect(() => {
        fetchData();
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
                            <td className="group">Total</td>
                           
                        </thead>
                        <tbody>
                        {items.map((item,index)=>{
                              return(
                                <tr>
                                <td>{item.packageName}</td>
                                <td>{item.guest}</td>
                                <td>{item.price}</td>
                                <td>{item.total()}</td>
                                </tr>
                              )
                        })}
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
                            <td><strong>{'IDR '+book.grossAmount}</strong></td>
                            
                        </tr>
                        <tr>
                            <td className="group">{book.status}</td>
                        </tr>
                        
                        </tbody>
                        

                    </table>
                </div>
                <div style={{margin:2}}>
                    { book.status==='BOOKED' && <Button buttonStyle='btn--primary' link={'/payment/'+book.id}>Payment</Button>}
                </div>
            </div>
            
        </div>
        </>
    )
}

export default BookingDetails
