import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import parse from 'html-react-parser';
import './DestinationView.css'
import{ API_URL} from '../../const';
import { toast } from 'react-toastify';
import { IoLocationOutline } from 'react-icons/io5';
import { Button } from '../../components/Button';
import ImageSlider from '../../components/ImageSlider';
import { Loading } from 'react-fullscreen-loading';

const DestinationView = () => {

    const {id}=useParams();
    const history=useHistory();
    const [destination,setDestination]=useState({});
    const [loading,setLoading]=useState(false);
    const [images,setImages]=useState([]);

    const fetchDestination=async()=>{
        try {
           
            let {data}=await axios.get(`${API_URL}/api/v1/destinations/${id}`);
            if(!data){
               
                return;
            }
            setDestination(data);
            fetchImages();
           
        } catch (error) {
          
        }
      
    }

    const fetchImages = async () => {
        try {
          
            let { data } = await axios.get(`${API_URL}/api/v1/images/destination/all/${id}`);
            if (!data) {
               // toast.error('Error retrieve images');
               return;
            } else {
                let items=[];
                data.forEach(d => {
                    items.push({src:`${API_URL}/api/v1/images/view/${d.id}`})
                });
                setImages(items);
            }
           
        } catch (error) {
            toast.error('Error retrieve images!');
        }
    }

    useEffect(() => {
        setLoading(true);
        fetchDestination();
        setLoading(false);
      //  fetchImages();
    }, [])


    return (
        <>
       {loading && <Loading loading={loading} background="#453222" loaderColor="#3498db"/>}
        <div className="details-container">
        
                <h1>{destination.name}</h1>
                <span><IoLocationOutline/>{destination.address+", "+destination.city+", "+destination.state+", "+destination.country}</span>
                <h2>{destination.company}</h2>
                <h4>{destination.email}</h4>
                <h4>{destination.phone}</h4>
                <div className="link-container">
                <Button buttonStyle='btn--outline' link={`/accomodations/${destination.id}`}>ACCOMODATIONS</Button>
                <Button buttonStyle='btn--outline' link={`/tours/${destination.id}`}>TOUR & TRAVEL</Button>
                </div>
                <div className="separator"></div>
                <ImageSlider data={images}/>
                <div className="separator"></div>
                <h1>Overview</h1>
                <div>
                 <ul>
                     {
                         parse(`${destination.description}`)
                     }
                 </ul>
                </div>
            </div>
        </>
    )
}

export default DestinationView
