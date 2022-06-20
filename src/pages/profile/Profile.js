import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { Button } from '../../components/Button';
import { API_URL } from '../../const';
import { useAuthState } from '../../context';
import './Profile.css';

const Profile = () => {

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors }
      } = useForm()
    const [customer, setCustomer] = useState({});
    const [loading,setLoading]=useState(false);
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const userDetails = useAuthState();
    const history=useHistory();

    const fetchData=async ()=>{
        try {
            setLoading(true);
            let {data}=await axios.get(`${API_URL}/api/v1/customer`,{ headers: { Authorization: `Bearer ${userDetails.token}` }});
            if(!data){
                setLoading(false);
                return ;
            }
            console.log(data)
            setCustomer(data);
            fetchForm(data);
            setLoading(false);
           
        } catch (error) {
            setLoading(false);
        }
     
        setLoading(false);
    }

    const fetchForm=(customer)=>{
        setValue("firstName",customer.firstName);
        setValue("lastName",customer.lastName);
        setValue("country",customer.country);
        setValue("state",customer.state);
        setValue("city",customer.city);
        setValue("address",customer.address);
        setValue("phone",customer.phone);
    }

    const onSubmit=async formData=>{
        try {
            console.log(formData);
            let {data}=await axios.put(`${API_URL}/api/v1/customer`,formData,{ headers: { Authorization: `Bearer ${userDetails.token}` }})
            if(!data){
                toast.error("Server Busy. Try again later");
                return ;
            }
            toast.info("Profile Successfully Updated!")
            console.log(data)
        } catch (error) {
            toast.error("Server Busy. Try again later");
        }
    }

    const handleChange = (e) => {
        setSelectedFile(e.target.files[0]);
        setIsFilePicked(true);
    }

    const handleUpload = async() => {
        if(!selectedFile){
            toast.error("No file choosen!");
        }
        try {
            const formData=new FormData();
            formData.append('file',selectedFile);
            let {data}=await axios.post(`${API_URL}/api/v1/images/customer/${customer.id}`,formData,{ headers: { Authorization: `Bearer ${userDetails.token}` }});
            if(!data){
                toast.error('Error uploading file!');
                return;
               
            }else{
                console.log(data)
                toast.info('Finished uploading file!');
                history.push("/profile");
                
            }

        } catch (error) {
            console.log(error);
            toast.error('Error uploading file!');
        }
        fetchData();
    }

   

    useEffect(() => {
        fetchData();
       
    }, [])

    return (
        <>
            {loading && <h1>Loading</h1>}
            <div className="profile-wrapper">
                <div className="profile-form-wrapper">
                    <h1>User Profile</h1>
                    <div className="profile-img-wrapper">
                        <img src={`${API_URL}/api/v1/images/account?email=${userDetails.user}`} />
                        <div className="file-wrapper">
                            <input className='file' type="file" onChange={handleChange}></input>
                            <button type="button" className="btn btn--blue" onClick={handleUpload}>Upload</button>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="firstName">
                            <label htmlFor="firstName">First Name</label>
                            <input className='input'
                                placeholder="First Name"
                               
                                {...register("firstName")}
                            />
                        </div>
                        <div className="lastName">
                            <label htmlFor="lastName">Last Name</label>
                            <input className='input'
                                placeholder="Last Name"
                               
                                {...register("lastName")}
                            />

                        </div>
                        <div className="email">
                            <label htmlFor="country">Country</label>
                            <input className='input'
                                placeholder="Country"
                              
                                {...register("country")}
                            />
                        </div>
                        <div className="lastName">
                            <label htmlFor="state">State/Province</label>
                            <input className='input'
                                placeholder="State"
                               
                                {...register("state")}
                            />

                        </div>
                        <div className="lastName">
                            <label htmlFor="city">City</label>
                            <input className='input'
                                placeholder="City"
                            
                                {...register("city")}
                            />

                        </div>
                        <div className="email">
                            <label htmlFor="address">Address</label>
                            <textarea placeholder="Address" {...register("address")}></textarea>
                        </div>

                        <div className="email">
                            <label htmlFor="phone">Phone</label>
                            <input className='input' placeholder="Phone" type="tel" {...register("phone")}></input>

                        </div>
                        <div className="signAccount">
                        <button type="submit">Save</button>
                    </div>
                    </form>
                    
                </div>

            </div>
        </>
    )
}

export default Profile
