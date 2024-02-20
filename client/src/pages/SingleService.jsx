/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import BookAppointment from '../components/BookAppointment';
import { jwtDecode } from 'jwt-decode';
// import { useSelector } from 'react-redux';
// import { Rating } from "@mui/material";
// import { selectCurrentUser } from "../redux/reducers/authSlice";

const SingleService = () => {
    const user = jwtDecode(localStorage.getItem('token'));
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState({});
    const [modelOpen, setModelOpen] = useState(false);
    const [selectedServiceProvider, setSelectedServiceProvider] = useState(null);
    const [subServices, setSubServices] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`http://localhost:5000/api/service/${id}`);
                if (response.status !== 200) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                console.log(response.data);
                setSubServices(response.data.subServices);
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
        <div className='flex flex-col'>
            <div className='w-full h-80 overflow-hidden'>
                <img src={product.images[0]} alt='service' className='rounded-lg w-full' />
            </div>
            <div className='m-12'>
                <h1 className='font-bold text-gray-800 text-4xl text-left my-5'>{product.name}</h1>

                <div className="flex flex-row gap-20 text-gray-900">
                    <div className='w-1/4 border-2 border-gray-200 p-4 rounded-md shadow-md'>
                        <div className='font-bold text-left mb-3'>What are you looking for?</div>
                        <div className='flex flex-wrap'>
                            {product?.subServices?.map((service, index) => (
                                <span key={index} className='bg-gray-100 rounded-md m-1 p-2 cursor-pointer hover:scale-105 hover:bg-gray-200 transition duration-300'>{service}</span>
                            ))}
                        </div>
                    </div>
                    <div className='flex flex-col w-3/4'>
                        <p className='text-gray-800 text-lg text-left font-semibold mb-3'>Product Description</p>
                        <p className='text-gray-700 text-left'>{product.description}</p>
                    </div>
                </div>


                <p className='font-bold text-gray-800 text-2xl text-left my-10'>Service Providers</p>
                <div className='my-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>

                    {product?.serviceProviders?.map((serviceProvider, i) => (
                        <div key={i} className='rounded-lg shadow-xl hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 overflow-hidden'>
                            <Link to={`/service/service-providers/${serviceProvider._id}`} key={i}>
                                <div className='relative overflow-hidden'>
                                    <img src={serviceProvider?.profileImage} className='w-full h-40 object-cover object-center' alt='profile' />
                                    <div className='absolute inset-0 bg-black opacity-50'></div>
                                    <div className='absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition duration-300'>
                                        <p className='text-white text-lg font-semibold'>View Profile &#x276F;</p>
                                    </div>
                                </div>
                            </Link>
                            <div className='p-4'>
                                <p className='text-lg font-semibold'>{serviceProvider.name}</p>
                                <p className='text-gray-600'>{serviceProvider.email}</p>
                                <button onClick={() => {
                                    setModelOpen(true);
                                    setSelectedServiceProvider(serviceProvider._id);
                                }} className='mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300'>Book Service</button>
                                {modelOpen && (
                                    <BookAppointment
                                        user={user}
                                        service={id}
                                        setModalOpen={setModelOpen}
                                        selectedServiceProvider={selectedServiceProvider}
                                        setSelectedServiceProvider={setSelectedServiceProvider}
                                        subServices={subServices}
                                    />
                                )}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default SingleService;
