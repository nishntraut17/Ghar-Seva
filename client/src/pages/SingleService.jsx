/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import BookService from '../components/BookService';
import { jwtDecode } from 'jwt-decode';
import QS from '../assets/QS2.png';
import HelpIcon from '@mui/icons-material/Help';

const SingleService = () => {
    const user = jwtDecode(localStorage.getItem('token'));
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [service, setService] = useState({});
    const [modelOpen, setModelOpen] = useState(false);
    const [subServices, setSubServices] = useState([]);
    const [selectedSubServices, setSelectedSubServices] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`http://localhost:5000/api/service/${id}`);
                if (response.status !== 200) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                console.log(response.data);
                setSubServices(response.data.subServices);
                setService(response.data);
            } catch (error) {
                console.error('Axios error:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [id]);

    const toggleSubService = (subService) => {
        setSelectedSubServices(prevSelectedSubServices => {
            const isSelected = prevSelectedSubServices.includes(subService);
            if (isSelected) {
                return prevSelectedSubServices.filter(item => item !== subService);
            } else {
                return [...prevSelectedSubServices, subService];
            }
        });
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className='flex flex-col'>

            <div className='w-full h-80 overflow-hidden'>
                <img src={service.images[0]} alt='service' className='rounded-lg w-full' />
            </div>
            <div className='m-12'>
                <h1 className='font-bold text-gray-800 text-4xl text-left my-5'>{service.name}</h1>

                <div className="flex flex-row gap-20 text-gray-900 justify-between">
                    <div className='w-1/4 border-2 border-gray-200 p-4 rounded-md shadow-md'>
                        <div className='flex flex-row justify-between'>
                            <div className='text-left mb-3 text-gray-600'>Select services </div>
                            <HelpIcon />
                        </div>
                        <div className='flex flex-wrap'>
                            {subServices.map((service, index) => (
                                <span
                                    key={index}
                                    className={`bg-gray-100 rounded-md m-1 p-2 cursor-pointer hover:scale-105 hover:bg-gray-200 transition duration-300 ${selectedSubServices.includes(service) ? 'bg-blue-400' : ''}`}
                                    onClick={() => toggleSubService(service)}
                                >
                                    {service}
                                </span>
                            ))}

                        </div>
                        <button onClick={() => {
                            setModelOpen(true);
                        }} className='mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300'>Book Service</button>
                    </div>
                    <div className='flex flex-row w-3/4'>
                        <p className='text-gray-700 text-left'>Instructions: <br /> Choose from given options of service <br /> Click on Book service <br /> Select time and date <br /> Request will be sent to all service provider</p>
                        <div className='w-72 h-44'>
                            <img src={QS} alt="" className='w-full h-full' />
                        </div>
                    </div>

                    {modelOpen && (
                        <BookService
                            user={user}
                            service={id}
                            setModalOpen={setModelOpen}
                            subServices={selectedSubServices}
                        />
                    )}
                </div>


                <p className='font-bold text-gray-800 text-2xl text-left my-10'> Available service providers</p>
                <div className='my-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>

                    {service?.serviceProviders
                        .filter(serviceProvider => serviceProvider.city === user.city) // Filter service providers by city
                        .map((serviceProvider, i) => (
                            <div key={i} className='rounded-lg shadow-xl hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 overflow-hidden'>
                                <Link to={`/service-providers/${serviceProvider._id}`} key={i}>
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
                                </div>
                            </div>
                        ))}

                </div>

            </div>
        </div>
    );
};

export default SingleService;
