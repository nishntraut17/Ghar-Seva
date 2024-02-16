/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BookAppointment from '../components/BookAppointment';
// import { useSelector } from 'react-redux';
// import { Rating } from "@mui/material";
// import { selectCurrentUser } from "../redux/reducers/authSlice";

const SingleService = () => {

    // const user = useSelector(selectCurrentUser);
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState({});
    const [modelOpen, setModelOpen] = useState(false);
    const [selectedServiceProvider, setSelectedServiceProvider] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`http://localhost:5000/api/service/${id}`);
                if (response.status !== 200) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                console.log(response.data);
                setProduct(response.data);
            } catch (error) {
                console.error('Axios error:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className='flex flex-col m-20'>
            <div className="flex flex-row gap-20 ">
                <div className='rounded-xl'>
                    <img src={'https://goodbeeplumbinganddrains.com/wp-content/uploads/2023/01/iStock-1341381755-1024x683.jpg'} alt='service' className='h-full w-full rounded-lg' />
                </div>
                <div className='flex flex-col'>
                    <h1 className='font-bold text-gray-800 text-4xl text-left my-5'>{product.name}</h1>
                    <p className='font-bold text-gray-800 text-lg text-left'>{product.description}</p>
                </div>

            </div>
            <div className='my-10'>
                <p className='font-bold text-gray-800 text-2xl text-left my-10'>Service Providers</p>
                {product?.serviceProviders?.map((serviceProvider, id) => (
                    <div className='flex flex-col w-52 rounded-lg z-10 shadow-xl hover:z-20 hover:scale-105 hover:cursor-pointer'>
                        <div className='h-48 w-48 flex items-center justify-center'>
                            <img src={'https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg'} className='h-full w-full rounded-md ml-4' alt='profile' />
                        </div>
                        <p className='text-left ml-2'>{serviceProvider.name}</p>
                        <p className='text-left ml-2'>{serviceProvider.email}</p>
                        <button onClick={() => {
                            setModelOpen(true)
                            setSelectedServiceProvider(serviceProvider._id)
                        }}>Book Service</button>
                        {modelOpen && (
                            <BookAppointment
                                setModalOpen={setModelOpen}
                                selectedServiceProvider={selectedServiceProvider}
                                setSelectedServiceProvider={setSelectedServiceProvider}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SingleService;
