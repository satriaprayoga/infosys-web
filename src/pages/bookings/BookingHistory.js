import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button';
import { API_URL } from '../../const';
import { useAuthState } from '../../context';
import './BookingHistory.css'

const BookingHistory = () => {

    const userDetails = useAuthState();
    const [books, setBooks] = useState([]);

    const fetchData = async () => {
        try {
            let { data } = await axios.get(`${API_URL}/api/v1/booking/customer`, { headers: { Authorization: `Bearer ${userDetails.token}` } });
            if (data) {
                console.log(data);
                setBooks(data);
            }
        } catch (error) {
            
        }
    }

    const columns = [
        {
            name: 'id',
            selector: row=>row.id,
            sortable: true,
        },
        {
            name: 'Check In',
            selector: row=>row.checkin,
            sortable: true,
        },
        {
            name: 'Check Out',
            selector: row=>row.checkout,
            sortable: true,
        },
        {
            name: 'Type',
            selector: row=>row.type,
            sortable: true,
        },
        {
            name: 'Amount',
            selector: row=>row.grossAmount,
            sortable: true,
        },
        {
            name: 'Status',
            selector: row=>row.status,
            sortable: true,
        },
        {
            name:'Action',
            cell:row=><Link to={"/bookingDetails/"+row.id}>View</Link>
        }

    ];

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <>
            <div className="history-container">
                <div className="history-wrapper">
                    <h2></h2>
                    <DataTable
                        title="Booking History"
                        columns={columns}
                        data={books}
                    />
                </div>
            </div>
        </>
    )
}

export default BookingHistory
