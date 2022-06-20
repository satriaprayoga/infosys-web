import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Cards from '../../components/Cards'
import Gallery from '../../components/Gallery'
import { API_URL } from '../../const';

const ExploreAccomodation = () => {
    const [countries,setCountries]=useState([]);
    const [loading, setLoading] = useState(false);
    const [accomodations,setAccomodations]=useState([]);

    const fetchAccomodation=async()=>{
        try {
               
          let { data } = await axios.get(`${API_URL}/api/v1/accomodations/featured`);
          if (data) {
              let result=[]
              data.forEach(e => {
                  result.push({
                      path:`/accomDetails/${e.id}`,
                      src:`${API_URL}/api/v1/images/accomodation/${e.id}`,
                      label:e.accomType.type,
                      text:e.name
    
                  })
              });
              setAccomodations(result);
          }
         
      } catch (error) {
          
      }
      }

    const fetchData = async () => {
        try {
            setLoading(true);
            let { data } = await axios.get(`${API_URL}/api/v1/countrys?sort=desc`);
            if (data) {
                let result=[]
                data.forEach(e => {
                    result.push({
                        link:`/accomCountry/${e.id}`,
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

    useEffect(() => {
       fetchData();
       fetchAccomodation();
    }, [])


    return (
       <>
       <Gallery title="Check Out Accomodations accross These Countries" data={countries}/>
       <Cards title="Featured Accomodations" data={accomodations}/>
       </>
    )
}

export default ExploreAccomodation
