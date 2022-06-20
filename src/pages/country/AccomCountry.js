import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router';
import Cards from '../../components/Cards'
import Gallery from '../../components/Gallery'
import { API_URL } from '../../const';

const AccomCountry = () => {

    const {id}=useParams();
    const history=useHistory();
    
    const [country,setCountry]=useState({});
    const [destinations,setDestinations]=useState([]);
    const [dataItems,setDataItems]=useState([]);
    const [accomodations,setAccomodations]=useState([]);

    const [loading, setLoading] = useState(false);

    const fetchData=async()=>{
        try {
            setLoading(true);
            let { data } = await axios.get(`${API_URL}/api/v1/countrys/${id}`);
            if (data) {
                setCountry(data);
                fetchDestinations(data.name);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    const fetchDestinations=async(country)=>{
        try {
           
            let { data } = await axios.get(`${API_URL}/api/v1/destinations/country?country=${country}`);
            if (data) {
                let result=[]
                data.forEach(e => {
                    result.push({
                        link:`/accomodations/${e.id}`,
                        src:`${API_URL}/api/v1/images/destination/${e.id}`,
                        text:e.name
                    })
                });
                setDestinations(result);
            }
           
        } catch (error) {
            
        }
    }

    const fetchItems=async()=>{
        let items=[];
        try{
          let {data}=await axios.get(`${API_URL}/api/v1/destinations?sort=ASC`);
          if(!data){
            return;
          }
          data.forEach(d => {
              items.push({id:d.id,name:d.name});
          });
          setDataItems(items);
        }catch(error){
    
        }
      }

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
              setAccomodations(result)
          }
         
      } catch (error) {
          
      }
      }
    
      const handleOnSelect = (item) => {
        // the item selected
        console.log(item)
        history.push(`/destination/${item.id}`)
      }

    useEffect(() => {
        fetchData();
        fetchItems();
        fetchAccomodation();
    }, [])

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
             <h2>Accomodations</h2>
             <Gallery title={country.name} searchbar={true} items={dataItems} handleOnSelect={handleOnSelect} data={destinations} placeholder="Search a destination"/>
             <Cards title="Featured Accomodations" data={accomodations}/>
        </>
      );
  }
  
  export default AccomCountry