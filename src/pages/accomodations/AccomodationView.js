import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import ImageSlider from '../../components/ImageSlider';
import { IoLocationOutline } from 'react-icons/io5';
import parse from 'html-react-parser';
import './AccomodationView.css';
import { Button } from '../../components/Button';
import axios from 'axios';
import { API_URL } from '../../const';
import { toast } from 'react-toastify';

const AccomodationView = () => {
    const { id } = useParams();

    const [accomodation, setAccomodation] = useState({});
    const [images,setImages]=useState([]);

    const fetchAccomodation=async()=>{
        try {
            let {data}=await axios.get(`${API_URL}/api/v1/accomodations/${id}`);
            if(!data){
                return;
            }
            setAccomodation(data);
            fetchImages();
        } catch (error) {
            
        }
    }

    const fetchImages=async()=>{
        try {
          
            let { data } = await axios.get(`${API_URL}/api/v1/images/accomodation/all/${id}`);
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
        fetchAccomodation();
    }, [])

  //  const data = [{ src: '/images/img-1.jpg' }, { src: '/images/img-2.jpg' }, { src: '/images/img-3.jpg' }]
    return (
        <>
            <div className="details-container">
                <h1>{accomodation.name}</h1>
                <div className="type">{accomodation.type}</div>
                <span><IoLocationOutline />{accomodation.address?accomodation.address+", ":''+accomodation.destination}</span>
                <h1>{`IDR ${accomodation.price} / pax`}</h1>
                <Button buttonStyle='btn--outline' link={'/bookAccom/'+accomodation.id}>BOOK NOW</Button>
                <div className="separator"></div>
                <ImageSlider data={images} />
                <div className="separator"></div>
                <h1>Overview</h1>
                <div>
                    <span>{accomodation.facility}</span>
                </div>
            </div>
        </>
    )
}

export default AccomodationView
