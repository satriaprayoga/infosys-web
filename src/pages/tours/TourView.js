import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import ImageSlider from '../../components/ImageSlider';
import { IoLocationOutline } from 'react-icons/io5';
import parse from 'html-react-parser';
import './TourView.css';
import { Button } from '../../components/Button';
import axios from 'axios';
import { API_URL } from '../../const';
import { toast } from 'react-toastify';
import { Loading } from 'react-fullscreen-loading';

const TourView = () => {
    const { id } = useParams();

    const [tour, setTour] = useState({});
    const [images,setImages]=useState([]);
    const [loading,setLoading]=useState(false);

    const fetchTour=async()=>{
        try {
            let {data}=await axios.get(`${API_URL}/api/v1/tours/${id}`);
            if(!data){
                return;
            }
            console.log(data)
            setTour({
                id:data.id,
                name:data.name,
                type:data.tourType.type,
                price: data.price.toString().replace(/(.)(?=(\d{3})+$)/g, '$1.'),
                activity:data.activity,
                address:data.address?data.address:data.destination
            });
            fetchImages();
        } catch (error) {
            
        }
    }

    const fetchImages=async()=>{
        try {
          
            let { data } = await axios.get(`${API_URL}/api/v1/images/tour/all/${id}`);
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
        fetchTour();
        setLoading(false);
    }, [])

  //  const data = [{ src: '/images/img-1.jpg' }, { src: '/images/img-2.jpg' }, { src: '/images/img-3.jpg' }]
    return (
        <>
             
            <div className="details-container">
                <h1>{tour.name}</h1>
                <div className="type">{tour.type}</div>
                <span><IoLocationOutline />{tour.address}</span>
                <h2>{`IDR ${tour.price} / pax`}</h2>
                <Button buttonStyle='btn--outline' link={'/bookTour/'+tour.id}>BOOK NOW</Button>
                <div className="separator"></div>
                <ImageSlider data={images} />
                <div className="separator"></div>
                <h1>Overview</h1>
                <div>
                    <span>{tour.activity}</span>
                </div>
            </div>
        </>
    )
}



export default TourView
