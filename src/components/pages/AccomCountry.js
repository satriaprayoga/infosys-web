import React from 'react'
import Gallery from '../Gallery';
import Cards from '../Cards';
import image from '../../img-home.jpg';
import { useParams } from 'react-router';

const AccomCountry = () => {

  const {name}=useParams();

  const data=[
    {
        link:'/accomodations/Baluran',
        src:'/images/img-1.jpg',
        text:'Baluran'
    },
    {
        link:'/accomCountry/Singapore',
        src:'/images/img-2.jpg',
        text:'Nusa Penida'
    },
    {
        link:'/accomCountry/Cambodia',
        src:'/images/img-3.jpg',
        text:'Puncak'
    }

]
   
    return (
       <>
           <h1>Accomodations</h1>
           <Gallery title={name} searchbar={true} data={data} placeholder="Search a destination"/>
           <Cards title="Featured Accomodations"/>
      </>
    );
}

export default AccomCountry
