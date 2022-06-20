import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import {Select} from 'react-dropdown-select';
import {IoLocationOutline} from 'react-icons/io5';
import './Tours.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../const';
import { Button } from '../../components/Button';
import { Loading } from 'react-fullscreen-loading';

const Tours = () => {

    const {id}=useParams();
    const [tours, setTours] = useState([]);
    const [destination, setDestination] = useState({});
    const [tourTypes, setTourTypes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activity, setActivity] = useState('');
    const [day,setDay]=useState(0);
    const [range, setRange] = useState(0);

    const handleActivity = (e) => {
        setActivity(e.target.value);

    }

    const handleDay=(e)=>{
        setDay(e.target.value);
    }

    const handleRange = (e) => {
        setRange(e.target.value);

    }

    const handleFilter = async () => {
        setLoading(true);
        try {

            fetchTours(destination.name,activity,day,range);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
        setLoading(false);
    }

    const fetchDestination = async () => {
        try {

            let { data } = await axios.get(`${API_URL}/api/v1/destinations/${id}`);
            if (!data) {
                setLoading(false);
                return;
            }
            console.log(data.name);
            setDestination(data);
            fetchTourTypes();
            fetchTours(data.name,activity,day,range);

        } catch (error) {

        }


    }

    const fetchTourTypes = async () => {
        try {

            let { data } = await axios.get(`${API_URL}/api/v1/tourTypes?destId=${id}`);
            if (!data) {

                return;
            }
            const options = data.map(d => ({
                "value": d.type,
                "label": d.type
            }))
            setTourTypes(options);

        } catch (error) {

        }
    }

    const fetchTours = async (destination, activity, day, range) => {
        let url = `${API_URL}/api/v1/tours/filter?destination=${destination}`;
        if (activity !== '') {
            url = url.concat(`&activity=${activity}`)
        }
        if (range !== 0) {
            url = url.concat(`&range=${range}`)
        }
        if(day===3){
            url=url.concat(`&greaterDay=${day}`)
        }else{
            url=url.concat(`&day=${day}`)
        }
        console.log(url);
        try {
            let { data } = await axios.get(url);
            if (!data) {
                return;
            }
            console.log(data);
            setTours(data);
        } catch (error) {

        }
    }
    useEffect(() => {
        setLoading(true);
        fetchDestination();
        setLoading(false);
    }, [])
    return (
        <>
        {loading && <Loading loading={true} background="#453222" loaderColor="#3498db" />}
        <div className="tour-container">
            <h1>Tour Packages in {destination.name}</h1>
            <div className="filter-bar">
                <h3>Activity</h3>
                <select placeholder="select type" onChange={handleActivity} value={activity}>
                        <option value=''>Select Activity</option>
                        <option value='Diving'>Diving</option>
                        <option value='Nature'>Nature</option>
                        <option value='Tracking'>Tracking</option>
                        <option value='Sightseeing'>Sightseeing</option>
                        
                </select>
                <h3>Durations</h3>
                <select placeholder="select day" onChange={handleDay} value={day}>
                        <option value={0}>Select Day</option>
                        <option value={1}>1 Day Trip</option>
                        <option value={2}>2 Days Trip</option>
                        <option value={3}>3 + Days Trip</option>
                </select>
                <h3>Price</h3>
                <select placeholder="Select Price Range" onChange={handleRange} value={range}>
                        <option value={0} >Select Price Range</option>
                        <option value={500000} >IDR 500.000-1.000.000</option>
                        <option value={2000000} >IDR 1.000.000-3.000.000</option>
                        <option value={3000000}>IDR 3.000.000 +</option>
                    </select>
                    <button onClick={handleFilter}>Apply</button>
             </div>
             {!tours.length && <h2>No Result</h2>}
             <div className="tours-container">
             {tours.map((a, index) => {
                        return (
                            <>
                                <div className="tours-item-1" key={index}>
                                    <div className="img-holder">
                                        <img src={`${API_URL}/api/v1/images/tour/${a.id}`} className="img"></img>
                                    </div>
                                </div>
                                <div className="tours-item-2">
                                    <div className="overview">
                                        <div className="overview-text">
                                            <h1>{a.name}</h1>
                                            <span><IoLocationOutline />{a.destination}</span>
                                            <div className="type">{a.tourType.type}</div>
                                             <span>{a.activity}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="tours-item-border">
                                    <div className="price-holder">
                                        <h2>{`IDR ${a.price.toString().replace(/(.)(?=(\d{3})+$)/g, '$1.')} / pax`}</h2>
                                        <Link to={`/tourDetails/${a.id}`} className="explore">Explore</Link>
                                    </div>
                                </div>
                            </>
                        )
                    })}
             </div>
             
             
        </div>
    </>
    )
}

export default Tours
