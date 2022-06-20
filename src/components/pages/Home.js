import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import '../../App.css';
import { API_URL } from '../../const';
import Cards from '../Cards';
import HeroSection from '../HeroSection';


function Home() {
 
  const [destinations,setDestinations]=useState([]);

  const fetchData=async()=>{
    try {
           
      let { data } = await axios.get(`${API_URL}/api/v1/destinations/featured`);
      if (data) {
          let result=[]
          data.forEach(e => {
              result.push({
                  path:`/destination/${e.id}`,
                  src:`${API_URL}/api/v1/images/destination/${e.id}`,
                  label:e.name,
                  text:e.description

              })
          });
          setDestinations(result);
      }
     
  } catch (error) {
      
  }
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <>
      <HeroSection />
      {/* <Cards title="Chek out our Promo"/> */}
      <Cards title="Featured Destinations" data={destinations}/>
   
    </>
  );
}

export default Home;