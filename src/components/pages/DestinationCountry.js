import React from 'react'
import Gallery from '../Gallery';
import Cards from '../Cards';
import image from '../../img-home.jpg';
import { useParams } from 'react-router';

const DestinationCountry = () => {

  const {name}=useParams();

  const data=[
    {
        link:'/destination/Baluran',
        src:'/images/img-1.jpg',
        text:'Baluran'
    },
    {
        link:'/destination/Baluran',
        src:'/images/img-2.jpg',
        text:'Nusa Penida'
    },
    {
        link:'/destination/Baluran',
        src:'/images/img-3.jpg',
        text:'Puncak'
    }

]
   
    return (
       <>
           <h1>Destinations</h1>
           <Gallery title={name} searchbar={true} data={data} placeholder="Search a destination"/>
           <Cards title="Featured Destinations"/>
      </>
    );
}

export default DestinationCountry
