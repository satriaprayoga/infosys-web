import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import './BookTour.css'

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

const BookTour = () => {
    const {name}=useParams();
    const history=useHistory();

    const [checkin,setCheckin]=useState(new Date());
    const [visitor,setVisitor]=useState(1);
    const [pickup,setPickup]=useState(true);
    const [estTime,setEstTime]=useState('');
    const [meetingPoint,setMeetingPoint]=useState('');

    const [contactName,setContactName]=useState('');
    const [contactEmail,setContactEmail]=useState('');
    const [contactPhone,setContactPhone]=useState('');

    const [visitorName,setVisitorName]=useState('');
    const [visitorEmail,setVisitorEmail]=useState('');
    const [visitorPhone,setVisitorPhone]=useState('');

    const [invoiceEmail,setInvoiceEmail]=useState('');
    const [request,setRequest]=useState('');

    const handleMinus=()=>{
        let current=visitor;
        if(current===1){
            setVisitor(1);
            return;
        }else{
            current=current-1;
        }
        setVisitor(current);
    }

    const handlePlus=()=>{
        let current=visitor;
        current=current+1;
        setVisitor(current);
    }

    const handlePickup=(e)=>{
        if(e.target.value==='yes'){
            setPickup(true);
        }else{
            setPickup(false);
        }
    }

    const handleSubmit=(e)=>{
      e.preventDefault();
      let book={
        checkin:moment(checkin).format('DD/MM/YYYY'),visitor,pickup,estTime,meetingPoint,
        contactEmail,contactName,contactPhone,
        visitorName,visitorEmail,visitorPhone,
        invoiceEmail,request,type:'TOUR'
      }
      localStorage.setItem('book',JSON.stringify(book));
      history.push('/confirmBooking');
      console.log(book);
      
    }

    useEffect(() => {
      const book=JSON.parse(localStorage.getItem('book'));
      if(book){
        setCheckin(new Date(moment(book.checkin,'DD/MM/YYYY',true)));
      setContactEmail(book.contactEmail);
      setContactName(book.contactName);
      setContactPhone(book.contactName);
      setEstTime(book.estTime);
      setInvoiceEmail(book.invoiceEmail);
      setMeetingPoint(book.meetingPoint);
      setPickup(book.pickup===true?true:false);
      setRequest(book.request);
      setVisitor(book.visitor);
      setVisitorEmail(book.visitorEmail);
      setVisitorName(book.visitorName);
      setVisitorPhone(book.visitorPhone);
      console.log(checkin);
      }
    }, [])

    return (
        <>
        <div className="book-wrapper">
            <h1>Discover</h1>
            <h2>{name}</h2>
        <div className="book-form-wrapper">
        <h3>Your Booking</h3>
            <h5>Fill in your details and review your booking</h5>
          <form onSubmit={handleSubmit} noValidate>
          <div className="firstName">
              <label htmlFor="checkin">Check In Date</label>
              <DatePicker placeholder="Date of tour" 
                selected={checkin}
                minDate={new Date()}
                dateFormat="dd/MM/yyyy"
                onChange={date=>setCheckin(date)}/>
              
            </div>
            <div className="visitor">
              <label htmlFor="visitor">Visitor(s)</label>
               <div className="visitor-wrapper">
               <input type="button" className="button-minus" value="-" onClick={handleMinus}></input>
              <div className="number">
                  {visitor}
              </div>
              <input type="button" className="button-plus" value="+" onClick={handlePlus}></input>
               </div>
            </div>
            <div className="pickup">
                <label htmlFor="pickup">Pickup</label>
                <div className="pickup-wrapper" onChange={(e)=>console.log(e.target.value)}>
                    
                    <label className="pickup-container"> Yes
                        <input type="radio" checked={pickup===true} value="yes" name="pickup" onChange={handlePickup}/>
                        <span class="checkmark"></span>
                    </label>
                    <label className="pickup-container"> No
                        <input type="radio" value="no" checked={pickup===false} name="pickup" onChange={handlePickup}/>
                        <span class="checkmark"></span>
                    </label>
                </div>
                
               
            </div>
            <div className="pickup">
                <label htmlFor="pickup">Est. Arrival Time</label>
                <div className="pickup-wrapper" >
                    <input type="text" placeholder="Arrival Time" name="estTime" className="estArrival" value={estTime} onChange={(e)=>setEstTime(e.target.value)}></input>
                </div>

            </div>
            <div className="pickup">
                <label htmlFor="pickup">Meeting Point</label>
                <div className="pickup-wrapper" >
                   <select name="meetingPoint" className="meetingPoint" onChange={(e)=>setMeetingPoint(e.target.value)} value={meetingPoint}>
                       <option value="">Select</option>
                       <option value="Terminal">Terminal</option>
                       <option value="Airport">Airport</option>
                       <option value="Station">Station</option>
                   </select>
                </div>
                
               
            </div>
            
            <div className="email">
              <label htmlFor="email">Contact Details</label>
              <input
                placeholder="Contact's Name"
                type="text"
                name="contactName"
                onChange={(e)=>setContactName(e.target.value)}
                value={contactName}
                noValidate
               
              />
              <input
                placeholder="Contact's Email"
                type="email"
                name="contactEmail"
                value={contactEmail}
                onChange={(e)=>setContactEmail(e.target.value)}
                noValidate
               
              />
              <input
                placeholder="Contact's Phone"
                type="text"
                name="contactPhone"
                value={contactPhone}
                onChange={(e)=>setContactPhone(e.target.value)}
                noValidate
               
              />
             
            </div>
            <div className="password">
              <label htmlFor="password">Visitor Details</label>
              <input
                placeholder="Visitor's Name"
                type="text"
                name="visitorName"
                onChange={(e)=>setVisitorName(e.target.value)}
                value={visitorName}
                noValidate
               
              />
              <input
                placeholder="Visitor's Email"
                type="email"
                name="visitorEmail"
                value={visitorEmail}
                onChange={(e)=>setVisitorEmail(e.target.value)}
                noValidate
               
              />
              <input
                placeholder="Visitor's Phone"
                type="text"
                name="visitorPhone"
                value={visitorPhone}
                onChange={(e)=>setVisitorPhone(e.target.value)}
                noValidate
               
              />
             
            </div>
            <div className="password">
              <label htmlFor="password">Invoice</label>
              <input
                
                placeholder="Invoice Email"
                type="email"
                name="invoiceEmail"
                value={invoiceEmail}
                onChange={(e)=>setInvoiceEmail(e.target.value)}
                noValidate
               
              />
             
            </div>

            <div className="password">
              <label htmlFor="password">Additional Request</label>
              <textarea name="request" 
                placeholder="Additional Request" 
                rows='4' 
                onChange={(e)=>setRequest(e.target.value)}
                value={request}></textarea>
             
            </div>
            
            <div className="createAccount">
              <button type="submit">Book Now</button>
            </div>
          </form>
        </div>
      </div>
        
        </>
    )
}

export default BookTour
