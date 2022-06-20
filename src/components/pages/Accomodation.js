import React from 'react'
import { useParams } from 'react-router'
import {Select} from 'react-dropdown-select';
import {IoLocationOutline} from 'react-icons/io5';
import { Button } from '../Button';

import './Accomodation.css';
import { Link } from 'react-router-dom';

const Accomodation = () => {

    const {destination}=useParams();
    return (
        <div className="accom-container">
            <h1>Accomodation in {destination}</h1>
            <div className="filter-bar">
                <h3>Feature</h3>
                <select placeholder="Select Type"></select>
                <Select placeholder="Select Feature"/>
                <h3>Price</h3>
                <Select placeholder="Select Price"/>
                <button>Apply</button>
            </div>
            <div className="accoms-container">
                     <div className="accoms-item-1">
                         <div className="img-holder">
                         <img src="/images/img-3.jpg" className="img"></img>
                         </div>
                     </div>
                     <div className="accoms-item-2">
                         <div className="overview">
                             <div className="overview-text">
                                 <h1>Camper Ceria</h1>
                                 <span><IoLocationOutline/>Baluran</span>
                                 <div className="type">Camper</div>
                                 <ol>
                                     <li>Pantai A</li>
                                     <li>Pantai A</li>
                                     <li>Pantai A</li>
                                 </ol>
                             </div>
                         </div>
                     </div>
                     <div className="accoms-item-border">
                        <div className="price-holder">
                        <h2>IDR 1.000.000 / pax</h2>
                            <Link to={`/accomDetails/Camper Ceria`} className="explore">Explore</Link>
                        </div>
                     </div>
                 </div>      
        </div>
    )
}

export default Accomodation
