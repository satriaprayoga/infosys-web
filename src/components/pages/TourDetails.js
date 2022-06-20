import React from 'react'
import { useParams } from 'react-router'
import ImageSlider from '../ImageSlider';
import {IoLocationOutline} from 'react-icons/io5';
import parse from 'html-react-parser';
import './TourDetails.css';
import { Button } from '../Button';

const TourDetails = () => {
    const {name} =useParams();

    const data=[{src:'/images/img-1.jpg'},{src:'/images/img-2.jpg'},{src:'/images/img-3.jpg'}]

    return (
        <>
            <div className="details-container">
                <h1>{name} Ceria</h1>
                <div className="type">Camper</div>
                <span><IoLocationOutline/>Jalan Petitenget Gang Sunyi No 1 Seminyak , Seminyak, Kuta, Bali, Indonesia, 80361</span>
                <h2>IDR 1.000.000 / pax</h2>
                <Button buttonStyle='btn--outline' link='/bookTour/baluran'>BOOK NOW</Button>
                <div className="separator"></div>
                <ImageSlider data={data}/>
                <div className="separator"></div>
                <h1>Overview</h1>
                <div>
                 <ul>
                     {
                         parse('<li>Item 1</li><li>Item 2</li>')
                     }
                 </ul>
                </div>
            </div>
        </>
    )
}


export default TourDetails
