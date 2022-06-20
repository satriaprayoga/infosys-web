import React, { useEffect, useState } from 'react';
import '../App.css';
import { Button } from './Button';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import './HeroSection.css';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../const';

function HeroSection() {
  const history=useHistory();
  const [destinations,setDestinations]=useState([]);
  const items = [
    {
      id: 0,
      name: 'Baluran, Situbondo'
    },
    {
      id: 1,
      name: 'Kuta, Denpasar'
    },
    {
      id: 2,
      name: 'Puncak, Bogor'
    },
    {
      id: 3,
      name: 'Bukit Barisan, Pdang'
    },
    {
      id: 4,
      name: 'Lembang, Bandung'
    }
  ]

  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results)
  }

  const handleOnSelect = (item) => {
    // the item selected
    console.log(item)
    history.push(`/destination/${item.id}`)
  }

  const handleOnFocus = () => {
    console.log('Focused')
  }

  const fetchDestinations=async()=>{
    let items=[];
    try{
      let {data}=await axios.get(`${API_URL}/api/v1/destinations?sort=ASC`);
      if(!data){
        return;
      }
      data.forEach(d => {
          items.push({id:d.id,name:d.name});
      });
      setDestinations(items);
    }catch(error){

    }
  }

  useEffect(() => {
    fetchDestinations();
  }, [])

  return (
    <div className='hero-container'>
    
      <div className='hero-box'>
      <h1><strong>TIME TO TRAVEL</strong></h1>
      <h5>Search Over 100+ Destination Across The Country</h5>
    
      </div>
      <div className='hero-sub-box'>
        <p><strong>Explore Your Destination</strong></p>
      </div>
      <div className='hero-btns'>
         <Link to="/exploreAccomodations" style={{textDecoration:'none'}}>
         <div className='hero-btn-box'>
           <div className='hero-btn-content'>
              <span className="fas fa-bed"><br/>
            
              </span>
              <p>ACCOMODATION</p> 
           </div>
         </div>
         </Link>
         <Link to="/exploreDestinations" style={{textDecoration:'none'}}>
         <div className='hero-btn-box'>
           <div className='hero-btn-content'>
              <span className="fas fa-umbrella"><br/>
            
              </span>
              <p>TOUR & TRAVEL</p> 
           </div>
         </div>
         </Link>
         
         <div className='hero-btn-box'>
           <div className='hero-btn-content'>
              <span className="fas fa-tags"><br/>
            
              </span>
              <p>INVESTMENT</p> 
           </div>
         </div>
      </div>
      <div className='hero-search-box'>
      <ReactSearchAutocomplete
            items={destinations}
            onSearch={handleOnSearch}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            placeholder="Select Your Destination"
            autoFocus
            styling={
             {
              height: "50px",
              borderRadius: "15px",
             }
            }
          />
      </div>
      
    </div>
  );
}

export default HeroSection;