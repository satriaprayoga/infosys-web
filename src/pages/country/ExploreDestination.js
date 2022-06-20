import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Cards from '../../components/Cards'
import Gallery from '../../components/Gallery'
import { API_URL } from '../../const';

const ExploreDestination = () => {
    const [countries,setCountries]=useState([]);
    const [loading, setLoading] = useState(false);

    const [destinations,setDestinations]=useState([]);

    const fetchData = async () => {
        try {
            setLoading(true);
            let { data } = await axios.get(`${API_URL}/api/v1/countrys?sort=desc`);
            if (data) {
                let result=[]
                data.forEach(e => {
                    result.push({
                        link:`/destinationCountry/${e.id}`,
                        src:`${API_URL}/api/v1/images/country/${e.id}`,
                        text:e.name
                    })
                });
                setCountries(result);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    const fetchDestinations=async()=>{
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
       fetchDestinations();
    }, [])


    return (
       <>
       <Gallery title="Check Out Destinations accross These Countries" data={countries}/>
       <Cards title="Featured Destinations" data={destinations}/>
       </>
    )
}

export default ExploreDestination
