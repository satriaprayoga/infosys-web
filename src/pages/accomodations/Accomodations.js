import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Select } from 'react-dropdown-select';
import { IoLocationOutline } from 'react-icons/io5';

import './Accomodations.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../const';
import { Button } from '../../components/Button';
import { Loading } from 'react-fullscreen-loading';

const Accomodations = () => {

    const { id } = useParams();
    const [accomodations, setAccomodations] = useState([]);
    const [destination, setDestination] = useState({});
    const [accomTypes, setAccomTypes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState('');
    const [range, setRange] = useState(0);

    const handleType = (e) => {
        setType(e.target.value);

    }

    const handleRange = (e) => {
        setRange(e.target.value);

    }

    const handleFilter = async () => {
        setLoading(true);
        try {

            fetchAccomodations(destination.name, type, range);
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
            fetchAccomTypes();
            fetchAccomodations(data.name, "", 0);

        } catch (error) {

        }


    }

    const fetchAccomTypes = async () => {
        try {

            let { data } = await axios.get(`${API_URL}/api/v1/accomTypes?destId=${id}`);
            if (!data) {

                return;
            }
            const options = data.map(d => ({
                "value": d.type,
                "label": d.type
            }))
            setAccomTypes(options);

        } catch (error) {

        }
    }

    const fetchAccomodations = async (destination, type, range) => {
        let url = `${API_URL}/api/v1/accomodations/filter?destination=${destination}`;
        if (type !== '') {
            url = url.concat(`&type=${type}`)
        }
        if (range !== 0) {
            url = url.concat(`&range=${range}`)
        }
        console.log(url);
        try {
            let { data } = await axios.get(url);
            if (!data) {
                return;
            }
            console.log(data);
            setAccomodations(data);
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
            <div className="accom-container">
                <h1>Accomodation in {destination.name}</h1>
                <div className="filter-bar">
                    <h3>Type</h3>
                    <select placeholder="select type" onChange={handleType} value={type}>
                        <option value=''>Select Type</option>
                        {
                            accomTypes.map((a, index) => (
                                <option value={a.value} key={index} >{a.label}</option>
                            ))
                        }
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
                {!accomodations.length && <h2>No Result</h2>}
                <div className="accoms-container">
                   
                    {accomodations.map((a, index) => {
                        return (
                            <>
                                <div className="accoms-item-1" key={index}>
                                    <div className="img-holder">
                                        <img src={`${API_URL}/api/v1/images/accomodation/${a.id}`} className="img"></img>
                                    </div>
                                </div>
                                <div className="accoms-item-2">
                                    <div className="overview">
                                        <div className="overview-text">
                                            <h1>{a.name}</h1>
                                            <span><IoLocationOutline />{a.destination}</span>
                                            <div className="type">{a.type}</div>
                                             <span>{a.facility}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="accoms-item-border">
                                    <div className="price-holder">
                                        <h2>{`IDR ${a.price.toString().replace(/(.)(?=(\d{3})+$)/g, '$1.')} / pax`}</h2>
                                        <Link to={`/accomDetails/${a.id}`} className="explore">Explore</Link>
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

export default Accomodations
