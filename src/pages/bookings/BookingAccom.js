import React, { useEffect, useState } from 'react'
import ReactDatePicker from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router';
import "react-datepicker/dist/react-datepicker.css";
import './BookingAccom.css';
import axios from 'axios';
import { API_URL } from '../../const';
import moment from 'moment';
import { Loading } from 'react-fullscreen-loading';
import { createBook, removeTourDetails, useBookDispatch, useBookState } from '../../context';

const BookingAccom = () => {

    const { register,handleSubmit,watch, control,getValues, setValue,formState: { errors }} = useForm();
    const { checkin,checkout } = watch(["checkin", "checkout"]);
    const [loading,setLoading]=useState(false);

    const {id}=useParams();
    const history=useHistory();

    const [accomodation,setAccomodation]=useState({});
    const [tours,setTours]=useState([])
    const [toured,setToured]=useState(false);

    const bookData=useBookState();
    const dispatch=useBookDispatch();

    const onSubmit=async(formData)=>{
        let payload={};
        payload.book={
          checkin:moment(formData.checkin).format('DD-MM-YYYY'),
          checkout:moment(formData.checkout).format('DD-MM-YYYY'),
          type:'ACCOMODATION',
          pickup:formData.pickup,
          estArrival:formData.estArrival,
          meetingPoint:formData.meetingPoint,
          email:formData.email,
          contactEmail:formData.contactEmail,
          contactName:formData.contactName,
          contactPhone:formData.contactPhone,
          visitorName:formData.visitorName,
          visitorEmail:formData.visitorEmail,
          visitorPhone:formData.visitorPhone,
          request:formData.request,

        }
        // localStorage.setItem("book",JSON.stringify(book));
        payload.accomDetails={
          packageId:accomodation.id,
          packageName:accomodation.name,
          type:'ACCOMODATION',
          guest:formData.visitor,
          price:accomodation.price
        }
        // localStorage.setItem("accomDetails",JSON.stringify(accomDetails));
        if(toured){
         try {
           let {data}=await axios.get(`${API_URL}/api/v1/tours/${formData.tour}`)
           if(data){
             payload.tourDetails={
              packageId:data.id,
              packageName:data.name,
              type:'TOUR',
              guest:formData.visitor,
              price:data.price
             }
           }
          } catch (error) {
           
         }
        }else{
          removeTourDetails(dispatch);
        }
       
        try {
          console.log(payload);
          let response=createBook(dispatch,payload);
          if(response){
            history.push('/confirmBooking');
          }
        } catch (error) {
          
        }
      
      // console.log(payload);
    }

    const fetchData=async()=>{
        try {
            setLoading(true);
            let {data}=await axios.get(`${API_URL}/api/v1/accomodations/${id}`);
            if(!data){
                setLoading(false);
                return;
            }
            setAccomodation(data);
            fetchTourOptions(data.destination);
           
            setLoading(true);
        } catch (error) {
          setLoading(false);
        }
        fetchForm();
        setLoading(false);
    }

    const fetchTourOptions=async(destination)=>{
        try {
            let options=[];
            let {data}=await axios.get(`${API_URL}/api/v1/tours/q?destination=${destination}`);
            if(!data){
                return;
            }
            data.forEach(d => {
                options.push({'label':`${d.name}, IDR ${d.price.toString().replace(/(.)(?=(\d{3})+$)/g, '$1.')}`,'value':d.id})
            });
            setTours(options);
            
        } catch (error) {
            
        }
    }

    const fetchForm=()=>{
      if(bookData.book !== null){
        console.log(bookData);
        setValue('checkin',moment(bookData.book.checkin,'DD/MM/YYYY').toDate());
        setValue('checkout',moment(bookData.book.checkout,'DD/MM/YYYY').toDate());
        setValue('pickup',bookData.book.pickup);
        setValue('estArrival',bookData.book.estArrival);
        setValue('meetingPoint',bookData.book.meetingPoint);
        setValue('email',bookData.book.email);
        setValue('contactEmail',bookData.book.contactEmail);
        setValue('contactName',bookData.book.contactName);
        setValue('contactPhone',bookData.book.contactPhone);
        setValue('visitorEmail',bookData.book.visitorEmail);
        setValue('visitorName',bookData.book.visitorName);
        setValue('visitorPhone',bookData.book.visitorPhone);
        setValue('request',bookData.book.request)
        
        if(bookData.tourDetails){
          setToured(true);
          setValue('tour',bookData.tourDetails.packageId);
        }

        if(bookData.accomDetails){
          setValue('visitor',bookData.accomDetails.guest)
        }
      }
      
    }

    useEffect(() => {
        fetchData();
       
    }, [])

    
    return (
        <>
        <div className="book-wrapper">
          
            <h1>Discover</h1>
            <h2>{accomodation.name+ ' - '+accomodation.destination}</h2>
        <div className="book-form-wrapper">
       
        <h3>Your Booking</h3>
            <h5>Fill in your details and review your booking</h5>
          <form onSubmit={handleSubmit(onSubmit)}>
          <div className="firstName">
              <label htmlFor="checkin">Check In Date</label>
              <Controller
                control={control}
                name="checkin"
                render={({ field: { onChange, onBlur, value, ref } }) => (
                    <ReactDatePicker placeholderText="Date of Check In" 
                      onChange={onChange}
                      onBlur={onBlur}
                      selected={value}
                      minDate={new Date()}
                      dateFormat="dd/MM/yyyy"
                    />
                  )}
                rules={{required:{value:true,message:'This Field is Required'}}}/>
             {errors.checkin && (
                  <span className="errorMessage">{errors.checkin.message}</span>
                )}
              
            </div>
            <div className="firstName">
              <label htmlFor="checkout">Check Out Date</label>
              <Controller
                control={control}
                name="checkout"
                render={({ field: { onChange, onBlur, value, ref } }) => (
                    <ReactDatePicker placeholderText="Date of Check Out" 
                      onChange={onChange}
                      onBlur={onBlur}
                      selected={value}
                      minDate={new Date()}
                      dateFormat="dd/MM/yyyy"
                    />
                  )}
                rules={{required:{value:true, message:'This field is required'}}}/>
             {errors.checkout && (
                  <span className="errorMessage">{errors.checkout.message}</span>
                )}
              
            </div>
            <div className="visitor">
              <label htmlFor="visitor">Visitor(s)</label>
               <div className="visitor-wrapper">
                <input type="number" min={1} step={1} {...register('visitor',{
                    required:{value:true,message:'This Field is required'},
                    valueAsNumber:true
                })}/>
               </div>
               {errors.checkout && (
                  <span className="errorMessage">{errors.visitor.message}</span>
                )}
            </div>
            <div className="pickup">
                <label htmlFor="pickup">Pickup</label>
                <div className="pickup-wrapper" onChange={(e)=>console.log(e.target.value)}>
                    
                    <label className="pickup-container"> Yes
                        <input {...register("pickup")}type="radio" value={true} defaultChecked={true}/>
                        <span class="checkmark"></span>
                    </label>
                    <label className="pickup-container"> No
                    <input {...register("pickup")}type="radio" value={false} />
                        <span class="checkmark"></span>
                    </label>
                </div>
                
               
            </div>
            <div className="pickup">
                <label htmlFor="pickup">Est. Arrival Time</label>
                <div className="pickup-wrapper" >
                    <input {...register("estArrival")} placeholder="Arrival Time" className="estArrival" ></input>
                </div>
            </div>
            <div className="pickup">
                <label htmlFor="pickup">Meeting Point</label>
                <div className="pickup-wrapper" >
                   <select {...register("meetingPoint")} className="meetingPoint">
                       <option value="Terminal">Terminal</option>
                       <option value="Airport">Airport</option>
                       <option value="Station">Station</option>
                   </select>
                </div>
            </div>
            <div className="visitor">
                <input type="checkbox" 
                       checked={toured}
                       onChange={(e)=>setToured(!toured)}
                       style={{margin:'10px', padding:'10px', alignSelf:'center'}}></input>
                <label htmlFor="tours">Tour Package</label>
                <div className="pickup-wrapper" >
                    {toured && (
                        <select {...register("tour")} className="meetingPoint">
                            <option value='' >Select Tour</option>
                        {
                            
                            tours.map((t,index)=>(
                                <option value={t.value} key={index}>{t.label}</option>
                            ))
                        }
                    </select>
                    )}
                    
                 </div>
                
            </div>
            <div className="email">
              <label htmlFor="email">Contact Details</label>
              <input
                placeholder="Contact's Name"
                type="text"
                {...register('contactName',{required:{value:true,message:'This Field is required'}})}
              />
               {errors.contactName && (
                  <span className="errorMessage">{errors.contactName.message}</span>
                )}
              <input
                placeholder="Contact's Email"
                type="email"
                {...register('contactEmail',{required:{value:true,message:'This Field is required'}})}
              />
               {errors.contactEmail && (
                  <span className="errorMessage">{errors.contactEmail.message}</span>
                )}
              <input
                placeholder="Contact's Phone"
                {...register('contactPhone',{required:{value:true,message:'This Field is required'}})}
              />
               {errors.contactPhone && (
                  <span className="errorMessage">{errors.contactPhone.message}</span>
                )}
             
            </div>
            <div className="email">
              <label htmlFor="email">Visitor Details</label>
              <input
                placeholder="Visitor's Name"
                type="text"
                {...register('visitorName',{required:{value:true,message:'This Field is required'}})}
              />
               {errors.visitorName && (
                  <span className="errorMessage">{errors.visitorName.message}</span>
                )}
              <input
                placeholder="Visitor's Email"
                type="email"
                {...register('visitorEmail',{required:{value:true,message:'This Field is required'}})}
              />
               {errors.visitorEmail && (
                  <span className="errorMessage">{errors.visitorEmail.message}</span>
                )}
              <input
                placeholder="Visitor's Phone"
                {...register('visitorPhone',{required:{value:true,message:'This Field is required'}})}
              />
               {errors.visitorPhone && (
                  <span className="errorMessage">{errors.visitorPhone.message}</span>
                )}
             
            </div>
            <div className="password">
              <label htmlFor="password">Invoice</label>
              <input
                placeholder="Invoice Email"
                type="email"
                {...register('email',{required:{value:true,message:'This Field is Requiered'}})}
              />
              {errors.visitorPhone && (
                  <span className="errorMessage">{errors.email.message}</span>
                )}
            </div>

            <div className="password">
              <label htmlFor="password">Additional Request</label>
              <textarea name="request" 
                placeholder="Additional Request" 
                rows='4' 
                {...register('request')}></textarea>
             
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

export default BookingAccom
