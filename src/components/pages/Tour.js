import React from 'react'
import { useParams } from 'react-router'
import {Select} from 'react-dropdown-select';
import {IoLocationOutline} from 'react-icons/io5';
import './Tour.css';
import { Link } from 'react-router-dom';

const Tour = () => {
    const {name}=useParams();
    return (
        <>
            <div className="tour-container">
                <h1>Tour Packages in {name}</h1>
                <div className="filter-bar">
                    <h3>Feature</h3>
                    <Select placeholder="Select Feature"/>
                    <h3>Durations</h3>
                    <Select placeholder="Select Duration"/>
                    <h3>Price</h3>
                    <Select placeholder="Select Price"/>
                    <button>Apply</button>
                 </div>
                 <div className="tours-container">
                     <div className="tours-item-1">
                         <div className="img-holder">
                         <img src="/images/img-3.jpg" className="img"></img>
                         </div>
                     </div>
                     <div className="tours-item-2">
                         <div className="overview">
                             <div className="overview-text">
                                 <h1>Paket A</h1>
                                 <span><IoLocationOutline/>Baluran</span>
                                 <div className="type">Adventure</div>
                                 <ol>
                                     <li>Pantai A</li>
                                     <li>Pantai A</li>
                                     <li>Pantai A</li>
                                 </ol>
                             </div>
                         </div>
                     </div>
                     <div className="tours-item-border">
                        <div className="price-holder">
                        <h2>IDR 1.000.000 / pax</h2>
                            <Link to="/tourDetails/Paket A" className="explore">Explore</Link>
                        </div>
                     </div>
                 </div>
                 
                 
            </div>
        </>
    )
}

export default Tour
